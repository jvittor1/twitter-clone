package com.example.twitter_clone.services;

import com.example.twitter_clone.dtos.FeedDTO;
import com.example.twitter_clone.dtos.FeedItemDTO;
import com.example.twitter_clone.dtos.TweetDTO;
import com.example.twitter_clone.entities.Role;
import com.example.twitter_clone.entities.Tweet;
import com.example.twitter_clone.repositories.TweetRepository;
import com.example.twitter_clone.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.UUID;

@Service
public class TweetService {

    @Autowired
    private TweetRepository tweetRepository;

    @Autowired
    private UserRepository userRepository;

    public void createTweet(TweetDTO tweetDto, JwtAuthenticationToken token) {
        var user = userRepository.findById(UUID.fromString(token.getName()));
        if(user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        var tweet = new Tweet();
        tweet.setUser(user.get());
        tweet.setContent(tweetDto.content());

        tweetRepository.save(tweet);
    }

    public void deleteTweet(Long tweetId, JwtAuthenticationToken token) throws AccessDeniedException {
        var tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new EntityNotFoundException("Tweet not found"));

        var user = userRepository.findById(UUID.fromString(token.getName()))
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        boolean isOwner = tweet.getUser().getId().equals(user.getId());
        boolean isAdmin = user.getRoles().stream()
                .anyMatch(role -> Role.RoleName.ADMIN.name().equals(role.getName()));

        if (!isOwner && !isAdmin) {
            throw new AccessDeniedException("User not authorized to delete tweet");
        }

        tweetRepository.delete(tweet);
    }


    public FeedDTO getFeed(int page, int size){
       var tweets = tweetRepository.findAll(PageRequest.of(page, size, Sort.Direction.DESC, "createdAt"))
               .map(tweet -> new FeedItemDTO(
                          tweet.getId(),
                          tweet.getContent(),
                          tweet.getUser().getUsername(),
                          tweet.getLikes()
               ));

       return new FeedDTO(tweets.getContent(), page, size, tweets.getTotalPages(), (int) tweets.getTotalElements());

    }

    @Transactional
    public void likeTweet(Long tweetId, JwtAuthenticationToken token) {
        var tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new EntityNotFoundException("Tweet not found"));

        var user = userRepository.findById(UUID.fromString(token.getName()))
                .orElseThrow(() -> new EntityNotFoundException("User not found"));


        if(!user.getLikedTweets().contains(tweet)){
            user.getLikedTweets().add(tweet);
            userRepository.save(user);
        }

        tweet.setLikes(tweet.getLikes() + 1);

        tweetRepository.save(tweet);
    }

    @Transactional
    public void unlikeTweet(Long tweetId, JwtAuthenticationToken token) {
        var tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new EntityNotFoundException("Tweet not found"));

        var user = userRepository.findById(UUID.fromString(token.getName()))
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (user.getLikedTweets().contains(tweet)) {
            user.getLikedTweets().remove(tweet);
            userRepository.save(user);
        }

        tweet.setLikes(tweet.getLikes() - 1);

        tweetRepository.save(tweet);
    }

}
