import { Button } from "@/components/ui/Button";
import { Flex } from "@/components/ui/Flex";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Text";
import { getUserStoragedKey } from "@/utils";
import { buildCardActivationEvent, useConfig } from "@lawallet/react";
import { requestCardActivation } from "@lawallet/react/actions";
import { NostrEvent } from "@nostr-dev-kit/ndk";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export type NewCard = {
  card: string;
  loading: boolean;
};

const defaultNewCard = {
  card: "",
  loading: false,
};

const AddNewCardModal = () => {
  const [newCardInfo, setNewCardInfo] = useState<NewCard>(defaultNewCard);

  const router = useRouter();
  //   const pathname = usePathname();
  //   const params = useSearchParams();
  const config = useConfig();
  //   const notifications = useNotifications();

  const resetCardInfo = () => {
    setNewCardInfo(defaultNewCard);
    // router.replace(pathname);
  };

  const sendNotification = (
    alertDescription: string,
    alertType: "error" | "success"
  ) => {
    // notifications.showAlert({
    //   description: alertDescription,
    //   type: alertType,
    // });

    resetCardInfo();
  };

  const handleActivateCard = async () => {
    if (newCardInfo.loading) return;
    setNewCardInfo({
      ...newCardInfo,
      loading: true,
    });

    try {
      const storagedKey: string = await getUserStoragedKey(config.storage);
      if (!storagedKey) {
        sendNotification("Error al activar", "error");
        return;
      }

      const cardEvent: NostrEvent = await buildCardActivationEvent(
        newCardInfo.card,
        storagedKey,
        config
      );
      const cardActivated: boolean = await requestCardActivation(
        cardEvent,
        config
      );

      const description: string = cardActivated
        ? "Activado con exito"
        : "Error al activar";

      const type = cardActivated ? "success" : "error";

      sendNotification(description, type);
      return;
    } catch {
      sendNotification("Error al activar", "error");
      return;
    }
  };

  //   useEffect(() => {
  //     const card: string = params.get("c") ?? "";

  //     setNewCardInfo({
  //       card,
  //       loading: false,
  //     });
  //   }, []);

  return (
    <Modal
      title={"Nueva tarjeta"}
      isOpen={Boolean(newCardInfo.card.length)}
      onClose={() => router.push("/settings")} // /cards
    >
      <Text>Nueva tarjeta detectada</Text>
      <Flex direction="column" gap={4}>
        <Flex>
          <Button onPress={handleActivateCard}>
            <Text>Activar tarjeta</Text>
          </Button>
        </Flex>
        <Flex>
          <Button variant="borderless" onPress={resetCardInfo}>
            <Text>Cancelar</Text>
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default AddNewCardModal;
