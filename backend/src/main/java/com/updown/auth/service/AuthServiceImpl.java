package com.updown.auth.service;

import com.updown.auth.dto.req.SignUpReq;
import com.updown.auth.exception.MemberExistException;
import com.updown.auth.jwt.JwtTokenProvider;
import com.updown.auth.redis.RedisPrefix;
import com.updown.auth.redis.RedisService;
import com.updown.member.entity.Member;
import com.updown.member.repository.MemberRepository;
import com.updown.weight.entity.Weight;
import com.updown.weight.repository.WeightRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final MemberRepository memberRepository;
    private final WeightRepository weightRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;

//    @Override
//    public String checkRefresh(HttpServletRequest request) {
//        String refreshToken = null;
//        Cookie[] cookies = request.getCookies();
//
//        // 리프레시 토큰 확인
//        if (cookies != null) {
//            for (Cookie cookie : cookies) {
//                if ("refreshToken".equals(cookie.getName())) {
//                    refreshToken = cookie.getValue();
//                }
//            }
//        }
//        return refreshToken;
//    }

    public List<String> kakao(String refreshToken) {
        String email = jwtTokenProvider.getEmailFromToken(refreshToken);
        String accessToken = jwtTokenProvider.createAccessToken(email);
        List<String> list = new ArrayList<>();

        // 리프레시 토큰을 통해 신규회원인지, 기존회원인지 확인
        if (memberRepository.findByEmail(email).isEmpty()) {
            list.add("신규회원");
            list.add(accessToken);
            System.out.println("신규회원");
            return list;
        }
        // 기존회원이라면 상태코드 200
        else {
            System.out.println("기존회원");
            list.add("기존회원");
            list.add(accessToken);
            String key = RedisPrefix.REFRESH_TOKEN.prefix() + email;
            // 레디스에 리프레시 토큰 저장
            redisService.setValues(key, refreshToken, Duration.ofDays(3));
            return list;
        }
    }

    @Transactional
    @Override
    public void signUp(SignUpReq signUpReq, String refreshToken) {
        String email = jwtTokenProvider.getEmailFromToken(refreshToken);

        // 만약 해당 이메일이 있다면 예외처리
        if(memberRepository.findByEmail(email).isPresent()){
            throw new MemberExistException();
        }

        Member member = Member.builder()
                .email(email)
                .age(signUpReq.getAge())
                .height(signUpReq.getHeight())
                .targetWeight(signUpReq.getTargetWeight())
                .targetCalories(signUpReq.getTargetCalories())
                .nowWeight(signUpReq.getNowWeight())
                .gender(signUpReq.getGender())
                .activeLevel(signUpReq.getActiveLevel())
                .build();

        Weight weight = Weight.builder()
                .member(member)
                .weight(member.getNowWeight())
                .regDate(LocalDate.now())
                .build();

        memberRepository.save(member);
        weightRepository.save(weight);

        String key = RedisPrefix.REFRESH_TOKEN.prefix() + email;
        // 레디스에 리프레시 토큰 저장
        redisService.setValues(key, refreshToken, Duration.ofDays(3));
    }

    @Override
    @Transactional
    public void logOut(Member member, HttpServletRequest request, HttpServletResponse response) {
        System.out.println(member.getGender());
        // 레디스에서 삭제
        String key = RedisPrefix.REFRESH_TOKEN.prefix() + member.getEmail();
        redisService.deleteValues(key);
        // 쿠키 삭제
        deleteRefreshTokenCookie(response);

        // 세션 무효화
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    public void deleteRefreshTokenCookie(HttpServletResponse response) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", null);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(0);
        response.addCookie(refreshTokenCookie);
    }

    /**
     * 회원탈퇴
     * @param member
     */
    @Transactional
    @Override
    public void deleteMember(Member member) {
        memberRepository.delete(member);
    }
}
