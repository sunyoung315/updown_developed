package com.updown.exercise.repository;

import com.updown.exercise.entity.ExerciseInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseInfoRepository extends JpaRepository<ExerciseInfo, Integer> {

    Optional<ExerciseInfo> findByExerciseName(String exerciseInfoName);

    @Query("SELECT ei FROM ExerciseInfo ei WHERE ei.exerciseName LIKE CONCAT('%', :searchStr, '%')")
    List<ExerciseInfo> findExerciseInfoByExerciseInfoName(@Param("searchStr") String searchStr);
}
