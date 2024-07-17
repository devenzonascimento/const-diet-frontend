import { Outlet } from "react-router-dom"

export const App = () => {
  return (
    <div className="h-screen flex flex-col gap-4 bg-slate-100">
      <Outlet />
    </div>
  )
}
