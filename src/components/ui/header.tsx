import { Link } from "react-router-dom"

import { ArrowLeftIcon, PlusCircleIcon } from "lucide-react"

interface HeaderProps {
  title: string;
  leftButtonNavigateTo?: string;
  rightButtonNavigateTo?: string;
}

export const Header = ({ title, leftButtonNavigateTo, rightButtonNavigateTo }: HeaderProps) => {
  return (
    <header className="relative flex justify-center items-center py-3 text-white bg-sky-800">
      {leftButtonNavigateTo &&
        (
          <Link
            to={leftButtonNavigateTo}
            className="absolute top-1/2 left-0 -translate-y-1/2 h-full aspect-square flex items-center justify-center"
          >
            <ArrowLeftIcon size={28} />
          </Link>
        )
      }
      <h1 className="text-xl font-semibold">{title}</h1>
      {rightButtonNavigateTo &&
        (
          <Link
            to={rightButtonNavigateTo}
            className="absolute top-1/2 right-0 -translate-y-1/2 h-full aspect-square flex items-center justify-center"
          >
            <PlusCircleIcon size={30} />
          </Link>
        )
      }
    </header>
  )
}