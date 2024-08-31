import Confetti from "@/components/Confetti";
import { TokenList } from "@/components/TokensList";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon/Icon";
import { CheckIcon } from "@/components/ui/Icon/Icons/CheckIcon";
import { SatoshiV2Icon } from "@/components/ui/Icon/Icons/SatoshiIcon";
import { Feedback } from "@/components/ui/Input/Feedback";
import { Keyboard } from "@/components/ui/Keyboard";
import { Text } from "@/components/ui/Text";
import useErrors from "@/hooks/useErrors";
import { useTranslations } from "@/i18n/I18nProvider";
import { MAX_INVOICE_AMOUNT } from "@/utils/constants";
import { appTheme } from "@/utils/theme";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  useCurrencyConverter,
  useFormatter,
  useIdentity,
  useNumpad,
  useSettings,
  useZap,
} from "@lawallet/react";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";

type SheetTypes = "amount" | "qr" | "finished";
type InvoiceSheetTypes = {
  isOpen: boolean;
  handleCopy: (text: string) => void;
  onClose: () => void;
};

const InvoiceSheet = ({ isOpen, handleCopy, onClose }: InvoiceSheetTypes) => {
  const errors = useErrors();
  const [sheetStep, setSheetStep] = useState<SheetTypes>("amount");

  const { i18n, lng } = useTranslations();
  const identity = useIdentity();

  const {
    props: { currency },
  } = useSettings();
  const { convertCurrency } = useCurrencyConverter();

  const { invoice, createZapInvoice, resetInvoice } = useZap({
    receiverPubkey: identity.pubkey,
  });

  const { formatAmount } = useFormatter({
    currency,
    locale: lng,
  });

  const numpadData = useNumpad(currency);
  const router = useRouter();

  const handleClick = () => {
    if (invoice.loading) return;

    const amountSats: number = numpadData.intAmount["SAT"];
    if (amountSats < 1 || amountSats > MAX_INVOICE_AMOUNT) {
      const convertedMinAmount: number = convertCurrency(1, "SAT", currency);
      const convertedMaxAmount: number = convertCurrency(
        MAX_INVOICE_AMOUNT,
        "SAT",
        currency
      );

      errors.modifyError("ERROR_INVOICE_AMOUNT", {
        minAmount: convertedMinAmount.toString(),
        maxAmount: formatAmount(convertedMaxAmount),
        currency: currency,
      });
      return;
    }

    createZapInvoice(amountSats).then((bolt11: string | undefined) => {
      if (!bolt11) {
        errors.modifyError("ERROR_ON_CREATE_INVOICE");
        return;
      }

      setSheetStep("qr");
    });
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) handleCloseSheet();
  }, []);

  const handleCloseSheet = () => {
    numpadData.resetAmount();
    setSheetStep("amount");
    resetInvoice();
    onClose();

    if (sheetStep === "finished") router.push("/dashboard");
  };

  useEffect(() => {
    if (errors.errorInfo.visible) errors.resetError();
  }, [numpadData.intAmount]);

  useEffect(() => {
    if (invoice.payed) setSheetStep("finished");
  }, [invoice.payed]);

  return (
    <BottomSheet
      onChange={handleSheetChanges}
      snapPoints={["90%"]}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: appTheme.colors.gray15,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Heading as="h4" align="center" color="white">
        {sheetStep === "amount"
          ? i18n.t("DEFINE_AMOUNT")
          : sheetStep === "qr"
          ? i18n.t("WAITING_PAYMENT")
          : i18n.t("PAYMENT_RECEIVED")}
      </Heading>

      <BottomSheetView
        style={{
          backgroundColor: appTheme.colors.gray15,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {sheetStep === "finished" && <Confetti />}
        <ScrollView>
          {sheetStep === "amount" && (
            <View style={{ padding: 24 }}>
              <Flex direction="column" justify="center" align="center" gap={8}>
                <Flex align="center" gap={4}>
                  {currency === "SAT" ? (
                    <Icon size="small">
                      <SatoshiV2Icon color="white" />
                    </Icon>
                  ) : (
                    <Text>$</Text>
                  )}

                  <Heading color="white" align="center">
                    {formatAmount(
                      numpadData.intAmount[numpadData.usedCurrency]
                    )}
                  </Heading>
                </Flex>

                <Divider y={8} />

                <TokenList />

                {errors.errorInfo.visible && (
                  <Feedback show={errors.errorInfo.visible} status={"error"}>
                    {errors.errorInfo.text}
                  </Feedback>
                )}

                <Divider y={8} />

                <Flex align="center">
                  <Button
                    variant="filled"
                    onPress={handleClick}
                    disabled={
                      invoice.loading || numpadData.intAmount["SAT"] === 0
                    }
                    loading={invoice.loading}
                  >
                    <Flex flex={1} justify="center" align="center">
                      <Text>{i18n.t("GENERATE")}</Text>
                    </Flex>
                  </Button>
                </Flex>

                <Divider y={24} />

                <Keyboard numpadData={numpadData} />
              </Flex>
            </View>
          )}

          {sheetStep === "qr" && (
            <Container>
              <Flex justify="center" align="center">
                <View
                  style={{
                    padding: 8,
                    backgroundColor: "white",
                  }}
                >
                  <QRCode
                    size={300}
                    value={`${invoice.bolt11.toUpperCase()}`}
                  />
                </View>
              </Flex>

              <Divider y={24} />

              <Flex direction="column" justify="center" align="center" gap={8}>
                <ActivityIndicator
                  size="large"
                  color={appTheme.colors.primary}
                />
                <Text size="small" color={appTheme.colors.gray50}>
                  {i18n.t("WAITING_PAYMENT_OF")}
                </Text>
                <Flex align="center" gap={4}>
                  {currency === "SAT" ? (
                    <Icon size="small">
                      <SatoshiV2Icon />
                    </Icon>
                  ) : (
                    <Text>$</Text>
                  )}

                  <Heading color="white">
                    {formatAmount(
                      numpadData.intAmount[numpadData.usedCurrency]
                    )}
                  </Heading>

                  <Text color="white">{currency}</Text>
                </Flex>
              </Flex>

              <Divider y={24} />

              <Flex justify="center" gap={16}>
                <Button variant="bezeledGray" onPress={handleCloseSheet}>
                  <Text>{i18n.t("CANCEL")}</Text>
                </Button>
                <Button
                  variant="bezeled"
                  onPress={() => handleCopy(invoice.bolt11)}
                >
                  <Text>{i18n.t("COPY")}</Text>
                </Button>
              </Flex>
            </Container>
          )}

          {sheetStep === "finished" && (
            <>
              <Flex
                flex={1}
                direction="column"
                justify="center"
                align="center"
                gap={16}
              >
                <Flex gap={4}>
                  <Icon color={appTheme.colors.primary}>
                    <CheckIcon color={appTheme.colors.success} />
                  </Icon>

                  <Text>OK</Text>
                </Flex>

                <Divider y={24} />

                <Text size="small" color={appTheme.colors.gray50}>
                  Pago recibido
                </Text>

                <Flex align="center">
                  {currency === "SAT" ? (
                    <Icon size="small">
                      <SatoshiV2Icon color={appTheme.colors.text} />
                    </Icon>
                  ) : (
                    <Text>$</Text>
                  )}

                  <Heading color={appTheme.colors.text}>
                    {formatAmount(
                      numpadData.intAmount[numpadData.usedCurrency]
                    )}
                  </Heading>
                </Flex>

                <Divider y={24} />

                <Flex gap={16}>
                  <Button variant="bezeledGray" onPress={handleCloseSheet}>
                    <Text>Cerrar</Text>
                  </Button>
                </Flex>
              </Flex>
            </>
          )}
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default InvoiceSheet;
