import { useState } from "react";

export const useToggleState = () => {
  const [booleanExp, setBooleanExp] = useState(false);
  const toggleBooleanExp = () => setBooleanExp(!booleanExp);

  return { booleanExp, toggleBooleanExp };
};
