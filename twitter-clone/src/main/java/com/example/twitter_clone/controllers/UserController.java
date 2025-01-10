package com.example.twitter_clone.controllers;


import com.example.twitter_clone.dtos.*;
import com.example.twitter_clone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public BaseResponseDTO<LoginResponseDTO> login(@RequestBody LoginRequestDTO user) throws Exception {
        return new BaseResponseDTO<>(userService.login(user), "Login successful", 200);

    }


    @PostMapping("/register")
    public BaseResponseDTO<Void> register(@RequestBody UserDTO user) {
        userService.createUser(user);
        return new BaseResponseDTO<>(null, "User created successfully", 200);
    }


    @GetMapping("/users")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public BaseResponseDTO<List<UserDTO>> listUsers(){
        return new BaseResponseDTO<>(userService.listUsers(), null, 200);
    }


    @GetMapping("/users/liked-tweets")
    public BaseResponseDTO<List<TweetResponseDTO>> listLikedTweets(JwtAuthenticationToken token) throws AccessDeniedException {
        return new BaseResponseDTO<>(userService.listLikedTweets(token), null, 200);
    }

}
