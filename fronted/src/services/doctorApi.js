import { API_URL } from "./api";
import { apiFetch } from "./apiClient";
import { doctorApiFetch } from "./apiClient";

export const getDoctors = async (search, page, limit, specialty = "") => {
  try {
    const params = new URLSearchParams({
      search: search || "",
      page: String(page),
      limit: String(limit),
    });

    if (specialty) {
      params.set("specialty", specialty);
    }

    const res = await apiFetch(
      `${API_URL}/doctors?${params.toString()}`
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to get doctors");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const loginDoctor = async ({ email, password }) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "login failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
export const updateDoctorProfile = async (formData) => {
  try {
    const token = localStorage.getItem("doctorToken");
    const res = await doctorApiFetch(`${API_URL}/updateProfile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "failed to get doctors");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const doctorProfile = async () => {
  const token = localStorage.getItem("doctorToken");
  try {
    const res = await doctorApiFetch(`${API_URL}/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "login failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadDoctorImage = async (file) => {
  const token = localStorage.getItem("doctorToken");

  const formData = new FormData();
  formData.append("image", file);

  const res = await doctorApiFetch(`${API_URL}/uploadPortfilo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Image upload failed");
  }

  return data;
};

export const registerDoctor = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to register");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
export const getDoctorById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/doctor/${id}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to register");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
