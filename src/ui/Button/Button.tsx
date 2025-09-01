import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn.ts";

type ButtonTypes = ButtonHTMLAttributes<object> & {};

function Button({ children, className }: ButtonTypes) {
  return (
    <button
      className={cn(
        "bg-primary rounded-lg text-lg cursor-pointer text-white font-medium px-4 py-1",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
