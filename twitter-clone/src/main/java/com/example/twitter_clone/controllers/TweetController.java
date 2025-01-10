package com.example.twitter_clone.controllers;

import com.example.twitter_clone.dtos.BaseResponseDTO;
import com.example.twitter_clone.dtos.FeedDTO;
import com.example.twitter_clone.dtos.TweetDTO;
import com.example.twitter_clone.services.TweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@RestController
public class TweetController {
    @Autowired
    private TweetService tweetService;


    @PostMapping("/tweet")
    public BaseResponseDTO<Void> createTweet(@RequestBody TweetDTO tweet, JwtAuthenticationToken token) {
        tweetService.createTweet(tweet, token);
        return new BaseResponseDTO<>(null, "Tweet created successfully", 200);
    }


    @DeleteMapping("/tweet/{id}")
    public BaseResponseDTO<Void> deleteTweet(@PathVariable("id") Long tweetId, JwtAuthenticationToken token) throws AccessDeniedException {
        tweetService.deleteTweet(tweetId, token);
        return new BaseResponseDTO<>(null, "Tweet deleted successfully", 200);

    }


    @GetMapping("/feed")
    public BaseResponseDTO<FeedDTO> getFeed(@RequestParam(value = "page", defaultValue = "0") int page,
                                            @RequestParam(value = "size", defaultValue = "10") int size) {
        return new BaseResponseDTO<>(tweetService.getFeed(page, size), null, 200);
    }


    @PostMapping("/tweet/{id}/like")
    public BaseResponseDTO<Void> likeTweet(@PathVariable("id") Long tweetId, JwtAuthenticationToken token) {
        tweetService.likeTweet(tweetId, token);
        return new BaseResponseDTO<>(null, "Tweet liked successfully", 200);
    }


    @DeleteMapping("/tweet/{id}/like")
    public BaseResponseDTO<Void> unlikeTweet(@PathVariable("id") Long tweetId, JwtAuthenticationToken token) {
        tweetService.unlikeTweet(tweetId, token);
        return new BaseResponseDTO<>(null, "Tweet unliked successfully", 200);

    }

}
