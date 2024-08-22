import AuthProvider from "@/components/AppProviders/AuthProvider";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="login"
          options={{
            title: "Login",
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
          }}
        />
      </Tabs>
    </AuthProvider>
  );
}
