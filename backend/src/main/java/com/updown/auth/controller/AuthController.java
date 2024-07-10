package com.updown.auth.controller;

import com.updown.auth.dto.req.SignUpReq;
import com.updown.auth.exception.TokenNotValidException;
import com.updown.auth.jwt.JwtTokenProvider;
import com.updown.auth.redis.RedisPrefix;
import com.updown.auth.redis.RedisService;
import com.updown.auth.service.AuthService;
import com.updown.member.entity.Member;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;

    /**
     * 신규/기존회원 확인
     * @param refreshToken
     * @param response
     * @return 신규회원 => 202,기존회원 => 200
     * @throws IOException
     */
    @GetMapping("/kakao")
    public ResponseEntity<?> kakaoLogin(@CookieValue(value = "refreshToken") String refreshToken, HttpServletResponse response) throws IOException {
        System.out.println(refreshToken);
        System.out.println("로그인 메서드");
        // 클라이언트를 /oauth2/authorization/kakao 엔드포인트로 리다이렉트
       List<String> list = authService.kakao(refreshToken);

       if(list.get(0).equals("신규회원")){
           return ResponseEntity.accepted().body(list.get(1));
       }
       return ResponseEntity.ok().body(list.get(1));
    }


    /**
     * 회원가입
     * 헤더에서 accessToken 추출하여 email 확인하여 DB에 저장
     * @param signUpReq
     * @param
     * @return
     */
    @Transactional(isolation = Isolation.SERIALIZABLE)
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpReq signUpReq, @CookieValue(value = "refreshToken") String refreshToken){
        authService.signUp(signUpReq, refreshToken);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/token")
    public ResponseEntity<?> reissueRefreshToken(@CookieValue(value = "refreshToken") String refreshToken, HttpServletResponse response){
        // refreshToken 검증 및 새로운 accessToken 생성 로직
        try {
            // refreshToken이 redis에 존재한다면
            String email = jwtTokenProvider.getEmailFromToken(refreshToken);
            String key = RedisPrefix.REFRESH_TOKEN.prefix() + email;
            String savedRefreshToken = (String) redisService.getValues(key);
            // 레디스에 저장된 리프레시토큰과 지금 받아온 리프레시 토큰이 같다면
            if (refreshToken.equals(savedRefreshToken) && !jwtTokenProvider.validateToken(refreshToken)) {
                // 새로운 accessToken, refreshToken을 발급
                String newAccessToken = jwtTokenProvider.createAccessToken(email);
                String newRefreshToken = jwtTokenProvider.createRefreshToken(email);

                // 새로운 refreshToken을 쿠키에 담아서 반환하는 메소드를 호출.
                jwtTokenProvider.createRefreshTokenCookie(newRefreshToken, response);

                // redis에 있던 refreshToken 갱신
                redisService.setValues(key, newRefreshToken, Duration.ofDays(3));

                // 새로운 accessToken을 JSON 응답 본문에 담아 반환
                Map<String, String> tokenMap = new HashMap<>();
                tokenMap.put("accessToken", newAccessToken);
                System.out.println(refreshToken);
                System.out.println(savedRefreshToken);
                return ResponseEntity.ok().body(tokenMap);

            }else if(savedRefreshToken.isEmpty()){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("레디스에 토큰이 없어요.");
            }else { //같지 않다면
                System.out.println(refreshToken);
                System.out.println(savedRefreshToken);
                System.out.println("레디스에 저장된 토큰과 달라요.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("레디스에 저장된 토큰과 달라요.");
            }
        } catch (Exception e) {
            // refreshToken이 유효하지 않거나 처리 중 오류가 발생한 경우
            throw new TokenNotValidException(e);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logOut(@AuthenticationPrincipal Member member){
        authService.logOut(member);
        return ResponseEntity.ok().build();
    }


}
