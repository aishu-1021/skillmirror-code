package com.skillmirror.backend.service;

import com.skillmirror.backend.config.JwtUtil;
import com.skillmirror.backend.dto.UserResponseDTO;
import com.skillmirror.backend.entity.User;
import com.skillmirror.backend.entity.LoginRequest;
import com.skillmirror.backend.entity.RegisterRequest;
import com.skillmirror.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // REGISTER
    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "EMAIL_EXISTS";
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setCollege(request.getCollege());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return "SUCCESS";
    }

    // LOGIN - returns token + user data
    public Map<String, Object> login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) return null;

        if (!passwordEncoder.matches(request.getPassword(),
                user.getPassword())) return null;

        // ✅ Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getId());

        // ✅ Return token + user data
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", convertToDTO(user));

        return response;
    }

    // GET USER BY ID
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return null;
        return convertToDTO(user);
    }

    // GET USER BY EMAIL
    public UserResponseDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return null;
        return convertToDTO(user);
    }

    // UPDATE USER
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // ✅ HELPER - convert to DTO
    public UserResponseDTO convertToDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getCollege(),
                user.isAptitudePassed(),
                user.isTechnicalPassed(),
                user.isInterviewUnlocked()
        );
    }
}