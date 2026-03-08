package com.skillmirror.backend.service;
import com.skillmirror.backend.entity.TechnicalAttempt;
import com.skillmirror.backend.entity.User;
import com.skillmirror.backend.repository.TechnicalAttemptRepository;
import com.skillmirror.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TechnicalService {

    private final TechnicalAttemptRepository repository;
    private final UserRepository userRepository;

    private static final int MAX_ATTEMPTS_PER_HOUR = 2;

    public TechnicalService(TechnicalAttemptRepository repository,
                            UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public Map<String, Object> evaluate(Long userId, String companyName,
                                        List<Map<String, Object>> responses) {

        // Rate limiting check — unchanged
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        long recentAttempts = repository
                .countRecentAttempts(userId, companyName, oneHourAgo);

        if (recentAttempts >= MAX_ATTEMPTS_PER_HOUR) {
            throw new ResponseStatusException(
                    HttpStatus.TOO_MANY_REQUESTS,
                    "You have reached the maximum attempts for " + companyName +
                            " technical test. Please wait 1 hour before trying again."
            );
        }

        int total = responses.size();
        int correct = 0;

        // Score by comparing selectedOption == correctOption
        for (Map<String, Object> r : responses) {
            int selected = ((Number) r.get("selectedOption")).intValue();
            int correctOpt = ((Number) r.get("correctOption")).intValue();
            if (selected == correctOpt) correct++;
        }

        double percentage = ((double) correct / total) * 100;
        boolean passed = percentage >= 75;
        String status = passed ? "PASS" : "FAIL";

        // Save attempt
        TechnicalAttempt attempt = new TechnicalAttempt();
        attempt.setUserId(userId);
        attempt.setCompanyName(companyName);
        attempt.setCorrectAnswers(correct);
        attempt.setTotalQuestions(total);
        attempt.setPercentage(percentage);
        attempt.setStatus(status);
        attempt.setAttemptedAt(LocalDateTime.now());
        attempt.setPassed(passed);
        repository.save(attempt);

        // Update user progression — unchanged
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passed) {
            user.setTechnicalPassed(true);
            user.setInterviewUnlocked(true);
        }
        userRepository.save(user);

        // Build response
        Map<String, Object> result = new HashMap<>();
        result.put("correct", correct);
        result.put("total", total);
        result.put("percentage", percentage);
        result.put("status", status);
        result.put("passed", passed);
        result.put("interviewUnlocked", user.isInterviewUnlocked());

        return result;
    }

    public List<TechnicalAttempt> getAttemptsByUser(Long userId) {
        return repository.findByUserId(userId);
    }
}