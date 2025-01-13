package com.example.twitter_clone.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;


import java.util.Set;
import java.util.UUID;


@Entity
@Table(name = "tb_users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID id;
    @Column(unique = true)
    private String username;
    @Email
    private String email;

    private String password;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "tb_user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    @OneToMany(mappedBy = "user")
    private Set<Tweet> tweets;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "tb_user_liked_tweets",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "tweet_id")
    )
    private Set<Tweet> likedTweets;



    public UUID getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(@Email String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void setTweets(Set<Tweet> tweets) {
        this.tweets = tweets;
    }

    public void setLikedTweets(Set<Tweet> likedTweets) {
        this.likedTweets = likedTweets;
    }

    public @Email String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Set<Tweet> getTweets() {
        return tweets;
    }

    public Set<Tweet> getLikedTweets() {
        return likedTweets;
    }



}
