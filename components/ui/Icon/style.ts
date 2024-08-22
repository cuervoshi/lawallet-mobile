import styled from "styled-components/native";
import { IconPrimitiveProps } from "./types";
import { View } from "react-native";

export const IconPrimitive = styled(View)<IconPrimitiveProps>`
  align-items: center;
  justify-content: center;
  min-width: ${(props) => (props.$isSmall ? "18px" : "24px")};
  min-height: ${(props) => (props.$isSmall ? "18px" : "24px")};
  width: ${(props) => (props.$isSmall ? "18px" : "24px")};
  height: ${(props) => (props.$isSmall ? "18px" : "24px")};
`;
