package com.updown.diet.service;

import com.updown.diet.entity.FoodInfo;
import org.springframework.stereotype.Service;

import java.util.List;

public interface FoodInfoService {
    List<FoodInfo> searchFoodInfo(String searchStr);
}
