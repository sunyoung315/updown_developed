package com.updown.summary.service;

import com.updown.diet.entity.Diet;
import com.updown.diet.repository.DietRepository;
import com.updown.diet.repository.FoodRepository;
import com.updown.exercise.entity.ExerciseRecord;
import com.updown.exercise.exception.ExerciseRecordNotFoundException;
import com.updown.exercise.repository.ExerciseRecordRepository;
import com.updown.member.entity.Member;
import com.updown.summary.dto.res.NutritionSummaryRes;
import com.updown.summary.dto.res.SummaryRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SummaryServiceImpl implements SummaryService {
    private final DietRepository dietRepository;
    private final ExerciseRecordRepository exerciseRecordRepository;
    private final FoodRepository foodRepository;

    @Override
    public SummaryRes searchSummary(Member member, LocalDate regDate) {

        // 해당 날짜에 해당하는 diet찾기
        List<Diet> dietList = dietRepository.findByMemberAndRegDate(member, regDate);

        float dietTotalCalories = 0;
        float totalCarbohydrate = 0;
        float totalProtein = 0;
        float totalFat = 0;
        ExerciseRecord exerciseRecord = exerciseRecordRepository.findByMemberAndRegDate(member, regDate).orElse(null);

        float totalCaloriesBurned = 0;
        if(exerciseRecord != null){
            totalCaloriesBurned = exerciseRecord.getTotalCaloriesBurned();
        }
        for (Diet diet : dietList) {
            // diet들의 섭취량 더하기
            dietTotalCalories += diet.getDietTotalCalories(); // 총 식단별 총 섭취량 더하기

            Integer dietId = diet.getDietId();
            NutritionSummaryRes nutritionSummaryRes = null;
            List<Integer> foodIdList = foodRepository.findByDietId(dietId);

            if (!foodIdList.isEmpty()) {
                nutritionSummaryRes = NutritionSummaryRes.builder()
                        .totalCarbohydrate(foodRepository.findCarbohydrateByDiet(dietId))
                        .totalProtein(foodRepository.findProteinByDiet(dietId))
                        .totalFat(foodRepository.findFatByDiet(dietId))
                        .build();

                totalCarbohydrate+= nutritionSummaryRes.getTotalCarbohydrate();
                totalProtein+= nutritionSummaryRes.getTotalProtein();
                totalFat+= nutritionSummaryRes.getTotalFat();
            }
        }

        return SummaryRes.builder()
                .dietTotalCalories(dietTotalCalories)
                .totalCarbohydrate(totalCarbohydrate)
                .totalProtein(totalProtein)
                .totalFat(totalFat)
                .targetCalories(member.getTargetCalories())
                .totalCaloriesBurned(totalCaloriesBurned)
                .build();
    }
}