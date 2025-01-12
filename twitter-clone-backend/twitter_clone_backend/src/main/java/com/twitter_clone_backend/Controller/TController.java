package com.twitter_clone_backend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/t")
public class TController {
    @GetMapping("/v1")
    public ResponseEntity<String> getMethodName() {
        return ResponseEntity.ok("Hello from v1");
    }
    
}
