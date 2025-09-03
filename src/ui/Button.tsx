import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils.ts";
import { LoaderCircle } from "lucide-react";

type ButtonTypes = ButtonHTMLAttributes<object> & {
  loading?: boolean;
};

/**
 * Button component
 * */
function Button({ children, className, loading, disabled, ...props }: ButtonTypes) {
  return (
    <button
      disabled={loading ?? disabled}
      className={cn(
        "bg-primary rounded-lg text-lg cursor-pointer text-white font-medium px-4 py-1 relative disabled:opacity-50 disabled:cursor-default",
        className
      )}
      {...props}
    >
      {loading && (
        <LoaderCircle size={16} className="absolute animate-spin -translate-y-1/2 top-1/2 left-4 z-20 text-white" />
      )}
      {children}
    </button>
  );
}

export default Button;
