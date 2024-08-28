"use client";
import Navbar from "@/components/Navbar";
import MainContainer from "@/components/ui/Container/MainContainer";
import { useConfig, useInvoice, useTransfer } from "@lawallet/react";
import { TransferTypes } from "@lawallet/react/types";
import { useLocalSearchParams } from "expo-router";
import { ErrorTransfer } from "../components/Error";
import { FinishTransfer } from "../components/Finish";
import { Summary } from "../components/Summary";

const TransferWithInvoice = () => {
  const config = useConfig();
  const params = useLocalSearchParams();
  if (!params.bolt11) return null;

  const { txInfo } = useInvoice({
    bolt11: params.bolt11 as string,
    config,
  });

  const { isLoading, isError, isPending, isSuccess, execOutboundTransfer } =
    useTransfer({
      ...params,
      tokenName: "BTC",
    });

  const executePayment = async () => {
    if (!txInfo.data || txInfo.type !== TransferTypes.INVOICE || txInfo.expired)
      return false;
    return execOutboundTransfer({
      tags: [["bolt11", txInfo.data]],
      amount: txInfo.amount,
    });
  };

  return (
    <MainContainer>
      {isError || isSuccess ? (
        <>
          <Navbar />

          {isError ? (
            <ErrorTransfer />
          ) : (
            <FinishTransfer transferInfo={txInfo} />
          )}
        </>
      ) : (
        <>
          <Navbar
            showBackPage={true}
            title={"Validar info"}
            overrideBack="/transfer"
          />
          <Summary
            isLoading={isLoading}
            isSuccess={isSuccess}
            isPending={isPending}
            data={txInfo.data}
            type={TransferTypes.INVOICE}
            amount={txInfo.amount}
            expired={txInfo.expired}
            onClick={executePayment}
          />
        </>
      )}
    </MainContainer>
  );
};

export default TransferWithInvoice;
