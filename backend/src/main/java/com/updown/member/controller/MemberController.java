package com.updown.member.controller;

import com.updown.member.dto.req.MyInfo;
import com.updown.member.dto.res.SearchMyInfoRes;
import com.updown.member.entity.Member;
import com.updown.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MemberController {
    private final MemberService memberService;

    /**
     * 개인 기본정보 수정
     * @param member
     * @param myInfo
     * @return
     */
    @PutMapping
    public ResponseEntity<?> updateMyInfo(@AuthenticationPrincipal Member member, @RequestBody MyInfo myInfo){
        memberService.updateMyInfo(member, myInfo);
        return ResponseEntity.ok().build();
    }

    /**
     * 목표 칼로리 수정
     * @param member
     * @param targetCalories
     * @return
     */
    @PutMapping("/calorie")
    public ResponseEntity<?> updateCalorie(@AuthenticationPrincipal Member member, @RequestParam("targetCalories") Integer targetCalories){
        memberService.updateCalorie(member,targetCalories);
        return ResponseEntity.ok().build();
    }

    /**
     * 개인정보 조회
     * @param member
     * @return
     */
    @GetMapping
    public ResponseEntity<?> searchMyInfo(@AuthenticationPrincipal Member member){
        SearchMyInfoRes searchMyInfoRes = memberService.searchMyInfo(member);
        return ResponseEntity.ok().body(searchMyInfoRes);
    }
}
