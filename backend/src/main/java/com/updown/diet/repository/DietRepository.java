package com.updown.diet.repository;

import com.updown.diet.entity.Diet;
import com.updown.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.sql.Date;
import java.util.Optional;

@EnableJpaRepositories
public interface DietRepository extends JpaRepository<Diet, Integer> {
    Optional<Diet> findByMemberAndRegDate(Member member, Date regDate);
}
