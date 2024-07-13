package com.updown.diet.repository;

import com.updown.diet.entity.FoodInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodInfoRepository extends JpaRepository<FoodInfo, Integer>{

    @Query("SELECT f FROM FoodInfo f WHERE f.foodInfoName LIKE CONCAT('%', :searchStr, '%')")
    List<FoodInfo> findByFoodInfoName(@Param("searchStr") String searchStr);
}