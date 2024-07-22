import { api } from "@/services/api";

interface PlanUpdate {
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

export const updatePlan = async (planData: PlanUpdate) => {
  try {
    const userId = localStorage.getItem("userId");

    const { data } = await api.put(`/users/${userId}/plans/${planData.id}`, planData);

    return data;
  } catch (error) {
    console.log(error);
  }
};