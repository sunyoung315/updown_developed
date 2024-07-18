package com.updown.exercise.service;

import com.updown.exercise.dto.req.RegsiterExercise;
import com.updown.member.entity.Member;

import java.time.LocalDate;

public interface ExerciseService {
    void registerExercise(LocalDate regDate, Member member, RegsiterExercise regsiterExercise);
}
