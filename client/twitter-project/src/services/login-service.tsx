import { LoginRequest, LoginResponse } from "@/models/login-model";
import { NavigateFunction } from "react-router-dom";
import { ApiService } from "./api-service";
import { HttpMethod } from "@/enums/http-methods";

export const login = async (
  { username, password }: LoginRequest,
  navFunction: NavigateFunction,
) => {
  const response = await ApiService<LoginResponse>({
    action: "login",
    method: HttpMethod.POST,
    showToast: true,
    body: { username, password },
  });

  if (response.status === 200) {
    setToken(response.data!.token);
    navFunction("/home");

    return;
  }
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};
