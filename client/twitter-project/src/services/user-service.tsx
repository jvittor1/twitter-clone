import { User } from "@/models/user";
import { ApiService } from "./api-service";
import { HttpMethod } from "@/enums/http-methods";

export async function getUserData(token: string) {
  const response = await ApiService<User>({
    action: "user",
    method: HttpMethod.GET,
    auth: true,
    customToken: token,
  });
  if (response.status === 200) {
    return response.data;
  }
}
