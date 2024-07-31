package com.updown.exercise.service;

import com.updown.exercise.dto.req.RegsiterExerciseReq;
import com.updown.exercise.dto.req.UpdateExerciseReq;
import com.updown.exercise.dto.req.UploadExerciseImgReq;
import com.updown.exercise.dto.res.SearchExerciseInfo;
import com.updown.exercise.dto.res.SearchExerciseListRes;
import com.updown.exercise.dto.res.SearchExerciseRes;
import com.updown.exercise.entity.ExerciseInfo;
import com.updown.member.entity.Member;

import java.time.LocalDate;
import java.util.List;

public interface ExerciseService {
    void registerExercise(LocalDate regDate, Member member, RegsiterExerciseReq regsiterExerciseReq);

    SearchExerciseRes searchExercise(LocalDate regDate, Member member);

    SearchExerciseListRes searchExerciseList(LocalDate regDate, Member member);

    void updateExercise(Integer exerciseId, Member member, UpdateExerciseReq updateExercise);

    void deleteExercise(Integer exerciseId, Member member);

    void uploadExerciseImg(Member member, UploadExerciseImgReq uploadExerciseImgReq);

    void deleteExerciseImg(Integer exerciseRecordId, Member member);

    SearchExerciseInfo searchExerciseInfo(Member member, String searchStr, LocalDate regDate);
}
