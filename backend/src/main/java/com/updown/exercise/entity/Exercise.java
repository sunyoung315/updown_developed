package com.updown.exercise.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Builder
@Table(name = "exercise")
@RequiredArgsConstructor
@AllArgsConstructor
public class Exercise {

    @Id
    @Column(name = "exercise_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer exerciseId;

    @ManyToOne
    @JoinColumn(name="exercise_record_id", nullable = false)
    private ExerciseRecord exerciseRecord;

    @Column(name = "exercise_name", nullable = false)
    private String exerciseName;

    @Column(name = "exercise_time", nullable = false)
    private Integer exerciseTime;

    @Column(name = "calories_burned", nullable = false)
    private float caloriesBurned;

    @Column(name = "method", nullable = false)
    private Boolean method;

    @Column(name = "met")
    private float met;

}


