import Logo from "@/components/Logo/Logo";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { baseTheme } from "@/components/ui/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Loader } from "../ui/Loader/Loader";

export const SpinnerView = ({ loadingText }: { loadingText?: string }) => {
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

        <Flex flex={1} direction="column" justify="center" align="center">
          <Loader />
          <Text>{loadingText}</Text>
        </Flex>
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
