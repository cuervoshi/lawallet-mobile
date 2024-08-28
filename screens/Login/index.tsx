"use client";
import { StoragedIdentityInfo } from "@/components/AppProviders/AuthProvider";
// import { StoragedIdentityInfo } from "@/components/AppProvider/AuthProvider";
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
import { saveIdentityToStorage } from "@/utils";
// import { saveIdentityToStorage } from "@/utils";
import { useConfig, useIdentity, useNostr } from "@lawallet/react";
import { getUsername } from "@lawallet/react/actions";
import { useRouter } from "expo-router";
import { getPublicKey } from "nostr-tools";
import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

function LoginView() {
  const { initializeSigner } = useNostr();

  const [keyInput, setKeyInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const config = useConfig();
  const router = useRouter();
  const errors = useErrors();
  const identity = useIdentity();

  const handleChangeInput = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    errors.resetError();
    setKeyInput(e.nativeEvent.text);
  };

  const handleRecoveryAccount = async () => {
    if (keyInput.length < 32) {
      errors.modifyError("La clave debe tener al menos 32 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const pubkey: string = getPublicKey(keyInput);
      const username: string = await getUsername(pubkey, config);

      if (!username.length) {
        errors.modifyError("Clave pública no encontrada.");
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
      errors.modifyError("Error inesperado al recuperar la cuenta.");
    }

    setLoading(false);
  };

  return (
    <MainContainer>
      <Navbar />

      <Flex direction="column" justify="space-between" align="center">
        <Flex direction="column" justify="center" align="center">
          <Heading as="h2" color="white">
            Iniciar sesión
          </Heading>

          <Divider y={16} />

          <Textarea
            placeholder="Introduce tu clave privada"
            onChange={handleChangeInput}
          />

          <Feedback show={errors.errorInfo.visible} status={"error"}>
            {errors.errorInfo.text}
          </Feedback>
        </Flex>

        <Divider y={24} />

        <Flex justify="space-between" align="center">
          <Flex gap={8}>
            <Button variant="bezeledGray" onPress={() => router.push("/")}>
              <Text>Cancelar</Text>
            </Button>
            <Button
              onPress={handleRecoveryAccount}
              disabled={!keyInput.length || loading}
              loading={loading}
            >
              <Text>Iniciar sesión</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {/* <Button onPress={authWithExtension}>Iniciar sesión con la extensión</Button> */}
    </MainContainer>
  );
}

export default LoginView;
