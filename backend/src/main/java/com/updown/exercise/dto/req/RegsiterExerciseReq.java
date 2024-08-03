package com.updown.exercise.dto.req;

import com.updown.exercise.entity.ExerciseSet;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RegsiterExerciseReq {
    private String exerciseName;
    private Integer exerciseTime;
    private float caloriesBurned;
    private Boolean method;
    private List<ExerciseSet> setList;

}
