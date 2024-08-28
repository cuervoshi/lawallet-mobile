import { Container } from "@/components/ui/Container";
import EmptySvg from "./EmptySvg";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { baseTheme } from "@/components/ui/theme";

const EmptyCards = () => {
  return (
    <Container size="medium">
      <Flex
        flex={1}
        direction="column"
        align="center"
        justify="center"
        gap={16}
      >
        <EmptySvg />
        <Flex direction="column" gap={4} align="center">
          <Text isBold={true}>No tienes tarjetas</Text>
          <Text size="small" color={baseTheme.colors.gray50}>
            No se encontraron tarjetas
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default EmptyCards;
