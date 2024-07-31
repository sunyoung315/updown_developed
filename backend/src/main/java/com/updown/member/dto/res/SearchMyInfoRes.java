package com.updown.member.dto.res;

import com.updown.member.entity.MemberActivity;
import com.updown.member.entity.MemberGender;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SearchMyInfoRes {
    private MemberGender gender;
    private int age;
    private float height;
    private  float nowWeight;
    private float targetWeight;
    private MemberActivity activeLevel;
    private Integer targetCalories;
    private float recentWeight;
    private Integer themeNum;
}
