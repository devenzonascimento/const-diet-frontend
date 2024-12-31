import React from 'react'
import { Link } from 'react-router-dom'

type NavButtonProps = {
  to: string
  title: string
  Icon: React.ElementType
}

export function NavButton({ to, title, Icon }: NavButtonProps) {
  return (
    <Link to={to} className="flex flex-col items-center gap-1 px-3">
      <div className="p-4 bg-violet-500 rounded-full">
        <Icon className="size-10 shrink-0 stroke-2 text-white" />
      </div>

      <span className="text-sm text-center font-semibold text-white">
        {title}
      </span>
    </Link>
  )
}
