import { useBackdropClose } from "@/hooks/useBackdropClose";
import { ReactNode } from "react";

interface ModalBackdropProps {
  onClose: VoidFunction;
  children: ReactNode;
}

export const ModalBackdrop = ({ children, onClose }: ModalBackdropProps) => {
  const backdropRef = useBackdropClose(onClose);

  return (
    <dialog
      className="fixed top-0 z-10 h-screen w-screen flex justify-center items-center bg-black/70"
      ref={backdropRef}
    >
      {children}
    </dialog>
  );
};