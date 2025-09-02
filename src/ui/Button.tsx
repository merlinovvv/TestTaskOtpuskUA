import type { ButtonHTMLAttributes } from "react";
import { utils } from "../lib/utils.ts";
import { LoaderCircle } from "lucide-react";

type ButtonTypes = ButtonHTMLAttributes<object> & {
  loading?: boolean;
};

function Button({ children, className, loading, ...props }: ButtonTypes) {
  return (
    <button
      disabled={props.disabled || loading}
      className={utils(
        "bg-primary rounded-lg text-lg cursor-pointer text-white font-medium px-4 py-1 relative disabled:opacity-50 disabled:cursor-default",
        className,
      )}
      {...props}
    >
      {loading && (
        <LoaderCircle
          size={16}
          className="absolute animate-spin -translate-y-1/2 top-1/2 left-4 z-20 text-white"
        />
      )}
      {children}
    </button>
  );
}

export default Button;
