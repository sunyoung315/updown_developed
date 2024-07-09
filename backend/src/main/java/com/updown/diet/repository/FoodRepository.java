package com.updown.diet.repository;

import com.updown.diet.entity.Diet;
import com.updown.diet.entity.Food;
import com.updown.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Integer> {

    Optional<Food> findByFoodId(Integer foodId);

    // 칼로리 합
    @Query("SELECT SUM(f.calories) FROM Food AS f WHERE f.diet.dietId =:dietId")
    float findCaloriesByDiet(@Param("dietId") Integer dietId);

    // 섭취량 합
    @Query("SELECT SUM(f.foodIntake) FROM Food AS f WHERE f.diet.dietId =:dietId")
    float findFoodIntakeByDiet(@Param("dietId") Integer dietId);

    // 탄수화물 합
    @Query("SELECT SUM(f.carbohydrate) FROM Food AS f WHERE f.diet.dietId =:dietId")
    float findCarbohydrateByDiet(@Param("dietId") Integer dietId);

    // 단백질 합
    @Query("SELECT SUM(f.protein) FROM Food AS f WHERE f.diet.dietId =:dietId")
    float findProteinByDiet(@Param("dietId") Integer dietId);

    // 지방 합
    @Query("SELECT SUM(f.fat) FROM Food AS f WHERE f.diet.dietId =:dietId")
    float findFatByDiet(@Param("dietId") Integer dietId);
    // 설탕 합
    @Query("SELECT SUM(f.sugars) FROM Food AS f WHERE f.diet.dietId =:dietId")
    float findSugarsByDiet(@Param("dietId") Integer dietId);

    // 식이섬유 합
    @Query("SELECT SUM(f.dietaryFiber) FROM Food AS f WHERE f.diet.dietId =:dietId")
    float findDietaryFiberByDiet(@Param("dietId") Integer dietId);

    // 포화지방 합
    @Query("SELECT SUM(f.saturatedFat) FROM Food AS f WHERE f.diet.dietId =:dietId")
    float findSaturatedFatByDiet(@Param("dietId") Integer dietId);

    // 트랜스지방 합
    @Query("SELECT SUM(f.transFat) FROM Food AS f WHERE f.diet.dietId =:dietId")
    float findTransFatByDiet(@Param("dietId") Integer dietId);

    // 콜레스테롤 합
    @Query("SELECT SUM(f.cholesterol) FROM Food AS f WHERE f.diet.dietId =:dietId")
    float findCholesterolByDiet(@Param("dietId") Integer dietId);

    // 나트륨 합
    @Query("SELECT SUM(f.sodium) FROM Food AS f WHERE f.diet.dietId =:dietId")
    float findSodiumByDiet(@Param("dietId") Integer dietId);

    // 칼륨 합
    @Query("SELECT SUM(f.potassium) FROM Food AS f WHERE f.diet.dietId =:dietId")
    float findPotassiumByDiet(@Param("dietId") Integer dietId);

    // 식사 별 foodId 리스트
    @Query("SELECT f.foodId FROM Food AS f WHERE f.diet.dietId =:dietId")
    List<Integer> findByDietId(Integer dietId);
}
