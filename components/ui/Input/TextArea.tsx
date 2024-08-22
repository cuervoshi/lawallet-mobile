import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface TextareaProps extends TextInputProps {
  status?: "success" | "error";
  name?: string;
}

export function Textarea(props: TextareaProps) {
  const {
    placeholder,
    status,
    onChangeText,
    id,
    name,
    value,
    editable = true,
    ...rest
  } = props;

  return (
    <TextInput
      style={[
        styles.textarea,
        status === "success"
          ? styles.success
          : status === "error"
          ? styles.error
          : styles.default,
        !editable && styles.disabled,
      ]}
      placeholder={placeholder}
      value={value}
      editable={editable}
      onChangeText={onChangeText}
      multiline
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  textarea: {
    width: "100%",
    padding: 8,
    paddingLeft: 12,
    backgroundColor: "#f1f1f1", // Assuming gray15 corresponds to this
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dcdcdc", // Assuming gray20 corresponds to this
    color: "#333", // Assuming this is the text color
    fontSize: 14,
    textAlignVertical: "top", // To ensure the text starts from the top
  },
  success: {
    borderColor: "green", // Replace with actual theme color
  },
  error: {
    borderColor: "red", // Replace with actual theme color
  },
  default: {
    borderColor: "#dcdcdc",
  },
  disabled: {
    opacity: 0.35,
    backgroundColor: "#e0e0e0",
  },
});
