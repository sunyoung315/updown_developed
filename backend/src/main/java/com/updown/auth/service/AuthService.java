package com.updown.auth.service;

import com.updown.auth.dto.req.SignUpReq;
import com.updown.member.entity.Member;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

public interface AuthService {

//    String checkRefresh(HttpServletRequest request);

    List<String> kakao(String refreshToken);

    void signUp(SignUpReq signUpReq, String refreshToken);

    void logOut(Member member, HttpServletRequest request, HttpServletResponse response);
}
