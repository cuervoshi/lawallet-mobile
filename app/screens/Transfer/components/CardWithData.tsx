import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Flex } from "@/components/ui/Flex";
import CrossIcon from "@/components/ui/Icon/Icons/CrossIcon";
import { Text } from "@/components/ui/Text";
import { useTranslations } from "@/i18n/I18nProvider";
import { extractFirstTwoChars } from "@/utils";
import { formatAddress, splitHandle, useConfig } from "@lawallet/react";
import { TransferTypes } from "@lawallet/react/types";
import { useRouter } from "expo-router";

const CardWithData = ({
  type,
  data,
}: {
  type: TransferTypes;
  data: string;
}) => {
  const { i18n } = useTranslations();
  const router = useRouter();
  const config = useConfig();
  const [transferUsername, transferDomain] = splitHandle(data, config);

  return (
    <Card>
      <Flex justify="center" align="center" gap={8}>
        {type === TransferTypes.LNURLW ? (
          <Text size="small" color="white">
            {i18n.t("CLAIM_THIS_INVOICE")}
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
    </Card>
  );
};

export default CardWithData;
