import React, { ReactElement } from "react";

type Variant = "PRIMARY" | "CANCEL" | "SECONDARY";

const VARIANTS: Record<Variant, string> = {
  CANCEL: "ring-2 ring-red-500 hover:bg-red-500",
  PRIMARY: "bg-zajavaBlue-600 hover:bg-zajavaBlue-700",
  SECONDARY: "ring-2 ring-zajavaBlue-600 hover:bg-zajavaBlue-600",
};

interface Props {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  onClick,
  variant,
  className,
  type,
}: Props): ReactElement {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`flex gap-2 items-center rounded-3xl px-4 py-3 ${
        VARIANTS[variant || "PRIMARY"]
      } ${className} duration-300 transition-colors text-sm font-semibold `}
    >
      {children}
    </button>
  );
}
