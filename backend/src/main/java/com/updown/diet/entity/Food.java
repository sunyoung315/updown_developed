package com.updown.diet.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Builder
@Table(name = "food")
@RequiredArgsConstructor
@AllArgsConstructor
public class Food {

    @Id
    @Column(name = "food_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodId;

    @ManyToOne
    @JoinColumn(name="diet_id")
    private Diet diet;

    @Column(name = "food_name")
    private String foodName;

    @Column(name = "brand_name")
    private String brandName;

    @Column(name = "food_intake", nullable = false)
    private float foodIntake;

    @Column(name = "calories", nullable = false)
    private float calories;

    @Column(name = "carbohydrate", nullable = false)
    private float carbohydrate;

    @Column(name = "dietary_fiber", nullable = false)
    private float dietaryFiber;

    @Column(name = "sugars", nullable = false)
    private float sugars;

    @Column(name = "protein", nullable = false)
    private float protein;

    @Column(name = "fat", nullable = false)
    private float fat;

    @Column(name = "saturated_fat", nullable = false)
    private float saturatedFat;

    @Column(name = "trans_fat", nullable = false)
    private float transFat;

    @Column(name = "cholesterol", nullable = false)
    private float cholesterol;

    @Column(name = "sodium", nullable = false)
    private float sodium;

    @Column(name = "potassium", nullable = false)
    private float potassium;

    // 0: 직접, 1: 검색
    @Column(name = "method")
    private Boolean method;

}
