import { SplashScreen, Stack } from "expo-router";
import "react-native-reanimated";

import { NativeProvider } from "@/components/ui/NativeProvider";
import { I18nProvider } from "@/i18n/I18nProvider";
import { LaWalletProvider } from "@lawallet/react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { config } from "@/utils/constants";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
    <>
      <StatusBar style="auto" />
      <LaWalletProvider config={config} limits={{ transactionLimits: 50 }}>
        <NativeProvider>
          <I18nProvider>
            <Stack>
              <Stack.Screen
                name="(router)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </I18nProvider>
        </NativeProvider>
      </LaWalletProvider>
    </>
  );
}
