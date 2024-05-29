import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

import "../app/globals.css"
import { NewMealProvider } from './pages/Meals/AddNewMeal/context/new-meal-context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NewMealProvider>
        <App />
      </NewMealProvider>
    </QueryClientProvider>
  </StrictMode>,
)
