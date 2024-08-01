import { api } from "@/services/api";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface UserAuth {
  userId: string;
  token: string;
}

class AccountService {
  async login(loginData: LoginRequest) {
    try {
      const { data } = await api.post("/login", loginData);
  
      const { token, userId }: UserAuth = data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
  
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async register(registerData: RegisterRequest) {
    try {
      const { data } = await api.post("/register", registerData);
  
      const { token, userId }: UserAuth = data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
  
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

export const accountService = new AccountService();
