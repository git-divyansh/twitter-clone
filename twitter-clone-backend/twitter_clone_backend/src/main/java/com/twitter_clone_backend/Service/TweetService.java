package com.twitter_clone_backend.Service;

import java.util.List;

import com.twitter_clone_backend.Exception.TweetException;
import com.twitter_clone_backend.Exception.UserException;
import com.twitter_clone_backend.Model.Tweet;
import com.twitter_clone_backend.Model.User;
import com.twitter_clone_backend.Request.TweetReplyRequest;

public interface TweetService {

    public Tweet createTweet(Tweet req, User user) throws UserException;
    public List<Tweet> findAllTweets();
    public Tweet reTweet(Long tweetId, User user) throws UserException, TweetException;
    public Tweet findById(Long tweetId) throws TweetException;

    public void deleteTweetById(Long tweetId, Long userId) throws TweetException,UserException;

    public Tweet removeFromRetweet(Long tweetId, User user) throws TweetException, UserException;
    public Tweet createdReply(TweetReplyRequest req, User user) throws TweetException;
    public List<Tweet> getUserTweet(User user);
    public List<Tweet> findByLikesContainsUser(User user);

}
