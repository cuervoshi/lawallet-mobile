import { SplashScreen, Stack } from "expo-router";
import "react-native-reanimated";

import { NativeProvider } from "@/components/ui/NativeProvider";
import { globalStyles } from "@/utils/constants";
import { createConfig, LaWalletProvider } from "@lawallet/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import MainContainer from "@/components/ui/Container/MainContainer";

const config = createConfig({
  storage: AsyncStorage,
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "IAAB3-Mono": require("../assets/fonts/IAAB3.ttf"),
    "SF Pro Text": require("../assets/fonts/SF-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={globalStyles.layout}>
      <GestureHandlerRootView>
        <StatusBar style="auto" />
        <LaWalletProvider config={config} limits={{ transactionLimits: 50 }}>
          <NativeProvider>
            <MainContainer>
              <Stack>
                <Stack.Screen
                  name="(router)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
            </MainContainer>
          </NativeProvider>
        </LaWalletProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
