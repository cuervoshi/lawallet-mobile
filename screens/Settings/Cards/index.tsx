import Navbar from "@/components/Navbar";
import { useCardsContext } from "./context/CardsContext";
import { Design } from "@lawallet/react/types";
import { ActivityIndicator, Alert } from "react-native";
import { Container } from "@/components/ui/Container";
import MainContainer from "@/components/ui/Container/MainContainer";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { baseTheme } from "@/components/ui/theme";
import AddNewCardModal from "./components/AddCard";
import DebitCard from "./components/DebitCard";
import EmptyCards from "./components/EmptyCards";
// import EmptyCards from "./components/EmptyCards";

function CardsView() {
  const { cardsData, cardsConfig, loadInfo, toggleCardStatus } =
    useCardsContext();

  const handleToggleStatus = async (uuid: string) => {
    const toggled: boolean = await toggleCardStatus(uuid);
    // if (toggled) Alert.alert("", "Estado cambiado");

    return toggled;
  };

  return (
    <MainContainer>
      <Navbar
        title={"Mis tarjetas"}
        showBackPage={true}
        overrideBack={"/settings"}
      />

      <Container>
        <Divider y={16} />
        {loadInfo.loading ? (
          <ActivityIndicator size={"small"} color={baseTheme.colors.success} />
        ) : Object.keys(cardsData).length ? (
          <Flex direction="column">
            {Object.entries(cardsData).map(([key, value]) => {
              return (
                <DebitCard
                  card={{
                    uuid: key,
                    data: value as { design: Design },
                    config: cardsConfig.cards?.[key],
                  }}
                  toggleCardStatus={handleToggleStatus}
                  key={key}
                />
              );
            })}
          </Flex>
        ) : (
          <EmptyCards />
        )}
        <Divider y={16} />
      </Container>

      <AddNewCardModal />
    </MainContainer>
  );
}

export default CardsView;
