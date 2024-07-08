package com.updown.diet.dto.res;

import com.updown.diet.entity.DietCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DayDietRes {

    private int dietId;
    private DietCategory category;
    private String dietImg;
    private float totalCalories;
    boolean isFast;

    // 기존 생성자를 public으로 변경
//    public DayDietRes(int dietId, DietCategory category, String dietImg, float totalCalories, boolean isFast) {
//        this.dietId = dietId;
//        this.category = category;
//        this.dietImg = dietImg;
//        this.totalCalories = totalCalories;
//        this.isFast = isFast;
//    }
}
