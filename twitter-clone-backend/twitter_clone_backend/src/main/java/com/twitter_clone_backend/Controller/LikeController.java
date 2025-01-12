package com.twitter_clone_backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.twitter_clone_backend.DTO.LikeDto;
import com.twitter_clone_backend.Exception.TweetException;
import com.twitter_clone_backend.Exception.UserException;
import com.twitter_clone_backend.Mapper.LikeDtoMapper;
import com.twitter_clone_backend.Model.Like;
import com.twitter_clone_backend.Model.User;
import com.twitter_clone_backend.Service.LikeService;
import com.twitter_clone_backend.Service.UserService;

@RestController
@RequestMapping("/api")
public class LikeController {

    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @PostMapping("/{tweetId}/likes")
    public ResponseEntity<LikeDto> likeTweet(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{

        User user = userService.findUserProfileByJwt(jwt);
        Like like = likeService.likeTweet(tweetId, user);

        LikeDto likeDto = LikeDtoMapper.toLikeDto(like, user);

        return new ResponseEntity<>(likeDto, HttpStatus.CREATED);
    }

    @PostMapping("/tweet/{tweetId}")
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long tweetId, @RequestHeader("Authorization") String jwt) throws UserException, TweetException{

        User user = userService.findUserProfileByJwt(jwt);
        List<Like> like = likeService.getAllLikes(tweetId);

        List<LikeDto> likeDto = LikeDtoMapper.toLikeDtos(like, user);

        return new ResponseEntity<>(likeDto, HttpStatus.CREATED);
    }
}
