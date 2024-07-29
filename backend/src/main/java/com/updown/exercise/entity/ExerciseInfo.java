package com.updown.exercise.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Builder
@Table(name = "exerciseinfo")
@RequiredArgsConstructor
@AllArgsConstructor
public class ExerciseInfo {

    @Id
    @Column(name = "exercise_info_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer exerciseInfoId;

    @Column(name = "exercise_name", nullable = false)
    private String exerciseInfoName;

    @Column(name = "met", nullable = false)
    private float met;

}


