package com.updown.calendar.dto.res;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FoodRes {
    private Integer foodId;
    private String foodName;
    private float foodIntake;
    private float calories;
    private String brandName;
}
