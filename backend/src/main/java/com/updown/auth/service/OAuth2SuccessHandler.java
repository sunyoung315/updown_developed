package com.updown.auth.service;

import com.updown.auth.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        DefaultOAuth2User defaultOAuth2User = (DefaultOAuth2User) authentication.getPrincipal();

        // defaultOAuth2User.getAttributes()에서 'kakao_account'를 가져와 Map으로 변환
        Map<String, Object> kakaoAccount = (Map<String, Object>) defaultOAuth2User.getAttributes().get("kakao_account");

        // 'kakao_account' Map에서 'email' 키에 해당하는 값을 추출
        String email = (String) kakaoAccount.get("email");

        // 리프레시 토큰 생성
        String refreshToken = jwtTokenProvider.createRefreshToken(email);

        // 리프레시 토큰 쿠키에 담기
        jwtTokenProvider.createRefreshTokenCookie(refreshToken, response);

        String targetUrl = "https://updown.run/load";

        String urlWithTokens = UriComponentsBuilder.fromUriString(targetUrl)
                .build().toUriString();
        response.sendRedirect(urlWithTokens);

    }
}
