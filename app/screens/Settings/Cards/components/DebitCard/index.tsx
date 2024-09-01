import { useState } from "react";

// import { CardImage, ConfigCard } from "./style";

import { Button } from "@/components/ui/Button";
import { Flex } from "@/components/ui/Flex";
import { GearIcon } from "@/components/ui/Icon/Icons/GearIcon";
import Pause from "@/components/ui/Icon/Icons/Pause";
import Play from "@/components/ui/Icon/Icons/Play";
import { CardPayload, CardStatus, Design } from "@lawallet/react/types";
import { TouchableOpacity, View } from "react-native";
import Card from "../Card";
import { CardImage, ConfigCard } from "./style";
import { useRouter } from "expo-router";
import { Divider } from "@/components/ui/Divider";
// import SettingsSheet from "../Sheets/SettingsSheet";

export type CardProps = {
  uuid: string;
  data: { design: Design };
  config: CardPayload | undefined;
};

interface ComponentProps {
  card: CardProps;
  toggleCardStatus: (uuid: string) => void;
}

export default function Component(props: ComponentProps) {
  const { card, toggleCardStatus } = props;
  const [handleSelected, setHandleSelected] = useState(false);

  const router = useRouter();

  // ActionSheet
  const [showConfiguration, setShowConfiguration] = useState(false);

  const toggleShowConfig = () => {
    setShowConfiguration(!showConfiguration);
  };

  return (
    <>
      <Flex justify={"center"} align="center" gap={8}>
        <TouchableOpacity onPress={() => setHandleSelected(!handleSelected)}>
          <CardImage $isActive={handleSelected}>
            <Card
              data={card.data}
              active={card.config?.status === CardStatus.ENABLED}
            />
          </CardImage>
        </TouchableOpacity>

        {handleSelected && (
          <ConfigCard $isActive={handleSelected}>
            <Flex direction="column" justify="center" align="center" gap={32}>
              {card.config?.status === CardStatus.ENABLED ? (
                <Flex>
                  <Button
                    onPress={() => toggleCardStatus(card.uuid)}
                    color="secondary"
                    variant="bezeled"
                  >
                    <Pause color="white" />
                  </Button>
                </Flex>
              ) : (
                <Flex>
                  <Button
                    onPress={() => toggleCardStatus(card.uuid)}
                    variant="bezeled"
                  >
                    <Play color="white" />
                  </Button>
                </Flex>
              )}
              <Flex>
                <Button
                  onPress={() =>
                    router.navigate({
                      pathname: "/(router)/settings/cards/uuid/[uuid]",
                      params: { uuid: card.uuid },
                    })
                  }
                  variant="bezeledGray"
                >
                  <GearIcon color="white" />
                </Button>
              </Flex>
            </Flex>
          </ConfigCard>
        )}
      </Flex>

      <Divider y={24} />

      {/* Menu actions by Card */}
      {/* <SettingsSheet
        card={card}
        isOpen={showConfiguration}
        onClose={toggleShowConfig}
      /> */}
    </>
  );
}
