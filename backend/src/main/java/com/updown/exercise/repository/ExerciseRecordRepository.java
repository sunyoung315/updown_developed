package com.updown.exercise.repository;

import com.updown.exercise.entity.Exercise;
import com.updown.exercise.entity.ExerciseRecord;
import com.updown.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface ExerciseRecordRepository extends JpaRepository<ExerciseRecord, Integer> {
    Optional<ExerciseRecord> findByMemberAndRegDate(Member member, LocalDate regDate);

}
