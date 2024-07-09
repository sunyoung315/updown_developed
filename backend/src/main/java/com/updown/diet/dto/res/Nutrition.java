package com.updown.diet.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Nutrition {
    private float totalCalories;
    private float totalProtein;
    private float totalCarbohydrate;
    private float totalFat;
    private float totalDietaryFiber;
    private float totalSugars;
    private float totalSaturatedFat;
    private float totalTransFat;
    private float totalCholesterol;
    private float totalSodium;
    private float totalPotassium;
}
