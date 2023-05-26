import { MouseEventHandler } from "react";

export interface ButtonProps {
  name?: string;
  type: "submit" | "reset" | "button";
  label: string;
  value?: string;
  className?: string;
  onClick?: MouseEventHandler<unknown>;
}
