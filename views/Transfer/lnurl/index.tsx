import Navbar from "@/components/Navbar";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useLNURLContext } from "../../../context/LNURLContext";
import { SelectTransferAmount } from "../components/SelectAmount";
import { TransferTypes } from "@lawallet/react/types";
import MainContainer from "@/components/ui/Container/MainContainer";

const TransferWithLNURL = () => {
  const { LNURLTransferInfo, setAmountToPay, setComment } = useLNURLContext();
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
          amount: LNURLTransferInfo.amount,
        },
      });
  }, [LNURLTransferInfo.amount]);

  return (
    <MainContainer>
      <Navbar
        showBackPage={true}
        title="Definir monto"
        overrideBack={`/transfer`}
      />

      <SelectTransferAmount
        transferInfo={LNURLTransferInfo}
        setAmountToPay={setAmountToPay}
        setComment={setComment}
      />
    </MainContainer>
  );
};

export default TransferWithLNURL;
