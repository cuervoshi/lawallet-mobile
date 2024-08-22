import styled from "styled-components/native";
import { TextPrimitiveProps } from "./types";

export const TextPrimitive = styled.Text<TextPrimitiveProps>`
  width: 100%;
  color: ${(props) => props.$color || "black"};
  font-size: ${(props) => (props.$isSmall ? "14px" : "16px")};
  line-height: ${(props) => (props.$isSmall ? "18px" : "20px")};
  text-align: ${(props) => props.$align || "left"};
  font-weight: ${(props) => (props.$isBold ? "700" : "400")};
`;
