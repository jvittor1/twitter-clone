package com.example.twitter_clone.services;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

    @Autowired
    JwtDecoder jwtDecoder;

    public boolean validateToken(JwtAuthenticationToken authenticationToken) {
        try {
            String token = authenticationToken.getToken().getTokenValue();
            Jwt jwt = jwtDecoder.decode(token);


            if (jwt.getExpiresAt() != null && jwt.getExpiresAt().isBefore(Instant.now())) {
                System.out.println("Token expirado.");
                return false;
            }

        } catch (JwtException e) {
            System.out.println("Token inválido.");
            return false;
        }

        return true;
    }
}
