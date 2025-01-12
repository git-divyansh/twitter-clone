package com.twitter_clone_backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twitter_clone_backend.Exception.TweetException;
import com.twitter_clone_backend.Exception.UserException;
import com.twitter_clone_backend.Model.Tweet;
import com.twitter_clone_backend.Model.User;
import com.twitter_clone_backend.Repository.TweetRepository;
import com.twitter_clone_backend.Request.TweetReplyRequest;

@Service
public class TweetServiceImplementation implements TweetService{

    @Autowired
    private TweetRepository tweetRepository;

    @Override
    public Tweet createTweet(Tweet req, User user) throws UserException {

        Tweet tweet = new Tweet();
        tweet.setContent(req.getContent());
        tweet.setCreatedAt(req.getCreatedAt());
        tweet.setImage(req.getImage());
        tweet.setUser(user);
        tweet.setReply(false);
        tweet.setTweet(true);
        tweet.setVideo(req.getVideo());

        return tweetRepository.save(tweet);
    }

    @Override
    public List<Tweet> findAllTweets() {
        return tweetRepository.findAllByIsTweetTrueOrderByCreatedAtDesc();
    }

    @Override
    public Tweet reTweet(Long tweetId, User user) throws UserException, TweetException {
        Tweet tweet=findById(tweetId);
        if(tweet.getReTweetUser().contains(user)){
            tweet.getReTweetUser().remove(user);
        } else{
            tweet.getReTweetUser().add(user);
        }

        return tweetRepository.save(tweet);
    }

    @Override
    public Tweet findById(Long tweetId) throws TweetException {
        Tweet tweet = tweetRepository.findById(tweetId).orElseThrow(() -> new TweetException("Tweet not found with ID: " + tweetId));

        return tweet;
    }

    @Override
    public void deleteTweetById(Long tweetId, Long userId) throws TweetException, UserException {
        
        Tweet tweet=findById(tweetId);

        if(!userId.equals(tweet.getUser().getId())){
            throw new UserException("You can't delete another user tweets");
        }

        tweetRepository.deleteById(tweet.getId());
    }

    @Override
    public Tweet removeFromRetweet(Long tweetId, User user) throws TweetException, UserException {

        return null;
    }

    @Override
    public Tweet createdReply(TweetReplyRequest req, User user) throws TweetException {

        Tweet replyFor = findById(req.getTweetId());

        Tweet tweet = new Tweet();
        tweet.setContent(req.getContent());
        tweet.setCreatedAt(req.getCreatedAt());
        tweet.setImage(req.getImage());
        tweet.setUser(user);
        tweet.setReply(true);
        tweet.setTweet(false);
        tweet.setReplyFor(replyFor);

        Tweet savedreply = tweetRepository.save(tweet);

        tweet.getReplyTweets().add(savedreply);

        tweetRepository.save(replyFor);

        return replyFor;
    }

    @Override
    public List<Tweet> getUserTweet(User user) {
        return tweetRepository.findByReTweetUserContainsOrUser_idAndIsTweetTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Tweet> findByLikesContainsUser(User user) {
        return tweetRepository.findByLikesUser_id(user.getId());
    }



}
