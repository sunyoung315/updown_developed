package com.updown.calendar.service;

import com.updown.calendar.dto.res.CalendarDietRes;
import com.updown.calendar.dto.res.CalendarExerciseRes;
import com.updown.member.entity.Member;

import java.util.List;

public interface CalendarService{
    List<CalendarDietRes> searchCalendarDiet(Member member, Integer year, Integer month);

    List<CalendarExerciseRes> searchCalendarExercise(Member member, Integer year, Integer month);
}
