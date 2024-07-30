package com.updown.calendar.dto.res;

import com.updown.diet.entity.DietCategory;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class CalendarDietRes {
    private Integer dietId;
    private DietCategory category;
    private float totalCalories;
    private LocalDate regDate;
    private List<FoodRes> foodList;

}
