import { ReactNode } from "react";

export interface HeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; // Especificamos los niveles de encabezado
  align?: "left" | "center" | "right";
  color?: string;
}

export interface HeadingPrimitiveProps {
  $align: "left" | "center" | "right";
  $color?: string;
  $as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; // Especificamos los niveles de encabezado
}
