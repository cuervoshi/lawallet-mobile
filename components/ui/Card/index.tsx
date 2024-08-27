import React, { ReactNode } from "react";
import styled from "styled-components/native";

export function Card({ children }: { children: ReactNode }) {
  return <CardContainer>{children}</CardContainer>;
}

const CardContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 12px;
  align-items: center;
  justify-content: center;
  max-height: 15%;
  gap: 8px;
  align-self: stretch;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.gray15};
`;
