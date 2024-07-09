package com.updown.diet.dto.req;

import com.updown.diet.entity.DietCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class IsFastCheck {

    private LocalDate regDate;
    private DietCategory category;

}
