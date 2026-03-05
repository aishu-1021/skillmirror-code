package com.skillmirror.backend.dto;

public class UserResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private String college;
    private boolean aptitudePassed;
    private boolean technicalPassed;
    private boolean interviewUnlocked;

    // Constructor
    public UserResponseDTO(Long id, String fullName, String email,
                           String college, boolean aptitudePassed,
                           boolean technicalPassed, boolean interviewUnlocked) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.college = college;
        this.aptitudePassed = aptitudePassed;
        this.technicalPassed = technicalPassed;
        this.interviewUnlocked = interviewUnlocked;
    }

    // Getters
    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getCollege() { return college; }
    public boolean isAptitudePassed() { return aptitudePassed; }
    public boolean isTechnicalPassed() { return technicalPassed; }
    public boolean isInterviewUnlocked() { return interviewUnlocked; }
}