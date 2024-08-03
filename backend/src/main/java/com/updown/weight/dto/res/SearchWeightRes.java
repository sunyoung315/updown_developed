package com.updown.weight.dto.res;

import com.updown.weight.entity.Weight;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class SearchWeightRes {
    private float height;
    private List<Weight> weightList;
}
