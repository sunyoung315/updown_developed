package com.updown.calendar.service;

import com.updown.calendar.dto.req.CalendarReq;
import com.updown.calendar.dto.res.CalendarDietRes;
import com.updown.member.entity.Member;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CalendarService{
    List<CalendarDietRes> searchCalendarDiet(Member member, Integer year, Integer month);
}
