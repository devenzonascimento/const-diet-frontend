import { api } from "@/services/api";

interface Login {
  email: string;
  password: string;
}

interface UserLogin {
  token: string;
  userId: string;
}

export const userLogin = async ({ email, password }: Login) => {
  try {
    const response = await api.post("users/login", { email, password, });

    const user: UserLogin = response.data;

    localStorage.setItem("token", user.token);
    localStorage.setItem("userId", user.userId);

  } catch (error) {
    console.log(error);
  }
};
