package com.updown.exercise.dto.req;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class UpdateExerciseReq {

    private String exerciseName;
    private Integer exerciseTime;
    private float caloriesBurned;
    private Boolean method;
    private List<SetListReq> setList;

}
