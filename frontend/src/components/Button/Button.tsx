import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

export const Button = ({
  variant = "primary",
  isLoading = false,
  loadingText = "Processing...",
  fullWidth = false,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) => {
  let buttonStyling =
    "flex justify-center items-center py-2 px-4 border text-sm font-medium rounded-md";

  if (variant === "primary") {
    buttonStyling +=
      " text-white bg-teal-500 hover:bg-teal-600 border-transparent";
  } else if (variant === "secondary") {
    buttonStyling +=
      " text-gray-700 bg-gray-100 hover:bg-gray-200 border-gray-300";
  }

  if (fullWidth) {
    buttonStyling += " w-full";
  }

  if (disabled || isLoading) {
    buttonStyling += " opacity-70 cursor-not-allowed";
  } else {
    buttonStyling += " cursor-pointer";
  }

  if (className) {
    buttonStyling += ` ${className}`;
  }

  return (
    <button
      className={buttonStyling}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <span className="mr-2">{loadingText}</span>
          <span className="btn-loader"></span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
