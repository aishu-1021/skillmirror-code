package com.skillmirror.backend.service;

import com.skillmirror.backend.entity.AptitudeAttempt;
import com.skillmirror.backend.repository.AptitudeAttemptRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AptitudeService {

    private final AptitudeAttemptRepository aptitudeAttemptRepository;

    //Max 2 attempts per company per hour
    private static final int MAX_ATTEMPTS_PER_HOUR = 2;

    public AptitudeService(AptitudeAttemptRepository aptitudeAttemptRepository) {
        this.aptitudeAttemptRepository = aptitudeAttemptRepository;
    }

    public Map<String, Object> evaluate(Long userId, String companyName,
                                        List<Integer> answers) {

        //RATE LIMITING CHECK
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        long recentAttempts = aptitudeAttemptRepository
                .countRecentAttempts(userId, companyName, oneHourAgo);

        if (recentAttempts >= MAX_ATTEMPTS_PER_HOUR) {
            throw new ResponseStatusException(
                    HttpStatus.TOO_MANY_REQUESTS,
                    "You have reached the maximum attempts for " + companyName +
                            " aptitude test. Please wait 1 hour before trying again."
            );
        }

        int total = answers.size();
        int correct = 0;

        for (int a : answers) {
            if (a == 1) correct++;
        }

        double percentage = ((double) correct / total) * 100;
        boolean passed = percentage >= 80;

        // Save to database
        AptitudeAttempt attempt = new AptitudeAttempt();
        attempt.setUserId(userId);
        attempt.setCompanyName(companyName);
        attempt.setTotalQuestions(total);
        attempt.setCorrectAnswers(correct);
        attempt.setPercentage(percentage);
        attempt.setPassed(passed);
        attempt.setAnswers(answers);
        attempt.setAttemptedAt(LocalDateTime.now());

        aptitudeAttemptRepository.save(attempt);

        // Build response
        Map<String, Object> result = new HashMap<>();
        result.put("score", correct + "/" + total);
        result.put("percentage", percentage);
        result.put("status", passed ? "PASS" : "FAIL");
        result.put("passed", passed);

        return result;
    }

    public List<AptitudeAttempt> getAttemptsByUser(Long userId) {
        return aptitudeAttemptRepository.findByUserId(userId);
    }

    public boolean hasUserPassedForCompany(Long userId, String companyName) {
        return aptitudeAttemptRepository.findByUserId(userId)
                .stream()
                .anyMatch(a -> a.getCompanyName().equals(companyName)
                        && a.isPassed());
    }
}