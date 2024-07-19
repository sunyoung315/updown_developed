package com.updown.exercise.service;

import com.updown.exercise.dto.req.RegsiterExerciseReq;
import com.updown.exercise.dto.res.ExerciseList;
import com.updown.exercise.dto.res.SetList;
import com.updown.exercise.dto.res.SearchExerciseListRes;
import com.updown.exercise.dto.res.SearchExerciseRes;
import com.updown.exercise.entity.Exercise;
import com.updown.exercise.entity.ExerciseInfo;
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
import java.util.ArrayList;
import java.util.List;

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

    @Override
    public SearchExerciseListRes searchExerciseList(LocalDate regDate, Member member) {
        // 운동 기록 찾기
        ExerciseRecord exerciseRecord = exerciseRecordRepository.findByMemberAndRegDate(member, regDate).orElseThrow(ExerciseRecordNotFoundException::new);
        SearchExerciseRes exerciseInfo = SearchExerciseRes.builder()
                .exerciseRecordId(exerciseRecord.getExerciseRecordId())
                .totalTime(exerciseRecord.getTotalTime())
                .totalCaloriesBurned(exerciseRecord.getTotalCaloriesBurned())
                .exerciseImg(exerciseRecord.getExerciseImg())
                .build();

        // 해당 운동기록 Id를 가지는 운동 찾기
        List<Exercise> findExerciseList = exerciseRepository.findByExerciseRecord(exerciseRecord);
        List<ExerciseList> exerciseLists = new ArrayList<>();
        for (Exercise exercise : findExerciseList) {
            // 해당 운동 Id를 가지는 운동 세트 찾기
            List<ExerciseSet> exerciseSetListTmp = exerciseSetRepository.findByExercise(exercise);
            List<SetList> setList = new ArrayList<>();

            for(ExerciseSet exerciseSet : exerciseSetListTmp){
                SetList setList1 = SetList.builder()
                        .exerciseSetId(exerciseSet.getExerciseSetId())
                        .exerciseCount(exerciseSet.getExerciseCount())
                        .exerciseWeight(exerciseSet.getExerciseWeight())
                        .exerciseDistance(exerciseSet.getExerciseDistance())
                        .build();
                setList.add(setList1);
            }

            ExerciseList exerciseList = ExerciseList.builder()
                    .exerciseId(exercise.getExerciseId())
                    .exerciseName(exercise.getExerciseName())
                    .exerciseTime(exercise.getExerciseTime())
                    .caloriesBurned(exercise.getCaloriesBurned())
                    .method(exercise.getMethod())
                    .setList(setList)
                    .build();
            exerciseLists.add(exerciseList);
        }

        return SearchExerciseListRes.builder()
                .exerciseInfo(exerciseInfo)
                .exerciseList(exerciseLists)
                .build();

    }
}

