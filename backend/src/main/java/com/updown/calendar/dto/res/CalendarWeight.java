package com.updown.calendar.dto.res;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class CalendarWeight {
    private Integer weightId;
    private float weight;
    private float targetWeight;
    private LocalDate regDate;
}
