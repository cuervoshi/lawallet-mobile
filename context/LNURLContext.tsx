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
import { createContext, useContext, useEffect, useState } from "react";

// Constans
import { useLocalSearchParams, useRouter } from "expo-router";

interface ILNURLContext {
  loading: boolean;
  setLoading: (bool: boolean) => void;
  LNURLTransferInfo: LNURLTransferType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isPending: boolean;
  setAmountToPay: (amount: number) => void;
  setComment: (comment: string) => void;
  execute: () => void;
}

const LNURLContext = createContext({} as ILNURLContext);

export function LNURLProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const params = useLocalSearchParams();
  const config = useConfig();
  const identity = useIdentity();

  const [LNURLTransferInfo, setLNURLTransferInfo] =
    useState<LNURLTransferType>(defaultLNURLTransfer);

  const { LNURLInfo, decodeLNURL } = useLNURL({
    lnurlOrAddress: LNURLTransferInfo.data,
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

    const metadataTag: NDKTag = [
      "metadata",
      "true",
      "nip04",
      metadataEncrypted,
    ];
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
        const metadataTag: NDKTag = await defineMetadata(data);

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

    const decoded: boolean = await decodeLNURL(dataParam);
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

      setLNURLTransferInfo(new_info);

      if (
        transferInfo &&
        transferInfo.request &&
        transferInfo.request.minSendable === transferInfo.request.maxSendable
      )
        router.navigate({
          pathname: "/(lng)/transfer/lnurl/summary/[lnurlData]",
          params: {
            lnurlData: transferInfo.data.toLowerCase(),
            amount: transferInfo.amount,
          },
        });
    }
  }, [LNURLInfo.transferInfo]);

  useEffect(() => {
    loadLNURLParam();
  }, []);

  const value = {
    loading,
    setLoading,
    LNURLTransferInfo,
    isLoading,
    isError,
    isSuccess,
    isPending,
    setAmountToPay,
    setComment,
    execute,
  };

  return (
    <LNURLContext.Provider value={value}>{children}</LNURLContext.Provider>
  );
}

export const useLNURLContext = () => {
  const context = useContext(LNURLContext);
  if (!context) {
    throw new Error("useLNURLContext must be used within LNURLProvider");
  }

  return context;
};