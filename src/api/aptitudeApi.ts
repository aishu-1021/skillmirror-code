import { apiFetch } from "./apiClient";
export interface QuestionAnswerDTO {
  questionIndex: number;
  selectedOption: number;
  correctOption: number;
  questionText: string;
  selectedOptionText: string;
  correctOptionText: string;
  explanation: string;
}

export const evaluateAptitude = async (
  responses: QuestionAnswerDTO[],
  companyName: string,
  userId: number
) => {
  const response = await apiFetch(
    "/api/aptitude/evaluate",
    {
      method: "POST",
      body: JSON.stringify({ userId, companyName, responses }),
    }
  );

  return response;
};
export const getAptitudeAttempts = async (userId: number) => {
  const response = await apiFetch(
    `/api/aptitude/user/${userId}`,
    {
      method: "GET",
    }
  );
  return response;
};