import React from "react";
import Svg, { Path } from "react-native-svg";

export function CheckIcon({ color = "currentColor" }) {
  return (
    <Svg fill={color} viewBox="0 0 24 24" width={24} height={24}>
      <Path
        clipRule="evenodd"
        d="M18.381 5.354a.75.75 0 01.265 1.027l-7.087 12a.75.75 0 01-1.164.16L5.48 13.838a.75.75 0 011.038-1.084l4.23 4.051 6.605-11.185a.75.75 0 011.027-.265z"
        fillRule="evenodd"
        fill={color}
      />
    </Svg>
  );
}
