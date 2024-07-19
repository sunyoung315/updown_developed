package com.updown.exercise.exhandler;

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

//    @ExceptionHandler(WeightNotFoundException.class)
//    protected ResponseEntity<String> WeightNotFoundExceptionHandler(WeightNotFoundException e) {
//        StringBuilder errorMessage = new StringBuilder();
//
//        makeErrorMessage(errorMessage, e);
//
//        errorMessage.append("해당 날짜에 체중기록이 존재하지 않습니다.");
//        return ResponseEntity.badRequest().body(errorMessage.toString());
//    }

    @ExceptionHandler(ExerciseRecordNotFoundException.class)
    protected ResponseEntity<String> ExerciseRecordNotFoundExceptionHandler(ExerciseRecordNotFoundException e) {
        StringBuilder errorMessage = new StringBuilder();

        makeErrorMessage(errorMessage, e);

        return ResponseEntity.noContent().build();
    }

}
