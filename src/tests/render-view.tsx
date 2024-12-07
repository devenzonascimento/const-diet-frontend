import React from 'react'
import { render } from '@testing-library/react'
import { AppProvider } from '@/context'
import { MemoryRouter } from 'react-router-dom'

export function renderView(Element: React.ReactElement) {
  return render(
    <MemoryRouter>
      <AppProvider>{Element}</AppProvider>
    </MemoryRouter>,
  )
}
