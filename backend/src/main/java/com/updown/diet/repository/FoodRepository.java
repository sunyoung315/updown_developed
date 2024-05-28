package com.updown.diet.repository;

import com.updown.diet.entity.Diet;
import com.updown.diet.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Integer> {

    Optional<Food> findByFoodId(Integer foodId);

    // 칼로리 합
    @Query("SELECT SUM(f.calories) FROM Food AS f WHERE f.diet.dietId =: dietId")
    float findCaloriesByDiet(@Param("dietId") Integer dietId);

    // 섭취량 합
    @Query("SELECT SUM(f.foodIntake) FROM Food AS f WHERE f.diet.dietId =: dietId")
    float findFoodIntakeByDiet(@Param("dietId") Integer dietId);

}
