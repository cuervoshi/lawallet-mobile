import Confetti from "@/components/Confetti";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon/Icon";
import { SatoshiV2Icon } from "@/components/ui/Icon/Icons/SatoshiIcon";
import { Text } from "@/components/ui/Text";
import { extractFirstTwoChars } from "@/utils";
import {
  formatAddress,
  splitHandle,
  useCurrencyConverter,
  useFormatter,
  useSettings,
} from "@lawallet/react";
import { TransferInformation, TransferTypes } from "@lawallet/react/types";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useMemo } from "react";

export const FinishTransfer = ({
  transferInfo,
}: {
  transferInfo: TransferInformation;
}) => {
  const {
    props: { currency },
  } = useSettings();

  const { pricesData, convertCurrency } = useCurrencyConverter();
  const { formatAmount } = useFormatter({
    currency,
    locale: "es",
  });

  const convertedAmount: string = useMemo(() => {
    const convertion: number = convertCurrency(
      transferInfo.amount,
      "SAT",
      currency
    );

    return formatAmount(convertion);
  }, [pricesData]);

  const router = useRouter();
  const [transferUsername, transferDomain] = splitHandle(transferInfo.data);
  // if (!transferInfo.data) router.push("/dashboard");

  return (
    <>
      <Confetti />

      <Container>
        {/* <Confetti /> */}

        <Divider y={16} />
        <Heading color="white">Excelente!</Heading>
        <Divider y={4} />
        <Text size="small">
          {transferInfo.type === TransferTypes.LNURLW
            ? "Reclamaste la factura con éxito"
            : "Le transferiste a"}
        </Text>
        <Divider y={24} />
        <Flex align="center" gap={8}>
          <Avatar size="large">
            <Text align="center" size="small">
              {extractFirstTwoChars(transferUsername)}
            </Text>
          </Avatar>
          {transferInfo.type === TransferTypes.LNURLW ||
          transferInfo.type === TransferTypes.INVOICE ? (
            <Text color="white">{formatAddress(transferInfo.data, 25)}</Text>
          ) : (
            <Text color="white">
              {transferUsername}@{transferDomain}
            </Text>
          )}
        </Flex>
        <Divider y={24} />
        {Number(convertedAmount) !== 0 ? (
          <Flex align="center" justify="center" gap={4}>
            {currency === "SAT" ? (
              <Icon size="small">
                <SatoshiV2Icon color={"white"} />
              </Icon>
            ) : (
              <Text>$</Text>
            )}
            <Heading color="white">{convertedAmount}</Heading>
            <Text>{currency}</Text>
          </Flex>
        ) : (
          <Flex align="center" justify="center" gap={4}>
            <Icon size="small">
              <SatoshiV2Icon />
            </Icon>
            <Heading>{transferInfo.amount}</Heading>
            <Text>SAT</Text>
          </Flex>
        )}

        <Divider y={24} />
        <Divider y={24} />

        <Flex justify="center" align="center">
          <Button
            variant="borderless"
            onPress={() => router.push("/dashboard")}
          >
            <Text align="center">Ir al inicio</Text>
          </Button>
        </Flex>
      </Container>
    </>
  );
};
