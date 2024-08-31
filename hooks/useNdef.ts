import { useEffect, useState } from "react";
import nfcManager, { Ndef, NfcTech, TagEvent } from "react-native-nfc-manager";

type UseNdefReturns = {
  nfcSupported: boolean;
  isReading: boolean;
  scannedPayload: string;
  startReadTag: () => Promise<void>;
  stopReadTag: () => void;
};

type UseNdefParameters = {
  onScan?: (decodedPayload: string) => void;
  onError?: (err?: string) => void;
};

export const useNdef = (params: UseNdefParameters): UseNdefReturns => {
  const [nfcSupported, setNfcSupported] = useState<boolean>(false);
  const [isReading, setIsReading] = useState<boolean>(false);
  const [scannedPayload, setScannedPayload] = useState<string>("");

  const startReadTag = async () => {
    if (nfcSupported && !isReading) {
      try {
        console.log("start read");
        setIsReading(true);
        await nfcManager.requestTechnology(NfcTech.Ndef);

        const tag: TagEvent | null = await nfcManager.getTag();
        if (!tag) return;

        const payload: number[] = tag.ndefMessage[0].payload ?? [];
        const msgBuffer: Uint8Array = Uint8Array.from(payload);

        const decodedPayload: string = Ndef.text.decodePayload(msgBuffer);
        setScannedPayload(decodedPayload);

        if (params.onScan) params.onScan(decodedPayload);
      } catch (ex) {
        if (ex && Object.keys(ex).length) {
          console.warn("Oops!", ex);
          if (params.onError) params.onError((ex as Error).message ?? "");
        }
      } finally {
        stopReadTag();
      }
    }
  };

  const stopReadTag = () => {
    setIsReading(false);
    nfcManager.cancelTechnologyRequest();
  };

  useEffect(() => {
    nfcManager
      .isSupported()
      .then((res) => {
        setNfcSupported(res);
        if (res) nfcManager.start();
      })
      .catch((err) => {
        setNfcSupported(false);
      });
  }, []);

  return {
    nfcSupported,
    isReading,
    scannedPayload,
    startReadTag,
    stopReadTag,
  };
};
