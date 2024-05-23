package com.updown.member.dto.req;

import com.updown.member.entity.MemberActivity;
import com.updown.member.entity.MemberGender;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyInfo {
    private MemberGender gender;
    private int age;
    private float height;
    private  float nowWeight;
    private float targetWeight;
    private MemberActivity activeLevel;
}
