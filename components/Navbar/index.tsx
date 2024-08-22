import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text as RNText } from "react-native";

import { Container } from "../ui/Container";
import { Flex } from "../ui/Flex";
import { Heading } from "../ui/Heading";
import { Icon } from "../ui/Icon/Icon";
import { CaretLeftIcon } from "../ui/Icon/Icons/CaretLeftIcon";
import { BackButton, Left, Navbar } from "./style";

interface ComponentProps {
  children?: React.ReactNode;
  title?: string;
  showBackPage?: boolean;
  overrideBack?: string;
}

export default function Component(props: ComponentProps) {
  const { children, showBackPage = false, title, overrideBack = "" } = props;

  const navigation = useNavigation();

  return (
    <Navbar>
      <Container>
        <Flex direction="row" align="center" justify="space-between" flex={1}>
          {showBackPage && (
            <Left>
              <BackButton
                onPress={() => {
                  overrideBack
                    ? navigation.navigate(overrideBack as never)
                    : navigation.goBack();
                }}
              >
                <Icon size="small">
                  <CaretLeftIcon color="white" />
                </Icon>
                <RNText>Volver</RNText>
              </BackButton>
            </Left>
          )}

          {title ? (
            <Flex justify="center">
              <Heading as="h5">{title}</Heading>
            </Flex>
          ) : (
            children
          )}
        </Flex>
      </Container>
    </Navbar>
  );
}
