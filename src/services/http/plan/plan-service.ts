import { api } from "@/services/api";

import { Plan } from "@/types/types";

interface PlanData {
  id: string;
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  routines: {
    routineId: string;
    date: Date;
  }[];
}

class PlanService {
  async create(planData: Omit<PlanData, "id">): Promise<Plan> {
    try {
      const userId = localStorage.getItem("userId");

      const { data } = await api.post(`/users/${userId}/plans`, planData);

      return data;
    } catch (error) {
      console.log(error);

      return {} as Plan;
    }
  }

  async update(planData: PlanData): Promise<Plan> {
    try {
      const userId = localStorage.getItem("userId");
      
      const { data } = await api.put(
        `/users/${userId}/plans/${planData.id}`,
        planData
      );

      return data;
    } catch (error) {
      console.log(error);

      return {} as Plan;
    }
  }
 
  async delete(planId: string) {
    try {      
      const userId = localStorage.getItem("userId");

      await api.delete(`/users/${userId}/plans/${planId}`);
    } catch (error) {
      console.error(error);
    }
  }

  async getById(planId: string): Promise<Plan> {
    try {
      const userId = localStorage.getItem("userId");

      const { data } = await api.get(`/users/${userId}/plans/${planId}`);

      return data;
    } catch (error) {
      console.error(error);
      return {} as Plan;
    }
  }

  async getAll(): Promise<Plan[]> {
    try {
      const userId = localStorage.getItem("userId");

      const { data } = await api.get(`/users/${userId}/plans`);

      return data;
    } catch (error) {
      console.log(error);

      return [] as Plan[];
    }
  }

  async setActivePlan(planId: string): Promise<Plan> {
    try {
      const userId = localStorage.getItem("userId");
  
      const { data } = await api.patch(`/users/${userId}/plans/${planId}/active`);
  
      return data;
    } catch (error) {
      console.log(error);
  
      return {} as Plan;
    }
  }

  async getActivePlan(): Promise<Plan> {
    try {
      const userId = localStorage.getItem("userId");
  
      const { data } = await api.get(`/users/${userId}/plans/active`);
  
      return data;
    } catch (error) {
      console.log(error);
  
      return {} as Plan;
    }
  }
}

export const planService = new PlanService();
