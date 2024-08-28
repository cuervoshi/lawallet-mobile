import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components/native";
import { appTheme } from "../../utils/theme";
import { ThemeProps } from "../../utils/theme/types";

interface ProviderProps {
  children: ReactNode;
  theme?: ThemeProps;
}

export function NativeProvider(props: ProviderProps) {
  const { children, theme = appTheme } = props;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
