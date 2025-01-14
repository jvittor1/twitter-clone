package com.example.twitter_clone.dtos;

import java.util.List;

public record UserResponseDTO(String username, String email, List<TweetResponseDTO> likedTweets) {
}
