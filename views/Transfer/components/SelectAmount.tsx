import { useEffect, useMemo, useState } from "react";

import useErrors from "@/hooks/useErrors";
import {
  decimalsToUse,
  useBalance,
  useCurrencyConverter,
  useFormatter,
  useNumpad,
  useSettings,
} from "@lawallet/react";
import { LNURLTransferType, TransferTypes } from "@lawallet/react/types";
import CardWithData from "./CardWithData";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Icon } from "@/components/ui/Icon/Icon";
import { SatoshiV2Icon } from "@/components/ui/Icon/Icons/SatoshiIcon";
import { Heading } from "@/components/ui/Heading";
import { baseTheme } from "@/components/ui/theme";
import { Text } from "@/components/ui/Text";
import { Feedback } from "@/components/ui/Input/Feedback";
import { TokenList } from "@/components/TokensList";
import { InputWithLabel } from "@/components/ui/Input/InputWithLabel";
import { Button } from "@/components/ui/Button";
import { Keyboard } from "@/components/ui/Keyboard";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

type SelectTransferAmountType = {
  transferInfo: LNURLTransferType;
  setAmountToPay: (amount: number) => void;
  setComment: (comment: string) => void;
  setLoading: (bool: boolean) => void;
  loading: boolean;
};

export const SelectTransferAmount = ({
  transferInfo,
  setAmountToPay,
  setComment,
  setLoading,
  loading,
}: SelectTransferAmountType) => {
  const [commentFocus, setCommentFocus] = useState<boolean>(false);
  const balance = useBalance();

  const {
    props: { currency: userCurrency, hideBalance },
  } = useSettings();
  const { pricesData, convertCurrency } = useCurrencyConverter();

  const maxAvailableAmount: number = useMemo(() => {
    const convertedAmount: number = convertCurrency(
      balance.amount,
      "SAT",
      userCurrency
    );

    return convertedAmount;
  }, [pricesData, balance.amount, userCurrency]);

  const numpadData = useNumpad(userCurrency, maxAvailableAmount);
  const params = useLocalSearchParams();
  const errors = useErrors();
  const router = useRouter();

  const handleClick = () => {
    if (loading) return;
    if (!transferInfo.data) router.push("/transfer");

    setLoading(true);

    const satsAmount: number =
      numpadData.intAmount["SAT"] > balance.amount
        ? balance.amount
        : numpadData.intAmount["SAT"];

    if (transferInfo.type === TransferTypes.LUD16 && transferInfo.request) {
      const mSats = satsAmount * 1000;
      const { minSendable, maxSendable } = transferInfo.request;

      if (mSats < minSendable! || mSats > maxSendable!) {
        errors.modifyError("INVALID_SENDABLE_AMOUNT", {
          minSendable: (minSendable! / 1000).toString(),
          maxSendable: (maxSendable! / 1000).toString(),
          currency: "SAT",
        });

        setLoading(false);
        return;
      }
    }

    setAmountToPay(satsAmount);
    // router.navigate({
    //   pathname: "/(lng)/transfer/lnurl/summary/[lnurlData]",
    //   params: {
    //     lnurlData: transferInfo.data.toLowerCase(),
    //     amount: transferInfo.amount,
    //     comment: transferInfo.comment,
    //   },
    // });
  };

  const handleChangeComment = (text: string) => {
    if (!text.length) {
      setComment("");
      return;
    }

    if (
      text.length > 255 ||
      (transferInfo.request &&
        text.length > transferInfo.request.commentAllowed)
    ) {
      errors.modifyError("COMMENT_MAX_LENGTH", {
        chars: (transferInfo.request?.commentAllowed ?? 255).toString(),
      });
      return;
    }

    // const isValidComment = regexComment.test(text);
    // if (!isValidComment) {
    //   errors.modifyError('ERROR_ON_COMMENT');
    //   return;
    // }

    setComment(text);
  };

  useEffect(() => {
    const amountParam: number =
      Number(params["amount"] as string) ?? transferInfo.amount;

    if (amountParam && amountParam !== numpadData.intAmount["SAT"]) {
      const convertedAmount: number =
        convertCurrency(amountParam, "SAT", userCurrency) *
        10 ** decimalsToUse(userCurrency);

      numpadData.updateNumpadAmount(convertedAmount.toString());
    }
  }, [pricesData, transferInfo.amount]);

  const { formatAmount, customFormat } = useFormatter({
    currency: userCurrency,
    locale: "es",
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      keyboardDismissMode="on-drag"
    >
      <CardWithData type={transferInfo.type} data={transferInfo.data} />

      <Divider y={32} />

      <Container>
        <Flex
          direction="column"
          gap={8}
          flex={1}
          justify="center"
          align="center"
        >
          <Flex align="center" gap={4}>
            {userCurrency === "SAT" ? (
              <Icon size="small">
                <SatoshiV2Icon color="white" />
              </Icon>
            ) : (
              <Text color="white">$</Text>
            )}
            <Heading color="white">
              {formatAmount(numpadData.intAmount[numpadData.usedCurrency])}
            </Heading>
          </Flex>

          <Divider y={8} />

          {!hideBalance && (
            <Flex align="center" gap={4}>
              <Heading as="h6" color={baseTheme.colors.gray50}>
                {userCurrency !== "SAT" && "$"}
                {formatAmount(maxAvailableAmount)} disponible.
              </Heading>
            </Flex>
          )}

          <TokenList />

          {transferInfo.request && (
            <Flex align="center">
              <Feedback show={true} status={"success"}>
                Puedes enviar entre{" "}
                {customFormat({
                  amount: transferInfo.request.minSendable! / 1000,
                  currency: "SAT",
                })}{" "}
                y{" "}
                {customFormat({
                  amount: transferInfo.request.maxSendable! / 1000,
                  currency: "SAT",
                })}{" "}
                SATs
              </Feedback>
            </Flex>
          )}
        </Flex>

        <Feedback show={errors.errorInfo.visible} status={"error"}>
          {errors.errorInfo.text}
        </Feedback>

        {/* <Flex align="center" flex={1}>
          <Flex align="center">
            <InputWithLabel
              label="Mensaje"
              name="message"
              placeholder={"Opcional"}
              onChange={(text: string) => handleChangeComment(text)}
              value={transferInfo.comment}
              onFocus={() => setCommentFocus(true)}
              onBlur={() => setCommentFocus(false)}
            />
          </Flex>
        </Flex> */}

        <Flex direction="column" justify="space-between" align="center">
          <Flex>
            <Button
              onPress={handleClick}
              disabled={
                loading ||
                balance.amount === 0 ||
                numpadData.intAmount["SAT"] === 0
              }
              loading={loading}
            >
              <Text align="center">Continuar</Text>
            </Button>
          </Flex>

          <Divider y={32} />

          <Keyboard numpadData={numpadData} />
        </Flex>

        <Divider y={32} />
      </Container>
    </ScrollView>
  );
};
