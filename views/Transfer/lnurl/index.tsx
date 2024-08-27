import Navbar from "@/components/Navbar";
import MainContainer from "@/components/ui/Container/MainContainer";
import {
  claimLNURLw,
  defaultLNURLTransfer,
  escapingBrackets,
  normalizeLNDomain,
  useConfig,
  useIdentity,
  useLNURL,
  useNostr,
  useTransfer,
} from "@lawallet/react";
import { requestInvoice } from "@lawallet/react/actions";
import { LNURLTransferType, TransferTypes } from "@lawallet/react/types";
import { NDKTag } from "@nostr-dev-kit/ndk";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ErrorTransfer } from "../components/Error";
import { FinishTransfer } from "../components/Finish";
import { SelectTransferAmount } from "../components/SelectAmount";
import { Summary } from "../components/Summary";

const TransferWithLNURL = () => {
  const router = useRouter();

  const params = useLocalSearchParams();
  const config = useConfig();
  const identity = useIdentity();

  const [LNURLTransferInfo, setLNURLTransferInfo] =
    useState<LNURLTransferType>(defaultLNURLTransfer);

  const { LNURLInfo, decodeLNURL } = useLNURL({
    lnurlOrAddress: LNURLTransferInfo.data.split("&&")[0],
    config,
  });

  const { signerInfo, signer, encrypt } = useNostr();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    isLoading,
    isSuccess,
    isError,
    isPending,
    handleMarkSuccess,
    handleMarkError,
    handleMarkLoading,
    execInternalTransfer,
    execOutboundTransfer,
  } = useTransfer({ ...params, tokenName: "BTC" });

  const setAmountToPay = (amount: number) => {
    setLNURLTransferInfo({
      ...LNURLTransferInfo,
      amount,
    });
  };

  const setComment = (comment: string) => {
    setLNURLTransferInfo({
      ...LNURLTransferInfo,
      comment: escapingBrackets(comment),
    });
  };

  const defineMetadata = async (receiver: string): Promise<NDKTag> => {
    const showReceiver: boolean = Boolean(
      receiver.length && !receiver.toLowerCase().startsWith("lnurl")
    );

    const receiverInfo: string =
      showReceiver && LNURLInfo.transferInfo.data.includes("@")
        ? LNURLInfo.transferInfo.data
        : `${LNURLInfo.transferInfo.data}@${normalizeLNDomain(
            config.endpoints.lightningDomain
          )}`;

    const metadataMessage: { sender?: string; receiver?: string } = {
      ...(showReceiver ? { receiver: receiverInfo } : {}),
      ...(identity.lud16
        ? {
            sender: identity.lud16,
          }
        : {}),
    };

    const metadataEncrypted: string = await encrypt(
      LNURLTransferInfo.receiverPubkey,
      JSON.stringify(metadataMessage)
    );

    const metadataTag = ["metadata", "true", "nip04", metadataEncrypted];
    return metadataTag;
  };

  const execute = async () => {
    if (
      isLoading ||
      !signer ||
      !signerInfo ||
      LNURLTransferInfo.type === TransferTypes.NONE
    )
      return;
    handleMarkLoading(true);

    const { type, request, receiverPubkey, data, amount, comment } =
      LNURLTransferInfo;

    try {
      if (type === TransferTypes.LNURLW) {
        const { callback, maxWithdrawable, k1 } = request!;
        const claimed: boolean = await claimLNURLw(
          signerInfo.npub,
          callback,
          k1!,
          maxWithdrawable!,
          config
        );

        claimed ? handleMarkSuccess() : handleMarkError();
      } else {
        const metadataTag = await defineMetadata(data);

        if (type === TransferTypes.INTERNAL) {
          execInternalTransfer({
            receiverPubkey: receiverPubkey,
            amount: amount,
            comment: comment,
            tags: [metadataTag],
          });
        } else {
          const { callback } = request!;
          const bolt11: string = await requestInvoice(
            `${callback}?amount=${amount * 1000}&comment=${escapingBrackets(
              comment
            )}`
          );

          execOutboundTransfer({
            tags: [["bolt11", bolt11], metadataTag],
            amount: amount,
          });
        }
      }
    } catch (err) {
      handleMarkError((err as Error).message);
    }
  };

  const loadLNURLParam = async () => {
    const dataParam: string = (params["lnurlData"] as string) ?? "";
    if (!dataParam) return;

    const [dataWithoutId] = dataParam.split("&&");

    const decoded: boolean = await decodeLNURL(dataWithoutId);
    if (!decoded) router.push("/transfer");
  };

  useEffect(() => {
    const { transferInfo } = LNURLInfo;

    if (transferInfo.type !== TransferTypes.NONE) {
      const amountParam: number = Number(params["amount"] as string);

      const new_info: LNURLTransferType = {
        ...transferInfo,
        ...(amountParam && amountParam !== transferInfo.amount
          ? { amount: amountParam }
          : {}),
      };

      console.log(new_info);

      setLNURLTransferInfo(new_info);
    }
  }, [LNURLInfo.transferInfo]);

  useFocusEffect(() => {
    if (!LNURLTransferInfo.data) loadLNURLParam();
  });

  return (
    <MainContainer>
      {Boolean(!isSuccess && !isError) ? (
        <Navbar
          showBackPage={true}
          title={
            LNURLTransferInfo.amount === 0 ? "Definir monto" : "Validar info"
          }
          overrideBack={`/transfer`}
        />
      ) : (
        <Navbar />
      )}

      {isSuccess || isError ? (
        <>
          <Navbar />

          {isError ? (
            <ErrorTransfer />
          ) : (
            <FinishTransfer transferInfo={LNURLTransferInfo} />
          )}
        </>
      ) : LNURLTransferInfo.amount === 0 ? (
        <SelectTransferAmount
          transferInfo={LNURLTransferInfo}
          loading={loading}
          setLoading={setLoading}
          setAmountToPay={setAmountToPay}
          setComment={setComment}
        />
      ) : (
        <Summary
          isLoading={isLoading}
          isSuccess={isSuccess}
          isPending={isPending}
          data={LNURLTransferInfo.data}
          type={LNURLTransferInfo.type}
          amount={LNURLTransferInfo.amount}
          expired={false}
          onClick={execute}
        />
      )}
    </MainContainer>
  );
};

export default TransferWithLNURL;
