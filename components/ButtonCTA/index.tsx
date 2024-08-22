import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Default } from "./style";
import { Flex } from "../ui/Flex";

interface ButtonCTAProps {
  children: React.ReactNode;
  onPress?: () => void; // Añadido para manejar la interacción
}

export default function ButtonCTA(props: ButtonCTAProps) {
  const { children, onPress } = props;

  return (
    <Flex justify="center">
      <TouchableOpacity onPress={onPress} style={Default.button}>
        <View style={Default.container}>{children}</View>
      </TouchableOpacity>
    </Flex>
  );
}
