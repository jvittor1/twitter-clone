package com.example.twitter_clone.exceptions;

import com.example.twitter_clone.dtos.BaseResponseDTO;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class ExceptionsHandler {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<BaseResponseDTO<String>> handleNoSuchElementException(NoSuchElementException e) {
        BaseResponseDTO<String> baseResponseDTO = new BaseResponseDTO<>(null, e.getMessage(), 400);
        return ResponseEntity.badRequest().body(baseResponseDTO);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<BaseResponseDTO<String>> handleDuplicateException(DataIntegrityViolationException e) {
        BaseResponseDTO<String> baseResponseDTO = new BaseResponseDTO<>(null, e.getMessage(), 400);
        return ResponseEntity.badRequest().body(baseResponseDTO);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponseDTO<String>> handleException(Exception e) {
        BaseResponseDTO<String> baseResponseDTO = new BaseResponseDTO<>(null, e.getMessage() , 400);
        return ResponseEntity.badRequest().body(baseResponseDTO);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<BaseResponseDTO<String>> handleRuntimeException(RuntimeException e) {
        BaseResponseDTO<String> baseResponseDTO = new BaseResponseDTO<>(null, e.getMessage(), 400);
        return ResponseEntity.badRequest().body(baseResponseDTO);
    }


    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<BaseResponseDTO<String>> handleAccessDeniedException(AccessDeniedException e) {
        BaseResponseDTO<String> baseResponseDTO = new BaseResponseDTO<>(null, e.getMessage(), 403);
        return ResponseEntity.badRequest().body(baseResponseDTO);
    }
}
