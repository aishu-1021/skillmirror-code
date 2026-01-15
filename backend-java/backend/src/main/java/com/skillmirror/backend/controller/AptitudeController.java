package com.skillmirror.backend.controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.skillmirror.backend.entity.AptitudeAttempt;
import com.skillmirror.backend.repository.AptitudeAttemptRepository;
import java.time.LocalDateTime;
@RestController
@CrossOrigin
@RequestMapping("/api/aptitude")
public class AptitudeController
{
    private final AptitudeAttemptRepository aptitudeAttemptRepository;
    public AptitudeController(AptitudeAttemptRepository aptitudeAttemptRepository)
    {
        this.aptitudeAttemptRepository = aptitudeAttemptRepository;
    }

    @PostMapping("/evaluate")
    public Map<String, Object> evaluate(@RequestBody Map<String, Object> data)
    {
        Long userId = Long.valueOf(data.get("userId").toString());
        String companyName = data.get("companyName").toString();

        List<Integer> answers = (List<Integer>) data.get("answers");
        int total = answers.size();
        int correct = 0;

        for (int a : answers)
        {
            if (a == 1)
            {
                correct++;
            }
        }

        double percentage = ((double) correct / total) * 100;
        boolean passed = percentage >= 80;

        // 🔹 SAVE TO DATABASE
        AptitudeAttempt attempt = new AptitudeAttempt();
        attempt.setUserId(userId);
        attempt.setCompanyName(companyName);
        attempt.setTotalQuestions(total);
        attempt.setCorrectAnswers(correct);
        attempt.setPercentage(percentage);
        attempt.setPassed(passed);
        attempt.setAnswers(answers);

        attempt.setAttemptedAt(LocalDateTime.now());
        System.out.println("Saving aptitude attempt for user: " + userId);
        aptitudeAttemptRepository.save(attempt);

        // 🔹 RESPONSE
        Map<String, Object> result = new HashMap<>();
        result.put("score", correct + "/" + total);
        result.put("percentage", percentage);
        result.put("status", passed ? "PASS" : "FAIL");

        return result;
    }

}
