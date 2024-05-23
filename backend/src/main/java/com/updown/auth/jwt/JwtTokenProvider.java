package com.updown.auth.jwt;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private final JwtUtil jwtUtil;

    //    private Long accessTokenExpireTime = 1000 * 15L; // 15초 
    private Long accessTokenExpireTime = 1000 * 60 * 60L; // 1시간

    private Long refreshTokenExpireTime = 1000 * 60 * 60 * 24 * 3L; // 3일
    @Autowired
    public JwtTokenProvider(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // 토큰에서 회원 구별 정보 추출 (여기서는 이메일)
    public String getEmailFromToken(String token) {
        return jwtUtil.getEmail(token);
    }

    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String token) {
        jwtUtil.checkValid(token);
        return jwtUtil.isExpired(token);
    }

    // 액세스 토큰 생성
    public String createAccessToken(String email) {
        return jwtUtil.createJwt(email, accessTokenExpireTime);
    }

    // 리프레시 토큰 생성
    public String createRefreshToken(String email) {
        return jwtUtil.createJwt(email, refreshTokenExpireTime);
    }

    // 리프레시 토큰을 쿠키에 담는 메서드
    public void createRefreshTokenCookie(String refreshToken, HttpServletResponse response) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        // 쿠키 만료 시간 설정 ( 3일 )
        refreshTokenCookie.setMaxAge(3 * 24 * 60 * 60);
        response.addCookie(refreshTokenCookie);
    }

    // 요청에서 토큰을 해석하는 메소드
//    public String resolveToken(HttpServletRequest request) {
//        // 헤더에서 "Authorization" 값을 가져와서 토큰을 해석하는 메소드
//        String bearerToken = request.getHeader("Authorization");
//        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
//            return bearerToken.substring(7); // "Bearer " 다음의 토큰 값을 반환
//        }
//        return null;
//    }

    // 토큰을 기반으로 사용자 인증 정보를 생성하는 메소드
//    public Authentication getAuthentication(String token) {
//        // 토큰에서 사용자 정보(이메일)를 추출
//        String email = getEmailFromToken(token);
//
//        // OAuth2User 객체 생성
//        OAuth2User oAuth2User = new OAuth2User() {
//            @Override
//            public Map<String, Object> getAttributes() {
//                return null;
//            }
//
//            @Override
//            public Collection<? extends GrantedAuthority> getAuthorities() {
//                return Collections.emptyList();
//            }
//
//            @Override
//            public String getName() {
//                return email;
//            }
//        };
//        // 최종적으로 Authentication 객체 반환
//        return new UsernamePasswordAuthenticationToken(oAuth2User, "", oAuth2User.getAuthorities());
//    }

}