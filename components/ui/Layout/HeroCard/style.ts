import styled from "styled-components/native";
import { baseTheme } from "../../theme";
import { HeroCardProps } from "./types";

export const HeroCardPrimitive = styled.View<HeroCardProps>`
  background-color: ${baseTheme.colors.gray15};
  border-radius: 0px 0px 20px 20px;
  flex: 1;
  flex-direction: column;
  max-height: ${(props) => props.maxHeight};
`;
