import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

import "../app/globals.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
