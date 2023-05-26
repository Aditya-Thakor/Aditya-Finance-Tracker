import { ChangeEventHandler } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface InputProps {
  label?: string;
  name: string;
  type: string;
  className?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  errors?: FieldErrors;
  options?: object;
  onchange?: ChangeEventHandler<unknown>;
  register?: UseFormRegister<FieldValues>;
}
