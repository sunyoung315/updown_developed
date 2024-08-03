package com.updown.exercise.exhandler;

import com.updown.exercise.exception.ImgDeleteFailureException;
import com.updown.exercise.exception.ImgUploadFailureException;
import com.updown.exercise.exception.ExerciseNotFoundException;
import com.updown.exercise.exception.ExerciseRecordNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = {"com.updown.exercise"})
public class ExerciseExceptionHandler {

    private void makeErrorMessage(StringBuilder errorMessage, Exception e) {
        StackTraceElement[] stackTrace = e.getStackTrace();

        if (stackTrace.length > 0) {
            StackTraceElement topFrame = stackTrace[0];
            String className = topFrame.getClassName();
            String methodName = topFrame.getMethodName();

            errorMessage.append(className).append(".").append(methodName).append(": ");
        }
    }

    @ExceptionHandler(ExerciseNotFoundException.class)
    protected ResponseEntity<String> ExerciseNotFoundExceptionHandler(ExerciseNotFoundException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

        errorMessage.append("해당 아이디에 해당하는 운동이 존재하지 않습니다.");
        return ResponseEntity.badRequest().body(errorMessage.toString());
    }

    @ExceptionHandler(ExerciseRecordNotFoundException.class)
    protected ResponseEntity<String> ExerciseRecordNotFoundExceptionHandler(ExerciseRecordNotFoundException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(ImgUploadFailureException.class)
    protected ResponseEntity<String> ImgUploadFailureExceptionHandler(ImgUploadFailureException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

        errorMessage.append("사진 업로드에 실패했습니다.");
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
