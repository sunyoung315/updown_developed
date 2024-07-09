package com.updown.diet.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FoodDetails {
    private String foodName;
    private String brandName;
    private float foodIntake;
    private float foodCalories;
    private float carbohydrate;
    private float sugars;
    private float dietaryFiber;
    private float protein;
    private float fat;
    private float saturatedFat;
    private float transFat;
    private float cholesterol;
    private float sodium;
    private float potassium;
    private boolean method;

}
