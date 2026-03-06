import { apiFetch } from "./apiClient";
// Evaluate technical test answers
export const evaluateTechnical = async (
  userId: number,
  companyName: string,
  answers: number[]
) => {
  const response = await apiFetch(
    "/api/technical/evaluate",
    {
      method: "POST",
      body: JSON.stringify({ userId, companyName, answers }),
    }
  );

  return response;
};

// Get all technical attempts for a user
export const getTechnicalAttempts = async (userId: number) => {
  const response = await apiFetch(
    `/api/technical/user/${userId}`,
    {
      method: "GET",
    }
  );

  return response;
};