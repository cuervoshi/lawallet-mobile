import Logo from "@/components/Logo/Logo";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { baseTheme } from "@/components/ui/theme";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const index = () => {
  const router = useRouter();

  return (
    <View style={backgroundStyles.container}>
      <Divider y={24} />

      <Flex flex={1} direction="column" justify="space-between" align="center">
        <Divider y={24} />

        <Flex direction="column" justify="center" align="center">
          <Logo />

          <Text align="center" color={baseTheme.colors.gray50}>
            v0.1
          </Text>
        </Flex>

        <Divider y={24} />

        <Button size="small" onPress={() => router.push("/(tabs)/login")}>
          <Text>Iniciar sesión</Text>
        </Button>
      </Flex>

      <Divider y={24} />
    </View>
  );
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
