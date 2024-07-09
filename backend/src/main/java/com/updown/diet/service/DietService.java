package com.updown.diet.service;

import com.updown.diet.dto.req.InsertFoodReq;
import com.updown.diet.dto.res.DayDietRes;
import com.updown.diet.dto.res.DietCategoryRes;
import com.updown.diet.dto.res.DietSearchRes;
import com.updown.diet.entity.DietCategory;
import com.updown.diet.entity.Food;
import com.updown.member.entity.Member;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

public interface DietService {
    DietSearchRes searchFood(String category, Member member, String searchStr);

    void insertDiet(DietCategory category, Member member, InsertFoodReq insertFoodReq);

    void updateDiet(Member member, Integer foodId, Food food);

    List<DayDietRes> searchDayDiet(Member member, LocalDate regDate);

    DietCategoryRes searchCategoryDiet(DietCategory category, Member member, Integer dietId);
}
