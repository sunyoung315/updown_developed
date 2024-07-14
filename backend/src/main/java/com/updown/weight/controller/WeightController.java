package com.updown.weight.controller;

import com.updown.member.entity.Member;
import com.updown.weight.dto.req.RegisterWeightReq;
import com.updown.weight.service.WeightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping
    ResponseEntity<?> registerWeight(@AuthenticationPrincipal Member member, @RequestBody RegisterWeightReq registerWeightReq){
        weightService.registerWeight(member, registerWeightReq);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    ResponseEntity<?> updateWeight(@AuthenticationPrincipal Member member, @RequestBody RegisterWeightReq registerWeightReq){
        weightService.updateWeight(member, registerWeightReq);
        return ResponseEntity.ok().build();
    }
}
