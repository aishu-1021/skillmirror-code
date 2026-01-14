package com.skillmirror.backend.entity;

public class RegisterRequest {

    private String fullName;
    private String email;
    private String college;
    private String password;
    private String confirmPassword;

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getCollege() {
        return college;
    }

    public String getPassword() {
        return password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }
}
