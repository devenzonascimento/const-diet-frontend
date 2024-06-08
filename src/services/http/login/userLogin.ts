import { api } from "@/services/api";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  userId: string;
}

export const userLogin = async (loginData: LoginRequest) => {
  try {
    const { data } = await api.post("users/login", loginData);

    const {token, userId}: LoginResponse = data;

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    return true;
  } catch (error) {
    console.log(error);
  }
};
