import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "react-native-svg";

interface IconsProps extends SvgProps {
  color?: string;
}

export function ReceiveIcon({ color = "currentColor", ...props }: IconsProps) {
  return (
    <Svg fill={color} viewBox="0 0 24 24" {...props}>
      <Path
        clipRule="evenodd"
        d="M5 14.997a.75.75 0 01.75.75V18c0 .138.112.25.25.25h12a.25.25 0 00.25-.25v-2.253a.75.75 0 011.5 0V18A1.75 1.75 0 0118 19.75H6A1.75 1.75 0 014.25 18v-2.253a.75.75 0 01.75-.75zM12.202 4.25a.75.75 0 01.75.75v8.086a.75.75 0 01-1.5 0V5a.75.75 0 01.75-.75z"
        fillRule="evenodd"
      />
      <Path
        clipRule="evenodd"
        d="M8.322 10.626a.75.75 0 011.06-.013l2.82 2.755 2.82-2.755a.75.75 0 111.048 1.073l-3.344 3.267a.75.75 0 01-1.048 0l-3.344-3.267a.75.75 0 01-.012-1.06z"
        fillRule="evenodd"
      />
    </Svg>
  );
}
