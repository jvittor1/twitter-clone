import { toast } from "@/hooks/use-toast";
import { LoginRequest } from "@/models/login-request";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
export const login = async (
  { username, password }: LoginRequest,
  navFunction: NavigateFunction,
) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  try {
    console.log(
      `Logging in with username: ${username} and password: ${password}`,
    );

    const res = await axios.post(baseUrl + "/login", { username, password });
    toast({
      title: "Login Successful",
      description: res.data.message,
      variant: "success",
    });

    navFunction("/home");
    setToken(res.data.data.token);
    return;
  } catch (error: any) {
    toast({
      title: "Login Failed",
      description: error.response
        ? error.response.data.message
        : "An unexpected error occurred. Please try again later.",
      variant: "destructive",
    });
    return;
  }
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};
