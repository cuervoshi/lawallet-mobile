import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { useTranslations } from "@/i18n/I18nProvider";
import { useRouter } from "expo-router";

export const ErrorTransfer = () => {
  const { i18n } = useTranslations();
  const router = useRouter();

  return (
    <>
      <Container size="small">
        <Divider y={16} />
        <Heading>Error</Heading>
        <Divider y={4} />
        <Text size="small">{i18n.t("DETAIL_FAILED_TRANSACTION")}</Text>
      </Container>

      <Flex>
        <Container size="small">
          <Divider y={16} />
          <Flex gap={8}>
            <Button
              variant="borderless"
              onPress={() => router.push("/dashboard")}
            >
              {i18n.t("GO_HOME")}
            </Button>
          </Flex>
          <Divider y={32} />
        </Container>
      </Flex>
    </>
  );
};
