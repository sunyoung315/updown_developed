package com.updown.weight.service;

import com.updown.member.entity.Member;
import com.updown.member.repository.MemberRepository;
import com.updown.weight.dto.req.RegisterWeightReq;
import com.updown.weight.dto.res.SearchWeightRes;
import com.updown.weight.entity.Weight;
import com.updown.weight.exception.WeightExistedException;
import com.updown.weight.exception.WeightNotFoundException;
import com.updown.weight.repository.WeightRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class WeightServiceImpl implements WeightService{

    private final WeightRepository weightRepository;
    private final MemberRepository memberRepository;
    @Override
    public void registerWeight(Member member, RegisterWeightReq registerWeightReq) {
        // 해당 날짜에 아직 등록이 안되어있다면 등록
        if(weightRepository.findByMemberAndRegDate(member, registerWeightReq.getRegDate()).isEmpty()){

            Weight weight = Weight.builder()
                    .member(member)
                    .weight(registerWeightReq.getWeight())
                    .regDate(registerWeightReq.getRegDate())
                    .build();
            weightRepository.save(weight);

            // 만약 등록 날짜가 회원가입 날짜라면 member의 now_weight 수정
            if(registerWeightReq.getRegDate() == member.getRegDate()){
                member.setNowWeight(registerWeightReq.getWeight());
                memberRepository.save(member);
            }

        }else{ // 이미 등록 되어있다면 예외처리
            throw new WeightExistedException();
        }
    }

    @Override
    public void updateWeight(Member member, RegisterWeightReq registerWeightReq) {
        // 해당 날짜에 맞는 체중 가져오기
        Weight weight = weightRepository.findByMemberAndRegDate(member, registerWeightReq.getRegDate()).orElseThrow(WeightNotFoundException::new);
        // 해당 체중 수정
        weight.setWeight(registerWeightReq.getWeight());
        // 체중 저장
        weightRepository.save(weight);

        // 만약 등록 날짜가 회원가입 날짜라면 member의 now_weight 수정
        if(registerWeightReq.getRegDate().equals(member.getRegDate())){
            member.setNowWeight(registerWeightReq.getWeight());
            memberRepository.save(member);
        }

    }

    @Override
    public SearchWeightRes searchWeightList(Member member, LocalDate regDate) {
        List<Weight> weightList = weightRepository.findRecentWeightsByMemberIdAndRegDate(member.getMemberId(), regDate);

        weightList.sort(Comparator.comparing(Weight::getRegDate));

        return SearchWeightRes.builder()
                .height(member.getHeight())
                .weightList(weightList)
                .build();
    }
}
