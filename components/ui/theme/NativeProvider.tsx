import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components/native";
import { baseTheme } from "./";
import { ThemeProps } from "./types";

interface ProviderProps {
  children: ReactNode;
  theme?: ThemeProps;
}

export function NativeProvider(props: ProviderProps) {
  const { children, theme = baseTheme } = props;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
