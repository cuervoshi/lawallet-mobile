import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import MainContainer from "@/components/ui/Container/MainContainer";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import InfoCopy from "@/components/ui/InfoCopy";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Text";
import { useTranslations } from "@/i18n/I18nProvider";
import { getUserStoragedKey } from "@/utils";
import { CACHE_BACKUP_KEY } from "@/utils/constants";
import { appTheme } from "@/utils/theme";
import { useConfig, useIdentity } from "@lawallet/react";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Switch, View } from "react-native";

function RecoveryView() {
  const { i18n } = useTranslations();
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
        title={i18n.t("BACKUP_ACCOUNT")}
        showBackPage={true}
        overrideBack={"/settings"}
      />

      {showRecovery ? (
        <>
          <Container>
            <Divider y={24} />

            <InfoCopy
              title={i18n.t("PRIVATE_KEY")}
              value={userStoragedKey}
              onCopy={async () => {
                await config.storage.setItem(
                  `${CACHE_BACKUP_KEY}_${identity.pubkey}`,
                  "1"
                );
              }}
            />
          </Container>
        </>
      ) : (
        <>
          <View style={{ flex: 1, margin: "auto", padding: 16 }}>
            <Divider y={16} />
            <Text size="small" color={appTheme.colors.gray50}>
              {i18n.t("UNDERSTAND_WHAT")}
            </Text>
            <Divider y={8} />
            <Flex direction="column" justify="space-between" gap={16}>
              <Flex justify="space-between" align="center">
                <Label>{i18n.t("LOSE_KEY")}</Label>

                <Switch
                  trackColor={{
                    false: appTheme.colors.gray50,
                    true: appTheme.colors.success,
                  }}
                  thumbColor={appTheme.colors.white}
                  onValueChange={setSwitchOne}
                  value={switchOne}
                />
              </Flex>
              <Flex justify="space-between" align="center">
                <Label>{i18n.t("SHARE_KEY")}</Label>

                <Switch
                  trackColor={{
                    false: appTheme.colors.gray50,
                    true: appTheme.colors.success,
                  }}
                  thumbColor={appTheme.colors.white}
                  onValueChange={setSwitchTwo}
                  value={switchTwo}
                />
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
              <Text>{i18n.t("CANCEL")}</Text>
            </Button>

            <Button
              onPress={handleShowRecovery}
              disabled={!switchOne || !switchTwo}
            >
              <Text>{i18n.t("CONFIRM")}</Text>
            </Button>
          </Flex>
        </>
      )}
    </MainContainer>
  );
}

export default RecoveryView;
