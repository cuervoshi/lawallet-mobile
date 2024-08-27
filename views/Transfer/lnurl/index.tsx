import Navbar from "@/components/Navbar";
import MainContainer from "@/components/ui/Container/MainContainer";
import { TransferTypes } from "@lawallet/react/types";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useLNURLContext } from "../../../context/LNURLContext";
import { SelectTransferAmount } from "../components/SelectAmount";

const TransferWithLNURL = () => {
  const { LNURLTransferInfo, setAmountToPay, setComment, loading, setLoading } =
    useLNURLContext();
  const router = useRouter();

  useEffect(() => {
    if (!LNURLTransferInfo || !LNURLTransferInfo.amount) return;

    if (
      LNURLTransferInfo.type === TransferTypes.LNURLW &&
      LNURLTransferInfo.data &&
      LNURLTransferInfo.amount
    )
      router.navigate({
        pathname: "/(lng)/transfer/lnurl/summary/[lnurlData]",
        params: {
          lnurlData: LNURLTransferInfo.data.toLowerCase(),
        },
      });
  }, [LNURLTransferInfo]);

  return (
    <MainContainer>
      <Navbar
        showBackPage={true}
        title="Definir monto"
        overrideBack={`/transfer`}
      />

      <SelectTransferAmount
        transferInfo={LNURLTransferInfo}
        loading={loading}
        setLoading={setLoading}
        setAmountToPay={setAmountToPay}
        setComment={setComment}
      />
    </MainContainer>
  );
};

export default TransferWithLNURL;
