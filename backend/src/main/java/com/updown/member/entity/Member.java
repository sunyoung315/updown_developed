package com.updown.member.entity;


import com.updown.diet.entity.Diet;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.sql.Date;
import java.sql.Time;
import java.util.*;

@Entity
@Data
@Builder
@Table(name = "member")
@RequiredArgsConstructor
@AllArgsConstructor
public class Member implements OAuth2User {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;

    @Column(name = "email", nullable = false)
    String email;

    /**
     * 0: 남성, 1: 여성
     */
    @Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberGender gender;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "height", nullable = false)
    private float height;

    @Column(name = "now_weight", nullable = false)
    private float nowWeight;

    @Column(name = "target_weight", nullable = false)
    private float targetWeight;

    @Column(name = "active_level", nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberActivity activeLevel;

    @Column(name = "target_calories", nullable = false)
    private Integer targetCalories;

    @Column(name = "fast_start_date")
    private Date fastStartDate;

    @Column(name = "fast_start_time")
    private Time fastStartTime;

    @Column(name = "fast_period")
    private Integer fastPeriod;

    @Column(name = "fast_during_time")
    private Integer fastDuringTime;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Diet> scheduleList = new ArrayList<>();


    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
        // null을 반환하면 NullPointerException 발생 가능성이 있으므로 빈 리스트를 반환
    }

    @Override
    public String getName() {
        return email;
    }
}
