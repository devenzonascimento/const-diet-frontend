import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { RoutineProvider } from "./routine-context"
import { MealProvider } from "./meal-context"
import { PlanProvider } from "./plan-context"

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PlanProvider>
        <RoutineProvider>
          <MealProvider>
            {children}
          </MealProvider>
        </RoutineProvider>
      </PlanProvider>
    </QueryClientProvider>
  )
}