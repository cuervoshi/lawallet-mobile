import Navbar from "@/components/Navbar";
import TransactionItem from "@/components/TransactionItem";
import { Container } from "@/components/ui/Container";
import MainContainer from "@/components/ui/Container/MainContainer";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { appTheme } from "@/utils/theme";
import { useTransactions } from "@lawallet/react";
import { differenceInCalendarDays } from "date-fns";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

let dateToRender: Date | null = null;

function TransactionsView() {
  const router = useRouter();
  const transactions = useTransactions();

  return (
    <MainContainer>
      <Navbar showBackPage={true} title={"Actividad"} />
      <ScrollView>
        <Container>
          <Flex direction="column" gap={4}>
            {transactions.map((transaction) => {
              const txDate = new Date(transaction.createdAt);

              if (
                !dateToRender ||
                dateToRender.toDateString() !== txDate.toDateString()
              ) {
                dateToRender = txDate;

                const differenceWithToday: number = differenceInCalendarDays(
                  new Date(),
                  txDate
                );
                const isToday: boolean = differenceWithToday === 0;
                const isYesterday: boolean = differenceWithToday === 1;

                return (
                  <React.Fragment key={transaction.id}>
                    <Divider y={8} />
                    <Text size="small" color={appTheme.colors.gray50}>
                      {isToday
                        ? "Hoy"
                        : isYesterday
                        ? "Ayer"
                        : txDate.toLocaleDateString()}
                    </Text>

                    <TransactionItem transaction={transaction} />
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={transaction.id}>
                    <TransactionItem transaction={transaction} />
                  </React.Fragment>
                );
              }
            })}
          </Flex>
        </Container>
      </ScrollView>
    </MainContainer>
  );
}

export default TransactionsView;
