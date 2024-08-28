import React from "react";
import Svg, { Path } from "react-native-svg";

export default function Component({ color = "currentColor" }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 17.6001L16 6.4001"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M8 17.6001L7.99999 6.39986"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}
