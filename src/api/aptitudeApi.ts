import { apiFetch } from "./apiClient";
// Evaluate aptitude test answers
export const evaluateAptitude = async (
  userId: number,
  companyName: string,
  answers: number[]
) => {
  const response = await apiFetch(
    "/api/aptitude/evaluate",
    {
      method: "POST",
      body: JSON.stringify({ userId, companyName, answers }),
    }
  );

  return response;
};

// Get all aptitude attempts for a user
export const getAptitudeAttempts = async (userId: number) => {
  const response = await apiFetch(
    `/api/aptitude/user/${userId}`,
    {
      method: "GET",
    }
  );

  return response;
};