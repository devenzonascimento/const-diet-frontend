import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ChevronButtonProps {
  isOpen: boolean;
  onClick?: () => void
  className?: string;
}

export const ChevronButton = ({ isOpen, onClick, className }: ChevronButtonProps) => {
  return (
    <button onClick={onClick} className={cn(className)}>
      {isOpen ? (
        <ChevronUp />
      ) : (
        <ChevronDown />
      )}
    </button>
  );
};
