package com.updown.exercise.service;

import com.updown.exercise.dto.req.RegsiterExerciseReq;
import com.updown.exercise.dto.res.SearchExerciseRes;
import com.updown.member.entity.Member;

import java.time.LocalDate;

public interface ExerciseService {
    void registerExercise(LocalDate regDate, Member member, RegsiterExerciseReq regsiterExerciseReq);

    SearchExerciseRes searchExercise(LocalDate regDate, Member member);
}
