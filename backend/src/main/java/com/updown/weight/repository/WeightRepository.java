package com.updown.weight.repository;

import com.updown.weight.entity.Weight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WeightRepository extends JpaRepository<Weight, Integer> {

    // 가장 최근 등록 체중 조회
    @Query("SELECT w FROM Weight w WHERE w.member.memberId = :memberId ORDER BY w.regDate DESC LIMIT 1")
    Optional<Weight> findMostRecentWeightByMemberId(@Param("memberId") Integer memberId);
}
