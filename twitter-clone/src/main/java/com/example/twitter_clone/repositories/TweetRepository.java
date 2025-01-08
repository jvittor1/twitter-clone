package com.example.twitter_clone.repositories;

import com.example.twitter_clone.entities.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TweetRepository  extends JpaRepository<Tweet, Long> {

}
