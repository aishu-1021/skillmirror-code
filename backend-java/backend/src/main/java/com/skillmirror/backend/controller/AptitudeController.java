package com.skillmirror.backend.controller;
import com.skillmirror.backend.dto.AptitudeSubmitRequest;
import com.skillmirror.backend.entity.AptitudeAttempt;
import com.skillmirror.backend.service.AptitudeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/aptitude")
public class AptitudeController {

    private final AptitudeService aptitudeService;

    public AptitudeController(AptitudeService aptitudeService) {
        this.aptitudeService = aptitudeService;
    }

    @PostMapping("/evaluate")
    public Map<String, Object> evaluate(@RequestBody AptitudeSubmitRequest request) {
        return aptitudeService.evaluate(request);
    }

    @GetMapping("/user/{userId}")
    public List<AptitudeAttempt> getAttemptsByUser(@PathVariable Long userId) {
        return aptitudeService.getAttemptsByUser(userId);
    }
}