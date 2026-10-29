import { refreshDoctorToken } from "./authApi";
import { refreshAccessToken } from "./authApi";

let refreshPromise = null;
export const apiFetch = async (url, options = {}) => {
  const sendRequest = (token) => {
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      headers.delete("Authorization");
    }
    return fetch(url, { ...options, headers, credentials: "include" });
  };

  let token = localStorage.getItem("token");
  let res = await sendRequest(token);
  if (res.status !== 401) {
    return res;
  }
  try {
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }
    token = await refreshPromise;
    if (!token) {
      throw new Error("Access Token missing");
    }

    localStorage.setItem("token", token);
    res = await sendRequest(token);
    return res;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("auth:logout"));
    throw error;
  }
};


let doctorRefreshPromise = null;

export const doctorApiFetch = async (url, options = {}) => {
  const sendRequest = (token) => {
    const headers = new Headers(options.headers || {});

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      headers.delete("Authorization");
    }

    return fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });
  };

  let token = localStorage.getItem("doctorToken");
  let res = await sendRequest(token);

  if (res.status !== 401) {
    return res;
  }

  try {
    if (!doctorRefreshPromise) {
      doctorRefreshPromise = refreshDoctorToken()
        .then((data) => data.token)
        .finally(() => {
          doctorRefreshPromise = null;
        });
    }

    token = await doctorRefreshPromise;

    if (!token) {
      throw new Error("Doctor access token missing");
    }

    localStorage.setItem("doctorToken", token);

    res = await sendRequest(token);
    return res;
  } catch (error) {
    localStorage.removeItem("doctorToken");
    localStorage.setItem("role", "");

    window.dispatchEvent(new Event("auth:logout"));
    throw error;
  }
};
