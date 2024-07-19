package com.updown.exercise.repository;

import com.updown.exercise.entity.Exercise;
import com.updown.exercise.entity.ExerciseSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseSetRepository extends JpaRepository<ExerciseSet, Integer> {
    List<ExerciseSet> findByExercise(Exercise exercise);
}
