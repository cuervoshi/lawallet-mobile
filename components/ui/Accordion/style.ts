import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  accordionPrimitive: {
    width: "100%",
    borderRadius: 8,
  },
  accordionContent: {
    flexDirection: "column",
  },
  accordionTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 16,
  },
  accordionBody: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
});
