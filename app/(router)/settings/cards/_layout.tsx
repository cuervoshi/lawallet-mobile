import { CardsProvider } from "@/app/screens/Settings/Cards/context/CardsContext";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <CardsProvider>
      <Tabs
        screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
      />
    </CardsProvider>
  );
}
