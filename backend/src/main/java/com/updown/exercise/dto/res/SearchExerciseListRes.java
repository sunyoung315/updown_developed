package com.updown.exercise.dto.res;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class SearchExerciseListRes {
    private SearchExerciseRes exerciseInfo;
    private List<ExerciseList> exerciseList;
}
