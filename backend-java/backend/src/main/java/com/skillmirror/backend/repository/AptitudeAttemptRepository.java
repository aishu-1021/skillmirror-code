package com.skillmirror.backend.repository;
import com.skillmirror.backend.entity.AptitudeAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AptitudeAttemptRepository extends JpaRepository<AptitudeAttempt, Long>
{
    List<AptitudeAttempt> findByUserId(Long userId);
}
