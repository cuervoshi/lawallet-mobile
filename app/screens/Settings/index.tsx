import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import MainContainer from "@/components/ui/Container/MainContainer";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Feedback } from "@/components/ui/Input/Feedback";
import { LinkSetting } from "@/components/ui/LinkSetting";
import { Text } from "@/components/ui/Text";
import useErrors from "@/hooks/useErrors";
import { CACHE_BACKUP_KEY, STORAGE_IDENTITY_KEY } from "@/utils/constants";
import { appTheme } from "@/utils/theme";

import { useTranslations } from "@/i18n/I18nProvider";
import { useConfig, useIdentity } from "@lawallet/react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

function SettingsView() {
  const { i18n, changeLanguage } = useTranslations();
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
    Alert.alert("", i18n.t("CONFIRM_LOGOUT"), [
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
    ]);
  };

  return (
    <MainContainer>
      <Navbar
        showBackPage={true}
        title={i18n.t("SETTINGS")}
        overrideBack="/dashboard"
      />

      <Divider y={16} />

      <Container>
        <Text size="small" color={appTheme.colors.gray50}>
          {i18n.t("ACCOUNT")}
        </Text>

        <Divider y={8} />

        <Flex direction="column" gap={4}>
          <LinkSetting onClick={() => router.push("/settings/cards")}>
            <Text>{i18n.t("MY_CARDS")}</Text>
          </LinkSetting>
        </Flex>

        <Divider y={8} />

        <Flex direction="column" gap={4}>
          <LinkSetting
            // onPress={() => setSheetLanguage(!sheetLanguage)}
            onClick={() => {
              i18n.locale === "en"
                ? changeLanguage("es")
                : changeLanguage("en");
            }}
          >
            <Text>
              {i18n.t("LANGUAGE")} ({i18n.locale.toUpperCase()})
            </Text>
          </LinkSetting>
        </Flex>

        <Divider y={16} />

        <Text size="small" color={appTheme.colors.gray50}>
          {i18n.t("SECURITY")}
        </Text>

        <Divider y={8} />

        <Flex direction="column" gap={4}>
          <LinkSetting onClick={() => router.push("/settings/recovery")}>
            <Text>{i18n.t("BACKUP_ACCOUNT")}</Text>
          </LinkSetting>
        </Flex>

        <Divider y={16} />

        <Flex justify="center">
          <Text size="small" color={appTheme.colors.gray50}>
            LaWallet v0.1
          </Text>
        </Flex>
        <Divider y={16} />

        <Flex align="center" justify="center">
          <Feedback show={errors.errorInfo.visible} status={"error"}>
            {errors.errorInfo.text}
          </Feedback>
        </Flex>

        <Flex justify="center">
          <Button color="error" variant="bezeled" onPress={logoutSession}>
            <Text color={appTheme.colors.error}>{i18n.t("LOGOUT")}</Text>
          </Button>
        </Flex>
      </Container>
    </MainContainer>
  );
}

export default SettingsView;
