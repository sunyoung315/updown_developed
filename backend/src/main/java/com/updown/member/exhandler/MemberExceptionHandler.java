package com.updown.member.exhandler;

import com.updown.member.exception.NotFoundMemberException;
import com.updown.member.exception.NotUpdateMyInfoException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = {"com.updown.member"})
public class MemberExceptionHandler {

    private void makeErrorMessage(StringBuilder errorMessage, Exception e) {
        StackTraceElement[] stackTrace = e.getStackTrace();

        if (stackTrace.length > 0) {
            StackTraceElement topFrame = stackTrace[0];
            String className = topFrame.getClassName();
            String methodName = topFrame.getMethodName();

            errorMessage.append(className).append(".").append(methodName).append(": ");
        }
    }

    @ExceptionHandler(NotUpdateMyInfoException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected ResponseEntity<String> NotUpdateMyInfoExceptionHandler(NotUpdateMyInfoException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

        errorMessage.append("정보가 수정되지 않았습니다. 입력값을 확인하세요.");
        return ResponseEntity.badRequest().body(errorMessage.toString());
    }

    @ExceptionHandler(NotFoundMemberException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected ResponseEntity<String> NotFoundMemberExceptionHandler(NotFoundMemberException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

        errorMessage.append("해당 사용자가 존재하지 않습니다.");
        return ResponseEntity.badRequest().body(errorMessage.toString());
    }

}
