import { toast } from "@/hooks/use-toast";
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

    toast({
      title: "Registration Successful",
      description: res.data.message,
      variant: "success",
    });
    navFunction("/login");
    return;
  } catch (error: any) {
    console.error("Register failed", error);

    toast({
      title: "Error",
      description: error.response
        ? error.response.data.message
        : "An unexpected error occurred. Please try again later.",
      variant: "destructive",
    });
  }
};
