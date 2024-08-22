import React from "react";
import { IconProps } from "./types";
import { IconPrimitive } from "./style";
import Svg, { SvgProps } from "react-native-svg";

export function Icon(props: IconProps) {
  const { children, size = "normal", color = "currentColor" } = props;
  const isSmall = size === "small";

  return (
    <IconPrimitive $color={color} $isSmall={isSmall}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<SvgProps>(child) && child.type === Svg) {
          return React.cloneElement(child, {
            width: isSmall ? 18 : 24,
            height: isSmall ? 18 : 24,
            fill: color,
          } as SvgProps);
        }
        return child;
      })}
    </IconPrimitive>
  );
}
