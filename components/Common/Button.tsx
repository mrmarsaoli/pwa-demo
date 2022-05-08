import React from "react";

interface ButtonProps {
  /**
   * Text or label of button
   */
  text: string;
  /**
   * What type of button
   */
  type?: keyof typeof buttonTypeMap;
  /**
   * How big the button
   */
  size?: keyof typeof buttonSizeMap;
  /**
   * Set button width manually
   */
  width?: number;
  /**
   * Overwrite text color
   */
  color?: string;
  /**
   * Overwrite background color
   */
  backgroundColor?: string;
  /**
   * Is button disabled
   */
  disabled?: boolean;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Icon for button
   */
  icon?: JSX.Element;
  /**
   * Icon position
   */
  iconPosition?: "left" | "right";
  /**
   * Passing element
   */
  children?: JSX.Element;
  /**
   * Full width button state
   */
  fullWidth?: boolean;
  /**
   * Optional click event
   */
  onClick?: () => void;
  /**
   * Option click event when disabled
   */
  onDisabledClick?: () => void;
}

export const Button = ({
  text,
  type = "secondary",
  size = "md",
  width,
  color,
  backgroundColor,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  children,
  fullWidth = false,
  onClick,
  onDisabledClick,
}: ButtonProps) => {
  const handleClick = () => {
    if (loading) {
      return;
    }

    if (disabled) {
      if (onDisabledClick) onDisabledClick();
      return;
    }

    if (!onClick) {
      return;
    }

    onClick();
  };

  return (
    <>
      <button
        type="button"
        className={`inline-flex items-center justify-center relative text-center overflow-hidden flex-shrink-0 flex-grow-0 leading-normal rounded-lg border ${
          disabled
            ? "bg-neutrals-200 text-neutrals-800 focus:ring-0 border-0 hover:bg-neutrals-300"
            : `${buttonTypeMap[type]} ${buttonSizeMap[size].ring}`
        } ${buttonSizeMap[size].wrap}`}
        style={{
          width: fullWidth ? "100%" : width,
          color,
          backgroundColor,
          minWidth: !!children ? 0 : undefined,
        }}
        onClick={() => handleClick()}
        role="button"
        aria-label="button"
        data-testid="button_component"
      >
        {loading && (
          <div className="absolute left-0 top-0 w-full h-full bg-white opacity-50"></div>
        )}
        {!!children ? (
          children
        ) : (
          <>
            {!!icon && iconPosition === "left" && (
              <>
                {icon}
                <div className={buttonSizeMap[size].iconMargin}></div>
              </>
            )}
            <span className="inline-block font-bold">{text}</span>
            {!!icon && iconPosition === "right" && (
              <>
                <div className={buttonSizeMap[size].iconMargin}></div>
                {icon}
              </>
            )}
          </>
        )}
      </button>
    </>
  );
};

const buttonTypeMap = {
  primary:
    "bg-primary-500 text-neutrals-light focus:ring-primary-300 hover:bg-primary-700 border-transparent",
  secondary:
    "bg-secondary-400 text-neutrals-800 focus:ring-secondary-400 hover:bg-secondary-500 border-transparent",
  tertiary:
    "bg-neutrals-700 text-neutrals-light focus:ring-neutrals-500 hover:bg-neutrals-800 border-transparent",
  success:
    "bg-green-500 text-neutrals-light focus:ring-green-400 hover:bg-green-800 border-transparent",
  error:
    "bg-red-500 text-neutrals-light focus:ring-red-400 hover:bg-red-800 border-transparent",
  warning:
    "bg-amber-600 text-neutrals-light focus:ring-amber-500 hover:bg-amber-800 border-transparent",
  information:
    "bg-blue-600 text-neutrals-light focus:ring-blue-500 hover:bg-blue-900 border-transparent",
  outlined:
    "bg-neutrals-light text-neutrals-900 focus:ring-primary-200 hover:bg-neutrals-50 border-neutrals-400 focus:border-neutrals-light",
};

const buttonSizeMap = {
  xs: {
    wrap: "px-3 py-2 text-xs min-w-button-xs",
    ring: "focus:ring-2",
    iconMargin: "w-2",
  },
  sm: {
    wrap: "px-3 py-2 text-sm min-w-button-sm",
    ring: "focus:ring-2",
    iconMargin: "w-2",
  },
  md: {
    wrap: "px-4.5 py-2.5 text-sm min-w-button-md",
    ring: "focus:ring-3",
    iconMargin: "w-2",
  },
  lg: {
    wrap: "px-4.5 py-3 text-base min-w-button-lg",
    ring: "focus:ring-3",
    iconMargin: "w-3",
  },
  xl: {
    wrap: "px-6 py-3.5 text-base min-w-button-xl",
    ring: "focus:ring-3",
    iconMargin: "w-3",
  },
};
