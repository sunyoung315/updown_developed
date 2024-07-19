package com.updown.exercise.dto.res;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SearchExerciseRes {
    private Integer exerciseRecordId;
    private Integer totalTime;
    private float totalCaloriesBurned;
    private String exerciseImg;
}
