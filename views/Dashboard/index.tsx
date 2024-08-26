import ButtonCTA from "@/components/ButtonCTA";
import Navbar from "@/components/Navbar";
import { TokenList } from "@/components/TokensList";
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
import { QrCodeIcon } from "@/components/ui/Icon/Icons/QrCode";
import { ReceiveIcon } from "@/components/ui/Icon/Icons/ReceiveIcon";
import { SatoshiV2Icon } from "@/components/ui/Icon/Icons/SatoshiIcon";
import { SendIcon } from "@/components/ui/Icon/Icons/SendIcon";
import { VisibleIcon } from "@/components/ui/Icon/Icons/VisibleIcon";
import { HeroCard } from "@/components/ui/Layout/HeroCard";
import { Text } from "@/components/ui/Text";
import { baseTheme } from "@/components/ui/theme";
import { extractFirstTwoChars } from "@/utils";
import {
  formatToPreference,
  useBalance,
  useCurrencyConverter,
  useIdentity,
  useSettings,
  useTransactions,
} from "@lawallet/react";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

function DashboardView() {
  const router = useRouter();

  const identity = useIdentity();
  const balance = useBalance();
  const transactions = useTransactions();

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
    <View style={backgroundStyles.container}>
      <ScrollView>
        <Divider y={24} />
        <HeroCard maxHeight={"30%"}>
          <Navbar>
            <Flex
              direction="row"
              justify="space-between"
              align="center"
              flex={1}
            >
              <Flex direction="row" align="center" gap={8}>
                <Avatar>
                  <Text align="center" color="white" size="small">
                    {identity.username
                      ? extractFirstTwoChars(identity.username)
                      : "AN"}
                  </Text>
                </Avatar>

                <Flex direction="column">
                  <Text size="small" color={baseTheme.colors.gray50}>
                    Hola,{" "}
                  </Text>
                  <Text size="small" color={baseTheme.colors.white}>
                    {identity.loading
                      ? "--"
                      : identity.lud16
                      ? identity.lud16
                      : "Anonimo"}
                  </Text>
                </Flex>
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
                  <ActivityIndicator
                    size="large"
                    color={baseTheme.colors.primary}
                  />
                ) : props.hideBalance ? (
                  "*****"
                ) : (
                  convertedBalance
                )}
              </Heading>
            </Flex>

            <Divider y={16} />

            <TokenList />
          </Flex>

          <Divider y={24} />
        </HeroCard>

        <Container>
          <Divider y={24} />
          <View style={{ maxWidth: "75%", marginHorizontal: "auto" }}>
            <Flex justify="center" align="center" gap={8}>
              <Button
                // onClick={() => router.push("/deposit")}
                onPress={() => router.push("/(lng)/deposit")}
                disabled={false}
              >
                <Flex justify="center" align="center">
                  <Icon>
                    <ReceiveIcon color={baseTheme.colors.gray15} />
                  </Icon>

                  <Text color={baseTheme.colors.gray15} isBold>
                    Depositar
                  </Text>
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

                  <Text color={baseTheme.colors.gray15} isBold>
                    Transferir
                  </Text>
                </Flex>
              </Button>
            </Flex>
          </View>

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
      </ScrollView>

      <ButtonCTA>
        <Button color="secondary" onPress={() => router.push("/(lng)/scan")}>
          <QrCodeIcon color="black" />
        </Button>
        <Divider y={16} />
      </ButtonCTA>
    </View>
  );
}

const backgroundStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseTheme.colors.background,
    maxWidth: "100%",
    minHeight: "100%",
  },
});

export default DashboardView;
