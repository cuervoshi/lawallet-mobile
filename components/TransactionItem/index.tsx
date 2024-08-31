import {
  dateFormatter,
  defaultCurrency,
  unescapingText,
  useCurrencyConverter,
  useFormatter,
  useSettings,
} from "@lawallet/react";
import {
  AvailableLanguages,
  Transaction,
  TransactionDirection,
  TransactionStatus,
} from "@lawallet/react/types";
import React, { ReactNode, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Accordion } from "../ui/Accordion";
import { AccordionBody } from "../ui/Accordion/AccordionBody";
import { Flex } from "../ui/Flex";
import { Text } from "../ui/Text";
import { appTheme } from "../../utils/theme";
import { useTranslations } from "@/i18n/I18nProvider";

interface ComponentProps {
  transaction: Transaction;
}

type LudInfoProps = {
  loading: boolean;
  data: string;
};

const defaultTransferText: string = "Lightning";

interface ListItemProps {
  children: ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  children,
  isFirst = false,
  isLast = false,
}) => {
  return (
    <View
      style={[
        styles.listItem,
        isFirst && styles.borderTop,
        !isLast && styles.borderBottom,
      ]}
    >
      {children}
    </View>
  );
};

export default function Component({ transaction }: ComponentProps) {
  if (!transaction) return null;

  const { status, type } = transaction;

  const { i18n, lng } = useTranslations();

  const {
    props: { hideBalance, currency },
  } = useSettings();

  const { pricesData, convertCurrency } = useCurrencyConverter();

  const isFromMe = transaction?.direction === "OUTGOING";
  const satsAmount = transaction.tokens?.BTC / 1000 || 0;

  const [ludInfo, setLudInfo] = useState<LudInfoProps>({
    loading: false,
    data: defaultTransferText,
  });

  const listTypes = {
    CARD: { icon: null, label: i18n.t("YOU_PAID") },
    INTERNAL: { icon: null, label: i18n.t("YOU_TRANSFER") },
    LN: { icon: null, label: i18n.t("YOU_SEND") },
  };

  const convertedFiatAmount = useMemo(
    () =>
      convertCurrency(
        satsAmount,
        "SAT",
        currency === "SAT" ? defaultCurrency : currency
      ),
    [pricesData, currency]
  );

  const { customFormat } = useFormatter({ locale: lng as AvailableLanguages });

  const handleOpenAccordion = async () => {
    setLudInfo({ ...ludInfo, loading: true });

    if (transaction.metadata) {
      const username: string =
        transaction.direction === TransactionDirection.INCOMING
          ? transaction.metadata.sender ?? defaultTransferText
          : transaction.metadata.receiver ?? defaultTransferText;

      setLudInfo({
        loading: false,
        data: username,
      });
    } else {
      setLudInfo({ ...ludInfo, loading: false });
    }
  };

  if (!satsAmount) return null;

  return (
    <Accordion
      variant="borderless"
      onOpen={handleOpenAccordion}
      trigger={
        <Flex justify="space-between" align="center" gap={8}>
          <Flex align="center" gap={8}>
            <Text color="white">
              {transaction.status === TransactionStatus.REVERTED
                ? i18n.t("TX_REVERTED")
                : transaction.status === TransactionStatus.ERROR
                ? i18n.t("FAILED_TRANSACTION")
                : transaction.status === TransactionStatus.PENDING
                ? i18n.t(
                    `PENDING_${!isFromMe ? "INBOUND" : "OUTBOUND"}_TRANSACTION`
                  )
                : isFromMe
                ? listTypes[type].label
                : i18n.t("YOU_RECEIVE")}
            </Text>
          </Flex>
          <Flex direction="column" align="flex-end">
            <Text
              color={
                hideBalance
                  ? appTheme.colors.text
                  : transaction.status === TransactionStatus.ERROR ||
                    transaction.status === TransactionStatus.REVERTED
                  ? appTheme.colors.error
                  : transaction.status === TransactionStatus.PENDING
                  ? appTheme.colors.warning
                  : isFromMe
                  ? appTheme.colors.text
                  : appTheme.colors.success
              }
            >
              {hideBalance ? (
                "*****"
              ) : (
                <>
                  {!(
                    transaction.status === TransactionStatus.ERROR ||
                    transaction.status === TransactionStatus.REVERTED
                  ) && <>{!isFromMe ? "+ " : "- "}</>}
                  {customFormat({ amount: satsAmount, currency: "SAT" })} SAT
                </>
              )}
            </Text>
            <Text size="small" color={appTheme.colors.gray50}>
              {hideBalance
                ? "*****"
                : `$${customFormat({
                    amount: convertedFiatAmount,
                    currency: currency === "SAT" ? defaultCurrency : currency,
                    minDecimals: 2,
                  })} ${currency === "SAT" ? defaultCurrency : currency}`}
            </Text>
          </Flex>
        </Flex>
      }
    >
      <AccordionBody>
        <ListItem isFirst>
          <Flex align="center" justify="space-between">
            <Text size="small" color={appTheme.colors.gray50}>
              {isFromMe ? i18n.t("TO") : i18n.t("FROM")}
            </Text>
            <Text>
              {ludInfo.loading ? (
                <ActivityIndicator
                  size="small"
                  color={appTheme.colors.primary}
                />
              ) : (
                ludInfo.data
              )}
            </Text>
          </Flex>
        </ListItem>

        <ListItem>
          <Flex align="center" justify="space-between">
            <Text size="small" color={appTheme.colors.gray50}>
              {i18n.t("DATE")}
            </Text>
            <Flex direction="column" align="flex-end">
              <Text>
                {dateFormatter(
                  lng,
                  new Date(Number(transaction.createdAt)),
                  "HH:mm"
                )}
              </Text>
              <Text size="small" color={appTheme.colors.gray50}>
                {dateFormatter(
                  lng,
                  new Date(Number(transaction.createdAt)),
                  "MMMM d, yyyy"
                )}
              </Text>
            </Flex>
          </Flex>
        </ListItem>

        {transaction.memo ? (
          <ListItem>
            <Flex align="center" justify="space-between">
              <Text size="small" color={appTheme.colors.gray50}>
                {i18n.t("MESSAGE")}
              </Text>
              <Text>{unescapingText(transaction.memo)}</Text>
            </Flex>
          </ListItem>
        ) : null}

        <ListItem isLast>
          <Flex align="center" justify="space-between">
            <Text size="small" color={appTheme.colors.gray50}>
              {i18n.t("STATUS")}
            </Text>
            <Text>{i18n.t(status)}</Text>
          </Flex>
        </ListItem>
      </AccordionBody>
    </Accordion>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 12,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: appTheme.colors.gray20,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.gray20,
  },
});
