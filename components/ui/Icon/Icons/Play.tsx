import React from "react";
import Svg, { Path } from "react-native-svg";

export default function Component({ color = "currentColor" }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 19.1997L8.01001 4.96855"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.01001 4.79971L19.2102 11.9997L8.01001 19.1997"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
