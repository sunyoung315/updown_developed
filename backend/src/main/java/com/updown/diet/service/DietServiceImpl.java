package com.updown.diet.service;

import com.updown.diet.dto.req.InsertFoodReq;
import com.updown.diet.dto.req.UpdateFoodReq;
import com.updown.diet.dto.res.DietSearchRes;
import com.updown.diet.entity.Diet;
import com.updown.diet.entity.DietCatogory;
import com.updown.diet.entity.Food;
import com.updown.diet.exception.NotInsertFoodException;
import com.updown.diet.repository.DietRepository;
import com.updown.diet.repository.FoodRepository;
import com.updown.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DietServiceImpl implements DietService{
    private final DietRepository dietRepository;
    private final FoodRepository foodRepository;

    @Override
    public DietSearchRes searchFood(String category, Member member, String searchStr) {
        DietSearchRes dietSearchRes = DietSearchRes.builder().build();
        return dietSearchRes;
    }

    /**
     * 음식 등록
     * @param category
     * @param member
     */
    @Override
    public void insertDiet(String category, Member member, InsertFoodReq insertFoodReq) {
        try {
            // 해당 날짜와 카테고리에 맞는 식단 가져오기
            Optional<Diet> optionalDiet = dietRepository.findByMemberAndRegDateAndCategory(member, insertFoodReq.getRegDate(), DietCatogory.valueOf(category));
            Diet diet;

            // 식단이 존재하면 가져오고, 그렇지 않으면 새로운 식단 생성
            if (optionalDiet.isPresent()) {
                diet = optionalDiet.get();
            } else {
                diet = Diet.builder()
                        .member(member)
                        .category(DietCatogory.valueOf(category))
                        .dietTotalIntake(0) // 초기값 설정
                        .dietTotalCalories(0) // 초기값 설정
                        .regDate(insertFoodReq.getRegDate())
                        .isFast(false)
                        .build();
                dietRepository.save(diet);
            }

            // 음식 객체 생성 및 식단 설정
            Food food = insertFoodReq.getFood();
            food.setDiet(diet);

            // 음식 저장
            foodRepository.save(food);

            // 식단 칼로리 및 섭취량 업데이트
            diet.setDietTotalCalories(diet.getDietTotalCalories() + food.getCalories());
            diet.setDietTotalIntake(diet.getDietTotalIntake() + food.getFoodIntake());
            dietRepository.save(diet);

        } catch (Exception e) {
            throw new NotInsertFoodException(e);
        }
    }


    /**
     * 직접 등록한 음식 수정
     * @param member
     * @param foodId
     * @param food
     */
    @Override
    public void updateDiet(Member member, Integer foodId, Food food) {
        System.out.println("여긴가?"+foodRepository.findByFoodId(foodId).get());
        System.out.println(food.getCarbohydrate());
        System.out.println(food.getTransFat());
        System.out.println(dietRepository.findById(foodRepository.findByFoodId(foodId).get().getDiet().getDietId()));
        //foodId로 food 찾아서 update
        Food originFood = foodRepository.findByFoodId(foodId).get();
        originFood.setFoodName(food.getFoodName());
        originFood.setFoodIntake(food.getFoodIntake());
        originFood.setCalories(food.getCalories());
        originFood.setCarbohydrate(food.getCarbohydrate());
        originFood.setDietaryFiber(food.getDietaryFiber());
        originFood.setSugars(food.getSugars());
        originFood.setProtein(food.getProtein());
        originFood.setFat(food.getFat());
        originFood.setSaturatedFat(food.getSaturatedFat());
        originFood.setTransFat(food.getTransFat());

        foodRepository.save(originFood);

        Diet diet = dietRepository.findById(foodRepository.findByFoodId(foodId).get().getDiet().getDietId()).get();
        // food 의 dietId 찾아서 합으로 갱신
        float totalCalories = foodRepository.findCaloriesByDiet(diet.getDietId());
        float totalFoodIntake = foodRepository.findFoodIntakeByDiet(diet.getDietId());

        diet.setDietTotalCalories(totalCalories);
        diet.setDietTotalIntake(totalFoodIntake);

        dietRepository.save(diet);

    }

}
