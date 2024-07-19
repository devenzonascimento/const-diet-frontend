import { Link } from "react-router-dom"

import { ArrowLeftIcon, PlusCircleIcon, } from "lucide-react"
import { DropdownMenu } from "./dropdown-menu";

interface HeaderProps {
  title: string;
  leftButtonNavigateTo: string;
  rightButtonNavigateTo?: string;
  isRightButtonOptions?: boolean;
  onEditOptionClick?: () => void;
  onDeleteOptionClick?: () => void;
}

export const Header = ({
  title,
  leftButtonNavigateTo,
  rightButtonNavigateTo,
  isRightButtonOptions,
  onEditOptionClick,
  onDeleteOptionClick,
}: HeaderProps) => {

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
      {(rightButtonNavigateTo && !isRightButtonOptions) &&
        (
          <Link
            to={rightButtonNavigateTo}
            className="absolute top-1/2 right-0 -translate-y-1/2 h-full aspect-square flex items-center justify-center"
          >
            <PlusCircleIcon size={30} />
          </Link>
        )
      }
      {(isRightButtonOptions && onEditOptionClick && onDeleteOptionClick) && (
        <DropdownMenu
          alertDialogTitle="Você tem certeza?"
          alertDialogDescription="Essa ação não pode ser desfeita. Isso excluirá permanentemente essa rotina da sua lista de rotinas."
          onEditOptionClick={onEditOptionClick}
          onDeleteOptionClick={onDeleteOptionClick}
        />
      )}
    </header>
  )
}
