package com.updown.common.exhandler;

import com.updown.common.exception.ImgDeleteFailureException;
import com.updown.common.exception.ImgNotFoundException;
import com.updown.common.exception.ImgUploadFailureException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = {"com.updown.common"})
public class S3ExceptionHandler {

    private void makeErrorMessage(StringBuilder errorMessage, Exception e) {
        StackTraceElement[] stackTrace = e.getStackTrace();

        if (stackTrace.length > 0) {
            StackTraceElement topFrame = stackTrace[0];
            String className = topFrame.getClassName();
            String methodName = topFrame.getMethodName();

            errorMessage.append(className).append(".").append(methodName).append(": ");
        }
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
