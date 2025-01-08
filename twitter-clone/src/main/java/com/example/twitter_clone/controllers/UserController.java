package com.example.twitter_clone.controllers;


import com.example.twitter_clone.dtos.LoginRequestDTO;
import com.example.twitter_clone.dtos.LoginResponseDTO;
import com.example.twitter_clone.dtos.TweetResponseDTO;
import com.example.twitter_clone.dtos.UserDTO;
import com.example.twitter_clone.entities.Tweet;
import com.example.twitter_clone.entities.User;
import com.example.twitter_clone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO user) throws RuntimeException {
       try{
              return ResponseEntity.ok(userService.login(user));
         } catch (RuntimeException e) {
              return ResponseEntity.badRequest().build();
       }
    }


    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody UserDTO user) {
        try {
            userService.createUser(user);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/users")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<List<User>> listUsers(){
        return ResponseEntity.ok(userService.listUsers());
    }


    @GetMapping("/users/liked-tweets")
    public ResponseEntity<List<TweetResponseDTO>> listLikedTweets(JwtAuthenticationToken token) {
        try {
            return ResponseEntity.ok(userService.listLikedTweets(token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
