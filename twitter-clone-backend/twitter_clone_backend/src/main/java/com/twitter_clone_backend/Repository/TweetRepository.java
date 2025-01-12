package com.twitter_clone_backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.twitter_clone_backend.Model.Tweet;
import com.twitter_clone_backend.Model.User;

public interface TweetRepository extends JpaRepository<Tweet, Long> {

    List<Tweet> findAllByIsTweetTrueOrderByCreatedAtDesc();

    List<Tweet> findByReTweetUserContainsOrUser_idAndIsTweetTrueOrderByCreatedAtDesc(User user, Long userId);

    List<Tweet> findByLikesContainingOrderByCreatedAtDesc(User user);

    @Query("SELECT t FROM Tweet t JOIN t.likes l WHERE l.user.id=:userId")
    List<Tweet> findByLikesUser_id(Long userId);
}
