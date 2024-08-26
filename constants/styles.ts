import { baseTheme } from "@/components/ui/theme";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseTheme.colors.background,
    maxWidth: "100%",
    minHeight: "100%",
    fontWeight: 400,
    fontFamily: baseTheme.font.secondary,
  },
});
