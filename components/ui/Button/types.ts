import { ReactElement, ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";

type Color = "primary" | "secondary" | "error" | "success";
type Variant = "filled" | "bezeled" | "bezeledGray" | "borderless";
type Size = "small" | "normal";

export interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  color?: Color;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  explicitLoader?: ReactElement;
}

export interface BaseButtonProps {
  $background?: string;
  $color?: string;
  $isSmall?: boolean;
}
