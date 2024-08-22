import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "react-native-svg";

interface SatoshiV2IconProps extends SvgProps {}

export function SatoshiV2Icon(props: SatoshiV2IconProps) {
  const { color = "currentColor" } = props;

  return (
    <Svg viewBox="0 0 24 24" fill={color} {...props}>
      <Path
        fillRule="evenodd"
        d="M12.75 18.5V21h-1.5v-2.5h1.5zM17 16.75H7v-1.5h10v1.5zM17 12.75H7v-1.5h10v1.5zM17 8.75H7v-1.5h10v1.5zM12.75 3v2.5h-1.5V3h1.5z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
