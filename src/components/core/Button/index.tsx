import type { ReactElement, CSSProperties } from "react";
import "./styles.scss";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "destructive"
  | "success"
  | "ghost"
  | "none";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  id?: string;
  label?: string | ReactElement;
  btnType?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  innerClasses?: string;
  labelClasses?: string;
  showLoader?: boolean;
  loadingText?: string;
  loadingTextClasses?: string;
  disabled?: boolean;
  textAlignment?: string;
};

export default function Button({
  id = "",
  label = "",
  btnType = "button",
  variant = "primary",
  size = "md",
  style = {},
  onClick = () => {},
  className = "",
  innerClasses = "",
  labelClasses = "",
  showLoader = false,
  loadingText = "",
  loadingTextClasses = "",
  disabled = false,
  textAlignment = "center",
}: ButtonProps) {
  return (
    <button
      id={id}
      type={btnType}
      style={style}
      onClick={!showLoader ? onClick : undefined}
      className={`${className} disabled:cursor-not-allowed ${showLoader ? `cursor-not-allowed btn-${variant}-loader` : `btn-${variant}`} shadow-sm hover:shadow-md transition-all duration-200 relative cursor-default rounded-2xl flex btn-${size} py-2 justify-${textAlignment} items-center`}
      disabled={disabled}
    >
      {showLoader ? (
        <div
          className={`${innerClasses} flex items-center justify-center gap-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 animate-spin"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          {loadingText && (
            <span
              className={`${loadingTextClasses} ${["secondary", "tertiary", "ghost"].includes(variant) ? "text-gray-900" : "text-white"}`}
            >
              {loadingText}
            </span>
          )}
        </div>
      ) : (
        <div
          className={`flex justify-center items-center gap-2 ${innerClasses}`}
        >
          {typeof label === "string" ? (
            <span className={`flex w-max ${labelClasses} btn-${variant}-font`}>
              {label}
            </span>
          ) : (
            label
          )}
        </div>
      )}
    </button>
  );
}
