package com.twitter_clone_backend.Util;

import com.twitter_clone_backend.Model.User;

public class UserUtil {

    public static final boolean isReqUser(User reqUser, User user){
        return reqUser.getId().equals(user.getId());
    }

    public static final boolean isFollowedByReqUser(User reqUser, User user){
        return reqUser.getFollowing().contains(user);
    }

}
