package com.updown.diet.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Builder
@Table(name = "foodinfo")
@RequiredArgsConstructor
@AllArgsConstructor
public class FoodInfo {

    @Id
    @Column(name = "food_info_id")
    private String foodInfoId;

    @Column(name = "food_info_name")
    private String foodInfoName;

    @Column(name = "brand_name")
    private String brandName;

    @Column(name = "food_info_calories")
    private Integer foodInfoCalories;

    @Column(name = "carbohydrate")
    private float carbohydrate;

    @Column(name = "dietary_fiber")
    private float dietaryFiber;

    @Column(name = "sugars")
    private float sugars;

    @Column(name = "protein")
    private float protein;

    @Column(name = "fat")
    private float fat;

    @Column(name = "saturated_fat")
    private float saturated_fat;

    @Column(name = "trans_fat")
    private float transFat;

    @Column(name = "cholesterol")
    private float cholesterol;

    @Column(name = "sodium")
    private float sodium;

    @Column(name = "potassium")
    private float potassium;

}
