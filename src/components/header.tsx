import { Link } from "react-router-dom"

import { ArrowLeftIcon, PlusCircleIcon, } from "lucide-react"
import { DropdownMenu } from "./dropdown-menu";

type HeaderProps = {
  title: string;
}

type LeftButtonProps =
  | { leftButtonNavigateTo: string }
  | { leftButtonNavigateTo?: never }


type RightButtonProps =
  | { rightButtonNavigateTo?: never; rightButtonOptions?: never; }
  | { rightButtonNavigateTo: string; rightButtonOptions?: never; }
  | {
    rightButtonNavigateTo?: never;
    rightButtonOptions: {
      onEditOptionClick: () => void;
      onDeleteOptionClick: () => void;
    };
  }



export const Header = ({
  title,
  leftButtonNavigateTo,
  rightButtonNavigateTo,
  rightButtonOptions
}: HeaderProps & LeftButtonProps & RightButtonProps) => {

  return (
    <header className="relative h-16 w-full flex justify-center items-center py-3 text-white bg-sky-800">
      {leftButtonNavigateTo &&
        (
          <Link
            to={leftButtonNavigateTo}
            className="absolute top-1/2 left-0 -translate-y-1/2 h-full aspect-square flex items-center justify-center"
          >
            <ArrowLeftIcon size={36} />
          </Link>
        )
      }
      <h1 className="text-2xl font-semibold">{title}</h1>
      {(rightButtonNavigateTo && !rightButtonOptions) &&
        (
          <Link
            to={rightButtonNavigateTo}
            className="absolute top-1/2 right-0 -translate-y-1/2 h-full aspect-square flex items-center justify-center"
          >
            <PlusCircleIcon size={34} />
          </Link>
        )
      }
      {rightButtonOptions && (
        <DropdownMenu
          alertDialogTitle="Você tem certeza?"
          alertDialogDescription="Essa ação não pode ser desfeita. Isso excluirá permanentemente essa rotina da sua lista de rotinas."
          onEditOptionClick={rightButtonOptions.onEditOptionClick}
          onDeleteOptionClick={rightButtonOptions.onDeleteOptionClick}
        />
      )}
    </header>
  )
}
