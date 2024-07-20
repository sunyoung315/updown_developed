package com.updown.exercise.dto.req;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SetListReq {

    private Integer exerciseSetId;
    private float exerciseCount;
    private float exerciseWeight;
    private float exerciseDistance;
}
