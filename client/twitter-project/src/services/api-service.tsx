import { toast } from "@/hooks/use-toast";
import { BaseResponse } from "@/models/base-response";

interface ApiServiceProps extends RequestInit {
  action: string;
  body?: any;
  auth?: boolean;
  showToast?: boolean;
  customEndpoint?: string;
}

export async function ApiService<T>({
  action,
  body,
  auth,
  showToast,
  ...props
}: ApiServiceProps): Promise<BaseResponse<T>> {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token") || "";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (auth) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const url = `${baseUrl}/${action ? action : ""}`;

  try {
    const res = await fetch(url, {
      ...props,
      headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (showToast) {
      toast({
        title: data.status === 200 ? "Success" : "Error",
        description: data.message,
        variant: data.status === 200 ? "success" : "destructive",
      });
    }

    if (data.status !== 200) {
      return {
        status: data.status,
        data: null,
        message: data.message,
      };
    }

    return {
      status: data.status,
      data: data.data,
      message: data.message,
    };
  } catch (error: any) {
    if (showToast) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    return {
      status: 500,
      data: null,
      message: error.message,
    };
  }
}
