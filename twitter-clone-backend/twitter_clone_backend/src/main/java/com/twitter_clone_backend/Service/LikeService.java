package com.twitter_clone_backend.Service;

import java.util.List;

import com.twitter_clone_backend.Exception.TweetException;
import com.twitter_clone_backend.Exception.UserException;
import com.twitter_clone_backend.Model.Like;
import com.twitter_clone_backend.Model.User;

public interface LikeService {

    public Like likeTweet(Long tweetId, User user) throws UserException, TweetException;

    public List<Like> getAllLikes(Long tweetId) throws TweetException;

}