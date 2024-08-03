package com.updown.weight.entity;

import com.updown.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Builder
@Table(name = "weight")
@RequiredArgsConstructor
@AllArgsConstructor
public class Weight {

    @Id
    @Column(name = "weight_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int weightId;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    @Column(name = "weight", nullable = false)
    private float weight;

    @Column(name = "reg_date", nullable = false)
    private LocalDate regDate;

}
