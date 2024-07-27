import { SquareCheckBigIcon, SquareIcon } from "lucide-react"
import { Button } from "./ui/button"

interface CheckButtonProps {
  isCheck: boolean
  onClick: VoidFunction
}

export const CheckButton = ({ isCheck, onClick }: CheckButtonProps) => {
  return (
    <Button type="submit" className="flex gap-2 bg-sky-700 hover:bg-sky-500"
      onClick={onClick}
    >
      {isCheck ?
        (
          <>
            <SquareCheckBigIcon />
            <p>Refeição concluída</p>
          </>
        ) : (
          <>
            <SquareIcon />
            <p>Marcar como concluída</p>
          </>
        )
      }
    </Button>
  )
}
