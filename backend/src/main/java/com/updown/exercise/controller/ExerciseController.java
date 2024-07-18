package com.updown.exercise.controller;

import com.updown.exercise.dto.req.RegsiterExercise;
import com.updown.exercise.service.ExerciseService;
import com.updown.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exercise")
public class ExerciseController {
    private final ExerciseService exerciseService;

    /**
     * 운동 등록
     * @param regDate
     * @param member
     * @param regsiterExercise
     * @return
     */
    @PostMapping ("/{regDate}")
    ResponseEntity<?> registerExercise(@PathVariable("regDate") LocalDate regDate, @AuthenticationPrincipal Member member, @RequestBody RegsiterExercise regsiterExercise) {
        exerciseService.registerExercise(regDate, member, regsiterExercise);
        return ResponseEntity.ok().build();
    }

}
