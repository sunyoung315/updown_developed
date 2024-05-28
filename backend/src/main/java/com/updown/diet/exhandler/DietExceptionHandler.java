package com.updown.diet.exhandler;

import com.updown.diet.exception.NotInsertFoodException;
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
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected ResponseEntity<String> NotInsertFoodExceptionHandler(NotInsertFoodException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

        errorMessage.append("음식이 등록되지 않았습니다.");
        return ResponseEntity.badRequest().body(errorMessage.toString());
    }

}
