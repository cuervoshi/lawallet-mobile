import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export function AlertIcon({ color = "currentColor" }) {
  return (
    <Svg fill={color} viewBox="0 0 24 24" width={24} height={24}>
      <Circle cx="12" cy="16.75" r="1.25" fill={color} />
      <Path d="M11 6h2v8h-2z" fill={color} />
    </Svg>
  );
}
