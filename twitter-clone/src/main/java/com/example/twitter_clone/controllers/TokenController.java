package com.example.twitter_clone.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.twitter_clone.dtos.BaseResponseDTO;
import com.example.twitter_clone.services.TokenService;

@RestController
public class TokenController {

    @Autowired
    private TokenService tokenService;

    @PostMapping("/validate-token")
    public BaseResponseDTO<Void> validateToken(JwtAuthenticationToken token) {
        if (!tokenService.validateToken(token)) {
            return new BaseResponseDTO<>(null, "Invalid token", 401);
        }
        return new BaseResponseDTO<>(null, "Token validated successfully", 200);
    }
    
}
