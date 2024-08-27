import React from "react";
import { Text } from "react-native";

import { LabelPrimitive } from "./style";
import { LabelProps } from "./types";

export function Label(props: LabelProps) {
  const { children } = props;

  return (
    <LabelPrimitive>
      <Text style={{ fontSize: 12, color: "white" }}>{children}</Text>
    </LabelPrimitive>
  );
}
