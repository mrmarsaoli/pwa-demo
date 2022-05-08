import { MouseEventHandler, ChangeEvent, useState } from "react";
import { Spacer } from "../Common";

interface TextFieldProps {
  /**
   * Label for input
   */
  label?: string;
  /**
   * Append component beside the label
   */
  labelAppend?: JSX.Element;
  /**
   * Type of input
   */
  type?: "text" | "email" | "password";
  /**
   * Input name
   */
  name?: string;
  /**
   * Variant of the text field
   */
  variant?: "success" | "error";
  /**
   * SVG icon
   */
  icon?: JSX.Element;
  /**
   * Postition of icon
   */
  iconPosition?: "left" | "right";
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * Wrapper classname
   */
  className?: string;
  /**
   * Specify input size
   */
  size?: keyof typeof inputSizeMap;
  /**
   * Value of input
   */
  value?: string;
  /**
   * Prepend element before input
   */
  prepend?: JSX.Element | JSX.Element[];
  /**
   * Append element after input
   */
  append?: JSX.Element | JSX.Element[];
  /**
   * Disable input
   */
  disabled?: boolean;
  /**
   * Define input width
   */
  width?: number;
  /**
   * Define input id
   */
  id?: string;
  /**
   * Input captions, can put success/error message here
   */
  captions?: string;
  /**
   * Optional character counter
   */
  counter?: boolean;
  /**
   * Maximum character length
   */
  maxLength?: number;
  /**
   * Optional input event
   */
  onInput?: (value: string) => void;
  /**
   * Optional click input event
   */
  onClick?: MouseEventHandler<HTMLDivElement>;
  /**
   * Optional max character limit event
   */
  onReachedMaxCount?: () => void;
  /**
   * Optional on focus event
   */
  onFocus?: () => void;
  /**
   * Optional on blur event
   */
  onBlur?: () => void;
}

export const TextField = ({
  label,
  labelAppend,
  type = "text",
  name,
  variant,
  icon,
  iconPosition = "left",
  placeholder,
  className,
  size = "md",
  value = "",
  prepend,
  append,
  disabled = false,
  width,
  id,
  captions = "",
  counter = false,
  maxLength = 30,
  onInput,
  onClick,
  onReachedMaxCount,
  onFocus,
  onBlur,
}: TextFieldProps) => {
  const [isFocus, setFocus] = useState(false);
  const characaterCount = value.length;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onInput || disabled) {
      return;
    }

    onInput(e.target.value);

    if (e.target.value.length >= maxLength) {
      handleReachedMaxCount();
    }
  };

  const handleReachedMaxCount = () => {
    if (!onReachedMaxCount) {
      return;
    }

    onReachedMaxCount();
  };

  const handleFocus = (_value: boolean) => {
    setFocus(_value);

    if (_value) {
      if (onFocus) onFocus();
      return;
    }

    if (onBlur) onBlur();
  };

  return (
    <>
      <div className={className}>
        {!!label && (
          <div className="mb-1 flex items-center">
            <label
              className="text-sm text-neutrals-800 leading-normal font-medium block"
              htmlFor={id}
            >
              {label}
            </label>
            {!!labelAppend && <div className="ml-1">{labelAppend}</div>}
          </div>
        )}
        <div
          className={`flex border text-base rounded-lg w-full items-center relative px-4 py-3.5 ${
            inputSizeMap[size]
          } ${
            disabled
              ? "bg-neutrals-100 border-neutrals-400"
              : !!variant
              ? inputVariantMap[variant].input
              : isFocus
              ? "border-primary-500 text-neutrals-800 bg-neutrals-light"
              : "bg-neutrals-light text-neutrals-500 border-neutrals-400"
          }`}
          onClick={onClick}
          style={{
            width: width || "auto",
          }}
        >
          {prepend}
          {iconPosition === "left" && (
            <span
              className={!!icon ? "mr-2.5 flex-shrink-0 flex items-center" : ""}
            >
              {icon}
            </span>
          )}
          <input
            className="flex-grow flex-shrink min-w-0 outline-none bg-opacity-0 bg-transparent placeholder:text-neutrals-400 disabled:text-neutrals-400"
            style={{ fontSize: "inherit" }}
            type={type}
            name={name || ""}
            disabled={disabled}
            onFocus={() => handleFocus(true)}
            onBlur={() => handleFocus(false)}
            value={value}
            onInput={handleInput}
            placeholder={placeholder || ""}
            maxLength={maxLength}
            id={id}
          />
          {iconPosition === "right" && (
            <span
              className={!!icon ? "ml-2.5 flex-shrink-0 flex items-center" : ""}
            >
              {icon}
            </span>
          )}
          {append}
        </div>
        {(captions.length > 0 || counter) && (
          <div
            className={`flex mt-1 text-xs leading-normal ${
              !!variant
                ? inputVariantMap[variant].captions
                : "text-neutrals-500"
            }`}
          >
            {captions.length > 0 && <span>{captions}</span>}
            <Spacer></Spacer>
            {counter && (
              <span>
                {characaterCount}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const inputSizeMap = {
  md: "text-base leading-none",
  lg: "text-base leading-normal",
};

const inputVariantMap = {
  success: {
    input: "text-neutrals-800 border-green-500",
    captions: "text-green-500",
  },
  error: {
    input: "text-neutrals-800 border-red-500",
    captions: "text-red-500",
  },
};
