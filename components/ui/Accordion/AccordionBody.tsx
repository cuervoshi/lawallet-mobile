import React from "react";
import { View, ViewProps } from "react-native";

interface AccordionBodyProps extends ViewProps {
  children: React.ReactNode;
}

export function AccordionBody({
  children,
  style,
  ...rest
}: AccordionBodyProps) {
  return (
    <View style={[{ padding: 12 }, style]} {...rest}>
      {children}
    </View>
  );
}
