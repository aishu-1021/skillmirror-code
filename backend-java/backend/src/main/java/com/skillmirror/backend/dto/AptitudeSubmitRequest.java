package com.skillmirror.backend.dto;
import java.util.List;

public class AptitudeSubmitRequest {

    private Long userId;
    private String companyName;
    private List<QuestionAnswerDTO> responses;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public List<QuestionAnswerDTO> getResponses() { return responses; }
    public void setResponses(List<QuestionAnswerDTO> responses) {
        this.responses = responses;
    }

    // Inner DTO
    public static class QuestionAnswerDTO {
        private int questionIndex;
        private int selectedOption;
        private int correctOption;
        private String questionText;
        private String selectedOptionText;
        private String correctOptionText;
        private String explanation;

        public int getQuestionIndex() { return questionIndex; }
        public void setQuestionIndex(int questionIndex) {
            this.questionIndex = questionIndex;
        }

        public int getSelectedOption() { return selectedOption; }
        public void setSelectedOption(int selectedOption) {
            this.selectedOption = selectedOption;
        }

        public int getCorrectOption() { return correctOption; }
        public void setCorrectOption(int correctOption) {
            this.correctOption = correctOption;
        }

        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) {
            this.questionText = questionText;
        }

        public String getSelectedOptionText() { return selectedOptionText; }
        public void setSelectedOptionText(String selectedOptionText) {
            this.selectedOptionText = selectedOptionText;
        }

        public String getCorrectOptionText() { return correctOptionText; }
        public void setCorrectOptionText(String correctOptionText) {
            this.correctOptionText = correctOptionText;
        }

        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) {
            this.explanation = explanation;
        }
    }
}