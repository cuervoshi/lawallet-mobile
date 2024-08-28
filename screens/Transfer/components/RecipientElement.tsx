import { extractFirstTwoChars } from "@/utils";
import { splitHandle } from "@lawallet/react";
import { Flex } from "../../../components/ui/Flex";
import { Avatar } from "../../../components/ui/Avatar";
import { Text } from "../../../components/ui/Text";

const RecipientElement = ({ lud16 }: { lud16: string }) => {
  const [username, domain] = splitHandle(lud16);
  return (
    <Flex align="center" gap={8}>
      <Avatar>
        <Text align="center" size="small">
          {extractFirstTwoChars(username)}
        </Text>
      </Avatar>
      <Flex align="center">
        <Text>{username}</Text>
        <Text>@{domain}</Text>
      </Flex>
    </Flex>
  );
};

export default RecipientElement;
