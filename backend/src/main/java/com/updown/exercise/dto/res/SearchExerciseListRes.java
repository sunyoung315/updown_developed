package com.updown.exercise.dto.res;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class SearchExerciseListRes {
    private Integer exerciseRecordId;
    private Integer totalTime;
    private float totalCaloriesBurned;
    private String exerciseImg;
    private List<ExerciseList> exerciseList;
}
