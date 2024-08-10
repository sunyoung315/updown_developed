package com.updown.exercise.entity;

import com.updown.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Builder
@Table(name = "exerciseset")
@RequiredArgsConstructor
@AllArgsConstructor
public class ExerciseSet {

    @Id
    @Column(name = "exercise_set_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer exerciseSetId;

    @ManyToOne
    @JoinColumn(name="exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "exercise_count")
    private float exerciseCount;

    @Column(name = "exercise_weight")
    private float exerciseWeight;

    @Column(name = "exercise_distance")
    private float exerciseDistance;

}


