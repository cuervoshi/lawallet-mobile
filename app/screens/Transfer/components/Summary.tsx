import { TokenList } from "@/components/TokensList";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon/Icon";
import { SatoshiV2Icon } from "@/components/ui/Icon/Icons/SatoshiIcon";
import { Feedback } from "@/components/ui/Input/Feedback";
import { Text } from "@/components/ui/Text";
import { useTranslations } from "@/i18n/I18nProvider";
import {
  useBalance,
  useCurrencyConverter,
  useFormatter,
  useSettings,
} from "@lawallet/react";
import { TransferTypes } from "@lawallet/react/types";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GestureResponderEvent } from "react-native";
import CardWithData from "./CardWithData";

type SummaryProps = {
  isLoading: boolean;
  isSuccess: boolean;
  isPending: boolean;
  data: string;
  type: TransferTypes;
  amount: number;
  expired?: boolean;
  onClick: (event: GestureResponderEvent) => void;
};

export const Summary = ({
  isLoading,
  isSuccess,
  isPending,
  data,
  type,
  amount,
  expired = false,
  onClick,
}: SummaryProps) => {
  const { i18n, lng } = useTranslations();
  const router = useRouter();
  const [insufficientBalance, setInsufficientBalance] =
    useState<boolean>(false);

  const {
    props: { currency },
  } = useSettings();

  const { pricesData, convertCurrency } = useCurrencyConverter();

  const balance = useBalance();
  const { formatAmount } = useFormatter({
    currency,
    locale: lng,
  });

  const convertedAmount: string = useMemo(() => {
    const convertedInt: number = convertCurrency(amount, "SAT", currency);

    return formatAmount(convertedInt);
  }, [amount, pricesData, currency]);

  const detectInsufficientBalance = useCallback(() => {
    setInsufficientBalance(
      !isLoading && !isSuccess && !isPending && balance.amount < amount
    );
  }, [balance.amount, amount, isLoading, isSuccess]);

  useEffect(() => {
    detectInsufficientBalance();
  }, [balance.amount, amount]);

  return (
    <>
      <CardWithData type={type} data={data} />

      <Divider y={24} />

      <Flex direction="column" justify="center" align="center" gap={8}>
        <Heading color="white" as="h6">
          Total
        </Heading>

        <Divider y={24} />

        <Flex align="center">
          {Number(convertedAmount) !== 0 ? (
            <Flex align="center" gap={4}>
              {currency === "SAT" ? (
                <Icon size="small">
                  <SatoshiV2Icon color={"white"} />
                </Icon>
              ) : (
                <Text color="white">$</Text>
              )}

              <Heading color="white" align="center">
                {convertedAmount}
              </Heading>

              <Text color="white" align="center">
                {currency}
              </Text>
            </Flex>
          ) : (
            <Flex align="center" justify="center" gap={4}>
              <Icon size="small">
                <SatoshiV2Icon />
              </Icon>

              <Heading align="center">{amount}</Heading>
              <Text align="center">SAT</Text>
            </Flex>
          )}
        </Flex>

        <Divider y={24} />

        <TokenList />
      </Flex>

      <Divider y={24} />

      {expired ||
      (type !== TransferTypes.LNURLW &&
        !balance.loading &&
        insufficientBalance) ? (
        <Flex flex={1} align="center" justify="center">
          <Feedback show={true} status={"error"}>
            <Text>
              {expired
                ? i18n.t("INVOICE_EXPIRED")
                : i18n.t("INSUFFICIENT_BALANCE")}
            </Text>
          </Feedback>
        </Flex>
      ) : null}

      <Divider y={24} />

      <Flex flex={1} justify="center" align="center" gap={8}>
        <Flex gap={8}>
          <Button
            variant="bezeledGray"
            onPress={() => router.push("/dashboard")}
          >
            <Text>{i18n.t("CANCEL")}</Text>
          </Button>

          <Button
            color="secondary"
            onPress={onClick}
            disabled={
              !type ||
              isLoading ||
              isPending ||
              expired ||
              (type !== TransferTypes.LNURLW && insufficientBalance)
            }
            loading={isLoading || isPending}
          >
            <Text>
              {type === TransferTypes.LNURLW
                ? i18n.t("CLAIM")
                : i18n.t("TRANSFER")}
            </Text>
          </Button>
        </Flex>
        <Divider y={32} />
      </Flex>
    </>
  );
};
