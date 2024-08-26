import { Keyboard } from "@/components/ui/Keyboard";
import useErrors from "@/hooks/useErrors";
import { MAX_INVOICE_AMOUNT } from "@/utils/constants";
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
import { ActivityIndicator, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { TokenList } from "../TokensList";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Divider } from "../ui/Divider";
import { Flex } from "../ui/Flex";
import { Heading } from "../ui/Heading";
import { Icon } from "../ui/Icon/Icon";
import { SatoshiV2Icon } from "../ui/Icon/Icons/SatoshiIcon";
import { Feedback } from "../ui/Input/Feedback";
import { Text } from "../ui/Text";
import { baseTheme } from "../ui/theme";

type SheetTypes = "amount" | "qr" | "finished";
type InvoiceSheetTypes = {
  isOpen: boolean;
  handleCopy: (text: string) => void;
  onClose: () => void;
};

const InvoiceSheet = ({ isOpen, handleCopy, onClose }: InvoiceSheetTypes) => {
  const errors = useErrors();
  const [sheetStep, setSheetStep] = useState<SheetTypes>("amount");

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
    locale: "es",
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
    if (sheetStep === "finished" || !identity.username.length) {
      router.push("/dashboard");
    } else {
      numpadData.resetAmount();
      setSheetStep("amount");
      resetInvoice();
      onClose();
    }
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
        backgroundColor: baseTheme.colors.gray15,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <BottomSheetView
        style={{
          backgroundColor: baseTheme.colors.gray15,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {sheetStep === "amount" && (
          <Container size="small">
            <Flex direction="column" justify="center" align="center" gap={16}>
              <Flex align="center" gap={4}>
                {currency === "SAT" ? (
                  <Icon size="small">
                    <SatoshiV2Icon color="white" />
                  </Icon>
                ) : (
                  <Text>$</Text>
                )}

                <Heading color="white" align="center">
                  {formatAmount(numpadData.intAmount[numpadData.usedCurrency])}
                </Heading>
              </Flex>

              <Divider y={24} />

              <TokenList />

              <Divider y={24} />

              {errors.errorInfo.visible && (
                <Feedback show={errors.errorInfo.visible} status={"error"}>
                  {errors.errorInfo.text}
                </Feedback>
              )}

              <Divider y={24} />

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
                    <Text>Generar</Text>
                  </Flex>
                </Button>
              </Flex>

              <Divider y={24} />

              <Keyboard numpadData={numpadData} />
            </Flex>
          </Container>
        )}

        {sheetStep === "qr" && (
          <Container size="small">
            <Flex justify="center" align="center">
              <View
                style={{
                  padding: 8,
                  backgroundColor: "white",
                }}
              >
                <QRCode size={300} value={`${invoice.bolt11.toUpperCase()}`} />
              </View>
            </Flex>

            <Divider y={24} />

            <Flex direction="column" justify="center" align="center" gap={8}>
              <ActivityIndicator
                size="large"
                color={baseTheme.colors.primary}
              />
              <Text size="small" color={baseTheme.colors.gray50}>
                Esperando pago de
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
                  {formatAmount(numpadData.intAmount[numpadData.usedCurrency])}
                </Heading>

                <Text color="white">{currency}</Text>
              </Flex>
            </Flex>

            <Divider y={24} />

            <Flex justify="center" gap={16}>
              <Button variant="bezeledGray" onPress={handleCloseSheet}>
                <Text>Cancelar</Text>
              </Button>
              <Button
                variant="bezeled"
                onPress={() => handleCopy(invoice.bolt11)}
              >
                <Text>Copiar</Text>
              </Button>
            </Flex>
          </Container>
        )}

        {sheetStep === "finished" && (
          <>
            {/* <Confetti /> */}
            <Container size="small">
              <Flex
                direction="column"
                justify="center"
                flex={1}
                align="center"
                gap={8}
              >
                <Icon color={baseTheme.colors.primary}>
                  {/* <CheckIcon /> */}
                  <Text>OK</Text>
                </Icon>
                <Text size="small" color={baseTheme.colors.gray50}>
                  Pago recibido
                </Text>
                <Flex justify="center" align="center" gap={4}>
                  {currency === "SAT" ? (
                    <Icon size="small">
                      <SatoshiV2Icon />
                    </Icon>
                  ) : (
                    <Text>$</Text>
                  )}
                  <Heading>
                    {formatAmount(
                      numpadData.intAmount[numpadData.usedCurrency]
                    )}
                  </Heading>
                </Flex>
              </Flex>
              <Flex gap={8}>
                <Button variant="bezeledGray" onPress={handleCloseSheet}>
                  <Text>Cerrar</Text>
                </Button>
              </Flex>
            </Container>
          </>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default InvoiceSheet;
