package com.updown.exercise.entity;

import com.updown.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Builder
@Table(name = "exerciserecord")
@RequiredArgsConstructor
@AllArgsConstructor
public class ExerciseRecord {

    @Id
    @Column(name = "exercise_record_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer exerciseRecordId;

    @ManyToOne
    @JoinColumn(name="member_id", nullable = false)
    private Member member;

    @Column(name = "total_time", nullable = false)
    private Integer totalTime;

    @Column(name = "total_calories_burned", nullable = false)
    private float totalCaloriesBurned;

    @Column(name = "reg_date", nullable = false)
    private LocalDate regDate;

    @Column(name = "exercise_img")
    private String exerciseImg;

}
