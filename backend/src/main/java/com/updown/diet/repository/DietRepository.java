package com.updown.diet.repository;

import com.updown.diet.entity.Diet;
import com.updown.diet.entity.DietCategory;
import com.updown.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DietRepository extends JpaRepository<Diet, Integer> {
    Optional<Diet> findByMemberAndRegDateAndCategory(Member member, LocalDate regDate, DietCategory category);

    @Query("SELECT d FROM Diet AS d WHERE d.member =:member AND d.category =:category AND d.regDate =:regDate")
    Optional<Diet> findDietByMemberAndCategoryAndRegDate(Member member, DietCategory category, LocalDate regDate);

    List<Diet> findByMemberAndRegDate(Member member, LocalDate regDate);

    Optional<Diet> findByMemberAndCategoryAndRegDate(Member member, DietCategory category, LocalDate regDate);
    @Query("SELECT d FROM Diet AS d WHERE d.member = :member AND YEAR(d.regDate) = :year AND MONTH(d.regDate) = :month")
    List<Diet> findByMemberAndYearAndMonth(Member member, Integer year, Integer month);

}