package com.skillmirror.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    private String college;

    private String password;

    @Column(nullable = false)
    private boolean aptitudePassed = false;

    @Column(nullable = false)
    private boolean technicalPassed = false;

    @Column(nullable = false)
    private boolean interviewUnlocked = false;


    // 🔹 REQUIRED: no-arg constructor
    public User() {}

    // 🔹 GETTERS & SETTERS

    public Long getId() {
        return id;
    }


    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAptitudePassed() {
        return aptitudePassed;
    }

    public void setAptitudePassed(boolean aptitudePassed) {
        this.aptitudePassed = aptitudePassed;
    }

    public boolean isTechnicalPassed() {
        return technicalPassed;
    }

    public void setTechnicalPassed(boolean technicalPassed) {
        this.technicalPassed = technicalPassed;
    }

    public boolean isInterviewUnlocked() {
        return interviewUnlocked;
    }

    public void setInterviewUnlocked(boolean interviewUnlocked) {
        this.interviewUnlocked = interviewUnlocked;
    }
}
