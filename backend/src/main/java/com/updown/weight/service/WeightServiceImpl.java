package com.updown.weight.service;

import com.updown.member.entity.Member;
import com.updown.weight.dto.req.RegisterWeightReq;
import com.updown.weight.entity.Weight;
import com.updown.weight.exception.WeightExistedException;
import com.updown.weight.exception.WeightNotFoundException;
import com.updown.weight.repository.WeightRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Transactional
@RequiredArgsConstructor
@Service
public class WeightServiceImpl implements WeightService{

    private final WeightRepository weightRepository;
    @Override
    public void registerWeight(Member member, RegisterWeightReq registerWeightReq) {
        // 해당 날짜에 아직 등록이 안되어있다면
        if(weightRepository.findByMemberAndRegDate(member, registerWeightReq.getRegDate()).isEmpty()){

            Weight weight = Weight.builder()
                    .member(member)
                    .weight(registerWeightReq.getWeight())
                    .regDate(registerWeightReq.getRegDate())
                    .build();
            weightRepository.save(weight);
        }else{
            throw new WeightExistedException();
        }
    }

    @Override
    public void updateWeight(Member member, RegisterWeightReq registerWeightReq) {
        Weight weight = weightRepository.findByMemberAndRegDate(member, registerWeightReq.getRegDate()).orElseThrow(WeightNotFoundException::new);

        weight.setWeight(registerWeightReq.getWeight());

        weightRepository.save(weight);
    }
}
