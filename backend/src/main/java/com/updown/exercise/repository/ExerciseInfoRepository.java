package com.updown.exercise.repository;

import com.updown.exercise.entity.ExerciseInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExerciseInfoRepository extends JpaRepository<ExerciseInfo, Integer> {

    Optional<ExerciseInfo> findByExerciseInfoName(String exerciseInfoName);
}
