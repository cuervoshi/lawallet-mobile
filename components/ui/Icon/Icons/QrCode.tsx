import React from "react";
import Svg, { Path } from "react-native-svg";

interface IconsProps {
  color?: string;
}

export function QrCodeIcon({ color = "currentColor" }: IconsProps) {
  return (
    <Svg fill={color} viewBox="0 0 24 24" width={24} height={24}>
      <Path
        clipRule="evenodd"
        d="M5 5h4.5v4.5H5V5zm1.5 1.5V8H8V6.5H6.5zM14.5 5H19v4.5h-4.5V5zM16 6.5V8h1.5V6.5H16zM5 14.5h4.5V19H5v-4.5zM6.5 16v1.5H8V16H6.5z"
        fillRule="evenodd"
      />
      <Path d="M5 11.25h1.5v1.5H5zM8 11.25h1.5v1.5H8zM11.167 11.25h1.5v1.5h-1.5zM11.167 14.375h1.5v1.5h-1.5zM11.167 17.5h1.5V19h-1.5zM11.167 8.125h1.5v1.5h-1.5zM11.167 5h1.5v1.5h-1.5zM14.333 11.25h1.5v1.5h-1.5zM17.5 11.25H19v1.5h-1.5zM14.333 14.375h1.5v1.5h-1.5zM17.5 14.375H19v1.5h-1.5zM14.333 17.5h1.5V19h-1.5zM17.5 17.5H19V19h-1.5z" />
    </Svg>
  );
}
