package com.updown.diet.dto.req;

import com.updown.diet.entity.Food;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class UpdateFoodReq {
    private String foodName;
    private float foodIntake;
    private float calories;
    private float carbohydrate;
    private float dietaryFiber;
    private float sugars;
    private float protein;
    private float fat;
    private float saturatedFat;
    private float transFat;
    private Integer dietId;
}
