import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ChevronButtonProps {
  isOpen: boolean;
}

export const ChevronButton = ({ isOpen }: ChevronButtonProps) => {
  return (
    <Button variant={"ghost"} className="p-0">
      {isOpen ? (
        <ChevronUp className="text-sky-700" />
      ) : (
        <ChevronDown className="text-sky-700" />
      )}
    </Button>
  );
};
