import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { baseTheme } from "../theme";
import { BaseButton } from "./style";
import { ButtonProps } from "./types";

export const Button = ({
  children,
  color = "primary",
  variant = "filled",
  size = "normal",
  loading = false,
  disabled = false,
  explicitLoader = (
    <ActivityIndicator size="large" color={baseTheme.colors.primary} />
  ),
  ...props
}: ButtonProps): JSX.Element => {
  const theme = useTheme();
  let backgroundColor: string = "transparent";
  let textColor: string = theme.colors.text;

  switch (variant) {
    case "filled":
      backgroundColor = theme.colors[color];
      textColor = theme.colors.background;
      break;
    case "bezeled":
      backgroundColor = theme.colors[`${color}15`];
      textColor = theme.colors[color];
      break;
    case "bezeledGray":
      backgroundColor = theme.colors.gray15;
      textColor = theme.colors[color];
      break;
    case "borderless":
      backgroundColor = "transparent";
      textColor = theme.colors[color];
      break;
  }

  return (
    <BaseButton
      $background={backgroundColor}
      $color={textColor}
      $isSmall={size === "small"}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? explicitLoader : children}
    </BaseButton>
  );
};
