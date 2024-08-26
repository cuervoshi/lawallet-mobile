import { baseTheme } from "@/components/ui/theme";
import DashboardView from "@/views/Dashboard";
import LoginView from "@/views/Login";
import { useIdentity } from "@lawallet/react";
import React from "react";
import { StyleSheet } from "react-native";

const index = () => {
  const identity = useIdentity();

  if (Boolean(identity.pubkey.length)) {
    return <DashboardView />;
  } else {
    return <LoginView />;
  }
};

export const backgroundStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseTheme.colors.background,
    maxWidth: "100%",
    minHeight: "100%",
  },
});

export default index;
