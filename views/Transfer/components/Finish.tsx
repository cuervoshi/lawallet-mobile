import Navbar from "@/components/Navbar";
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
import {
  AvailableLanguages,
  TransferInformation,
  TransferTypes,
} from "@lawallet/react/types";
import { useRouter } from "expo-router";
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
  if (!transferInfo.data) router.push("/dashboard");

  return (
    <>
      <Navbar />

      <Container size="small">
        {/* <Confetti /> */}
        <Divider y={16} />
        <Heading>Excelente!</Heading>
        <Divider y={4} />
        <Text size="small">
          {transferInfo.type === TransferTypes.LNURLW
            ? "Reclamaste la factura con éxito"
            : "Le transferiste a"}
        </Text>
        <Divider y={24} />
        <Flex align="center" gap={8}>
          <Avatar size="large">
            <Text size="small">{extractFirstTwoChars(transferUsername)}</Text>
          </Avatar>
          {transferInfo.type === TransferTypes.LNURLW ||
          transferInfo.type === TransferTypes.INVOICE ? (
            <Text>{formatAddress(transferInfo.data, 25)}</Text>
          ) : (
            <Text>
              {transferUsername}@{transferDomain}
            </Text>
          )}
        </Flex>
        <Divider y={24} />
        {Number(convertedAmount) !== 0 ? (
          <Flex align="center" justify="center" gap={4}>
            {currency === "SAT" ? (
              <Icon size="small">
                <SatoshiV2Icon />
              </Icon>
            ) : (
              <Text>$</Text>
            )}
            <Heading>{convertedAmount}</Heading>
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
      </Container>

      <Flex>
        <Container size="small">
          <Divider y={16} />
          <Flex gap={8}>
            <Button
              variant="borderless"
              onPress={() => router.push("/dashboard")}
            >
              Ir al inicio
            </Button>
          </Flex>
          <Divider y={32} />
        </Container>
      </Flex>
    </>
  );
};
