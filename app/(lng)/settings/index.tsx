import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import MainContainer from "@/components/ui/Container/MainContainer";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Feedback } from "@/components/ui/Input/Feedback";
import { LinkSetting } from "@/components/ui/LinkSetting";
import { Text } from "@/components/ui/Text";
import { baseTheme } from "@/components/ui/theme";
import useErrors from "@/hooks/useErrors";
import { CACHE_BACKUP_KEY, STORAGE_IDENTITY_KEY } from "@/utils/constants";

import { useConfig, useIdentity } from "@lawallet/react";
import { AvailableLanguages } from "@lawallet/react/types";
import { useRouter } from "expo-router";
import { startTransition, useState } from "react";
import { Alert } from "react-native";

export default function Page() {
  const config = useConfig();

  const identity = useIdentity();

  //   const [sheetLanguage, setSheetLanguage] = useState<boolean>(false);
  const router = useRouter();
  const errors = useErrors();

  //   function changeLanguage(lng: AvailableLanguages) {
  //     startTransition(() => {
  //       const expire = new Date(Date.now() + 86400 * 365 * 1000).toUTCString();
  //       document.cookie = `NEXT_LOCALE=${lng}; expires=${expire}; path=/`;
  //       window.location.reload();
  //     });
  //   }

  const logoutSession = async () => {
    const cachedBackup = await config.storage.getItem(
      `${CACHE_BACKUP_KEY}_${identity.pubkey}`
    );

    if (!cachedBackup) {
      errors.modifyError("ERROR_MADE_BACKUP");
      return;
    }
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await config.storage.removeItem(STORAGE_IDENTITY_KEY);
            identity.reset();
            router.push("/login");
          },
        },
      ]
    );
  };

  return (
    <MainContainer>
      <Navbar showBackPage={true} title={"Ajustes"} overrideBack="/dashboard" />

      <Divider y={16} />

      <Container>
        <Text size="small" color={baseTheme.colors.gray50}>
          Mi cuenta
        </Text>
        <Divider y={8} />
        <Flex direction="column" gap={4}>
          <LinkSetting
          //   onPress={() => router.push("/settings/cards")}
          >
            <Text>Mis tarjetas</Text>
          </LinkSetting>
        </Flex>
        <Divider y={8} />

        {/* <Flex direction="column" gap={4}>
          <Button onClick={() => setSheetLanguage(!sheetLanguage)}>
            {t("LANGUAGE")}

            <Flex flex={1} align="end" justify="end">
              <Text isBold={true}>{lng.toUpperCase()}</Text>
            </Flex>

            <Icon size="small" color={appTheme.colors.gray40}>
              <CaretRightIcon />
            </Icon>
          </ButtonSetting>
        </Flex> */}

        <Divider y={16} />
        <Text size="small" color={baseTheme.colors.gray50}>
          Seguridad
        </Text>
        <Divider y={8} />
        <Flex direction="column" gap={4}>
          <LinkSetting onClick={() => router.push("/settings/recovery")}>
            <Text>Respaldar cuenta</Text>
          </LinkSetting>
        </Flex>

        <Divider y={16} />

        <Flex justify="center">
          <Text size="small" color={baseTheme.colors.gray50}>
            LaWallet v0.1
          </Text>
        </Flex>
        <Divider y={16} />

        <Flex align="center" justify="center">
          <Feedback show={errors.errorInfo.visible} status={"error"}>
            {errors.errorInfo.text}
          </Feedback>
        </Flex>

        <Divider y={16} />

        <Flex justify="center">
          <Button color="error" variant="bezeled" onPress={logoutSession}>
            <Text color={baseTheme.colors.error}>Cerrar sesión</Text>
          </Button>
        </Flex>
        <Divider y={16} />
      </Container>
    </MainContainer>
  );
}
