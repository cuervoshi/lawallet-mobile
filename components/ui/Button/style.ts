import styled from "styled-components/native";
import { BaseButtonProps } from "./types";
import { TouchableOpacity } from "react-native";

export const BaseButton = styled(TouchableOpacity)<BaseButtonProps>`
  align-items: center;
  justify-content: center;
  flex: ${(props) => (props.$isSmall ? 0 : 1)};
  min-width: ${(props) => (props.$isSmall ? "40px" : "50px")};
  min-height: ${(props) => (props.$isSmall ? "40px" : "50px")};
  padding: ${(props) => (props.$isSmall ? "4px 8px" : "12px 8px")};
  border-radius: ${(props) => props.theme.borders.buttonRadius};
  background-color: ${(props) => props.$background};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

// Si necesitas un "gap" entre elementos, puedes hacerlo manualmente con márgenes:
export const IconWrapper = styled.View`
  margin-right: 8px; // Esto simula un gap entre el icono y el texto
`;
