import { createBrowserRouter } from "react-router-dom";

import { PrivateRoute } from "./private-route";
import { AppProvider } from "@/context";

import { LoginPage } from "@/pages/Login/page";
import { App } from "@/App";
import { HomePage } from "@/pages/Home/page";
import { MyFoodsPage } from "@/pages/Foods/MyFoods/page";
import { AddNewFoodPage } from "@/pages/Foods/AddNewFood/page";
import { EditFoodPage } from "@/pages/Foods/EditFood/page";
import { MyMealsPage } from "@/pages/Meals/MyMeals/page";
import { AddNewMealPage } from "@/pages/Meals/AddNewMeal/page";
import { EditMealPage } from "@/pages/Meals/EditMeal/page";
import { MyRoutinesPage } from "@/pages/Routines/MyRoutines/page";
import { RoutineDetailsPage } from "@/pages/Routines/RoutineDetails/page";
import { AddNewRoutinePage } from "@/pages/Routines/AddNewRoutine/page";
import { EditRoutinePage } from "@/pages/Routines/EditRoutine/page";
import { MyPlansPage } from "@/pages/Plans/MyPlans/page";
import { PlanDetailsPage } from "@/pages/Plans/PlanDetails/page";
import { AddNewPlanPage } from "@/pages/Plans/AddNewPlan/page";
import { EditPlanPage } from "@/pages/Plans/EditPlan/page";
import { DailyRoutinePage } from "@/pages/DailyRoutine/page";

export const router = createBrowserRouter([
  {
    path: "login",
    element: (
      <AppProvider>
        <LoginPage />
      </AppProvider>
    )
  },
  {
    path: "/",
    element: (
      <AppProvider>
        <PrivateRoute >
          <App />
        </PrivateRoute>
      </AppProvider>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "meus-alimentos",
        element: <MyFoodsPage />,
      },
      {
        path: "novo-alimento",
        element: <AddNewFoodPage />
      },
      {
        path: "editar-alimento/:foodId",
        element: <EditFoodPage />
      },
      {
        path: "minhas-refeicoes",
        element: <MyMealsPage />,
      },
      {
        path: "nova-refeicao",
        element: <AddNewMealPage />
      },
      {
        path: "editar-refeicao/:mealId",
        element: <EditMealPage />
      },
      {
        path: "minhas-rotinas",
        element: <MyRoutinesPage />,
      },
      {
        path: "detalhes-da-rotina/:routineId",
        element: <RoutineDetailsPage />,
      },
      {
        path: "nova-rotina",
        element: <AddNewRoutinePage />
      },
      {
        path: "editar-rotina/:routineId",
        element: <EditRoutinePage />
      },
      {
        path: "meus-planos",
        element: <MyPlansPage />,
      },
      {
        path: "detalhes-do-meu-plano/:planId",
        element: <PlanDetailsPage />,
      },
      {
        path: "novo-plano",
        element: <AddNewPlanPage />
      },
      {
        path: "editar-plano/:planId",
        element: <EditPlanPage />
      },
      {
        path: "meu-plano-diario",
        element: <DailyRoutinePage />
      },
    ]
  },
])
