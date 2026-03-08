package com.skillmirror.backend.controller;
import com.skillmirror.backend.entity.TechnicalAttempt;
import com.skillmirror.backend.service.TechnicalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/technical")
public class TechnicalController {

    private final TechnicalService technicalService;

    public TechnicalController(TechnicalService technicalService) {
        this.technicalService = technicalService;
    }

    @PostMapping("/evaluate")
    public Map<String, Object> evaluateTechnical(
            @RequestBody Map<String, Object> data) {

        Long userId = Long.valueOf(data.get("userId").toString());
        String companyName = data.get("companyName").toString();

        // Now receives rich responses list instead of flat answers list
        List<Map<String, Object>> responses =
                (List<Map<String, Object>>) data.get("responses");

        return technicalService.evaluate(userId, companyName, responses);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TechnicalAttempt>> getAttemptsByUser(
            @PathVariable Long userId) {
        return ResponseEntity.ok(technicalService.getAttemptsByUser(userId));
    }
}