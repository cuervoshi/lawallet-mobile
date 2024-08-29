import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import MainContainer from "@/components/ui/Container/MainContainer";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { regexURL } from "@/utils/constants";
import {
  detectTransferType,
  getMultipleTagsValues,
  getTagValue,
  LaWalletTags,
  removeLightningStandard,
  useConfig,
} from "@lawallet/react";
import { TransferTypes } from "@lawallet/react/types";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { BarCodeScanningResult } from "expo-camera/build/legacy/Camera.types";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        //   `/(app)/settings/cards/donation?event=${eventParameter}`
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
        router.navigate({
          pathname: "/(router)/transfer/invoice/[bolt11]",
          params: { bolt11: cleanScan.toLowerCase() },
        });
        return;
      }

      router.navigate({
        pathname: "/(router)/transfer/lnurl/[lnurlData]",
        params: { lnurlData: `${cleanScan.toLowerCase()}&&${Date.now()}` },
      });
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <MainContainer>
        <Navbar showBackPage={true} title="Scanner" />
        <Divider y={24} />

        <Container>
          <Flex direction="column" align="center" gap={8}>
            <Text style={styles.message}>
              We need your permission to show the camera
            </Text>

            <Flex>
              <Button onPress={requestPermission}>
                <Text>Grant permission</Text>
              </Button>
            </Flex>
          </Flex>
        </Container>

        <Divider y={24} />
      </MainContainer>
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
    color: "white",
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
