import { API_URL } from "./api";
export const loginUser = async ({ email, password }) => {
  try {
    const res = await fetch(`${API_URL}/loginUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
