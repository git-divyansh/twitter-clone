package com.twitter_clone_backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.twitter_clone_backend.DTO.TweetDto;
import com.twitter_clone_backend.Exception.TweetException;
import com.twitter_clone_backend.Exception.UserException;
import com.twitter_clone_backend.Mapper.TweetDtoMapper;
import com.twitter_clone_backend.Model.Tweet;
import com.twitter_clone_backend.Model.User;
import com.twitter_clone_backend.Request.TweetReplyRequest;
import com.twitter_clone_backend.Response.ApiResponse;
import com.twitter_clone_backend.Service.TweetService;
import com.twitter_clone_backend.Service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("api/tweets")
public class TweetController {
    @Autowired
    private TweetService tweetService;

    @Autowired
    private UserService UserService;

    @PostMapping("/create")    
    public ResponseEntity<TweetDto> createTweet(@RequestBody Tweet req, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{

        User user = UserService.findUserProfileByJwt(jwt);
        
        Tweet tweet = tweetService.createTweet(req, user);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);

        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
    }

    @PostMapping("/reply")    
    public ResponseEntity<TweetDto> replyTweet(@RequestBody TweetReplyRequest req, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{

        User user = UserService.findUserProfileByJwt(jwt);
        
        Tweet tweet = tweetService.createdReply(req, user);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);

        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
    }

    @PutMapping("/{tweetId}/retweet")    
    public ResponseEntity<TweetDto> reTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{

        User user = UserService.findUserProfileByJwt(jwt);
        
        Tweet tweet = tweetService.reTweet(tweetId, user);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);

        return new ResponseEntity<>(tweetDto, HttpStatus.OK);
    }

    @GetMapping("/{tweetId}")    
    public ResponseEntity<TweetDto> findTweetById(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{

        User user = UserService.findUserProfileByJwt(jwt);
        
        Tweet tweet = tweetService.findById(tweetId);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);

        return new ResponseEntity<>(tweetDto, HttpStatus.OK);
    }

    @DeleteMapping("/{tweetId}")    
    public ResponseEntity<ApiResponse> deleteTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{

        User user = UserService.findUserProfileByJwt(jwt);
        
        tweetService.deleteTweetById(tweetId, user.getId());

        ApiResponse res = new ApiResponse();
        res.setMessage("Tweet deleted successfully");
        res.setStatus(true);
        
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/")    
    public ResponseEntity<List<TweetDto>> getAllTweets(@RequestHeader("Authorization") String jwt) throws UserException, TweetException{

        User user = UserService.findUserProfileByJwt(jwt);
        
        List<Tweet> tweets = tweetService.findAllTweets();

        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

    @GetMapping("/use/{userId}")    
    public ResponseEntity<List<TweetDto>> getUsersAllTweets(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{

        User user = UserService.findUserProfileByJwt(jwt);
        
        List<Tweet> tweets = tweetService.getUserTweet(user);

        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

    @GetMapping("/use/{userId}/likes")    
    public ResponseEntity<List<TweetDto>> findTweetByLikesContainsUser(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{

        User user = UserService.findUserProfileByJwt(jwt);
        
        List<Tweet> tweets = tweetService.findByLikesContainsUser(user);

        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }
    
}
