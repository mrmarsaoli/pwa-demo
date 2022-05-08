import React from "react";
import IconBell from "./IconBell";
import IconBellOutline from "./IconBellOutline";
import IconCheck from "./IconCheck";
import IconCheckOutline from "./IconCheckOutline";
import IconX from "./IconX";
import IconXOutline from "./IconXOutline";
import IconInformationCircle from "./IconInformationCircle";
import IconInformationCircleOutline from "./IconInformationCircleOutline";

interface IconProps {
  /**
   * Icon name
   */
  name?: keyof typeof iconMap;
  /**
   *  Size of icons
   */
  size?: keyof typeof iconSizeMap;
  /**
   * Icon color
   */
  color?: string;
  /**
   * Custom icon width
   */
  width?: number;
  /**
   * Custom icon height
   */
  height?: number;
  /**
   * Optional on click event
   */
  onClick?: () => void;
}

export const Icon = ({
  name = "",
  size = "md",
  color,
  width,
  height,
  onClick,
}: IconProps) => {
  const handleClick = () => {
    if (!onClick) {
      return;
    }

    onClick();
  };

  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 ${iconSizeMap[size]}`}
      style={{ color, width: width, height: height || width }}
      role={!!onClick ? "button" : undefined}
      onClick={() => handleClick()}
    >
      {iconMap[name]}
    </span>
  );
};

export const iconSizeMap = {
  xs: "w-2 h-2",
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
};

export const iconMap = {
  "": <></>,
  bell: <IconBell></IconBell>,
  "bell-outline": <IconBellOutline></IconBellOutline>,
  check: <IconCheck></IconCheck>,
  "check-outline": <IconCheckOutline></IconCheckOutline>,
  "information-circle": <IconInformationCircle></IconInformationCircle>,
  "information-circle-outline": (
    <IconInformationCircleOutline></IconInformationCircleOutline>
  ),
  x: <IconX></IconX>,
  "x-outline": <IconXOutline></IconXOutline>,
};
