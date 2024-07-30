package com.updown.exercise.dto.res;

import com.updown.exercise.entity.ExerciseInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class SearchExerciseInfo {
    private float recentWeight;
    private List<ExerciseInfo> exerciseInfoList;
}
