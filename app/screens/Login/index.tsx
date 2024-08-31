import { StoragedIdentityInfo } from "@/components/AppProviders/AuthProvider";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import MainContainer from "@/components/ui/Container/MainContainer";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Heading } from "@/components/ui/Heading";
import { Feedback } from "@/components/ui/Input/Feedback";
import { Textarea } from "@/components/ui/Input/TextArea";
import { Text } from "@/components/ui/Text";
import useErrors from "@/hooks/useErrors";
import { useTranslations } from "@/i18n/I18nProvider";
import { saveIdentityToStorage } from "@/utils";
import { useConfig, useIdentity, useNostr } from "@lawallet/react";
import { getUsername } from "@lawallet/react/actions";
import { hexToBytes } from "@noble/hashes/utils";
import { useRouter } from "expo-router";
import { getPublicKey } from "nostr-tools";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";

function LoginView() {
  const { initializeSigner } = useNostr();

  const { i18n } = useTranslations();

  const [keyInput, setKeyInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const config = useConfig();
  const router = useRouter();
  const errors = useErrors();
  const identity = useIdentity();

  const handleChangeInput = (text: string) => {
    errors.resetError();
    setKeyInput(text);
  };

  const handleRecoveryAccount = async () => {
    if (keyInput.length < 32) {
      errors.modifyError("KEY_LENGTH_ERROR");
      return;
    }

    setLoading(true);

    try {
      const pubkey: string = getPublicKey(hexToBytes(keyInput));
      const username: string = await getUsername(pubkey, config);

      if (!username.length) {
        errors.modifyError("NOT_FOUND_PUBKEY");
        setLoading(false);
        return;
      }

      identity.initializeFromPrivateKey(keyInput, username).then((res) => {
        if (res) {
          const IdentityToSave: StoragedIdentityInfo = {
            username,
            pubkey,
            privateKey: keyInput,
          };

          saveIdentityToStorage(config.storage, IdentityToSave, true).then(
            () => {
              initializeSigner(identity.signer);
              router.push("/dashboard");
            }
          );
        }
      });
    } catch (err) {
      errors.modifyError("UNEXPECTED_RECEOVERY_ERROR");
    }

    setLoading(false);
  };

  return (
    <MainContainer>
      <Navbar />

      <Flex direction="column" justify="space-between" align="center">
        <Flex direction="column" justify="center" align="center">
          <Heading as="h2" color="white">
            {i18n.t("LOGIN_TITLE")}
          </Heading>

          <Divider y={16} />

          <Textarea
            placeholder={i18n.t("INSERT_PRIVATE_KEY")}
            secureTextEntry
            multiline={false}
            onChangeText={handleChangeInput}
            value={keyInput}
          />

          <Feedback show={errors.errorInfo.visible} status={"error"}>
            {errors.errorInfo.text}
          </Feedback>
        </Flex>

        <Divider y={24} />

        <Flex justify="space-between" align="center">
          <Flex gap={8}>
            <Button
              onPress={async () => {
                let copiedText = await Clipboard.getStringAsync();
                setKeyInput(copiedText);
              }}
            >
              <Text>{i18n.t("PASTE")}</Text>
            </Button>
            <Button
              onPress={handleRecoveryAccount}
              disabled={!keyInput.length || loading}
              loading={loading}
            >
              <Text>{i18n.t("LOGIN")}</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </MainContainer>
  );
}

export default LoginView;
