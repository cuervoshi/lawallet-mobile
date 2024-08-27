import Navbar from "@/components/Navbar";
import { useLNURLContext } from "@/context/LNURLContext";
import { TransferTypes } from "@lawallet/react/types";
import { ErrorTransfer } from "../components/Error";
import { FinishTransfer } from "../components/Finish";
import { Summary } from "../components/Summary";
import MainContainer from "@/components/ui/Container/MainContainer";

const LNURLSummary = () => {
  const {
    LNURLTransferInfo,
    isSuccess,
    isPending,
    isError,
    execute,
    isLoading,
  } = useLNURLContext();

  return (
    <MainContainer>
      {isSuccess || isError ? (
        <>
          <Navbar />

          {isError ? (
            <ErrorTransfer />
          ) : (
            <FinishTransfer transferInfo={LNURLTransferInfo} />
          )}
        </>
      ) : (
        <>
          <Navbar
            showBackPage={true}
            title="Validar info"
            overrideBack={
              LNURLTransferInfo.type === TransferTypes.LNURLW
                ? `/transfer`
                : `/transfer/lnurl?data=${LNURLTransferInfo.data}&amount=${
                    LNURLTransferInfo.amount
                  }${
                    LNURLTransferInfo.comment
                      ? `&comment=${LNURLTransferInfo.comment}`
                      : ""
                  }`
            }
          />
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
        </>
      )}
    </MainContainer>
  );
};

export default LNURLSummary;
