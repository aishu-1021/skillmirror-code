import { apiFetch } from "./apiClient";
export interface TechnicalQuestionAnswerDTO {
  questionIndex: number;
  selectedOption: number;
  correctOption: number;
  questionText: string;
  selectedOptionText: string;
  correctOptionText: string;
  explanation: string;
}

export const evaluateTechnical = async (
  userId: number,
  companyName: string,
  responses: TechnicalQuestionAnswerDTO[]
) => {
  const response = await apiFetch(
    "/api/technical/evaluate",
    {
      method: "POST",
      body: JSON.stringify({ userId, companyName, responses }),
    }
  );
  return response;
};

export const getTechnicalAttempts = async (userId: number) => {
  const response = await apiFetch(
    `/api/technical/user/${userId}`,
    { method: "GET" }
  );
  return response;
};