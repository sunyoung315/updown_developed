package com.updown.auth.service;

import com.updown.auth.dto.req.SignUpReq;
import com.updown.member.entity.Member;

import java.util.List;

public interface AuthService {

//    String checkRefresh(HttpServletRequest request);

    List<String> kakao(String refreshToken);

    void signUp(SignUpReq signUpReq, String refreshToken);

    void logOut(Member member);
}
