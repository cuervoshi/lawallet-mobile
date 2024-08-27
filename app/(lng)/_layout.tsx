import AuthProvider from "@/components/AppProviders/AuthProvider";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <AuthProvider>
      <Tabs
        screenOptions={{
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
        <Tabs.Screen
          name="deposit"
          options={{
            title: "Deposit",
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            title: "Scanner",
          }}
        />
      </Tabs>
    </AuthProvider>
  );
}
