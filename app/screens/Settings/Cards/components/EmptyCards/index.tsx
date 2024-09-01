import { Container } from "@/components/ui/Container";
import EmptySvg from "./EmptySvg";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { appTheme } from "@/utils/theme";
import { useTranslations } from "@/i18n/I18nProvider";

const EmptyCards = () => {
  const { i18n } = useTranslations();

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
          <Text isBold={true} align="center">
            {i18n.t("NO_HAVE_CARDS")}
          </Text>
          <Text size="small" align="center" color={appTheme.colors.gray50}>
            {i18n.t("NOT_FOUND_CARD")}
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default EmptyCards;
