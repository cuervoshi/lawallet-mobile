import Navbar from "@/components/Navbar";
import TransactionItem from "@/components/TransactionItem";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon/Icon";
import { GearIcon } from "@/components/ui/Icon/Icons/GearIcon";
import { HiddenIcon } from "@/components/ui/Icon/Icons/HiddeIcon";
import { ReceiveIcon } from "@/components/ui/Icon/Icons/ReceiveIcon";
import { SatoshiV2Icon } from "@/components/ui/Icon/Icons/SatoshiIcon";
import { SendIcon } from "@/components/ui/Icon/Icons/SendIcon";
import { VisibleIcon } from "@/components/ui/Icon/Icons/VisibleIcon";
import { HeroCard } from "@/components/ui/Layout/HeroCard";
import { BtnLoader } from "@/components/ui/Loader/Loader";
import { Text } from "@/components/ui/Text";
import { baseTheme } from "@/components/ui/theme";
import {
  CurrenciesList,
  formatToPreference,
  useBalance,
  useCurrencyConverter,
  useSettings,
  useTransactions,
} from "@lawallet/react";
import { Transaction } from "@lawallet/react/types";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const balance = useBalance({
    pubkey: "e811fae78e3a94a64bbd1ae792989da3462e9f8c8f93269a20cfcb614870d308",
  });

  const transactions = useTransactions({
    pubkey: "e811fae78e3a94a64bbd1ae792989da3462e9f8c8f93269a20cfcb614870d308",
    limit: 10,
  });

  const { props, toggleHideBalance, changeCurrency } = useSettings();

  const { pricesData, convertCurrency } = useCurrencyConverter();

  const convertedBalance: string = useMemo(() => {
    const amount: number = convertCurrency(
      balance.amount,
      "SAT",
      props.currency
    );
    return formatToPreference(props.currency, amount, "es");
  }, [balance, pricesData, props]);

  return (
    <View style={styles.container}>
      <Divider y={16} />
      <Divider y={16} />
      <HeroCard maxHeight={"25%"}>
        <Navbar>
          <Flex direction="row" justify="space-between" align="center" flex={1}>
            <Flex direction="row" align="center" gap={8}>
              <Avatar>
                <Text align="center" color="white" size="small">
                  AN
                </Text>
              </Avatar>

              <Text size="small" color={baseTheme.colors.white}>
                Hola, Anonimo
              </Text>
            </Flex>

            <Flex direction="row" align="center" gap={8}>
              <Button
                variant="bezeled"
                size="small"
                onPress={toggleHideBalance}
              >
                <Icon size="small">
                  {props.hideBalance ? (
                    <HiddenIcon color="white" />
                  ) : (
                    <VisibleIcon color="white" />
                  )}
                </Icon>
              </Button>

              <Button
                variant="bezeled"
                size="small"
                // onClick={() => router.push("/settings")}
              >
                <Icon size="small">
                  <GearIcon color={"white"} />
                </Icon>
              </Button>
            </Flex>
          </Flex>
        </Navbar>

        <Divider y={12} />

        <Flex direction="column" align="center" justify="center">
          <Text size="small" color={baseTheme.colors.gray50}>
            Balance
          </Text>

          <Divider y={8} />

          <Flex align="center">
            {!props.hideBalance ? (
              props.currency === "SAT" ? (
                <Icon size="small">
                  <SatoshiV2Icon color="white" />
                </Icon>
              ) : (
                <Text>$</Text>
              )
            ) : null}

            <Heading color="white" align="center" key={convertedBalance}>
              {balance.loading ? (
                <BtnLoader />
              ) : props.hideBalance ? (
                "*****"
              ) : (
                convertedBalance
              )}
            </Heading>
          </Flex>

          <Divider y={16} />

          <Flex align="center" gap={4}>
            {CurrenciesList.map((currency) => {
              const selected: boolean = props.currency === currency;

              return (
                <Button
                  key={currency}
                  variant={selected ? "bezeled" : "borderless"}
                  size="small"
                  onPress={() => changeCurrency(currency)}
                  style={{ maxWidth: 80 }}
                >
                  <Text color="white">{currency}</Text>
                </Button>
              );
            })}
          </Flex>
        </Flex>
      </HeroCard>

      <Divider y={16} />

      <Container>
        <Divider y={16} />

        <View style={{ maxWidth: "75%", marginHorizontal: "auto" }}>
          <Flex justify="center" align="center" gap={8}>
            <Button
              // onClick={() => router.push("/deposit")}
              disabled={false}
            >
              <Flex justify="center" align="center">
                <Icon>
                  <ReceiveIcon color={baseTheme.colors.gray15} />
                </Icon>

                <Text color={baseTheme.colors.gray15}>Depositar</Text>
              </Flex>
            </Button>

            <Button
              // onClick={() => router.push("/transfer")}
              color="secondary"
              disabled={false}
            >
              <Flex justify="center" align="center">
                <Icon>
                  <SendIcon color={baseTheme.colors.gray15} />
                </Icon>

                <Text color={baseTheme.colors.gray15}>Transferir</Text>
              </Flex>
            </Button>
          </Flex>
        </View>

        <Divider y={16} />
        <Divider y={16} />

        {transactions.length === 0 ? (
          <Flex direction="column" justify="center" align="center" flex={1}>
            <Text size="small">No hay transacciones aún</Text>
          </Flex>
        ) : (
          <>
            <Flex justify="space-between" align="center">
              <Text size="small" color={baseTheme.colors.gray50}>
                ÚLTIMA ACTIVIDAD
              </Text>

              <Divider y={24} />

              <Button
                size="small"
                variant="borderless"
                // onClick={() => router.push("/transactions")}
              >
                <Text color={baseTheme.colors.success} isBold>
                  Ver todo
                </Text>
              </Button>
            </Flex>

            <Flex direction="column" gap={4}>
              {transactions.slice(0, 5).map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </Flex>
          </>
        )}
      </Container>

      {/* <Flex direction="row" align="flex-start" justify="flex-start">
        {transactions.length === 0 ? (
          <Flex direction="column" justify="center" align="center" flex={1}>
            <Heading as="h4">
              <Text>No hay transacciones aún</Text>
            </Heading>
          </Flex>
        ) : (
          <>
            <Flex justify="flex-start" align="flex-start">
              <Text size="small" align="left" color={baseTheme.colors.gray50}>
                Última actividad
              </Text>

              <Button
                size="small"
                variant="borderless"
                // onClick={() => router.push("/transactions")}
              >
                <Text>Ver todas</Text>
              </Button>
            </Flex>
          </>
        )}
      </Flex> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseTheme.colors.background, // Define aquí tu color de fondo
  },
});
