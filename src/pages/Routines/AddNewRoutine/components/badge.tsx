import { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
}

export const Badge = ({ children }: BadgeProps) => {
  return (
    <div className="min-w-max flex-1 px-2 py-1 bg-sky-700 rounded-lg flex items-center justify-center text-sm font-semibold text-white">
      {children}
    </div>
  )
}
