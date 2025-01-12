package com.twitter_clone_backend.DTO;

import lombok.Data;

@Data
public class LikeDto {
    private Long Id;
    private UserDto user;
    private TweetDto tweet;
}
