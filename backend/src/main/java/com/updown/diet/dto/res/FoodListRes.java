package com.updown.diet.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FoodListRes {

    private Integer foodId;
    private String foodName;
    private String brandName;
    private float foodIntake;
    private float calories;
    private boolean method;

}
