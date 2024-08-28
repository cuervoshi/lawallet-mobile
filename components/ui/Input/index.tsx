import React, { useState } from "react";
import { InputProps } from "./types";
import { useTheme } from "styled-components";
import { InputBox, InputIcon, InputPrimitive } from "./style";
import { ActivityIndicator } from "react-native";
import { CheckIcon } from "../Icon/Icons/CheckIcon";
import { AlertIcon } from "../Icon/Icons/AlertIcon";
import { appTheme } from "../../../utils/theme";

export function Input(props: InputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const {
    placeholder,
    value,
    type = "text",
    id = "",
    name = "",
    status,
    autoFocus = false,
    onChange,
    onFocus,
    onBlur,
    isLoading = false,
    isChecked = false,
    isError = false,
    disabled = false,
  } = props;

  return (
    <InputBox $withIcon={isLoading}>
      <InputPrimitive
        $isSuccess={status && status === "success"}
        $showValidate={!status}
        autoFocus={autoFocus}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        placeholderTextColor={appTheme.colors.gray50}
        type={type}
        value={value}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        onChangeText={onChange}
        onFocus={(e) => {
          setIsFocused(true);
          if (onFocus) onFocus(e);
        }}
        style={{
          borderColor: isFocused ? theme.colors.primary : theme.colors.gray20,
        }}
      />
      {(isLoading || isChecked || isError) && (
        <InputIcon>
          {isLoading && <ActivityIndicator size={"small"} />}
          {isChecked && <CheckIcon color={theme.colors.success} />}
          {isError && <AlertIcon color={theme.colors.error} />}
        </InputIcon>
      )}
    </InputBox>
  );
}
