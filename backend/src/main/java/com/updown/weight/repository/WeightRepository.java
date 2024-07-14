package com.updown.weight.repository;

import com.updown.member.entity.Member;
import com.updown.weight.entity.Weight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.mail.MailException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
public interface WeightRepository extends JpaRepository<Weight, Integer> {

    // 가장 최근 등록 체중 조회
    @Query("SELECT w.weight FROM Weight w WHERE w.member.memberId = :memberId ORDER BY w.regDate DESC LIMIT 1")
    float findMostRecentWeightByMemberId(@Param("memberId") Integer memberId);

    Optional<Weight> findByMemberAndRegDate(Member member, LocalDate regDate);
}
