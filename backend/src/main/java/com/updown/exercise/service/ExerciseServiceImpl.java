package com.updown.exercise.service;

import com.updown.exercise.dto.req.RegsiterExerciseReq;
import com.updown.exercise.dto.res.SearchExerciseRes;
import com.updown.exercise.entity.Exercise;
import com.updown.exercise.entity.ExerciseRecord;
import com.updown.exercise.entity.ExerciseSet;
import com.updown.exercise.exception.ExerciseRecordNotFoundException;
import com.updown.exercise.repository.ExerciseRecordRepository;
import com.updown.exercise.repository.ExerciseRepository;
import com.updown.exercise.repository.ExerciseSetRepository;
import com.updown.member.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Transactional
@Service
@RequiredArgsConstructor
public class ExerciseServiceImpl implements ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final ExerciseRecordRepository exerciseRecordRepository;
    private final ExerciseSetRepository exerciseSetRepository;

    @Override
    public void registerExercise(LocalDate regDate, Member member, RegsiterExerciseReq regsiterExerciseReq) {
        // 해당 날짜에 아직 등록이 안되어있다면 등록
        ExerciseRecord exerciseRecord;
        if (exerciseRecordRepository.findByMemberAndRegDate(member, regDate).isEmpty()) {
            // 운동 기록 저장
            exerciseRecord = ExerciseRecord.builder()
                    .member(member)
                    .totalTime(regsiterExerciseReq.getExerciseTime())
                    .totalCaloriesBurned(regsiterExerciseReq.getCaloriesBurned())
                    .regDate(regDate)
                    .build();
            exerciseRecordRepository.save(exerciseRecord);
        } else { // 이미 등록되어 있다면 운동 기록 갱신
            exerciseRecord = exerciseRecordRepository.findByMemberAndRegDate(member, regDate).get();
            exerciseRecord.setTotalTime(exerciseRecord.getTotalTime() + regsiterExerciseReq.getExerciseTime());
            exerciseRecord.setTotalCaloriesBurned(exerciseRecord.getTotalCaloriesBurned() + regsiterExerciseReq.getCaloriesBurned());
        }

        // 운동 저장
        Exercise exercise = Exercise.builder()
                .exerciseRecord(exerciseRecord)
                .exerciseName(regsiterExerciseReq.getExerciseName())
                .exerciseTime(regsiterExerciseReq.getExerciseTime())
                .caloriesBurned(regsiterExerciseReq.getCaloriesBurned())
                .method(regsiterExerciseReq.getMethod())
                .build();
        exerciseRepository.save(exercise);

        // 운동 세트 저장
        for (ExerciseSet es : regsiterExerciseReq.getSetList()) {
            ExerciseSet exerciseSet = ExerciseSet.builder()
                    .exercise(exercise)
                    .exerciseCount(es.getExerciseCount())
                    .exerciseWeight(es.getExerciseWeight())
                    .exerciseDistance(es.getExerciseDistance())
                    .build();
            exerciseSetRepository.save(exerciseSet);
        }

    }

    @Override
    public SearchExerciseRes searchExercise(LocalDate regDate, Member member) {
        // 멤버랑 날짜로 해당 운동기록 찾고
        ExerciseRecord exerciseRecord = exerciseRecordRepository.findByMemberAndRegDate(member, regDate).orElseThrow(ExerciseRecordNotFoundException::new);

        // 반환값에 값을 넣어서 반환
        return SearchExerciseRes.builder()
                .exerciseRecordId(exerciseRecord.getExerciseRecordId())
                .totalTime(exerciseRecord.getTotalTime())
                .totalCaloriesBurned(exerciseRecord.getTotalCaloriesBurned())
                .exerciseImg(exerciseRecord.getExerciseImg())
                .build();

    }
}

