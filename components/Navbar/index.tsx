import { useNavigation } from "@react-navigation/native";
import React from "react";

import { Container } from "../ui/Container";
import { Flex } from "../ui/Flex";
import { Heading } from "../ui/Heading";
import { Icon } from "../ui/Icon/Icon";
import { CaretLeftIcon } from "../ui/Icon/Icons/CaretLeftIcon";
import { BackButton, Left, Navbar, Right } from "./style";
import { Text } from "../ui/Text";
import { baseTheme } from "../ui/theme";
import { Href, useRouter } from "expo-router";

interface ComponentProps {
  children?: React.ReactNode;
  title?: string;
  showBackPage?: boolean;
  overrideBack?: Href;
}

export default function Component(props: ComponentProps) {
  const { children, showBackPage = false, title, overrideBack = "" } = props;

  const navigation = useNavigation();
  const router = useRouter();

  return (
    <Navbar>
      <Container>
        <Flex direction="row" align="center" justify="space-between" flex={1}>
          {showBackPage && (
            <Left>
              <BackButton
                onPress={() => {
                  overrideBack
                    ? router.navigate(overrideBack as never)
                    : navigation.goBack();
                }}
              >
                <Icon size="small">
                  <CaretLeftIcon color={baseTheme.colors.success} />
                </Icon>
                <Text color={baseTheme.colors.success}>Volver</Text>
              </BackButton>
            </Left>
          )}

          {title ? (
            <Flex justify="center">
              <Heading as="h5" color={baseTheme.colors.white}>
                {title}
              </Heading>
            </Flex>
          ) : (
            children
          )}

          {!children && <Right></Right>}
        </Flex>
      </Container>
    </Navbar>
  );
}
