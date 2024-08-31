import styled from "styled-components/native";
import { ContainerPrimitiveProps } from "./types";
import { StyleSheet } from "react-native";
import { appTheme } from "@/utils/theme";
import Constants from "expo-constants";

export const ContainerPrimitive = styled.View<ContainerPrimitiveProps>`
  flex: 1;
  flex-direction: "column";
  width: 100%;
  max-width: ${(props) => (props.$isSmall ? "75%" : "100%")};
  padding: 0 16px;
`;

export const globalStyles = StyleSheet.create({
  layout: {
    backgroundColor: appTheme.colors.background,
    minWidth: "100%",
    minHeight: "100%",
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
    width: "100%",
    height: "100%",
  },
});
