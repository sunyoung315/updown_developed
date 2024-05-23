package com.updown.member.service;

import com.updown.member.dto.req.MyInfo;
import com.updown.member.dto.res.SearchMyInfoRes;
import com.updown.member.entity.Member;
import com.updown.member.exception.NotUpdateMyInfoException;
import com.updown.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl extends DefaultOAuth2UserService implements MemberService {
    private final MemberRepository memberRepository;

    @Override
    public void updateMyInfo(Member member, MyInfo myInfo) {
        try {
            member.setGender(myInfo.getGender());
            member.setAge(myInfo.getAge());
            member.setHeight(myInfo.getHeight());
            member.setNowWeight(myInfo.getNowWeight());
            member.setTargetWeight(myInfo.getTargetWeight());
            member.setActiveLevel(myInfo.getActiveLevel());

            memberRepository.save(member);
        }catch (Exception e){
            throw new NotUpdateMyInfoException(e);
        }
    }

    @Override
    public void updateCalorie(Member member, Integer targetCalories) {
        try {
            member.setTargetCalories(targetCalories);

            memberRepository.save(member);
        }catch (Exception e){
            throw new NotUpdateMyInfoException(e);
        }
    }

    @Override
    public SearchMyInfoRes searchMyInfo(Member member) {
        // 존재하는지, 탈퇴한 멤버인지 확인
        checkMember(member);
        // 해당 memberEmail에 해당하는 member 반환
        SearchMyInfoRes searchMyInfoRes = SearchMyInfoRes.builder()
                .gender(member.getGender())
                .age(member.getAge())
                .height(member.getHeight())
                .nowWeight(member.getNowWeight())
                .targetWeight(member.getTargetWeight())
                .targetCalories(member.getTargetCalories())
                .activeLevel(member.getActiveLevel())
                .build();

        return searchMyInfoRes;
    }

    /**
     * 존재하는지, 탈퇴한 멤버인지 확인
     * @param member
     */
    public boolean checkMember(Member member){
        // 존재하는지, 탈퇴한 멤버인지 확인
        memberRepository.findByEmail(member.getEmail()).orElseThrow();
        return true;
    }

}
