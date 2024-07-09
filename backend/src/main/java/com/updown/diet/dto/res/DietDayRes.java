package com.updown.diet.dto.res;

import com.updown.diet.entity.DietCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DietDayRes {

    private int dietId;
    private DietCategory category;
    private String dietImg;
    private float totalCalories;
    boolean isFast;

}
