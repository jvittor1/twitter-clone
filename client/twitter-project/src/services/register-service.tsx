import { RegisterRequest } from "@/models/register-request";
import { NavigateFunction } from "react-router-dom";
import { ApiService } from "./api-service";
import { HttpMethod } from "@/enums/http-methods";

export const register = async (
  { username, email, password }: RegisterRequest,
  navFunction: NavigateFunction,
) => {
  const response = await ApiService({
    action: "register",
    method: HttpMethod.POST,
    showToast: true,
    body: { username, email, password },
  });
  if (response.status === 200) {
    navFunction("/login");
    return;
  }
};
