import styled from "styled-components/native";
import { ContainerPrimitiveProps } from "./types";

export const ContainerPrimitive = styled.View<ContainerPrimitiveProps>`
  flex: 1;
  flex-direction: "column";
  width: 100%;
  max-width: ${(props) => (props.$isSmall ? "75%" : "100%")};
  padding: 0 16px;
`;
