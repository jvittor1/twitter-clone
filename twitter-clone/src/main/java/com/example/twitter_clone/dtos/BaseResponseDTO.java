package com.example.twitter_clone.dtos;

public class BaseResponseDTO<T> {
    private final T data;
    private final String message;
    private final Integer status;

    public BaseResponseDTO(T data, String message, Integer status) {
        this.data = data;
        this.message = message;
        this.status = status;
    }

    public T getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public Integer getStatus() {
        return status;
    }
}
