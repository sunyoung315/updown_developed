package com.updown.exercise.repository;

import com.updown.diet.entity.Diet;
import com.updown.exercise.entity.Exercise;
import com.updown.exercise.entity.ExerciseRecord;
import com.updown.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
    List<Exercise> findByExerciseRecord(ExerciseRecord exerciseRecord);

    Optional<Exercise> findByExerciseId(Integer exerciseId);
}
