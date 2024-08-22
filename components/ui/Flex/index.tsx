import React from "react";
import { View, StyleSheet } from "react-native";

interface FlexProps {
  children?: React.ReactNode;
  gap?: number;
  direction?: "row" | "column";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  flex?: number;
}

export function Flex({
  children,
  gap = 0,
  direction = "row",
  justify = "flex-start",
  align = "flex-start",
  flex = 0,
}: FlexProps): JSX.Element {
  const isRowDirection = direction === "row";

  const childrenWithGap = React.Children.toArray(children).map(
    (child, index) => (
      <View
        key={index}
        style={[
          isRowDirection
            ? {
                marginLeft: gap,
                marginRight: gap,
              }
            : {
                marginTop: gap,
                marginBottom: gap,
              },
        ]}
      >
        {child}
      </View>
    )
  );

  return (
    <View
      style={[
        styles.flexContainer,
        {
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          flex,
        },
      ]}
    >
      {childrenWithGap}
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    width: "100%",
  },
});
