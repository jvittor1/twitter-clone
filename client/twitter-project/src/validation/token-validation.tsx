import { ApiService } from "../services/api-service";

export const validateToken = async (token: string): Promise<boolean> => {
  const response = await ApiService({
    action: "validate-token",
    method: "POST",
    auth: true,
    customToken: token,
  });

  console.log(response);
  return response.status === 200;
};
