package com.example.twitter_clone.config;

import com.example.twitter_clone.entities.Role;
import com.example.twitter_clone.entities.User;
import com.example.twitter_clone.repositories.RoleRepository;
import com.example.twitter_clone.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Configuration
public class AdminConfig implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        var role = roleRepository.findByName(Role.RoleName.ADMIN.name());

        var userAdmin = userRepository.findByUsername("admin");

        userAdmin.ifPresentOrElse(
                (user)-> System.out.println("Admin user already exists"), ()-> {
            var newUser = new User();
            newUser.setUsername("admin");
            newUser.setEmail("admin@gmail.com");
            newUser.setPassword(passwordEncoder.encode("123456"));
            newUser.setRoles(Set.of(role));
            userRepository.save(newUser);

        });



    }
}
