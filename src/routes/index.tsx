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
import { AddNewRoutinePage } from "@/pages/Routines/AddNewRoutine/page";
import { EditRoutinePage } from "@/pages/Routines/EditRoutine/page";

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
        path: "nova-rotina",
        element: <AddNewRoutinePage />
      },
      {
        path: "editar-rotina/:routineId",
        element: <EditRoutinePage />
      },
    ]
  },
])
