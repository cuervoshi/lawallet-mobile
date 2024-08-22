import styled from "styled-components/native";

interface AvatarPrimitiveProps {
  $isNormal: boolean;
}

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const AvatarPrimitive = styled.View<AvatarPrimitiveProps>`
  overflow: hidden;
  align-items: center;
  justify-content: center;
  min-width: ${(props) => (props.$isNormal ? "35px" : "45px")};
  min-height: ${(props) => (props.$isNormal ? "35px" : "45px")};
  max-width: ${(props) => (props.$isNormal ? "35px" : "45px")};
  max-height: ${(props) => (props.$isNormal ? "35px" : "45px")};
  background-color: ${(props) => props.theme.colors.gray20};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.gray30};
  border-radius: ${width * 0.5}px;
  font-size: 14px;
`;

export const AvatarImagePrimitive = styled.Image`
  width: 100%;
  height: 100%;
`;
