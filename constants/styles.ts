import { baseTheme } from "@/components/ui/theme";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const globalStyles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: baseTheme.colors.background,
    maxWidth: "100%",
    minHeight: "100%",
    fontWeight: 400,
    fontFamily: baseTheme.font.secondary,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    backgroundColor: baseTheme.colors.background,
    width: "100%",
    height: "100%",
  },
});
