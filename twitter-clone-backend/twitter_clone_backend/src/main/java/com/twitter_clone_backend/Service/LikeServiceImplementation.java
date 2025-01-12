package com.twitter_clone_backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twitter_clone_backend.Exception.TweetException;
import com.twitter_clone_backend.Exception.UserException;
import com.twitter_clone_backend.Model.Like;
import com.twitter_clone_backend.Model.Tweet;
import com.twitter_clone_backend.Model.User;
import com.twitter_clone_backend.Repository.LikeRepository;
import com.twitter_clone_backend.Repository.TweetRepository;

@Service
public class LikeServiceImplementation implements LikeService{

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private TweetService tweetService;

    @Autowired
    private TweetRepository tweetRepository;

    @Override
    public Like likeTweet(Long tweetId, User user) throws UserException, TweetException {
        Like isLikeExist = likeRepository.isLikeExist(user.getId(), tweetId);

        if(isLikeExist!=null){
            likeRepository.deleteById(tweetId);
            return isLikeExist;
        }

        Tweet tweet = tweetService.findById(tweetId);

        Like like = new Like();
        like.setTweet(tweet);
        like.setUser(user);

        Like savedLike = likeRepository.save(like);
        tweetRepository.save(tweet);

        return savedLike;
    }

    @Override
    public List<Like> getAllLikes(Long tweetId) throws TweetException {
        // Tweet tweet = tweetService.findById(tweetId);

        List<Like> likes= likeRepository.findByTweetId(tweetId);

        return likes;
    }
    
}
