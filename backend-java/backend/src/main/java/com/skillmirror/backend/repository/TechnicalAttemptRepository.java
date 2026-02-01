package com.skillmirror.backend.repository;
import com.skillmirror.backend.entity.TechnicalAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TechnicalAttemptRepository
        extends JpaRepository<TechnicalAttempt, Long> {

    List<TechnicalAttempt> findByUserId(Long userId);
}
