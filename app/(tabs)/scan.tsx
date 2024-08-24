import { regexURL } from "@/utils/constants";
import { useConfig } from "@lawallet/react";
import {
  detectTransferType,
  getMultipleTagsValues,
  getTagValue,
  LaWalletTags,
  removeLightningStandard,
} from "@lawallet/utils";
import { TransferTypes } from "@lawallet/utils/types";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { BarCodeScanningResult } from "expo-camera/build/legacy/Camera.types";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Scan = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [urlScanned, setUrlScanned] = useState<string>("");
  const router = useRouter();
  const config = useConfig();

  const processExternalURL = (str: string) => {
    const url = new URL(str);
    const eventParameter = url.searchParams.get("event");

    if (!eventParameter) {
      setUrlScanned(str);
      return;
    }

    const event = JSON.parse(atob(eventParameter));
    if (event) {
      const subkindValue: string = getTagValue(event.tags, "t");
      const pValues: string[] = getMultipleTagsValues(event.tags, "p");

      if (
        subkindValue === LaWalletTags.CARD_TRANSFER_DONATION &&
        pValues.includes(config.modulePubkeys.card)
      ) {
        // router.push(
        //   `/(tabs)/settings/cards/donation?event=${eventParameter}`
        // );
        return;
      } else {
        setUrlScanned(str);
      }
    }
  };

  const handleScanURL = (str: string) => {
    const url = new URL(str);
    const originURL = window.location.origin;
    const eventParameter = url.searchParams.get("event");
    const cardParameter = url.searchParams.get("c");

    if (eventParameter) {
      // TODO: check federation
      //   router.push(`/settings/cards/donation?event=${eventParameter}`);
      return;
    } else if (cardParameter) {
      //   router.push(`/settings/cards?c=${cardParameter}`);
      return;
    } else {
      if (url.origin.startsWith(originURL)) {
        const pathname: string = url.href.replace(originURL, "");
        router.push(pathname as never);
        return;
      } else {
        processExternalURL(str);
      }
    }
  };

  const handleScan = (result: BarCodeScanningResult) => {
    if (!result || !result.data) return;

    const isURL: boolean = regexURL.test(result.data);

    if (isURL) {
      handleScanURL(result.data);
      return;
    } else {
      const cleanScan: string = removeLightningStandard(result.data);
      const scanType: TransferTypes = detectTransferType(cleanScan);
      if (scanType === TransferTypes.NONE) return;

      if (scanType === TransferTypes.INVOICE) {
        Alert.alert("Scan detected: invoice", result.data);
        // router.push(`/transfer/invoice/${cleanScan.toLowerCase()}`);
        return;
      }

      //   router.push(`/transfer/lnurl?data=${cleanScan.toLowerCase()}`);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={handleScan}
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default Scan;
