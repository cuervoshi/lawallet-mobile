// Libraries
import { useEffect, useMemo, useState } from "react";

// Hooks and utils
import {
  formatAddress,
  lnurl_encode,
  useConfig,
  useIdentity,
} from "@lawallet/react";

// Components
import Navbar from "@/components/Navbar";
import QRCode from "react-native-qrcode-svg";

// Constans
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import MainContainer from "@/components/ui/Container/MainContainer";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { appTheme } from "@/utils/theme";
import * as Clipboard from "expo-clipboard";
import { View } from "react-native";
import InvoiceSheet from "./components/InvoiceSheet";
import { useTranslations } from "@/i18n/I18nProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Divider } from "@/components/ui/Divider";

function DepositView() {
  //   if (EMERGENCY_LOCK_DEPOSIT) {
  //     router.push("/dashboard");
  //     return null;
  //   }

  const { i18n } = useTranslations();
  const config = useConfig();
  const identity = useIdentity();

  const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);

  const handleCopy = (text: string) => {
    Clipboard.setStringAsync(text);
  };

  const LNURLEncoded: string = useMemo(
    () =>
      lnurl_encode(
        `${config.endpoints.lightningDomain}/.well-known/lnurlp/${
          identity.username ? identity.username : identity.npub
        }`
      ).toUpperCase(),
    [identity]
  );

  useEffect(() => {
    return () => {
      setIsOpenSheet(false);
    };
  }, []);

  return (
    <>
      <MainContainer>
        <Navbar
          showBackPage={true}
          overrideBack="/(router)/dashboard"
          title={i18n.t("DEPOSIT")}
        />

        <Divider y={24} />

        <Container>
          <Flex
            direction="column"
            justify="space-around"
            align="center"
            gap={16}
          >
            <View style={{ padding: 8, backgroundColor: "white" }}>
              <QRCode
                size={300}
                logoBorderRadius={30}
                value={("lightning:" + LNURLEncoded).toUpperCase()}
              />
            </View>

            <Divider y={8} />

            <Flex justify="space-between" align="center">
              <Flex direction="column" justify="flex-start">
                <Text size="small" color={appTheme.colors.gray50}>
                  {i18n.t("USER")}
                </Text>

                <Text>
                  {identity.lud16
                    ? identity.lud16
                    : formatAddress(LNURLEncoded, 20)}
                </Text>
              </Flex>

              <Flex align="center">
                <Button
                  size="small"
                  variant="bezeled"
                  onPress={() =>
                    handleCopy(identity.lud16 ? identity.lud16 : LNURLEncoded)
                  }
                >
                  <Text>{i18n.t("COPY")}</Text>
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>

        <Flex justify="center" align="center">
          <Button
            variant="bezeled"
            onPress={() => {
              setIsOpenSheet(true);
            }}
          >
            <Flex flex={1} justify="center" align="center">
              <Text>{i18n.t("CREATE_INVOICE")}</Text>
            </Flex>
          </Button>
        </Flex>
      </MainContainer>

      {isOpenSheet && (
        <InvoiceSheet
          handleCopy={handleCopy}
          onClose={() => {
            setIsOpenSheet(false);
          }}
        />
      )}
    </>
  );
}

export default DepositView;
