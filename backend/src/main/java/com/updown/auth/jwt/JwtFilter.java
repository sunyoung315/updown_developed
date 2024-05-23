package com.updown.auth.jwt;

import com.updown.auth.exception.MemberNotFoundException;
import com.updown.auth.exception.TokenNotValidException;
import com.updown.member.entity.Member;
import com.updown.member.repository.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    public JwtFilter(JwtTokenProvider jwtTokenProvider, MemberRepository memberRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberRepository = memberRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        System.out.println("dofilter 시작");
        //request에서 Authorization 헤더를 찾음
        String authorization = request.getHeader("Authorization");

        //Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            System.out.println("헤더검증");
            //조건이 해당되면 메소드 종료 (필수)
            return;
        }
        //Bearer 부분 제거 후 순수 토큰만 획득
        String token = authorization.split(" ")[1];

        try {
            jwtTokenProvider.validateToken(token);

            //토큰에서 email 획득
            String email = jwtTokenProvider.getEmailFromToken(token);

            //member를 생성하여 값 set
            Member member;
            try{
                member = memberRepository.findByEmail(email).get();
                //스프링 시큐리티 인증 토큰 생성
                Authentication authToken = new UsernamePasswordAuthenticationToken(member, null, member.getAuthorities());

                //세션에 사용자 등록
                SecurityContextHolder.getContext().setAuthentication(authToken);

                // 필터 체인 호출 전에 로그 추가
                System.out.println("doFilterInternal 종료: " + request.getRequestURI());

                filterChain.doFilter(request, response);
            }catch (Exception e){
                throw new MemberNotFoundException(e);
            }
        } catch (Exception e) {
            throw new TokenNotValidException(e);
        }

    }
}
