package com.twitter_clone_backend.Mapper;

import java.util.ArrayList;
import java.util.List;

import com.twitter_clone_backend.DTO.LikeDto;
import com.twitter_clone_backend.DTO.TweetDto;
import com.twitter_clone_backend.DTO.UserDto;
import com.twitter_clone_backend.Model.Like;
import com.twitter_clone_backend.Model.User;

public class LikeDtoMapper {
    public static LikeDto toLikeDto(Like like, User reqUser){
        
        UserDto user = UserDtoMapper.toUserDto(like.getUser());
        // UserDto reqUserDto = UserDtoMapper.toUserDto(reqUser);
        TweetDto tweet= TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);

        LikeDto likeDto = new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setTweet(tweet);
        likeDto.setUser(user);


        return likeDto;
    }

    public static List<LikeDto> toLikeDtos(List<Like> likes, User reqUser){
        List<LikeDto> likeDtos = new ArrayList<>();

        for(Like like: likes){
            UserDto user = UserDtoMapper.toUserDto(like.getUser());
            TweetDto tweet= TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);

            LikeDto likeDto = new LikeDto();
            likeDto.setId(like.getId());
            likeDto.setTweet(tweet);
            likeDto.setUser(user);

            likeDtos.add(likeDto);
        }

        return likeDtos;
    }
}
