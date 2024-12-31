import React from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'

import { PrivateRoute } from './private-route'
import { AppProvider } from '@/context'

import { RegisterPage } from '@/pages/User/Register/page'
import { LoginPage } from '@/pages/User/Login/page'

import { HomePage } from '@/pages/Home/page'

import { MyFoodsPage } from '@/pages/Foods/MyFoods/my-foods-view-model'
import { AddFoodPage } from '@/pages/Foods/AddFood/add-food-view-model'
import { EditFoodPage } from '@/pages/Foods/EditFood/edit-food-view-model'
import { FoodDetailsPage } from '@/pages/Foods/FoodDetails/food-details-view-model'

import { MyMealsPage } from '@/pages/Meals/MyMeals/page'
import { CreateMealPage } from '@/pages/Meals/create-meal/create-meal-view-model'
import { EditMealPage } from '@/pages/Meals/EditMeal/page'

import { MyRoutinesPage } from '@/pages/Routines/MyRoutines/page'
import { AddNewRoutinePage } from '@/pages/Routines/AddNewRoutine/page'
import { EditRoutinePage } from '@/pages/Routines/EditRoutine/page'
import { RoutineDetailsPage } from '@/pages/Routines/RoutineDetails/page'

import { MyPlansPage } from '@/pages/Plans/MyPlans/page'
import { AddNewPlanPage } from '@/pages/Plans/AddNewPlan/page'
import { EditPlanPage } from '@/pages/Plans/EditPlan/page'
import { PlanDetailsPage } from '@/pages/Plans/PlanDetails/page'

import { DailyRoutinePage } from '@/pages/DailyRoutine/page'

export const router = createBrowserRouter([
  {
    path: 'cadastrar-conta',
    element: (
      <AppProvider>
        <RegisterPage />
      </AppProvider>
    ),
  },
  {
    path: 'login',
    element: (
      <AppProvider>
        <LoginPage />
      </AppProvider>
    ),
  },
  {
    path: '/',
    element: (
      <AppProvider>
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      </AppProvider>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'meus-alimentos',
        element: <MyFoodsPage />,
      },
      {
        path: 'detalhes-do-alimento/:foodId',
        element: <FoodDetailsPage />,
      },
      {
        path: 'novo-alimento',
        element: <AddFoodPage />,
      },
      {
        path: 'editar-alimento/:foodId',
        element: <EditFoodPage />,
      },
      {
        path: 'minhas-refeicoes',
        element: <MyMealsPage />,
      },
      {
        path: 'nova-refeicao',
        element: <CreateMealPage />,
      },
      {
        path: 'editar-refeicao/:mealId',
        element: <EditMealPage />,
      },
      {
        path: 'minhas-rotinas',
        element: <MyRoutinesPage />,
      },
      {
        path: 'detalhes-da-rotina/:routineId',
        element: <RoutineDetailsPage />,
      },
      {
        path: 'nova-rotina',
        element: <AddNewRoutinePage />,
      },
      {
        path: 'editar-rotina/:routineId',
        element: <EditRoutinePage />,
      },
      {
        path: 'meus-planos',
        element: <MyPlansPage />,
      },
      {
        path: 'detalhes-do-meu-plano/:planId',
        element: <PlanDetailsPage />,
      },
      {
        path: 'novo-plano',
        element: <AddNewPlanPage />,
      },
      {
        path: 'editar-plano/:planId',
        element: <EditPlanPage />,
      },
      {
        path: 'meu-plano-diario',
        element: <DailyRoutinePage />,
      },
    ],
  },
])
