import React, { useState } from "react";
import { View } from "react-native";
import { AccordionTrigger } from "./AccordionTrigger";
import { AccordionBody } from "./AccordionBody";
import { useTheme } from "styled-components/native";

interface AccordionProps {
  children?: React.ReactNode;
  trigger: React.ReactNode;
  onOpen?: () => void;
  variant?: "filled" | "borderless";
}

export function Accordion({
  children,
  trigger,
  onOpen,
  variant = "filled",
}: AccordionProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const backgroundColor =
    open || variant === "filled" ? theme.colors.gray15 : "transparent";
  const borderColor =
    open || variant === "filled" ? theme.colors.gray35 : "transparent";

  const handleClick = () => {
    if (!open && onOpen) onOpen();
    setOpen(!open);
  };

  return (
    <View
      style={{ backgroundColor, borderColor, borderWidth: 1, borderRadius: 8 }}
    >
      <AccordionTrigger isOpen={open} onClick={handleClick}>
        {trigger}
      </AccordionTrigger>

      {open && <AccordionBody>{children}</AccordionBody>}
    </View>
  );
}
