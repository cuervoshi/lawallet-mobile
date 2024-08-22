import { ReactNode } from "react";
import { ViewProps, TextProps, TouchableOpacityProps } from "react-native";

// AccordionProps para el componente Accordion
export interface AccordionProps extends ViewProps {
  children?: ReactNode;
  trigger: ReactNode;
  onOpen?: () => void;
  variant?: "filled" | "borderless";
}

// AccordionTriggerProps para el componente AccordionTrigger
export interface AccordionTriggerProps extends TouchableOpacityProps {
  children: ReactNode;
  onClick: () => void;
  isOpen: boolean;
}

// AccordionBodyProps para el componente AccordionBody
export interface AccordionBodyProps extends ViewProps {
  children: ReactNode;
}

// AccordionPrimitiveProps para el estilo AccordionPrimitive
export interface AccordionPrimitiveProps {
  $isOpen: boolean;
  $background: string;
  $borderColor: string;
}

// AccordionContentProps para el estilo AccordionContent
export interface AccordionContentProps {
  $isOpen: boolean;
}

// AccordionTriggerPrimitiveProps para el estilo AccordionTriggerPrimitive
export interface AccordionTriggerPrimitiveProps {
  $isOpen: boolean;
}
