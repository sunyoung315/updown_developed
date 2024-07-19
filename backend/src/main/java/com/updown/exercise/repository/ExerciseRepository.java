package com.updown.exercise.repository;

import com.updown.exercise.entity.Exercise;
import com.updown.exercise.entity.ExerciseRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
    List<Exercise> findByExerciseRecord(ExerciseRecord exerciseRecord);
}
