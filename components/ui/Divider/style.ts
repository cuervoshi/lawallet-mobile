import styled from "styled-components/native";
import { DividerPrimitiveProps } from "./types";

export const DividerPrimitive = styled.View<DividerPrimitiveProps>`
  width: 100%;
  min-height: ${(props) => props.$y}px;
`;
