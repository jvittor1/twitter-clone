package com.example.twitter_clone.services;

import java.nio.file.AccessDeniedException;
import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.twitter_clone.dtos.LoginRequestDTO;
import com.example.twitter_clone.dtos.LoginResponseDTO;
import com.example.twitter_clone.dtos.TweetResponseDTO;
import com.example.twitter_clone.dtos.UserDTO;
import com.example.twitter_clone.dtos.UserResponseDTO;
import com.example.twitter_clone.entities.Role;
import com.example.twitter_clone.entities.User;
import com.example.twitter_clone.repositories.RoleRepository;
import com.example.twitter_clone.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtEncoder jwtEncoder;

    @Transactional
    public void createUser(UserDTO user) {

        var role = roleRepository.findByName(Role.RoleName.USER.name());

        if(userRepository.findByUsername(user.username()).isPresent()) {
            throw new DataIntegrityViolationException("User already registered!");
        }

        var newUser = new User();
        newUser.setUsername(user.username());
        newUser.setEmail(user.email());
        newUser.setPassword(passwordEncoder.encode(user.password()));
        newUser.setRoles(Set.of(role));

        userRepository.save(newUser);

    }

    public LoginResponseDTO login(LoginRequestDTO user) throws Exception {

        var loginUser = userRepository.findByUsername(user.username());

        if (loginUser.isEmpty()) {
            throw new Exception("Invalid credentials");
        }

        if (!passwordEncoder.matches(user.password(), loginUser.get().getPassword())) {
            throw new Exception("Invalid credentials");
        }

        var instant = Instant.now();
        var expiration = 3600L;

        var scopes = loginUser.get().getRoles().stream().map(Role::getName).collect(Collectors.joining(" "));

        var claims = JwtClaimsSet.builder()
                .issuer("twitter-clone")
                .subject(loginUser.get().getId().toString())
                .issuedAt(instant)
                .claim("scope", scopes)
                .expiresAt(instant.plusSeconds(expiration))
                .build();


        var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return new LoginResponseDTO(jwtValue, expiration);

    }

    public List<UserResponseDTO> listUsers() {
        return userRepository.findAll().stream().map(
                user -> new UserResponseDTO(user.getUsername(), user.getEmail())
        ).toList();
    }


    public List<TweetResponseDTO> listLikedTweets(JwtAuthenticationToken token) throws AccessDeniedException {
        var user = userRepository.findById(UUID.fromString(token.getName()))
                .orElseThrow(NoSuchElementException::new);

        return user.getLikedTweets().stream()
                .map(tweet -> new TweetResponseDTO(tweet.getId(), tweet.getContent(), tweet.getUser().getUsername() ,tweet.getLikes()))
                .collect(Collectors.toList());
    }



    public UserResponseDTO getUserData(JwtAuthenticationToken token) {
        var user = userRepository.findById(UUID.fromString(token.getName()))
                .orElseThrow(EntityNotFoundException::new);

        return new UserResponseDTO(user.getUsername(), user.getEmail());
    }
}
