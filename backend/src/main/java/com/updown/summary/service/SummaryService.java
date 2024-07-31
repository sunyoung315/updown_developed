package com.updown.summary.service;

import com.updown.member.entity.Member;
import com.updown.summary.dto.res.SummaryRes;

import java.time.LocalDate;

public interface SummaryService {
    SummaryRes searchSummary(Member member, LocalDate regDate);
}
