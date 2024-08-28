import styled from "styled-components/native";

interface CardImageProp {
  $isActive: boolean;
}

export const CardImage = styled.View<CardImageProp>`
  display: flex;
  border-radius: 12px;
`;

export const ConfigCard = styled.View<CardImageProp>`
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  width: ${(props) => (props.$isActive ? "auto" : 0)};
  padding: 0 24px;
`;
