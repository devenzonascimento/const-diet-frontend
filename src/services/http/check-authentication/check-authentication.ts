import { api } from "@/services/api";

export const checkAuthentication = async () => {
  const { status } = await api.get("/auth");

  return status == 200;
};
