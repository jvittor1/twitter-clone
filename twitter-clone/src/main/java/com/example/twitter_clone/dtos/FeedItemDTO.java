package com.example.twitter_clone.dtos;

public record FeedItemDTO(Long tweetId, String content, String username, String email, Long likes, String createdAt) {
}
