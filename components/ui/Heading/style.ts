import styled from "styled-components/native";
import { HeadingPrimitiveProps } from "./types";

export const HeadingPrimitive = styled.Text<HeadingPrimitiveProps>`
  color: ${(props) => props.$color || "black"};
  text-align: ${(props) => props.$align};
  font-size: ${(props) => {
    switch (props.$as) {
      case "h1":
        return "32px";
      case "h2":
        return "28px";
      case "h3":
        return "24px";
      case "h4":
        return "20px";
      case "h5":
        return "18px";
      case "h6":
        return "16px";
      default:
        return "32px"; // Por defecto h1
    }
  }};
  line-height: ${(props) => {
    switch (props.$as) {
      case "h1":
        return "36px";
      case "h2":
        return "32px";
      case "h3":
        return "28px";
      case "h4":
        return "24px";
      case "h5":
        return "22px";
      case "h6":
        return "20px";
      default:
        return "36px"; // Por defecto h1
    }
  }};
`;
