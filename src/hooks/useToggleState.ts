import { useState } from "react";

const useToggleState = () => {
  const [booleanExp, setBooleanExp] = useState(false);
  const toggleBooleanExp = () => setBooleanExp(!booleanExp);

  return { booleanExp, toggleBooleanExp };
};

export default useToggleState;
