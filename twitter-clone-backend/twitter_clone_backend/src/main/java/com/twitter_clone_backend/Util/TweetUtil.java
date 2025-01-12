package com.twitter_clone_backend.Util;

import com.twitter_clone_backend.Model.Like;
import com.twitter_clone_backend.Model.Tweet;
import com.twitter_clone_backend.Model.User;

public class TweetUtil {
    public static boolean isLikedByReqUser(User reqUser, Tweet tweet){
        for(Like like: tweet.getLikes()){
            if(like.getUser().getId().equals(reqUser.getId()))
                return true;
        }

        return false;
    }

    public final static boolean isRetweetedByReqUser(User reqUser, Tweet tweet){
        for(User user: tweet.getReTweetUser()){
            if(user.getId().equals(reqUser.getId())){
                return true;
            }
        }
        return false;
    }
}
