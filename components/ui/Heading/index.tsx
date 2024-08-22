import React from "react";
import { HeadingProps } from "./types";
import { HeadingPrimitive } from "./style";

export function Heading(props: HeadingProps): JSX.Element {
  const { children, as = "h1", align = "left", color } = props;

  return (
    <HeadingPrimitive $align={align} $color={color} $as={as}>
      {children}
    </HeadingPrimitive>
  );
}
