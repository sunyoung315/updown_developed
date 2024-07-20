package com.updown.exercise.service;

import com.updown.exercise.dto.req.RegsiterExerciseReq;
import com.updown.exercise.dto.req.SetListReq;
import com.updown.exercise.dto.req.UpdateExerciseReq;
import com.updown.exercise.dto.res.ExerciseList;
import com.updown.exercise.dto.res.SetList;
import com.updown.exercise.dto.res.SearchExerciseListRes;
import com.updown.exercise.dto.res.SearchExerciseRes;
import com.updown.exercise.entity.Exercise;
import com.updown.exercise.entity.ExerciseInfo;
import com.updown.exercise.entity.ExerciseRecord;
import com.updown.exercise.entity.ExerciseSet;
import com.updown.exercise.exception.ExerciseNotFoundException;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Override
    public void updateExercise(Integer exerciseId, Member member, UpdateExerciseReq updateExerciseReq) {
        // exerciseId로 운동 찾아서 수정, 저장
        Exercise exercise = exerciseRepository.findByExerciseId(exerciseId).orElseThrow(ExerciseNotFoundException::new);

        // 수정 전의 시간, 칼로리소모
        int originalExerciseTime = exercise.getExerciseTime();
        float originalCaloriesBurned = exercise.getCaloriesBurned();

        exercise.setExerciseName(updateExerciseReq.getExerciseName());
        exercise.setExerciseTime(updateExerciseReq.getExerciseTime());
        exercise.setCaloriesBurned(updateExerciseReq.getCaloriesBurned());
        exercise.setMethod(updateExerciseReq.getMethod());

        exerciseRepository.save(exercise);

        // exerciseRecord도 수정해야 함
        ExerciseRecord exerciseRecord = exercise.getExerciseRecord();
        exerciseRecord.setTotalTime(exerciseRecord.getTotalTime() - originalExerciseTime + updateExerciseReq.getExerciseTime());
        exerciseRecord.setTotalCaloriesBurned(exerciseRecord.getTotalCaloriesBurned() - originalCaloriesBurned + updateExerciseReq.getCaloriesBurned());
        exerciseRecordRepository.save(exerciseRecord);

        // 해당 exercise를 가지는 기존 ExerciseSet을 가져옴
        List<ExerciseSet> existingSets = exerciseSetRepository.findByExercise(exercise);

        // 업데이트 요청된 세트를 맵으로 변환 (새로운 세트는 ID가 없음)
        Map<Integer, SetListReq> setRequestMap = new HashMap<>();

        for (SetListReq setListReq : updateExerciseReq.getSetList()) {
            if (setListReq.getExerciseSetId() != null) { // 기존에 존재하던 set이라면
                setRequestMap.put(setListReq.getExerciseSetId(), setListReq); // setRequestMap에 저장
            } else { // 새로 추가된 set이라면 새로운 데이터로 저장
                ExerciseSet newExerciseSet = ExerciseSet.builder()
                        .exercise(exercise)
                        .exerciseCount(setListReq.getExerciseCount())
                        .exerciseWeight(setListReq.getExerciseWeight())
                        .exerciseDistance(setListReq.getExerciseDistance())
                        .build();
                exerciseSetRepository.save(newExerciseSet);
            }
        }

        // 기존 세트를 업데이트하거나 삭제
        for (ExerciseSet existingSet : existingSets) {
            // 업데이트 요청된 세트 중에서 현재 세트의 ID를 가진 세트 요청을 찾음
            SetListReq setListReq = setRequestMap.get(existingSet.getExerciseSetId());
            if (setListReq != null) {
                // 요청된 세트가 존재하면 기존 세트를 업데이트
                existingSet.setExerciseCount(setListReq.getExerciseCount());
                existingSet.setExerciseWeight(setListReq.getExerciseWeight());
                existingSet.setExerciseDistance(setListReq.getExerciseDistance());
                // 변경된 세트를 저장
                exerciseSetRepository.save(existingSet);
                // 처리된 세트를 맵에서 제거하여 나중에 새로 추가될 필요가 없음을 표시
                setRequestMap.remove(existingSet.getExerciseSetId());
            } else {
                // 요청된 세트가 존재하지 않으면 기존 세트를 삭제
                exerciseSetRepository.delete(existingSet);
            }
        }
    }

    @Override
    public void deleteExercise(Integer exerciseId, Member member) {
        Exercise exercise = exerciseRepository.findByExerciseId(exerciseId).orElseThrow(ExerciseNotFoundException::new);

        // 관련된 ExerciseRecord를 가져오기
        ExerciseRecord exerciseRecord = exercise.getExerciseRecord();

        // ExerciseRecord에서 운동 세부 정보를 뺀다.
        exerciseRecord.setTotalTime(exerciseRecord.getTotalTime() - exercise.getExerciseTime());
        exerciseRecord.setTotalCaloriesBurned(exerciseRecord.getTotalCaloriesBurned() - exercise.getCaloriesBurned());
        exerciseRecordRepository.save(exerciseRecord);

        //  Exercise 삭제.
        exerciseRepository.delete(exercise);
    }
}

