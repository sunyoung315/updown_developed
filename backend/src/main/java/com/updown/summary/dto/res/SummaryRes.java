package com.updown.summary.dto.res;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SummaryRes {
    private float dietTotalCalories;
    private float totalCarbohydrate;
    private float totalProtein;
    private float totalFat;
    private Integer targetCalories;
    private float totalCaloriesBurned;
    private Integer themeNum;
}
