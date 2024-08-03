package com.updown.diet.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DietSearchRes {

        private String foodInfoName;
        private String brandName;
        private float foodInfoCalories;
        private float carbohydrate;
        private float protein;
        private float fat;

}
