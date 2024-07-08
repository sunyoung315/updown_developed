package com.updown.diet.repository;

import com.updown.diet.entity.Diet;
import com.updown.diet.entity.DietCatogory;
import com.updown.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.sql.Date;
import java.util.Optional;

@EnableJpaRepositories
public interface DietRepository extends JpaRepository<Diet, Integer> {
    Optional<Diet> findByMemberAndRegDateAndCategory(Member member, Date regDate, DietCatogory category);
}
