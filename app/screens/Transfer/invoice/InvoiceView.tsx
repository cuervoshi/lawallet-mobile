import Navbar from "@/components/Navbar";
import MainContainer from "@/components/ui/Container/MainContainer";
import { useConfig, useInvoice, useTransfer } from "@lawallet/react";
import { TransferTypes } from "@lawallet/react/types";
import { useLocalSearchParams } from "expo-router";
import { ErrorTransfer } from "../components/Error";
import { FinishTransfer } from "../components/Finish";
import { Summary } from "../components/Summary";
import { useTranslations } from "@/i18n/I18nProvider";
import { Divider } from "@/components/ui/Divider";

const TransferWithInvoice = () => {
  const { i18n } = useTranslations();
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
      {Boolean(!isSuccess && !isError) ? (
        <Navbar
          showBackPage={true}
          title={i18n.t("VALIDATE_INFO")}
          overrideBack="/transfer"
        />
      ) : (
        <Divider y={32} />
      )}

      {isError ? (
        <ErrorTransfer />
      ) : isSuccess ? (
        <FinishTransfer transferInfo={txInfo} />
      ) : (
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
      )}
    </MainContainer>
  );
};

export default TransferWithInvoice;
