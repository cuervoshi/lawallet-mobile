import { useNavigation } from "@react-navigation/native";
import React from "react";

import { Href, useRouter } from "expo-router";
import { appTheme } from "../../utils/theme";
import { Container } from "../ui/Container";
import { Flex } from "../ui/Flex";
import { Heading } from "../ui/Heading";
import { Icon } from "../ui/Icon/Icon";
import { CaretLeftIcon } from "../ui/Icon/Icons/CaretLeftIcon";
import { Text } from "../ui/Text";
import { BackButton, Left, Navbar, Right } from "./style";
import { useTranslations } from "@/i18n/I18nProvider";

interface ComponentProps {
  children?: React.ReactNode;
  title?: string;
  showBackPage?: boolean;
  overrideBack?: Href;
}

export default function Component(props: ComponentProps) {
  const { children, showBackPage = false, title, overrideBack = "" } = props;
  const { i18n } = useTranslations();

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
                  <CaretLeftIcon color={appTheme.colors.success} />
                </Icon>
                <Text color={appTheme.colors.success}>{i18n.t("BACK")}</Text>
              </BackButton>
            </Left>
          )}

          {title ? (
            <Flex justify="center">
              <Heading as="h5" color={appTheme.colors.white}>
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
