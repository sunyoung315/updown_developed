package com.updown.diet.exhandler;

import com.updown.diet.exception.*;
import com.updown.member.exception.NotFoundMemberException;
import com.updown.member.exception.NotUpdateMyInfoException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = {"com.updown.diet"})
public class DietExceptionHandler {

    private void makeErrorMessage(StringBuilder errorMessage, Exception e) {
        StackTraceElement[] stackTrace = e.getStackTrace();

        if (stackTrace.length > 0) {
            StackTraceElement topFrame = stackTrace[0];
            String className = topFrame.getClassName();
            String methodName = topFrame.getMethodName();

            errorMessage.append(className).append(".").append(methodName).append(": ");
        }
    }

    @ExceptionHandler(NotInsertFoodException.class)
    protected ResponseEntity<String> NotInsertFoodExceptionHandler(NotInsertFoodException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

        errorMessage.append("음식이 등록되지 않았습니다.");
        return ResponseEntity.badRequest().body(errorMessage.toString());
    }
    @ExceptionHandler(DietNotFoundException.class)
    protected ResponseEntity<String> DietNotFoundExceptionHandler(DietNotFoundException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

//        errorMessage.append("해당 식단이 존재하지 않습니다.");
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage.toString());
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(FoodNotFoundException.class)
    protected ResponseEntity<String> FoodNotFoundExceptionHandler(FoodNotFoundException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

//        errorMessage.append("해당 음식이 존재하지 않습니다.");
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage.toString());
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(ImgUploadFailureException.class)
    protected ResponseEntity<String> ImgUploadFailureExceptionHandler(ImgUploadFailureException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

        errorMessage.append("사진 업로드에 실패했습니다.");
        return ResponseEntity.badRequest().body(errorMessage.toString());
    }    
    
    @ExceptionHandler(ImgNotFoundException.class)
    protected ResponseEntity<String> ImgNotFoundExceptionHandler(ImgNotFoundException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

        errorMessage.append("삭제할 사진이 없습니다.");
        return ResponseEntity.badRequest().body(errorMessage.toString());
    }

    @ExceptionHandler(ImgDeleteFailureException.class)
    protected ResponseEntity<String> ImgDeleteFailureExceptionHandler(ImgDeleteFailureException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

        errorMessage.append("사진 삭제를 실패했습니다.");
        return ResponseEntity.badRequest().body(errorMessage.toString());
    }
}
