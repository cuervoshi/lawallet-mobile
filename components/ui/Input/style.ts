import styled from "styled-components/native";
import { TextInput, View, TouchableOpacity } from "react-native";

import { InputPrimitiveProps, FeedbackPrimitiveProps } from "./types";

export const InputPrimitive = styled(TextInput)<InputPrimitiveProps>`
  flex: 1;
  min-height: 50px;
  min-width: 100%;
  max-width: 100%;
  padding: 8px;
  padding-left: 12px;
  background-color: ${(props) => props.theme.colors.gray15};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${(props) =>
    props.$showValidate
      ? props.theme.colors.gray20
      : props.$isSuccess
      ? props.theme.colors.success
      : props.theme.colors.error};
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
  opacity: ${(props) => (props.disabled ? "0.35" : "1")};
  transition-duration: 0.3s;
`;

export const InputButton = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 10px;
`;

export const InputGroupPrimitive = styled(View)`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: center;
`;

export const InputGroupRightPrimitive = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  padding: 0 4px;
  background-color: ${(props) => props.theme.colors.gray10};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.gray20};
  border-left-width: 0;
  border-radius: 0 8px 8px 0;
`;

export const FeedbackPrimitive = styled(View)<FeedbackPrimitiveProps>`
  opacity: ${(props) => (props.$isShow ? 1 : 0)};
  display: block;
  margin-top: 4px;
  color: ${(props) =>
    props.$isSuccess ? props.theme.colors.success : props.theme.colors.error};
`;

export const InputWithLabel = styled(View)``;

interface InputBoxProps {
  $withIcon: boolean;
}

export const InputBox = styled(View)<InputBoxProps>`
  position: relative;
  width: 100%;
`;

export const InputIcon = styled(View)`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;
`;
