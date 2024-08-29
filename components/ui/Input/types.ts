import { ReactNode } from "react";
import { TextInputProps } from "react-native";

export interface InputProps extends TextInputProps {
  placeholder: string;
  value?: string;
  type?: "text" | "password" | "number" | "email";
  id?: string;
  name?: string;
  status?: "success" | "error";
  autoFocus?: boolean;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isLoading?: boolean;
  isChecked?: boolean;
  isError?: boolean;
  disabled?: boolean;
}

export interface InputPrimitiveProps extends InputProps {
  $isSuccess?: boolean;
  $showValidate?: boolean;
}

export interface FeedbackProps {
  children: ReactNode;
  status?: null | "success" | "error";
  show?: boolean;
}

export interface FeedbackPrimitiveProps {
  $isShow: boolean;
  $isSuccess: boolean;
}

export interface TextareaProps {
  placeholder: string;
  status?: "success" | "error";
  onChange?: (e: any) => void;
  id?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
}
