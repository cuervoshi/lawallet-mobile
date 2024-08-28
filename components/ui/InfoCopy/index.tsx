import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Flex } from "../Flex";
import { baseTheme } from "../theme";
import { Button } from "../Button";
import { formatAddress } from "@lawallet/react";

interface ComponentProps {
  title: string;
  value: string;
  onCopy?: () => void;
}

export default function Component(props: ComponentProps) {
  const { title, value, onCopy = null } = props;

  const handleCopy = () => {
    Clipboard.setStringAsync(value);
    if (onCopy) onCopy();
  };

  return (
    <View>
      <Flex justify="space-between" align="center" gap={8}>
        <Flex direction="column" gap={8}>
          <Text style={[styles.text, { color: baseTheme.colors.gray50 }]}>
            {title}
          </Text>
          <Text style={styles.valueText}>{formatAddress(value, 20)}</Text>
        </Flex>

        <Flex align="center">
          <Button size="small" variant="filled" onPress={handleCopy}>
            <Text>Copiar</Text>
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
