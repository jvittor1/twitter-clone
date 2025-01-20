import { LoginRequest, LoginResponse } from "@/models/login-model";
import { NavigateFunction } from "react-router-dom";
import { ApiService } from "./api-service";
import { HttpMethod } from "@/enums/http-methods";
import { User } from "@/models/user";
import { Tweet } from "@/models/tweet-model";

export const login = async (
  { username, password }: LoginRequest,
  loadUser: () => void,
  loadTweets: () => void,
) => {
  const response = await ApiService<LoginResponse>({
    action: "login",
    method: HttpMethod.POST,
    showToast: true,
    body: { username, password },
  });

  if (response.status === 200) {
    setToken(response.data!.token);
    loadUser();
    loadTweets();
    return true;
  }
  return false;
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const logout = (
  navFunction: NavigateFunction,
  setUser: (user: User | null) => void,
  setTweets: (tweets: Tweet[] | null) => void,
) => {
  localStorage.removeItem("token");
  setUser(null);
  setTweets(null);
  navFunction("/login");
};
