import { API_URL } from "./api.js";
////for user
export const refreshAccessToken = async () => {
  try {
    const response = await fetch(`${API_URL}/refreshToken`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Refresh failed");
    }

    return data.token;
  } catch (error) {
    throw error;
  }
};

///for  doctor
export const refreshDoctorToken = async () => {
  const res = await fetch(
    `${API_URL}/refresh-token`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to refresh doctor token"
    );
  }

  return data;
};

