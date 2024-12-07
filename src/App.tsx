import React from 'react'
import { Outlet } from 'react-router-dom'

export const App = () => {
  return (
    <div className="flex-1 flex flex-col items-center gap-4 bg-slate-100">
      <Outlet />
    </div>
  )
}
