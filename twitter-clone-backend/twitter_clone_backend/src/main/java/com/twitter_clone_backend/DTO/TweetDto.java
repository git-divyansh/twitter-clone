package com.twitter_clone_backend.DTO;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class TweetDto {
    private Long id;
    private String content;
    private String image;
    private String video;
    private UserDto user;
    private LocalDateTime createdAt;
    private int totalLikes;
    private int totalReplies;
    private int totalRetweets;
    private boolean isLiked;
    private boolean isRetweet;
    private List<Long> retweetingUsersId;
    private List<TweetDto> replyTweets;
}
