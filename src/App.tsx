import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginPage } from "./pages/Login/page";
import { PrivateRoute } from "./routes/private-route";
import { HomePage } from "./pages/Home/page";
import { MyFoodsPage } from './pages/Foods/MyFoods/page';
import { AddNewFoodPage } from './pages/Foods/AddNewFood/page';
import { EditFoodPage } from './pages/Foods/EditFood/page';
import { MyMealsPage } from './pages/Meals/MyMeals/page';
import { AddNewMealPage } from "./pages/Meals/AddNewMeal/page";
import { EditMealPage } from "./pages/Meals/EditMeal/page";

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "home",
    element: (
      <PrivateRoute >
        <HomePage />
      </PrivateRoute>
    )
  },
  {
    path: "my-foods",
    element: (
      <PrivateRoute >
        <MyFoodsPage />
      </PrivateRoute>
    )
  },
  {
    path: "add-new-food",
    element: (
      <PrivateRoute >
        <AddNewFoodPage />
      </PrivateRoute>
    )
  },
  {
    path: "/edit-food/:foodId",
    element: (
      <PrivateRoute >
        <EditFoodPage />
      </PrivateRoute>
    )
  },
  {
    path: "my-meals",
    element: (
      <PrivateRoute >
        <MyMealsPage />
      </PrivateRoute>
    )
  },
  {
    path: "add-new-meal",
    element: (
      <PrivateRoute >
        <AddNewMealPage />
      </PrivateRoute>
    )
  },
  {
    path: "edit-meal/:mealId",
    element: (
      <PrivateRoute >
        <EditMealPage />
      </PrivateRoute>
    )
  },
])

export const App = () => { return (<RouterProvider router={router} />) }
