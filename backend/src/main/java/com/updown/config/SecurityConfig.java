package com.updown.config;

import com.updown.auth.jwt.JwtFilter;
import com.updown.auth.jwt.JwtTokenProvider;
import com.updown.auth.service.OAuth2FailureHandler;
import com.updown.auth.service.OAuth2SuccessHandler;
import com.updown.auth.service.OAuth2UserService;
import com.updown.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    private final OAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler successHandler;
    private final OAuth2FailureHandler failureHandler;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable);
        http
                .oauth2Login(oauth2Configurer -> oauth2Configurer
                .failureHandler(failureHandler)
                .successHandler(successHandler)
                .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint
                .userService(oAuth2UserService)));
        http
                .authorizeHttpRequests(config ->
                        config
                                .requestMatchers("/auth/token", "/auth/kakao","/auth/signup").permitAll() // 이 줄을 추가하여 특정 경로 허용
                                .anyRequest().authenticated()); // 나머지 요청은 인증이 필요하도록 설정
        http
                .addFilterBefore(new JwtFilter(jwtTokenProvider, memberRepository),
                        UsernamePasswordAuthenticationFilter.class);
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}

