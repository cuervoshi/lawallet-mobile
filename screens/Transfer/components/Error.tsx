import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Flex } from "@/components/ui/Flex";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { useRouter } from "expo-router";

export const ErrorTransfer = () => {
  const router = useRouter();

  return (
    <>
      <Container size="small">
        <Divider y={16} />
        <Heading>Error</Heading>
        <Divider y={4} />
        <Text size="small">
          Ocurrió un error al enviar la transferencia, los fondos han sido
          reintegrados
        </Text>
      </Container>

      <Flex>
        <Container size="small">
          <Divider y={16} />
          <Flex gap={8}>
            <Button
              variant="borderless"
              onPress={() => router.push("/dashboard")}
            >
              Ir al inicio
            </Button>
          </Flex>
          <Divider y={32} />
        </Container>
      </Flex>
    </>
  );
};
