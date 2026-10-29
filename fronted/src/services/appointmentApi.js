import { API_URL } from "./api";
import { apiFetch, doctorApiFetch } from "./apiClient";
export const bookAppointment = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await apiFetch(`${API_URL}/appointmentForm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Appointment booking failed");
    }
    return data?.appointment;
  } catch (error) {
    throw error;
  }
};

export const myAppointments = async (search, page, limit, filter) => {
  try {
    const token = localStorage.getItem("token");
    const res = await apiFetch(
      `${API_URL}/myAppointments?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}&filter=${filter}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "failed to load appointments");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const cancelAppointment = async (id) => {
  const token = localStorage.getItem("token");

  const res = await apiFetch(`${API_URL}/cancelAppointment/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Cancellation failed");
  }

  return data;
};
export const getdoctorAppointments = async (search, page, limit, sort) => {
  const res = await doctorApiFetch(
    `${API_URL}/doctorAppointments?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}&sort=${sort}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to load appointments");
  }

  return data;
};
export const updatedoctorAppointments = async (id, status) => {
  const token = localStorage.getItem("doctorToken");

  const res = await doctorApiFetch(`${API_URL}/appointment/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Status update failed");
  }

  return data;
};

export const getBookedSlots = async (doctor, date) => {
  const params = new URLSearchParams({ doctor, date });

  const res = await fetch(
    `${API_URL}/booked-slots?${params}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to get booked slots");
  }

  return data;
};
