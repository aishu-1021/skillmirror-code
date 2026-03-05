package com.skillmirror.backend.controller;
import com.skillmirror.backend.dto.UserResponseDTO;
import com.skillmirror.backend.entity.LoginRequest;
import com.skillmirror.backend.entity.RegisterRequest;
import com.skillmirror.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        String result = userService.register(request);

        if (result.equals("EMAIL_EXISTS")) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // ✅ Now returns DTO instead of raw User
        UserResponseDTO user = userService.login(request);

        if (user == null) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        return ResponseEntity.ok(user);
    }
}