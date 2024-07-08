package com.updown.diet.controller;

import com.updown.diet.dto.req.InsertFoodReq;
import com.updown.diet.dto.req.UpdateFoodReq;
import com.updown.diet.dto.res.DayDietRes;
import com.updown.diet.dto.res.DietSearchRes;
import com.updown.diet.entity.DietCategory;
import com.updown.diet.entity.Food;
import com.updown.diet.service.DietService;
import com.updown.member.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diet")
public class DietController {
    private final DietService dietService;

    /**
     * 음식 등록
     * @param category // 아침, 점심, 간식, 저녁
     * @param member
     * @param insertFoodReq
     * @return
     */
    @Transactional
    @PostMapping("/{category}")
    public ResponseEntity<?> insertDiet(@PathVariable("category") DietCategory category, @AuthenticationPrincipal Member member, @RequestBody InsertFoodReq insertFoodReq){
        dietService.insertDiet(category, member, insertFoodReq);
        return ResponseEntity.ok().build();
    }

    /**
     * 일별 식단 정보 조회
     * @param member
     * @param regDate 등록 날짜
     * @return 식단 리스트
     */
    @Transactional
    @GetMapping
    public ResponseEntity<?> searchDayDiet(@AuthenticationPrincipal Member member, @RequestBody Date regDate){
        List<DayDietRes> dietList = dietService.searchDayDiet(member, regDate);
        return ResponseEntity.ok().body(dietList);
    }

    /**
     * 음식 수정
     * @param foodId
     * @param member
     * @param food
     * @return
     */
    @Transactional
    @PutMapping("/{foodId}")
    public ResponseEntity<?> updateDiet(@PathVariable("foodId") Integer foodId, @AuthenticationPrincipal Member member, @RequestBody Food food){
        dietService.updateDiet(member, foodId, food);
        return ResponseEntity.ok().build();
    }

    /**
     * 음식 검색
     * @param category
     * @param member
     * @param searchStr
     * @return
     */
    @GetMapping("/search/{category}")
    public ResponseEntity<?> searchFood(@PathVariable("category") String category, @AuthenticationPrincipal Member member, @RequestBody String searchStr){
        DietSearchRes dietSearchRes = dietService.searchFood(category, member, searchStr);
        return ResponseEntity.ok().body(dietSearchRes);
    }

}
