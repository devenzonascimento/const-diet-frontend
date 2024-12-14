import React from 'react'
import { render } from '@testing-library/react'
import { AppProvider } from '@/context'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'

// Helper para verificar a localização atual
function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}

export function renderView(
  Element: React.ReactElement,
  routePath = '/',
  initialRoute = '/',
) {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppProvider>
        <Routes>
          <Route path={routePath} element={Element} />
          <Route path="*" element={<LocationDisplay />} />
        </Routes>
      </AppProvider>
    </MemoryRouter>,
  )
}
