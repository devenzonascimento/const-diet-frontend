import React from 'react'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import './global.css'

const rootContainer = document.getElementById('root')
if (rootContainer) {
  const root = createRoot(rootContainer)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
