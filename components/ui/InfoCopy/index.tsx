import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Flex } from "../Flex";
import { appTheme } from "../../../utils/theme";
import { Button } from "../Button";
import { formatAddress } from "@lawallet/react";
import { useTranslations } from "@/i18n/I18nProvider";

interface ComponentProps {
  title: string;
  value: string;
  onCopy?: () => void;
}

export default function Component(props: ComponentProps) {
  const { title, value, onCopy = null } = props;
  const { i18n } = useTranslations();

  const handleCopy = () => {
    Clipboard.setStringAsync(value);
    if (onCopy) onCopy();
  };

  return (
    <View>
      <Flex justify="space-between" align="center" gap={8}>
        <Flex direction="column" gap={8}>
          <Text style={[styles.text, { color: appTheme.colors.gray50 }]}>
            {title}
          </Text>
          <Text style={styles.valueText}>{formatAddress(value, 20)}</Text>
        </Flex>

        <Flex align="center">
          <Button size="small" variant="filled" onPress={handleCopy}>
            <Text>{i18n.t("COPY")}</Text>
          </Button>
        </Flex>
      </Flex>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
  valueText: {
    overflow: "hidden",
    color: "white",
  },
});
