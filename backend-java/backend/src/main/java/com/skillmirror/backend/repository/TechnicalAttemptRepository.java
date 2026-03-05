package com.skillmirror.backend.repository;
import com.skillmirror.backend.entity.TechnicalAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TechnicalAttemptRepository extends JpaRepository<TechnicalAttempt, Long> {

    List<TechnicalAttempt> findByUserId(Long userId);

    //Count attempts by user for a specific company within a time window
    @Query("SELECT COUNT(a) FROM TechnicalAttempt a WHERE a.userId = :userId " +
            "AND a.companyName = :companyName AND a.attemptedAt >= :since")
    long countRecentAttempts(@Param("userId") Long userId,
                             @Param("companyName") String companyName,
                             @Param("since") LocalDateTime since);
}
