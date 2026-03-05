package com.skillmirror.backend.service;

import com.skillmirror.backend.dto.UserResponseDTO;
import com.skillmirror.backend.entity.User;
import com.skillmirror.backend.entity.LoginRequest;
import com.skillmirror.backend.entity.RegisterRequest;
import com.skillmirror.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    // LOGIN - now returns DTO instead of raw User
    public UserResponseDTO login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) return null;

        if (!passwordEncoder.matches(request.getPassword(),
                user.getPassword())) return null;

        // ✅ Convert to DTO before returning (no password included)
        return convertToDTO(user);
    }

    // GET USER BY ID - returns DTO
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return null;
        return convertToDTO(user);
    }

    // GET USER BY EMAIL - returns DTO
    public UserResponseDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return null;
        return convertToDTO(user);
    }

    // UPDATE USER - still works with raw User internally
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // ✅ HELPER METHOD - converts User entity to UserResponseDTO
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
