package com.updown.diet.dto.req;

import com.updown.diet.entity.DietCategory;
import com.updown.diet.entity.Food;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class UploadDietImgReq implements Serializable {
    private MultipartFile dietImg;
    private LocalDate regDate;

}
