import { useEffect, useState } from "react";
import { Alert } from "react-native";
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
    const nfcStatus: boolean = await validateNfcStatus();
    if (!nfcStatus) {
      Alert.alert("Error", "NFC is disabled or not supported");
      return;
    }

    if (nfcSupported && !isReading) {
      try {
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

  const validateNfcStatus = async () => {
    try {
      const isSupported = await nfcManager.isSupported();
      setNfcSupported(isSupported);
      if (!isSupported) return false;

      const isEnabled = await nfcManager.isEnabled();
      return isSupported && isEnabled;
    } catch {
      setNfcSupported(false);
      return false;
    }
  };

  useEffect(() => {
    validateNfcStatus();
  }, []);

  return {
    nfcSupported,
    isReading,
    scannedPayload,
    startReadTag,
    stopReadTag,
  };
};
