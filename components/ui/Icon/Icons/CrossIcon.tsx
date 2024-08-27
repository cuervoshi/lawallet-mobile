import React from "react";
import Svg, { Path } from "react-native-svg";

function CrossIcon(props: { color?: string }) {
  const { color = "currentColor" } = props;
  return (
    <Svg viewBox="0 0 24 24" fill={color} {...props}>
      <Path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0l12 12a.75.75 0 11-1.06 1.06l-12-12a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
      <Path
        fillRule="evenodd"
        d="M18.53 5.47a.75.75 0 010 1.06l-12 12a.75.75 0 01-1.06-1.06l12-12a.75.75 0 011.06 0z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export default CrossIcon;
