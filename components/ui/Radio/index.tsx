import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { appTheme } from "@/utils/theme";
import { Text } from "../Text";

const Radio = (props: {
  text: string;
  checked: boolean;
  onPress: () => void;
}) => {
  const { text, checked, onPress } = props;

  return (
    <View style={styles.radioContainer}>
      <TouchableOpacity style={styles.radioItem} onPress={onPress}>
        <Text>{text}</Text>

        <View style={[styles.checkDiv, checked && styles.checked]}>
          {checked && <View style={styles.innerCircle} />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Radio;

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "column",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#404040",
  },
  radioItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    margin: 12,
  },
  checkDiv: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: appTheme.colors.gray50,
    borderRadius: 12.5,
    height: 25,
    width: 25,
    backgroundColor: "transparent",
  },
  checked: {
    borderColor: appTheme.colors.primary,
  },
  innerCircle: {
    borderRadius: 4.5,
    height: 9,
    width: 9,
    backgroundColor: appTheme.colors.primary,
  },
});
