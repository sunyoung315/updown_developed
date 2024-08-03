package com.updown.diet.service;

import com.updown.diet.entity.FoodInfo;
import com.updown.diet.repository.FoodInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodInfoServiceImpl implements FoodInfoService{
    private final FoodInfoRepository foodInfoRepository;

    public List<FoodInfo> searchFoodInfo(String searchStr) {
        return foodInfoRepository.findByFoodInfoName(searchStr);
    }
}