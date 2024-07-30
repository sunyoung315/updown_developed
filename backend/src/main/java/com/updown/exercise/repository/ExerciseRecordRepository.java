package com.updown.exercise.repository;

import com.updown.diet.entity.Diet;
import com.updown.exercise.entity.Exercise;
import com.updown.exercise.entity.ExerciseRecord;
import com.updown.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRecordRepository extends JpaRepository<ExerciseRecord, Integer> {
    Optional<ExerciseRecord> findByMemberAndRegDate(Member member, LocalDate regDate);

    @Query("SELECT er FROM ExerciseRecord AS er WHERE er.member =:member AND  YEAR(er.regDate) = :year AND MONTH(er.regDate) = :month ")
    List<ExerciseRecord> findByMemberAndYearAndMonth(Member member, Integer year, Integer month);
}
