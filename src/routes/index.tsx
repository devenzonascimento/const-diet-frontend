import { createBrowserRouter } from "react-router-dom";

import { PrivateRoute } from "./private-route";
import { AppProvider } from "@/context";

import { LoginPage } from "@/pages/Login/page";
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
          <HomePage />
        </PrivateRoute>
      </AppProvider>
    )
  },
  {
    path: "/my-foods",
    element: (
      <AppProvider>
        <PrivateRoute >
          <MyFoodsPage />
        </PrivateRoute>
      </AppProvider>
    )
  },
  {
    path: "/add-new-food",
    element: (
      <AppProvider>
        <PrivateRoute >
          <AddNewFoodPage />
        </PrivateRoute>
      </AppProvider>
    )
  },
  {
    path: "/edit-food/:foodId",
    element: (
      <AppProvider>
        <PrivateRoute >
          <EditFoodPage />
        </PrivateRoute>
      </AppProvider>
    )
  },
  {
    path: "/my-meals",
    element: (
      <AppProvider>
        <PrivateRoute >
          <MyMealsPage />
        </PrivateRoute>
      </AppProvider>
    )
  },
  {
    path: "/add-new-meal",
    element: (
      <AppProvider>
        <PrivateRoute >
          <AddNewMealPage />
        </PrivateRoute>
      </AppProvider>
    )
  },
  {
    path: "/edit-meal/:mealId",
    element: (
      <AppProvider>
        <PrivateRoute >
          <EditMealPage />
        </PrivateRoute>
      </AppProvider>
    )
  },
  {
    path: "/my-routines",
    element: (
      <AppProvider>
        <PrivateRoute >
          <MyRoutinesPage />
        </PrivateRoute>
      </AppProvider>
    )
  },
  {
    path: "/add-new-routine",
    element: (
      <AppProvider>
        <PrivateRoute >
          <AddNewRoutinePage />
        </PrivateRoute>
      </AppProvider>
    )
  },
  {
    path: "/edit-routine/:routineId",
    element: (
      <AppProvider>
        <PrivateRoute >
          <EditRoutinePage />
        </PrivateRoute>
      </AppProvider>
    )
  },
])
