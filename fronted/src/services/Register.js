import { API_URL } from "./api";
export const registerUser = async (FormData) => {
  try {
    const res = await fetch(`${API_URL}/registerUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
