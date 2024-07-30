package com.updown.weight.repository;

import com.updown.exercise.entity.ExerciseRecord;
import com.updown.member.entity.Member;
import com.updown.weight.entity.Weight;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WeightRepository extends JpaRepository<Weight, Integer> {

    // 가장 최근 등록 체중 조회
    @Query("SELECT w.weight FROM Weight w WHERE w.member.memberId = :memberId ORDER BY w.regDate DESC LIMIT 1")
    float findMostRecentWeightByMemberId(@Param("memberId") Integer memberId);

    // regDate 기준 최근 7개 등록 체중 조회
    @Query("SELECT w FROM Weight w WHERE w.member.memberId = :memberId AND w.regDate <= :regDate ORDER BY w.regDate DESC LIMIT 7")
    List<Weight> findRecentWeightsByMemberIdAndRegDate(@Param("memberId") Integer memberId, @Param("regDate") LocalDate regDate);

    Optional<Weight> findByMemberAndRegDate(Member member, LocalDate regDate);

    @Query("SELECT w FROM Weight AS w WHERE w.member =:member AND YEAR(w.regDate) = :year AND MONTH(w.regDate) = :month ")
    List<Weight> findByMemberAndYearAndMonth(Member member, Integer year, Integer month);

}
