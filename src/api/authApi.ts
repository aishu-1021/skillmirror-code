import { apiFetch } from "./apiClient";
// Register a new user
export const registerUser = async (
  fullName: string,
  email: string,
  college: string,
  password: string
) => {
  const response = await apiFetch(
    "/api/auth/register",
    {
      method: "POST",
      body: JSON.stringify({ fullName, email, college, password }),
    },
    false //No token needed for register
  );

  return response;
};

// Login user — returns token + user data
export const loginUser = async (email: string, password: string) => {
  const response = await apiFetch(
    "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    false // No token needed for login
  );

  return response;
};