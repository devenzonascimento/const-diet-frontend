import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { queryClient } from './lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { NewMealProvider } from './pages/Meals/AddNewMeal/context/new-meal-context'

import { App } from './App'

import "./globals.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NewMealProvider>
        <App />
      </NewMealProvider>
    </QueryClientProvider>
  </StrictMode>,
)
