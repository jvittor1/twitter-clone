import { RegisterRequest } from "@/models/register-request";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const register = async (
  { username, email, password }: RegisterRequest,
  navFunction: NavigateFunction,
) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    console.log(
      `Registering with username: ${username}, email: ${email}, and password: ${password}`,
    );
    const res = await axios.post(baseUrl + "/register", {
      username,
      email,
      password,
    });

    if (res.status === 200) {
      navFunction("/login");
    }
  } catch (error) {
    console.error("Register failed", error);
  }
};
