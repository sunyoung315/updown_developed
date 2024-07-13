package com.updown.diet.service;

import com.updown.diet.dto.req.InsertFoodReq;
import com.updown.diet.dto.req.IsFastCheckReq;
import com.updown.diet.dto.req.UploadDietImgReq;
import com.updown.diet.dto.res.DietDayRes;
import com.updown.diet.dto.res.DietCategoryRes;
import com.updown.diet.dto.res.DietSearchRes;
import com.updown.diet.dto.res.FoodDetails;
import com.updown.diet.entity.DietCategory;
import com.updown.diet.entity.Food;
import com.updown.member.entity.Member;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public interface DietService {
    Integer insertDiet(DietCategory category, Member member, InsertFoodReq insertFoodReq);

    void updateDiet(Member member, Integer foodId, Food food);

    List<DietDayRes> searchDayDiet(Member member, LocalDate regDate);

    DietCategoryRes searchCategoryDiet(DietCategory category, Member member, LocalDate regDate);

    FoodDetails searchFood(Member member, Integer foodId);

    void checkIsFast(Member member, IsFastCheckReq isFastCheckReq);

    void deleteFood(Member member, Integer foodId);

    void uploadDietImg(DietCategory category, Member member, UploadDietImgReq uploadDietImgReq);

    void deleteDietImg(Integer dietId, Member member);

    DietSearchRes findFood(String searchStr);
}
