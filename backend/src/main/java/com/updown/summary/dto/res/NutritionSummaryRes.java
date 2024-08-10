package com.updown.summary.dto.res;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class NutritionSummaryRes {

    private float totalCarbohydrate;
    private float totalProtein;
    private float totalFat;
}
