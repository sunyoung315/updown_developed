package com.updown.weight.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RegisterWeightReq {
    private float weight;
    private LocalDate regDate;
}
