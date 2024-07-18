package com.updown.diet.repository;

import com.updown.diet.entity.Diet;
import com.updown.diet.entity.DietCategory;
import com.updown.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DietRepository extends JpaRepository<Diet, Integer> {
    Optional<Diet> findByMemberAndRegDateAndCategory(Member member, LocalDate regDate, DietCategory category);

    List<Diet> findByMemberAndRegDate(Member member, LocalDate regDate);

    Optional<Diet> findByCategoryAndRegDate(DietCategory category, LocalDate regDate);
}