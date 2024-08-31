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
    minWidth: "80%",
    maxWidth: "80%",
    padding: 8,
    paddingLeft: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    color: "#333",
    fontSize: 14,
    verticalAlign: "top",
  },
  success: {
    borderColor: "green",
  },
  error: {
    borderColor: "red",
  },
  default: {
    borderColor: "#dcdcdc",
  },
  disabled: {
    opacity: 0.35,
    backgroundColor: "#e0e0e0",
  },
});
