// Base URL — change this one place if backend URL ever changes
const BASE_URL = "http://localhost:8080";

// Helper to get auth headers with JWT token
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

// Helper to get headers without auth (for login/register)
const getPublicHeaders = () => ({
  "Content-Type": "application/json"
});

// Base fetch wrapper — handles errors consistently
const apiFetch = async (
  endpoint: string,
  options: RequestInit = {},
  requiresAuth: boolean = true
) => {
  const headers = requiresAuth ? getAuthHeaders() : getPublicHeaders();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
};
export { BASE_URL, getAuthHeaders, getPublicHeaders, apiFetch };