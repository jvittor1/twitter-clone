package com.example.twitter_clone.dtos;

public record TweetResponseDTO(Long id, String content, String authorUsername, Long likes) {
}
