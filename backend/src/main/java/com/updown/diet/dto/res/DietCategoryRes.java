package com.updown.diet.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class DietCategoryRes {
    private String dietImg;
    private Nutrition nutrition;
    private List<FoodListRes> foodList;
}
