package com.updown.exercise.dto.res;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ExerciseSetList {

    private Integer exerciseSetId;
    private float exerciseCount;
    private float exerciseWeight;
    private float exerciseDistance;

}
