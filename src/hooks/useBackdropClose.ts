import { RefObject, useEffect, useRef } from "react";

const useBackdropClose = (onClose: VoidFunction) => {
  const backdropRef = useRef<HTMLDialogElement>(null);

  const handleCloseModal = (target: EventTarget | null) => {
    if (backdropRef.current && backdropRef.current === target) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", ({ target }) =>
      handleCloseModal(target)
    );
    return () => {
      document.removeEventListener("mousedown", ({ target }) =>
        handleCloseModal(target)
      );
    };
  });

  return backdropRef as RefObject<HTMLDialogElement>;
};

export default useBackdropClose