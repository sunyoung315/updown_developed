package com.updown.diet.dto.req;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonCreator
    public IsFastCheck(@JsonProperty("regDate") LocalDate regDate, @JsonProperty("category") DietCategory category) {
        this.regDate = regDate;
        this.category = category;
    }

}
