import styled from "styled-components/native";
import { appTheme } from "../../../../utils/theme";
import { HeroCardProps } from "./types";

export const HeroCardPrimitive = styled.View<HeroCardProps>`
  background-color: ${appTheme.colors.gray15};
  border-radius: 0px 0px 20px 20px;
  flex: 1;
  flex-direction: column;
  max-height: ${(props) => props.maxHeight};
`;
