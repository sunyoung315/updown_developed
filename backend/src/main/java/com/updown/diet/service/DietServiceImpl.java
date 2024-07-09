package com.updown.diet.service;

import com.updown.diet.dto.req.InsertFoodReq;
import com.updown.diet.dto.req.IsFastCheck;
import com.updown.diet.dto.req.UpdateFoodReq;
import com.updown.diet.dto.res.*;
import com.updown.diet.entity.Diet;
import com.updown.diet.entity.DietCategory;
import com.updown.diet.entity.Food;
import com.updown.diet.exception.DietNotFoundException;
import com.updown.diet.exception.FoodNotFoundException;
import com.updown.diet.exception.NotInsertFoodException;
import com.updown.diet.repository.DietRepository;
import com.updown.diet.repository.FoodRepository;
import com.updown.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DietServiceImpl implements DietService {
    private final DietRepository dietRepository;
    private final FoodRepository foodRepository;

    @Override
    public DietSearchRes searchFood(String category, Member member, String searchStr) {
        DietSearchRes dietSearchRes = DietSearchRes.builder().build();
        return dietSearchRes;
    }

    /**
     * 음식 등록
     *
     * @param category
     * @param member
     */
    @Override
    public void insertDiet(DietCategory category, Member member, InsertFoodReq insertFoodReq) {
        try {
            // 해당 날짜와 카테고리에 맞는 식단 가져오기
            Optional<Diet> optionalDiet = dietRepository.findByMemberAndRegDateAndCategory(member, insertFoodReq.getRegDate(), category);
            Diet diet;

            // 식단이 존재하면 가져오고, 그렇지 않으면 새로운 식단 생성
            if (optionalDiet.isPresent()) {
                diet = optionalDiet.get();
            } else {
                diet = Diet.builder()
                        .member(member)
                        .category(category)
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
     * 음식 수정
     *
     * @param member
     * @param foodId
     * @param updateFoodReq
     */
    @Override
    public void updateDiet(Member member, Integer foodId, UpdateFoodReq updateFoodReq) {

        //foodId로 food 찾아서 update
        Food originFood = foodRepository.findByFoodId(foodId).orElseThrow(NotInsertFoodException::new);
        originFood.setFoodName(updateFoodReq.getFoodName());
        originFood.setBrandName(updateFoodReq.getBrandName());
        originFood.setFoodIntake(updateFoodReq.getFoodIntake());
        originFood.setCalories(updateFoodReq.getCalories());
        originFood.setCarbohydrate(updateFoodReq.getCarbohydrate());
        originFood.setDietaryFiber(updateFoodReq.getDietaryFiber());
        originFood.setSugars(updateFoodReq.getSugars());
        originFood.setProtein(updateFoodReq.getProtein());
        originFood.setFat(updateFoodReq.getFat());
        originFood.setSaturatedFat(updateFoodReq.getSaturatedFat());
        originFood.setTransFat(updateFoodReq.getTransFat());

        foodRepository.save(originFood);

        Diet diet = dietRepository.findById(foodRepository.findByFoodId(foodId).get().getDiet().getDietId()).get();
        // food 의 dietId 찾아서 합으로 갱신
        float totalCalories = foodRepository.findCaloriesByDiet(diet.getDietId());
        float totalFoodIntake = foodRepository.findFoodIntakeByDiet(diet.getDietId());

        diet.setDietTotalCalories(totalCalories);
        diet.setDietTotalIntake(totalFoodIntake);

        dietRepository.save(diet);

    }

    /**
     * 일별 식단 정보 조회
     *
     * @param member
     * @param regDate
     * @return
     */
    @Override
    public List<DietDayRes> searchDayDiet(Member member, LocalDate regDate) {
        List<Diet> diets = dietRepository.findByMemberAndRegDate(member, regDate);
        List<DietDayRes> dietList = new ArrayList<>();

        for (Diet diet : diets) {
            DietDayRes dietDayRes = DietDayRes.builder()
                    .dietId(diet.getDietId())
                    .category(diet.getCategory())
                    .dietImg(diet.getDietImg())
                    .totalCalories(diet.getDietTotalCalories())
                    .isFast(diet.getIsFast())
                    .build();

            dietList.add(dietDayRes);
        }

        return dietList;
    }

    /**
     * 식사별 식단 리스트 조회
     *
     * @param member
     * @param dietId
     * @return
     */
    @Override
    public DietCategoryRes searchCategoryDiet(DietCategory category, Member member, Integer dietId) {
        Diet diet = dietRepository.findByMemberAndDietIdAndCategory(member, dietId, category).orElseThrow(DietNotFoundException::new);
        Nutrition nutrition = Nutrition.builder()
                .totalFoodIntake(diet.getDietTotalIntake())
                .totalCalories(diet.getDietTotalCalories())
                .totalProtein(foodRepository.findProteinByDiet(dietId))
                .totalSugars(foodRepository.findSugarsByDiet(dietId))
                .totalDietaryFiber(foodRepository.findDietaryFiberByDiet(dietId))
                .totalCholesterol(foodRepository.findCholesterolByDiet(dietId))
                .totalPotassium(foodRepository.findPotassiumByDiet(dietId))
                .totalFat(foodRepository.findFatByDiet(dietId))
                .totalTransFat(foodRepository.findTransFatByDiet(dietId))
                .totalSaturatedFat(foodRepository.findSaturatedFatByDiet(dietId))
                .totalSodium(foodRepository.findSodiumByDiet(dietId))
                .totalCarbohydrate(foodRepository.findCarbohydrateByDiet(dietId))
                .build();

        List<Integer> foodIdList = foodRepository.findByDietId(dietId); // foodId가져오기
        List<FoodListRes> foodList = new ArrayList<>();

        for (Integer foodId : foodIdList) {
            Food food = foodRepository.findByFoodId(foodId).orElseThrow(FoodNotFoundException::new);
            FoodListRes foodListRes = FoodListRes.builder()
                    .foodId(foodId)
                    .foodName(food.getFoodName())
                    .brandName(food.getBrandName())
                    .foodIntake(food.getFoodIntake())
                    .calories(food.getCalories())
                    .method(food.getMethod())
                    .build();

            foodList.add(foodListRes);
        }

        return DietCategoryRes.builder()
                .dietImg(diet.getDietImg())
                .nutrition(nutrition)
                .foodList(foodList)
                .build();
    }

    /**
     * 식단 상세 조회
     *
     * @param member
     * @param foodId
     * @return
     */
    @Override
    public FoodDetails searchFood(Member member, Integer foodId) {
        Food food = foodRepository.findByFoodId(foodId).orElseThrow(FoodNotFoundException::new);
        return FoodDetails.builder()
                .foodName(food.getFoodName())
                .brandName(food.getBrandName())
                .foodIntake(food.getFoodIntake())
                .foodCalories(food.getCalories())
                .carbohydrate(food.getCarbohydrate())
                .sugars(food.getSugars())
                .dietaryFiber(food.getDietaryFiber())
                .protein(food.getProtein())
                .fat(food.getFat())
                .saturatedFat(food.getSaturatedFat())
                .transFat(food.getTransFat())
                .cholesterol(food.getCholesterol())
                .sodium(food.getSodium())
                .potassium(food.getPotassium())
                .method(food.getMethod())
                .build();
    }

    /**
     * 단식 여부 등록
     *
     * @param member
     * @param isFastCheck
     */
    @Override
    public void checkIsFast(Member member, IsFastCheck isFastCheck) {
        // 멤버랑 오늘날짜, 카테고리에 해당하는 diet가 없다면 만들고
        Optional<Diet> diet = dietRepository.findByMemberAndRegDateAndCategory(member, isFastCheck.getRegDate(), isFastCheck.getCategory());
        if (diet.isEmpty()) {
            Diet newDiet = Diet.builder()
                    .member(member)
                    .isFast(true)
                    .regDate(isFastCheck.getRegDate())
                    .category(isFastCheck.getCategory())
                    .build();

            dietRepository.save(newDiet);
        } else { // 있다면 삭제
            dietRepository.delete(diet.get());
        }
    }

    /**
     * 음식 삭제
     *
     * @param member
     * @param foodId
     */
    @Override
    public void deleteFood(Member member, Integer foodId) {
        Food food = foodRepository.findByFoodId(foodId).orElseThrow(FoodNotFoundException::new);
        int dietId = food.getDiet().getDietId();
        Diet diet = dietRepository.findById(dietId).get();

        diet.setDietTotalIntake(diet.getDietTotalIntake() - food.getFoodIntake());
        diet.setDietTotalCalories(diet.getDietTotalCalories() - food.getCalories());
        // 만약 해당 음식을 삭제했을 때, 해당 식단의 섭취량이 0이라면 해당 식단 삭제
        if (diet.getDietTotalIntake() == 0) {
            dietRepository.delete(diet);
            return;
        } else { // 음식이 남아있다면 식단 저장
            dietRepository.save(diet);
        }
        foodRepository.delete(food); // 음식 삭제
    }

}
