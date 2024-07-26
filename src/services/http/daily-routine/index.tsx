import { api } from "@/services/api";

import { DailyRoutineComplete } from "@/types/types";

export class DailyRoutineService {
  async getDailyRoutine(): Promise<DailyRoutineComplete> {
    try {
      const userId = localStorage.getItem("userId");
    
      const { data } = await api.get(`/users/${userId}/daily-routines`);
    
      return data;
    } catch (error) {
      console.error(error);

      return {} as DailyRoutineComplete
    }
  }
}