import { ReactNode } from "react";

type WhenProps = {
  expr: boolean | (() => boolean);
  children: ReactNode;
};

export const When = ({ expr, children }: WhenProps) => {
  if (typeof expr === "function" && !expr()) return <></>;
  if (!expr) return <></>;

  return children;
};
