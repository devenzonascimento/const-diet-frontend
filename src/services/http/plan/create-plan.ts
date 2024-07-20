import { api } from "@/services/api";

interface PlanCreate {
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  routines: {
    routineId: string;
    date: Date;
  }[];
}

export const createPlan = async (planData: PlanCreate) => {
  try {
    const userId = localStorage.getItem("userId");

    const { data } = await api.post(`/users/${userId}/plans`, planData);

    return data;
  } catch (error) {
    console.log(error);
  }
};
