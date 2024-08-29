import Logo from "@/components/Logo/Logo";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { appTheme } from "@/utils/theme";
import React from "react";
import { ActivityIndicator } from "react-native";
import MainContainer from "../ui/Container/MainContainer";

export const SpinnerView = ({ loadingText }: { loadingText?: string }) => {
  return (
    <MainContainer>
      <Divider y={24} />

      <Flex flex={1} direction="column" justify="space-between" align="center">
        <Divider y={24} />

        <Flex direction="column" justify="center" align="center">
          <Logo />

          <Text align="center" color={appTheme.colors.gray50}>
            v0.1
          </Text>
        </Flex>

        <Divider y={24} />

        <Flex flex={1} direction="column" justify="center" align="center">
          <ActivityIndicator size="large" color={appTheme.colors.primary} />
          <Text>{loadingText}</Text>
        </Flex>
      </Flex>

      <Divider y={24} />
    </MainContainer>
  );
};
