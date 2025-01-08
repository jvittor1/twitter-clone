package com.example.twitter_clone.services;

import com.example.twitter_clone.dtos.LoginRequestDTO;
import com.example.twitter_clone.dtos.LoginResponseDTO;
import com.example.twitter_clone.dtos.TweetResponseDTO;
import com.example.twitter_clone.dtos.UserDTO;
import com.example.twitter_clone.entities.Role;
import com.example.twitter_clone.entities.Tweet;
import com.example.twitter_clone.entities.User;
import com.example.twitter_clone.repositories.RoleRepository;
import com.example.twitter_clone.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

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
            throw new RuntimeException("Username already exists");
        }

        var newUser = new User();
        newUser.setUsername(user.username());
        newUser.setEmail(user.email());
        newUser.setPassword(passwordEncoder.encode(user.password()));
        newUser.setRoles(Set.of(role));

        userRepository.save(newUser);

    }

    public LoginResponseDTO login(LoginRequestDTO user) throws RuntimeException {

        var loginUser = userRepository.findByUsername(user.username());

        if (loginUser.isEmpty()) {
            throw new RuntimeException("Invalid credentials");
        }

        if (!passwordEncoder.matches(user.password(), loginUser.get().getPassword())) {
            throw new RuntimeException("Invalid credentials");
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

    public List<User> listUsers() {
        return userRepository.findAll();
    }


    public List<TweetResponseDTO> listLikedTweets(JwtAuthenticationToken token) throws AccessDeniedException {
        var user = userRepository.findById(UUID.fromString(token.getName()))
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        return user.getLikedTweets().stream()
                .map(tweet -> new TweetResponseDTO(tweet.getId(), tweet.getContent(), tweet.getUser().getUsername() ,tweet.getLikes()))
                .collect(Collectors.toList());
    }

}
