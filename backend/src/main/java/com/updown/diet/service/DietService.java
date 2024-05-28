package com.updown.diet.service;

import com.updown.diet.dto.req.InsertFoodReq;
import com.updown.diet.dto.req.UpdateFoodReq;
import com.updown.diet.dto.res.DietSearchRes;
import com.updown.diet.entity.Food;
import com.updown.member.entity.Member;

public interface DietService {
    DietSearchRes searchFood(String category, Member member, String searchStr);

    void insertDiet(String category, Member member, InsertFoodReq insertFoodReq);

    void updateDiet(Member member, Integer foodId, Food food);
}
