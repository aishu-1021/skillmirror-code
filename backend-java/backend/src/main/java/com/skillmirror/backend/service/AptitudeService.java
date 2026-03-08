package com.skillmirror.backend.service;
import com.skillmirror.backend.dto.AptitudeSubmitRequest;
import com.skillmirror.backend.entity.AptitudeAttempt;
import com.skillmirror.backend.entity.QuestionResponse;
import com.skillmirror.backend.repository.AptitudeAttemptRepository;
import com.skillmirror.backend.repository.QuestionResponseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AptitudeService {

    private final AptitudeAttemptRepository aptitudeAttemptRepository;
    private final QuestionResponseRepository questionResponseRepository;

    public AptitudeService(AptitudeAttemptRepository aptitudeAttemptRepository,
                           QuestionResponseRepository questionResponseRepository) {
        this.aptitudeAttemptRepository = aptitudeAttemptRepository;
        this.questionResponseRepository = questionResponseRepository;
    }

    // Max 2 attempts per company per hour — kept exactly as before
    private static final int MAX_ATTEMPTS_PER_HOUR = 2;

    public Map<String, Object> evaluate(AptitudeSubmitRequest request) {

        Long userId = request.getUserId();
        String companyName = request.getCompanyName();
        List<AptitudeSubmitRequest.QuestionAnswerDTO> responses = request.getResponses();

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

        int total = responses.size();
        int correct = 0;

        for (AptitudeSubmitRequest.QuestionAnswerDTO r : responses) {
            if (r.getSelectedOption() == r.getCorrectOption()) {
                correct++;
            }
        }

        double percentage = ((double) correct / total) * 100;
        boolean passed = percentage >= 75;

        AptitudeAttempt attempt = new AptitudeAttempt();
        attempt.setUserId(userId);
        attempt.setCompanyName(companyName);
        attempt.setTotalQuestions(total);
        attempt.setCorrectAnswers(correct);
        attempt.setPercentage(percentage);
        attempt.setPassed(passed);
        attempt.setAttemptedAt(LocalDateTime.now());


        AptitudeAttempt savedAttempt = aptitudeAttemptRepository.save(attempt);
        List<QuestionResponse> wrongResponses = new ArrayList<>();

        for (AptitudeSubmitRequest.QuestionAnswerDTO dto : responses) {
            boolean isCorrect = dto.getSelectedOption() == dto.getCorrectOption();

            QuestionResponse qr = new QuestionResponse();
            qr.setAptitudeAttempt(savedAttempt);
            qr.setQuestionIndex(dto.getQuestionIndex());
            qr.setSelectedOption(dto.getSelectedOption());
            qr.setCorrectOption(dto.getCorrectOption());
            qr.setCorrect(isCorrect);
            qr.setQuestionText(dto.getQuestionText());
            qr.setSelectedOptionText(dto.getSelectedOptionText());
            qr.setCorrectOptionText(dto.getCorrectOptionText());
            qr.setExplanation(dto.getExplanation());

            questionResponseRepository.save(qr);

            // Collect wrong ones for the email
            if (!isCorrect) {
                wrongResponses.add(qr);
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("score", correct + "/" + total);
        result.put("percentage", percentage);
        result.put("status", passed ? "PASS" : "FAIL");
        result.put("passed", passed);
        result.put("attemptId", savedAttempt.getId());

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