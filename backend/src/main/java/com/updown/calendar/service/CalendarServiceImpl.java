package com.updown.calendar.service;

import com.updown.calendar.dto.res.CalendarDietRes;
import com.updown.calendar.dto.res.CalendarExerciseRes;
import com.updown.calendar.dto.res.CalendarWeight;
import com.updown.calendar.dto.res.FoodRes;
import com.updown.diet.entity.Diet;
import com.updown.diet.entity.Food;
import com.updown.diet.repository.DietRepository;
import com.updown.diet.repository.FoodRepository;
import com.updown.exercise.dto.res.SetList;
import com.updown.exercise.entity.Exercise;
import com.updown.exercise.entity.ExerciseRecord;
import com.updown.exercise.entity.ExerciseSet;
import com.updown.exercise.repository.ExerciseRecordRepository;
import com.updown.exercise.repository.ExerciseRepository;
import com.updown.exercise.repository.ExerciseSetRepository;
import com.updown.member.entity.Member;
import com.updown.weight.entity.Weight;
import com.updown.weight.repository.WeightRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{
    private final DietRepository dietRepository;
    private final FoodRepository foodRepository;
    private final ExerciseRecordRepository exerciseRecordRepository;
    private final ExerciseRepository exerciseRepository;
    private final ExerciseSetRepository exerciseSetRepository;
    private final WeightRepository weightRepository;
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
                    .isFast(diet.getIsFast())
                    .foodList(foodResList)
                    .build();
            calenderDietResList.add(calendarDietRes);
        }
        return calenderDietResList;
    }

    @Override
    public List<CalendarExerciseRes> searchCalendarExercise(Member member, Integer year, Integer month) {
        List<CalendarExerciseRes> calendarExerciseResList = new ArrayList<>();
        // 연월에 해당하는 exerciseRecord 가져오기
        List<ExerciseRecord> exerciseRecordList = exerciseRecordRepository.findByMemberAndYearAndMonth(member, year, month);
        for(ExerciseRecord exerciseRecord : exerciseRecordList){
            // 해당 exerciseRecord에 해당하는 exercise 가져오기
            List<Exercise> exerciseList = exerciseRepository.findByExerciseRecord(exerciseRecord);
            for(Exercise exercise : exerciseList){
                // 해당 exercise에 해당하는 exerciseSet가져오기
                List<ExerciseSet> exerciseSetList = exerciseSetRepository.findByExercise(exercise);
                List<SetList> setLists = new ArrayList<>();
                for(ExerciseSet exerciseSet : exerciseSetList){
                    // setList 저장
                    SetList setList = SetList.builder()
                            .exerciseSetId(exerciseSet.getExerciseSetId())
                            .exerciseCount(exerciseSet.getExerciseCount())
                            .exerciseWeight(exerciseSet.getExerciseWeight())
                            .exerciseDistance(exerciseSet.getExerciseDistance())
                            .build();
                    setLists.add(setList);
                }

                // CalendarExerciseRes 생성
                CalendarExerciseRes calendarExerciseRes = CalendarExerciseRes.builder()
                        .exerciseId(exercise.getExerciseId())
                        .exerciseName(exercise.getExerciseName())
                        .exerciseTime(exercise.getExerciseTime())
                        .caloriesBurned(exercise.getCaloriesBurned())
                        .regDate(exerciseRecord.getRegDate())
                        .setList(setLists)
                        .build();

                calendarExerciseResList.add(calendarExerciseRes);
            }

        }
        return calendarExerciseResList;
    }

    @Override
    public List<CalendarWeight> searchCalendarWeight(Member member, Integer year, Integer month) {
        List<CalendarWeight> calendarWeightList = new ArrayList<>();
        List<Weight> weightList = weightRepository.findByMemberAndYearAndMonth(member,year,month);
        for(Weight weight : weightList){
            CalendarWeight calendarWeight = CalendarWeight.builder()
                    .weightId(weight.getWeightId())
                    .weight(weight.getWeight())
                    .targetWeight(member.getTargetWeight())
                    .regDate(weight.getRegDate())
                    .build();
            calendarWeightList.add(calendarWeight);
        }
        return calendarWeightList;
    }
}
