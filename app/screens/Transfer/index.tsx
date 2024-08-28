import {
  detectTransferType,
  formatLNURLData,
  useConfig,
  useTransactions,
} from "@lawallet/react";
import {
  Transaction,
  TransactionDirection,
  TransferTypes,
} from "@lawallet/react/types";
import { useMemo, useState } from "react";

// Hooks and utils
import useErrors from "@/hooks/useErrors";
import Clipboard from "expo-clipboard";

// Components
import Navbar from "@/components/Navbar";

// Constans
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import MainContainer from "@/components/ui/Container/MainContainer";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Icon } from "@/components/ui/Icon/Icon";
import { CaretRightIcon } from "@/components/ui/Icon/Icons/CaretRightIcon";
import { Input } from "@/components/ui/Input";
import { Feedback } from "@/components/ui/Input/Feedback";
import { InputGroup } from "@/components/ui/Input/InputGroup";
import { InputGroupRight } from "@/components/ui/Input/InputGroupRight";
import { Text } from "@/components/ui/Text";
import { appTheme } from "@/utils/theme";
import { useFocusEffect, useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import RecipientElement from "./components/RecipientElement";

function TransferView() {
  const router = useRouter();

  // if (EMERGENCY_LOCK_TRANSFER) {
  //   router.push("/dashboard");
  //   return null;
  // }

  //   const t = useTranslations();
  //   const params = useSearchParams();
  const params = {};
  const errors = useErrors();
  const config = useConfig();

  const transactions = useTransactions();

  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const initializeTransfer = async (data: string) => {
    if (loading) return;
    setLoading(true);

    const cleanData: string = data.trim();
    const type: TransferTypes = detectTransferType(cleanData);

    switch (type) {
      case TransferTypes.NONE:
        errors.modifyError("INVALID_RECIPIENT");
        setLoading(false);
        return;

      case TransferTypes.INVOICE:
        router.push(`/transfer/invoice/${cleanData}`);
        return;
    }

    const formattedLNURLData = await formatLNURLData(cleanData);
    if (
      formattedLNURLData.type === TransferTypes.NONE ||
      formattedLNURLData.type === TransferTypes.INVOICE
    ) {
      errors.modifyError("INVALID_RECIPIENT");
      setLoading(false);
      return;
    }

    router.navigate({
      pathname: "/(router)/transfer/lnurl/[lnurlData]",
      params: {
        lnurlData: `${cleanData.toLowerCase()}&&${Date.now()}`,
        amount: 0,
      },
    });
    setLoading(false);
    return;
  };

  const handleContinue = async () => {
    if (!inputText.length) return errors.modifyError("EMPTY_RECIPIENT");
    initializeTransfer(inputText);
  };

  const handlePasteInput = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      setInputText(text);
    } catch (error) {
      console.log("error", error);
    }
  };

  const lastDestinations = useMemo(() => {
    const receiversList: string[] = [];
    transactions.forEach((tx: Transaction) => {
      if (
        tx.direction === TransactionDirection.OUTGOING &&
        tx.metadata &&
        tx.metadata.receiver &&
        tx.metadata.receiver.includes("@") &&
        tx.metadata.receiver.length < 40 &&
        !receiversList.includes(tx.metadata.receiver)
      )
        receiversList.push(tx.metadata.receiver);
    });

    return receiversList;
  }, [transactions]);

  // const autoCompleteData: string[] = useMemo(() => {
  //   if (!inputText.length || inputText.length > 15) return [];

  //   const data: string[] = lastDestinations.filter((dest) =>
  //     dest.startsWith(inputText)
  //   );
  //   if (data.length >= 3) return data;

  //   if (!inputText.includes("@"))
  //     return removeDuplicateArray([
  //       `${inputText}@${normalizeLNDomain(config.endpoints.lightningDomain)}`,
  //       ...data,
  //     ]);

  //   const [username, domain] = inputText.split("@");
  //   if (!domain)
  //     data.push(
  //       `${username}@${normalizeLNDomain(config.endpoints.lightningDomain)}`
  //     );

  //   const recommendations: string[] = [];
  //   lightningAddresses.forEach((address) => {
  //     if (address.startsWith(domain))
  //       recommendations.push(`${username}@${address}`);
  //   });

  //   return removeDuplicateArray([...data, ...recommendations]);
  // }, [lastDestinations, inputText]);

  useFocusEffect(() => {
    setLoading(false);
  });

  return (
    <MainContainer>
      <Navbar
        showBackPage={true}
        title={"Transferir"}
        overrideBack="/dashboard"
      />

      <Container>
        <Divider y={16} />

        <Flex direction="column" justify="center" align="center">
          <InputGroup>
            <Input
              onChange={(text) => {
                errors.resetError();
                setInputText(text);
              }}
              placeholder={"Address"}
              type="text"
              value={inputText}
              status={errors.errorInfo.visible ? "error" : undefined}
              disabled={loading}
            />
            <InputGroupRight>
              <Button
                size="small"
                variant="borderless"
                onPress={handlePasteInput}
                disabled={!!inputText}
              >
                <Text>Pegar</Text>
              </Button>
            </InputGroupRight>
          </InputGroup>

          <Feedback show={errors.errorInfo.visible} status={"error"}>
            {errors.errorInfo.text}
          </Feedback>

          <Divider y={16} />

          <Flex align="center">
            <Button
              color="secondary"
              variant="bezeled"
              onPress={() => router.navigate("/scan")}
            >
              <Text>Escanear código QR</Text>
            </Button>
          </Flex>
        </Flex>

        <Divider y={24} />

        {Boolean(lastDestinations.length) && (
          <View style={{ width: "100%" }}>
            <Text size="small" color={appTheme.colors.gray50}>
              Últimos destinos
            </Text>

            <Divider y={12} />

            {lastDestinations.slice(0, 5).map((lud16) => {
              return (
                <TouchableOpacity
                  key={lud16}
                  onPress={() => initializeTransfer(lud16)}
                >
                  <Divider y={8} />
                  <Flex align="center">
                    <RecipientElement lud16={lud16} />
                    <Icon>
                      <CaretRightIcon />
                    </Icon>
                  </Flex>
                  <Divider y={8} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <Divider y={16} />
      </Container>

      <Flex flex={1} justify="center" align="center">
        <Flex gap={8}>
          <Button
            variant="bezeledGray"
            onPress={() => router.push("/dashboard")}
          >
            <Text>Cancelar</Text>
          </Button>

          <Button
            onPress={handleContinue}
            disabled={loading || inputText.length === 0}
            loading={loading}
          >
            <Text>Continuar</Text>
          </Button>
        </Flex>
      </Flex>
    </MainContainer>
  );
}
export default TransferView;
