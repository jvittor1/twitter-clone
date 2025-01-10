import { LoginRequest } from "@/models/login-request";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

interface LoginResponse {
  expiresAt: number;
  token: string;
}

export const login = async (
  { username, password }: LoginRequest,
  navFunction: NavigateFunction,
): Promise<LoginResponse | null> => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    console.log(
      `Logging in with username: ${username} and password: ${password}`,
    );

    const res = await axios.post(baseUrl + "/login", { username, password });
    if (res.status !== 200) {
      return null;
    }
    navFunction("/home");
    setToken(res.data.token);
    return res.data;
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};
