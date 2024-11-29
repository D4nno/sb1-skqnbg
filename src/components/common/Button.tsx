import * as React from "react";
import { Button as NativeButton } from "@nativescript/core";

interface ButtonProps {
  text: string;
  onTap: () => void;
  variant?: "primary" | "link";
  className?: string;
}

export function Button({ text, onTap, variant = "primary", className = "" }: ButtonProps) {
  const baseClass = "btn";
  const variantClass = variant === "primary" ? "btn-primary" : "btn-link";
  const combinedClassName = `${baseClass} ${variantClass} ${className}`.trim();

  return (
    <button className={combinedClassName} onTap={onTap}>
      {text}
    </button>
  );
}