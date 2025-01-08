package com.example.twitter_clone.controllers;

import com.example.twitter_clone.dtos.FeedDTO;
import com.example.twitter_clone.dtos.TweetDTO;
import com.example.twitter_clone.entities.Tweet;
import com.example.twitter_clone.services.TweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TweetController {
    @Autowired
    private TweetService tweetService;


    @PostMapping("/tweet")
    public ResponseEntity<Void> createTweet(@RequestBody TweetDTO tweet, JwtAuthenticationToken token) {
        try {
            tweetService.createTweet(tweet, token);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @DeleteMapping("/tweet/{id}")
    public ResponseEntity<Void> deleteTweet(@PathVariable("id") Long tweetId, JwtAuthenticationToken token) {
        try {
            tweetService.deleteTweet(tweetId, token);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/feed")
    public ResponseEntity<FeedDTO> getFeed(@RequestParam(value = "page", defaultValue = "0") int page,
                                                 @RequestParam(value = "size", defaultValue = "10") int size) {
        try {
            return ResponseEntity.ok(tweetService.getFeed(page, size));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }


    @PostMapping("/tweet/{id}/like")
    public ResponseEntity<Void> likeTweet(@PathVariable("id") Long tweetId, JwtAuthenticationToken token) {
        try {
            tweetService.likeTweet(tweetId, token);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @DeleteMapping("/tweet/{id}/like")
    public ResponseEntity<Void> unlikeTweet(@PathVariable("id") Long tweetId, JwtAuthenticationToken token) {
        try {
            tweetService.unlikeTweet(tweetId, token);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
