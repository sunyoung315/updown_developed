package com.updown.calendar.dto.res;

import com.updown.exercise.dto.res.SetList;
import com.updown.exercise.entity.ExerciseSet;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class CalendarExerciseRes {
    private Integer exerciseId;
    private String exerciseName;
    private Integer exerciseTime;
    private float caloriesBurned;
    private LocalDate regDate;
    private List<SetList> setList;
}
