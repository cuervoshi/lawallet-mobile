import { formatAddress, splitHandle, useConfig } from "@lawallet/react";
import { TransferTypes } from "@lawallet/react/types";
import { extractFirstTwoChars } from "@/utils";
import { useRouter } from "expo-router";
import { Flex } from "@/components/ui/Flex";
import { Text } from "@/components/ui/Text";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import CrossIcon from "@/components/ui/Icon/Icons/CrossIcon";

const CardWithData = ({
  type,
  data,
}: {
  type: TransferTypes;
  data: string;
}) => {
  const router = useRouter();
  const config = useConfig();
  const [transferUsername, transferDomain] = splitHandle(data, config);

  return (
    <Card>
      <Flex justify="center" align="center" gap={8}>
        {type === TransferTypes.LNURLW ? (
          <Text size="small" color="white">
            Reclama esta factura
          </Text>
        ) : (
          <Avatar size="large">
            <Text color="white" align="center" size="small">
              {extractFirstTwoChars(transferUsername)}
            </Text>
          </Avatar>
        )}
        {type === TransferTypes.INVOICE || type === TransferTypes.LNURLW ? (
          <Text color="white">{formatAddress(data, 15)}</Text>
        ) : (
          <Text color="white">
            {transferUsername}@{transferDomain}
          </Text>
        )}
      </Flex>
      <Button onPress={() => router.push("/transfer")} variant="borderless">
        <CrossIcon />
      </Button>
    </Card>
  );
};

export default CardWithData;
