import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import { baseTheme } from "../ui/theme";
interface NavbarProps {}

export const Navbar = styled(View)<NavbarProps>`
  width: 100%;
  height: 60px;
  position: relative;
  z-index: 10;
  background-color: ${baseTheme.colors.background};
`;

export const BackButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  border: none;
  color: ${baseTheme.colors.primary};
`;

const BoxIcons = styled(View)`
  width: 70px;
`;

export const Left = styled(BoxIcons)``;
export const Right = styled(BoxIcons)``;

interface AlertSystemStyleProps {
  $background: string;
}

export const AlertSystemStyle = styled(View)<AlertSystemStyleProps>`
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.$background};
`;
