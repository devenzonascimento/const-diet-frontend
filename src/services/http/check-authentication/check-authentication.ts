import { api } from "@/services/api";

export const checkAuthentication = async () => {
  const { data: { token } } = await api.get("/auth");

  if (token) {
    localStorage.setItem("token", token);
  }

  return true;
};
