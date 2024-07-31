package com.updown.summary.controller;

import com.updown.member.entity.Member;
import com.updown.summary.dto.res.SummaryRes;
import com.updown.summary.service.SummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/summary")
@RequiredArgsConstructor
public class SummaryController {
    private final SummaryService summaryService;

    @GetMapping
    ResponseEntity<?> searchSummary(@AuthenticationPrincipal Member member, @RequestParam LocalDate regDate){
        SummaryRes summaryRes = summaryService.searchSummary(member, regDate);
        return ResponseEntity.ok().body(summaryRes);
    }
}
