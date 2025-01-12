package com.twitter_clone_backend.Model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Verification {
    private boolean status = false;
    private LocalDateTime startedAt;
    private LocalDateTime endsAt;
    private String planType;

}

