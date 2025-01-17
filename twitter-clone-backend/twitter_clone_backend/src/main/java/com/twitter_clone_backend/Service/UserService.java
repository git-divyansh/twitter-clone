package com.twitter_clone_backend.Service;

import java.util.List;

import com.twitter_clone_backend.Exception.UserException;
import com.twitter_clone_backend.Model.User;

public interface UserService {

    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;

    public User updateUser(Long userId, User req) throws UserException;

    public User followUser(Long userId, User user) throws UserException;

    public List<User> searchUser(String query);


}
