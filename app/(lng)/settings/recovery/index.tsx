"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getUserStoragedKey } from "@/utils";
import { CACHE_BACKUP_KEY } from "@/utils/constants";
import { useConfig, useIdentity } from "@lawallet/react";
import { useRouter } from "expo-router";
import MainContainer from "@/components/ui/Container/MainContainer";
import { Divider } from "@/components/ui/Divider";
import { Container } from "@/components/ui/Container";
import { Flex } from "@/components/ui/Flex";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Label } from "@/components/ui/Label";
import { baseTheme } from "@/components/ui/theme";
import InfoCopy from "@/components/ui/InfoCopy";
import { Switch, View } from "react-native";

export default function Page() {
  const config = useConfig();
  const router = useRouter();

  const [userStoragedKey, setUserStoragedKey] = useState<string>("");

  const identity = useIdentity();
  const [switchOne, setSwitchOne] = useState<boolean>(false);
  const [switchTwo, setSwitchTwo] = useState<boolean>(false);

  const [showRecovery, setShowRecovery] = useState<boolean>(false);

  const handleShowRecovery = () => {
    if (switchOne || switchTwo) setShowRecovery(true);
  };

  const loadStoragedKey = async () => {
    const storagedKey = await getUserStoragedKey(config.storage);
    if (!storagedKey) return;

    setUserStoragedKey(storagedKey);
  };

  useEffect(() => {
    loadStoragedKey();
  }, []);

  return (
    <MainContainer>
      <Navbar
        title={"Respaldar cuenta"}
        showBackPage={true}
        overrideBack={"/settings"}
      />

      {showRecovery ? (
        <>
          <Container>
            <Divider y={24} />

            <InfoCopy
              title={"Clave privada"}
              value={userStoragedKey}
              onCopy={async () => {
                await config.storage.setItem(
                  `${CACHE_BACKUP_KEY}_${identity.pubkey}`,
                  "1"
                );
              }}
            />
            <Divider y={16} />
          </Container>

          <Flex>
            <Container size="small">
              <Divider y={16} />
              <Flex gap={8}>
                <Button
                  variant="bezeledGray"
                  onPress={() => router.push("/dashboard")}
                >
                  <Text>Cancelar</Text>
                </Button>
              </Flex>
              <Divider y={32} />
            </Container>
          </Flex>
        </>
      ) : (
        <>
          <View style={{ flex: 1, margin: "auto", padding: 16 }}>
            <Divider y={16} />
            <Text size="small" color={baseTheme.colors.gray50}>
              Entiendo que...
            </Text>
            <Divider y={8} />
            <Flex direction="column" justify="space-between" gap={16}>
              <Flex justify="space-between" align="center">
                <Label>Si pierdo mi clave privada perdere mis fondos</Label>

                <Switch onValueChange={setSwitchOne} value={switchOne} />
              </Flex>
              <Flex justify="space-between" align="center">
                <Label>
                  Si comparto mi clave privada pueden robar mis fondos
                </Label>

                <Switch onValueChange={setSwitchTwo} value={switchTwo} />
              </Flex>
            </Flex>
            <Divider y={16} />
          </View>

          <Divider y={16} />

          <Flex align="center" justify="center" gap={8}>
            <Button
              variant="bezeledGray"
              onPress={() => router.push("/dashboard")}
            >
              <Text>Cancelar</Text>
            </Button>

            <Button
              onPress={handleShowRecovery}
              disabled={!switchOne || !switchTwo}
            >
              <Text>Continuar</Text>
            </Button>
          </Flex>

          <Divider y={32} />
        </>
      )}
    </MainContainer>
  );
}
