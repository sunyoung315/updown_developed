package com.updown.diet.dto.req;

import com.updown.diet.entity.Food;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDate;

@Getter
@Setter
public class InsertFoodReq {
    private Food food;
    private LocalDate regDate;
}
