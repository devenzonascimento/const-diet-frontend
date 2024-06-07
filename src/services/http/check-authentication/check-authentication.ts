import { api } from "@/services/api";

export const checkAuthentication = async () => {
  const { data: { token }, status } = await api.get("/auth");

  if (token) {
    localStorage.setItem("token", token);
  }

  return status == 200;
};
