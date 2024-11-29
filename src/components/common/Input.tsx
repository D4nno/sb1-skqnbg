import * as React from "react";
import { TextField } from "@nativescript/core";

interface InputProps {
  value: string;
  onTextChange: (value: string) => void;
  hint: string;
  secure?: boolean;
  keyboardType?: "email" | "text" | "number";
  className?: string;
}

export function Input({
  value,
  onTextChange,
  hint,
  secure = false,
  keyboardType = "text",
  className = ""
}: InputProps) {
  const baseClass = "input";
  const combinedClassName = `${baseClass} ${className}`.trim();

  return (
    <TextField
      className={combinedClassName}
      hint={hint}
      text={value}
      secure={secure}
      keyboardType={keyboardType}
      autocorrect={false}
      autocapitalizationType="none"
      onTextChange={(args) => onTextChange(args.value)}
    />
  );
}