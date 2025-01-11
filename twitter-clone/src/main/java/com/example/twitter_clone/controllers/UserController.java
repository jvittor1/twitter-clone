package com.example.twitter_clone.controllers;


import java.nio.file.AccessDeniedException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.twitter_clone.dtos.BaseResponseDTO;
import com.example.twitter_clone.dtos.LoginRequestDTO;
import com.example.twitter_clone.dtos.LoginResponseDTO;
import com.example.twitter_clone.dtos.TweetResponseDTO;
import com.example.twitter_clone.dtos.UserDTO;
import com.example.twitter_clone.dtos.UserResponseDTO;
import com.example.twitter_clone.services.UserService;



@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public BaseResponseDTO<LoginResponseDTO> login(@RequestBody LoginRequestDTO user) throws Exception {
        return new BaseResponseDTO<>(userService.login(user), "Login successful", 200);

    }


   @GetMapping("/user")
   public BaseResponseDTO<UserResponseDTO> getUserByToken(JwtAuthenticationToken token) {
     return new BaseResponseDTO<>(userService.getUserData(token), null, 200);
     
   }
   


    @PostMapping("/register")
    public BaseResponseDTO<Void> register(@RequestBody UserDTO user) {
        userService.createUser(user);
        return new BaseResponseDTO<>(null, "User created successfully", 200);
    }


    @GetMapping("/users")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public BaseResponseDTO<List<UserResponseDTO>> listUsers(){
        return new BaseResponseDTO<>(userService.listUsers(), null, 200);
    }


    @GetMapping("/users/liked-tweets")
    public BaseResponseDTO<List<TweetResponseDTO>> listLikedTweets(JwtAuthenticationToken token) throws AccessDeniedException {
        return new BaseResponseDTO<>(userService.listLikedTweets(token), null, 200);
    }

}
