package com.updown.diet.controller;

import com.updown.diet.dto.req.InsertFoodReq;
import com.updown.diet.dto.req.UpdateFoodReq;
import com.updown.diet.dto.res.DietSearchRes;
import com.updown.diet.entity.Food;
import com.updown.diet.service.DietService;
import com.updown.member.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> insertDiet(@PathVariable("category") String category, @AuthenticationPrincipal Member member, @RequestBody InsertFoodReq insertFoodReq){
        dietService.insertDiet(category, member, insertFoodReq);
        return ResponseEntity.ok().build();
    }

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
