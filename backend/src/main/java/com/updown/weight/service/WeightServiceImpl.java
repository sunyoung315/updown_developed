package com.updown.weight.service;

import com.updown.member.entity.Member;
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
        }else{ // 이미 등록 되어있다면 예외처리
            throw new WeightExistedException();
        }
    }

    @Override
    public void updateWeight(Member member, RegisterWeightReq registerWeightReq) {
        Weight weight = weightRepository.findByMemberAndRegDate(member, registerWeightReq.getRegDate()).orElseThrow(WeightNotFoundException::new);

        weight.setWeight(registerWeightReq.getWeight());

        weightRepository.save(weight);
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
