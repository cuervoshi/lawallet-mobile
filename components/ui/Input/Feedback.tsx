import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FeedbackProps } from "./types";

export function Feedback(props: FeedbackProps) {
  const { children, status, show = false } = props;

  return (
    <View style={[styles.feedback, show && styles.visible]}>
      <Text
        style={[
          styles.text,
          status === "success" ? styles.success : styles.error,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  feedback: {
    opacity: 0,
    marginTop: 4,
  },
  visible: {
    opacity: 1,
  },
  success: {
    color: "green", // Replace with your theme color
  },
  error: {
    color: "red", // Replace with your theme color
  },
  text: {
    textAlign: "right",
    fontSize: 12,
  },
});
