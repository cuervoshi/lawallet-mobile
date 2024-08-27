import { LNURLProvider } from "@/context/LNURLContext";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <LNURLProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
    </LNURLProvider>
  );
}
