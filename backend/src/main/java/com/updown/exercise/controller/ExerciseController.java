package com.updown.exercise.controller;

import com.updown.exercise.dto.req.RegsiterExerciseReq;
import com.updown.exercise.dto.res.SearchExerciseListRes;
import com.updown.exercise.dto.res.SearchExerciseRes;
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
     * @param regsiterExerciseReq
     * @return
     */
    @PostMapping ("/{regDate}")
    ResponseEntity<?> registerExercise(@PathVariable("regDate") LocalDate regDate, @AuthenticationPrincipal Member member, @RequestBody RegsiterExerciseReq regsiterExerciseReq) {
        exerciseService.registerExercise(regDate, member, regsiterExerciseReq);
        return ResponseEntity.ok().build();
    }

    /**
     * 하루 운동 정보 조회
     * @param regDate
     * @param member
     * @return
     */
    @GetMapping("/{regDate}")
    ResponseEntity<?> searchExercise(@PathVariable("regDate") LocalDate regDate, @AuthenticationPrincipal Member member){
        SearchExerciseRes searchExerciseRes = exerciseService.searchExercise(regDate, member);
        return ResponseEntity.ok().body(searchExerciseRes);
    }

    /**
     * 하루 운동 리스트 조회
     * @param regDate
     * @param member
     * @return
     */
    @GetMapping("/list/{regDate}")
    ResponseEntity<?> searchExerciseList(@PathVariable("regDate") LocalDate regDate, @AuthenticationPrincipal Member member){
        SearchExerciseListRes searchExerciseListRes = exerciseService.searchExerciseList(regDate,member);
        return ResponseEntity.ok().body(searchExerciseListRes);
    }

}
