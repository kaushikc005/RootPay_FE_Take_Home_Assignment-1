import { forwardRef, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  labelClasses?: string;
  required?: boolean;
  error?: string | null;
  helperText?: string;
  size?: InputSize;
  containerClassName?: string;
  multiline?: boolean;
  rows?: number;
}

const sizeClasses: Record<InputSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-3.75 py-2.5 text-sm",
  lg: "px-3.75 py-4 text-lg",
};

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      label,
      labelClasses = "",
      required = false,
      error,
      helperText,
      size = "md",
      className = "",
      containerClassName = "",
      disabled = false,
      multiline = false,
      rows = 3,
      id,
      type,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);

    const stateClasses = disabled
      ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
      : error
        ? "bg-white border-red-500 text-gray-900 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        : "bg-white border-[#729CF0] text-gray-900 focus:border-[#729CF0] focus:ring-2 focus:ring-[#729CF0]/20";

    const inputClasses = `w-full rounded-xl border transition-all duration-200 outline-none ${multiline ? "" : "h-[44px]"} placeholder:text-gray-400 font-normal shadow-sm ${sizeClasses[size]} ${stateClasses} ${isPassword ? "pr-10" : ""} ${className}`;

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2.5">
            <span className={`${labelClasses} text-xs`}>{label}</span>
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={inputId}
              disabled={disabled}
              className={inputClasses}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : helperText ? helperId : undefined}
              rows={rows}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              id={inputId}
              disabled={disabled}
              className={inputClasses}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : helperText ? helperId : undefined}
              type={isPassword ? (showPassword ? "text" : "password") : type}
              {...props}
            />
          )}

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>

        {error && (
          <p id={errorId} className="mt-2 text-sm text-red-600 font-medium" role="alert" aria-live="polite">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="mt-2 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
