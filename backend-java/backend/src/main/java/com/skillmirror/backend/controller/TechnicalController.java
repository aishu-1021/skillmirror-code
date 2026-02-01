package com.skillmirror.backend.controller;

import com.skillmirror.backend.entity.TechnicalAttempt;
import com.skillmirror.backend.entity.User;
import com.skillmirror.backend.repository.TechnicalAttemptRepository;
import com.skillmirror.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api/technical")
public class TechnicalController {

    private final TechnicalAttemptRepository repository;
    private final UserRepository userRepository;

    public TechnicalController(
            TechnicalAttemptRepository repository,
            UserRepository userRepository
    ) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @PostMapping("/evaluate")
    public Map<String, Object> evaluateTechnical(@RequestBody Map<String, Object> data) {

        Long userId = Long.valueOf(data.get("userId").toString());
        String companyName = data.get("companyName").toString();
        List<Integer> answers = (List<Integer>) data.get("answers");

        int total = answers.size();
        int correct = 0;

        for (int a : answers) {
            if (a == 1) correct++;
        }

        double percentage = ((double) correct / total) * 100;
        boolean passed = percentage >= 60;
        String status = passed ? "PASS" : "FAIL";

        // 🔹 SAVE ATTEMPT
        TechnicalAttempt attempt = new TechnicalAttempt();
        attempt.setUserId(userId);
        attempt.setCompanyName(companyName);
        attempt.setCorrectAnswers(correct);
        attempt.setTotalQuestions(total);
        attempt.setPercentage(percentage);
        attempt.setStatus(status);
        attempt.setAttemptedAt(LocalDateTime.now());

        repository.save(attempt);

        // 🔹 UPDATE USER PROGRESSION
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passed) {
            user.setTechnicalPassed(true);
            user.setInterviewUnlocked(true);
        } else {
            user.setTechnicalPassed(false);
            user.setInterviewUnlocked(false);
        }

        userRepository.save(user);

        // 🔹 RESPONSE
        Map<String, Object> result = new HashMap<>();
        result.put("correct", correct);
        result.put("total", total);
        result.put("percentage", percentage);
        result.put("status", status);
        result.put("passed", passed);
        result.put("interviewUnlocked", user.isInterviewUnlocked());

        return result;
    }
}
