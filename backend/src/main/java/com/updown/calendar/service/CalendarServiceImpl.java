package com.updown.calendar.service;

import com.updown.calendar.dto.req.CalendarReq;
import com.updown.calendar.dto.res.CalendarDietRes;
import com.updown.calendar.dto.res.FoodRes;
import com.updown.diet.entity.Diet;
import com.updown.diet.entity.Food;
import com.updown.diet.repository.DietRepository;
import com.updown.diet.repository.FoodRepository;
import com.updown.member.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{
    private final DietRepository dietRepository;
    private final FoodRepository foodRepository;
    @Override
    public List<CalendarDietRes> searchCalendarDiet(Member member,Integer year,  Integer month) {

        List<CalendarDietRes> calenderDietResList = new ArrayList<>();
        // 연월에 해당하는 diet 가져오기
        List<Diet> dietList = dietRepository.findByMemberAndYearAndMonth(member, year, month);
        for(Diet diet : dietList){
            List<FoodRes> foodResList = new ArrayList<>();
            // 해당 dietId에 해당하는 foodId리스트 가져오기
            List<Integer> foodIdList = foodRepository.findByDietId(diet.getDietId());
            for(Integer foodId : foodIdList){
                // foodId에 해당하는 음식 정보 가져오기
                Food food = foodRepository.findByFoodId(foodId).get();
                FoodRes foodRes = FoodRes.builder()
                        .foodId(food.getFoodId())
                        .foodName(food.getFoodName())
                        .foodIntake(food.getFoodIntake())
                        .calories(food.getCalories())
                        .brandName(food.getBrandName())
                        .build();
                foodResList.add(foodRes);
            }
            CalendarDietRes calendarDietRes = CalendarDietRes.builder()
                    .dietId(diet.getDietId())
                    .category(diet.getCategory())
                    .totalCalories(diet.getDietTotalCalories())
                    .regDate(diet.getRegDate())
                    .foodList(foodResList)
                    .build();
            calenderDietResList.add(calendarDietRes);
        }
        return calenderDietResList;
    }
}
