import { api } from "@/services/api";

import { DailyRoutineComplete, MealStatus } from "@/types/types";

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

  async setMealStatus(data: { dailyRoutineId: string, mealStatus: MealStatus }) {
    try {
      const userId = localStorage.getItem("userId");
    
      const response = await api.patch(
        `/users/${userId}/daily-routines/${data.dailyRoutineId}/meals-status`,
        data.mealStatus
      );
      
      return response.data;
    } catch (error) {
      console.error(error);

      return {} as DailyRoutineComplete
    }
  }
}