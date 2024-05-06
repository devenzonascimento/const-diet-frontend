import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'

import "../app/globals.css"


import AddNewFoodManuallyPage from "./pages/AddNewFoodManually/page";
import MyFoodsPage from "./pages/MyFoods/page";
import LoginPage from "./pages/Login/page";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyMealsPage from './pages/MyMeals/page';

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "my-foods",
    element: <MyFoodsPage />
  },
  {
    path: "add-new-food-manually",
    element: <AddNewFoodManuallyPage />
  },
  {
    path: "my-meals",
    element: <MyMealsPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
