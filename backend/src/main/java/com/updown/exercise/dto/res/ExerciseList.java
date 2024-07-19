package com.updown.exercise.dto.res;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ExerciseList {
    private Integer exerciseId;
    private String exerciseName;
    private Integer exerciseTime;
    private float caloriesBurned;
    private Boolean method;
    List<SetList> setList;
}
