package com.updown.member.service;


import com.updown.member.dto.req.MyInfo;
import com.updown.member.dto.res.SearchMyInfoRes;
import com.updown.member.entity.Member;

public interface MemberService {

    void updateMyInfo(Member member, MyInfo myInfo);

//    void updateCalorie(Member member, Integer targetCalories);

    SearchMyInfoRes searchMyInfo(Member member);

    void changeTheme(Member member, Integer themeNum);
}
