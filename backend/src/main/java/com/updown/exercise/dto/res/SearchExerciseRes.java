package com.updown.exercise.dto.res;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SearchExerciseRes {
    private Integer exerciseRecordId;
    private Integer totalTime;
    private float totalCaloriesBurned;
    private String exerciseImg;
    private float recentWeight;
}
