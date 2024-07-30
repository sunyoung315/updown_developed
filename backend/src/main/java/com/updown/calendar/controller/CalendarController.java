package com.updown.calendar.controller;

import com.updown.calendar.dto.res.CalendarDietRes;
import com.updown.calendar.dto.res.CalendarExerciseRes;
import com.updown.calendar.service.CalendarService;
import com.updown.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/calendar")
public class CalendarController {
    private final CalendarService calendarService;

    /**
     * 연월에 해당하는 식단 조회
     * @param member
     * @param year
     * @param month
     * @return
     */
    @GetMapping("/diet")
    ResponseEntity<?> searchCalendarDiet(@AuthenticationPrincipal Member member, @RequestParam Integer year, @RequestParam Integer month){
        List<CalendarDietRes> calenderDietResList = calendarService.searchCalendarDiet(member, year, month);
        return ResponseEntity.ok().body(calenderDietResList);
    }

    @GetMapping("/exercise")
    ResponseEntity<?> searchCalendarExercie(@AuthenticationPrincipal Member member,@RequestParam Integer year, @RequestParam Integer month) {
        List<CalendarExerciseRes> calendarExerciseRes = calendarService.searchCalendarExercise(member, year, month);
        return ResponseEntity.ok().body(calendarExerciseRes);
    }
}
