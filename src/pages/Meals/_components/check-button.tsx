import { Button } from "@/components/ui/button"
import { Square, SquareCheckBig } from "lucide-react"

interface CheckButtonProps {
  isCheck: boolean
  toggleCheck: VoidFunction
}

export const CheckButton = ({ isCheck, toggleCheck}: CheckButtonProps) => {
  return (
    <Button type="submit" className="flex gap-2 bg-sky-700 hover:bg-sky-500"
      onClick={toggleCheck}
    >
      {isCheck ?
        (
          <>
            <SquareCheckBig />
            <p>Refeição concluída</p>
          </>
        ) : (
          <>
            <Square />
            <p>Marcar como concluída</p>
          </>
        )
      }
    </Button>
  )
}