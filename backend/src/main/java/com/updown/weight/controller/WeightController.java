package com.updown.weight.controller;

import com.updown.member.entity.Member;
import com.updown.weight.dto.req.RegisterWeightReq;
import com.updown.weight.dto.res.SearchWeightRes;
import com.updown.weight.service.WeightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/weight")
public class WeightController {
    private final WeightService weightService;

    /**
     * 체중 기록
     * @param member
     * @param registerWeightReq
     * @return
     */
    @PostMapping("/record")
    ResponseEntity<?> registerWeight(@AuthenticationPrincipal Member member, @RequestBody RegisterWeightReq registerWeightReq){
        weightService.registerWeight(member, registerWeightReq);
        return ResponseEntity.ok().build();
    }

    /**
     * 체중 수정
     * @param member
     * @param registerWeightReq
     * @return
     */
    @PutMapping("/record")
    ResponseEntity<?> updateWeight(@AuthenticationPrincipal Member member, @RequestBody RegisterWeightReq registerWeightReq){
        weightService.updateWeight(member, registerWeightReq);
        return ResponseEntity.ok().build();
    }

    /**
     * 최근 7개 최중 조회
     * @param member
     * @param regDate
     * @return
     */
    @GetMapping("/{regDate}")
    ResponseEntity<?> searchWeightList(@AuthenticationPrincipal Member member, @PathVariable("regDate")LocalDate regDate){
        SearchWeightRes searchWeightRes = weightService.searchWeightList(member, regDate);
        return ResponseEntity.ok().body(searchWeightRes);
    }
}
