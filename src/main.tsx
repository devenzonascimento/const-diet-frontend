import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { queryClient } from './lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { MealProvider } from './context/meal-context'

import { App } from './App'

import "./globals.css"
import { RoutineProvider } from './context/routine-context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RoutineProvider>
        <MealProvider>
          <App />
        </MealProvider>
      </RoutineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
