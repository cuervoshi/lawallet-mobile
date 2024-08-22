import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export function VisibleIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <Path d="M12 14a2 2 0 100-4 2 2 0 000 4z" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 12c0 2.761-4.03 5-9 5s-9-2.239-9-5 4.03-5 9-5 9 2.239 9 5zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </Svg>
  );
}
