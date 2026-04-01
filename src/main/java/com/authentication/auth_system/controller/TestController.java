package com.authentication.auth_system.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/public")
    public String publicApi() {
        return "public";
    }
    @GetMapping("/user")
    public ResponseEntity<?> getUserContent() {
        return ResponseEntity.ok(Map.of("message", "User content here"));
    }
    @GetMapping("/admin")
    public ResponseEntity<?> getAdminContent() {
        return ResponseEntity.ok(Map.of("message", "Admin content here"));
    }
}
