package com.skillmirror.backend.controller;
import com.skillmirror.backend.entity.LoginRequest;
import com.skillmirror.backend.entity.RegisterRequest;
import com.skillmirror.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        String result = userService.register(request);

        if (result.equals("EMAIL_EXISTS")) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        Map<String, Object> result = userService.login(request);

        if (result == null) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
        return ResponseEntity.ok(result);
    }
}