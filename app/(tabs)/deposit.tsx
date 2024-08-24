"use client";

// Libraries
import { useMemo, useState } from "react";

// Hooks and utils
// import { useNotifications } from "@/context/NotificationsContext";
import {
  formatAddress,
  lnurl_encode,
  useConfig,
  useIdentity,
} from "@lawallet/react";

// Components
import Navbar from "@/components/Navbar";
import QRCode from "react-native-qrcode-svg";
// import InvoiceSheet from "./components/InvoiceSheet";

// Constans
import InvoiceSheet from "@/components/InvoiceSheet/InvoiceSheet";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { baseTheme } from "@/components/ui/theme";
import { Alert, View } from "react-native";
import { backgroundStyles } from ".";
import Clipboard from "@react-native-clipboard/clipboard";

export default function Page() {
  //   const router = useRouter();

  //   if (EMERGENCY_LOCK_DEPOSIT) {
  //     router.push("/dashboard");
  //     return null;
  //   }

  const config = useConfig();
  const identity = useIdentity();
  //   const notifications = useNotifications();

  const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);

  const handleCopy = (text: string) => {
    // copy(text).then((res) => {
    //   notifications.showAlert({
    //     description: res ? t("SUCCESS_COPY") : t("ERROR_COPY"),
    //     type: res ? "success" : "error",
    //   });
    // });
    Clipboard.setString(text);
    Alert.alert("OK", "Copiado con éxito");
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

  return (
    <View style={backgroundStyles.container}>
      <Divider y={16} />

      <Navbar
        showBackPage={true}
        overrideBack="/(tabs)/dashboard"
        title={"Depositar"}
      />

      <Container>
        <Flex flex={1} direction="column" justify="space-around" align="center">
          <View style={{ padding: 8, backgroundColor: "white" }}>
            <QRCode
              size={300}
              logoBorderRadius={30}
              value={("lightning:" + LNURLEncoded).toUpperCase()}
            />
          </View>

          <Flex justify="space-between" align="center">
            <Flex direction="column" justify="flex-start">
              <Text size="small" color={baseTheme.colors.gray50}>
                Dirección
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
                <Text>Copiar</Text>
              </Button>
            </Flex>
          </Flex>

          <Flex>
            <Button
              variant="bezeled"
              onPress={() => {
                setIsOpenSheet(true);
              }}
            >
              <Text>Crear factura</Text>
            </Button>
          </Flex>
        </Flex>
      </Container>

      {isOpenSheet && (
        <InvoiceSheet
          isOpen={isOpenSheet}
          handleCopy={handleCopy}
          onClose={() => {
            setIsOpenSheet(false);
          }}
        />
      )}
    </View>
  );
}
