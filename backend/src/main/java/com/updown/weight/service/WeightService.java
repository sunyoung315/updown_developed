package com.updown.weight.service;

import com.updown.member.entity.Member;
import com.updown.weight.dto.req.RegisterWeightReq;
import com.updown.weight.dto.res.SearchWeightRes;

import java.time.LocalDate;

public interface WeightService {
    void registerWeight(Member member, RegisterWeightReq registerWeightReq);

    void updateWeight(Member member, RegisterWeightReq registerWeightReq);

    SearchWeightRes searchWeightList(Member member, LocalDate regDate);
}
