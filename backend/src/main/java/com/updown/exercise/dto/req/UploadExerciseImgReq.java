package com.updown.exercise.dto.req;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class UploadExerciseImgReq implements Serializable {
    private MultipartFile exerciseImg;
    private LocalDate regDate;

}
