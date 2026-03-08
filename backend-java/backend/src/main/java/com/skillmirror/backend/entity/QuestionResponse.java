package com.skillmirror.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "question_responses")
public class QuestionResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aptitude_attempt_id")
    private AptitudeAttempt aptitudeAttempt;

    // Numeric index fields — these were already in your file, kept as-is
    private int questionIndex;    // e.g. 0, 1, 2 ... 29
    private int selectedOption;   // index of what user picked (0/1/2/3)
    private int correctOption;    // index of the right answer (0/1/2/3)
    private boolean isCorrect;    // true if selectedOption == correctOption

    @Column(columnDefinition = "TEXT")
    private String questionText;        // full question text

    private String selectedOptionText;  // text of what user chose
    private String correctOptionText;   // text of the right answer

    @Column(columnDefinition = "TEXT")
    private String explanation;         // why the correct answer is right

    // ===== Getters & Setters =====

    public Long getId() {
        return id;
    }

    public AptitudeAttempt getAptitudeAttempt() {
        return aptitudeAttempt;
    }
    public void setAptitudeAttempt(AptitudeAttempt aptitudeAttempt) {
        this.aptitudeAttempt = aptitudeAttempt;
    }

    public int getQuestionIndex() {
        return questionIndex;
    }
    public void setQuestionIndex(int questionIndex) {
        this.questionIndex = questionIndex;
    }

    public int getSelectedOption() {
        return selectedOption;
    }
    public void setSelectedOption(int selectedOption) {
        this.selectedOption = selectedOption;
    }

    public int getCorrectOption() {
        return correctOption;
    }
    public void setCorrectOption(int correctOption) {
        this.correctOption = correctOption;
    }

    public boolean isCorrect() {
        return isCorrect;
    }
    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }

    public String getQuestionText() {
        return questionText;
    }
    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getSelectedOptionText() {
        return selectedOptionText;
    }
    public void setSelectedOptionText(String selectedOptionText) {
        this.selectedOptionText = selectedOptionText;
    }

    public String getCorrectOptionText() {
        return correctOptionText;
    }
    public void setCorrectOptionText(String correctOptionText) {
        this.correctOptionText = correctOptionText;
    }

    public String getExplanation() {
        return explanation;
    }
    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }
}