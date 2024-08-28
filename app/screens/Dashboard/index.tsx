import ButtonCTA from "@/components/ButtonCTA";
import Navbar from "@/components/Navbar";
import { TokenList } from "@/components/TokensList";
import TransactionItem from "@/components/TransactionItem";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import MainContainer from "@/components/ui/Container/MainContainer";
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
import { appTheme } from "@/utils/theme";
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
import React, { useMemo, useRef } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import LottieView from "lottie-react-native";

function DashboardView() {
  const animationRef = useRef<LottieView>(null);
  const router = useRouter();

  const identity = useIdentity();
  const balance = useBalance();
  const transactions = useTransactions();

  const { props, toggleHideBalance } = useSettings();

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
    <MainContainer>
      <ScrollView>
        <HeroCard maxHeight={"100%"}>
          <Navbar>
            <Flex
              direction="row"
              justify="space-between"
              align="center"
              flex={1}
            >
              <Flex align="center" gap={8}>
                <Avatar>
                  <Text align="center" color="white" size="small">
                    {identity.username
                      ? extractFirstTwoChars(identity.username)
                      : "AN"}
                  </Text>
                </Avatar>

                <Flex direction="column">
                  <Text size="small" color={appTheme.colors.gray50}>
                    Hola,{" "}
                  </Text>
                  <Text size="small" color={appTheme.colors.white}>
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
                  onPress={() => router.push("/settings")}
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
            <Text size="small" color={appTheme.colors.gray50}>
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
                    color={appTheme.colors.primary}
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
                onPress={() => router.push("/(router)/deposit")}
                disabled={false}
              >
                <Flex justify="center" align="center">
                  <Icon>
                    <ReceiveIcon color={appTheme.colors.gray15} />
                  </Icon>

                  <Text color={appTheme.colors.gray15} isBold>
                    Depositar
                  </Text>
                </Flex>
              </Button>

              <Button
                // onClick={() => router.push("/transfer")}
                onPress={() => router.push("/(router)/transfer")}
                color="secondary"
                disabled={false}
              >
                <Flex justify="center" align="center">
                  <Icon>
                    <SendIcon color={appTheme.colors.gray15} />
                  </Icon>

                  <Text color={appTheme.colors.gray15} isBold>
                    Transferir
                  </Text>
                </Flex>
              </Button>
            </Flex>
          </View>

          <Divider y={16} />

          {transactions.length === 0 ? (
            <Flex
              direction="column"
              justify="space-between"
              align="center"
              gap={16}
            >
              <LottieView
                ref={animationRef}
                source={require("@/assets/bitcoin-trade.json")}
                autoPlay={true}
                loop={true}
                resizeMode="contain"
                style={{
                  width: 200,
                  height: 200,
                }}
              />

              <Heading as="h4" color="white">
                Bitcoin es dinero digital.
              </Heading>

              <Divider y={4} />
              <Text size="small">Proba moviendo tus primeros SATs.</Text>
            </Flex>
          ) : (
            <>
              <Flex justify="space-between" align="center">
                <Text size="small" color={appTheme.colors.gray50}>
                  ÚLTIMA ACTIVIDAD
                </Text>

                <Divider y={24} />

                <Button
                  size="small"
                  variant="borderless"
                  onPress={() => router.push("/transactions")}
                >
                  <Text color={appTheme.colors.success} isBold>
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

      <View
        style={{
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
        }}
      >
        <ButtonCTA>
          <Button
            color="secondary"
            onPress={() => router.push("/(router)/scan")}
          >
            <QrCodeIcon color="black" />
          </Button>
          <Divider y={16} />
        </ButtonCTA>
      </View>
    </MainContainer>
  );
}

export default DashboardView;
