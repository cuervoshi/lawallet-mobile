import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";

interface AccordionTriggerProps {
  children: React.ReactNode;
  onClick: () => void;
  isOpen: boolean;
}

export function AccordionTrigger({
  children,
  onClick,
  isOpen,
}: AccordionTriggerProps) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <TouchableOpacity
      onPress={onClick}
      style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
    >
      {children}
    </TouchableOpacity>
  );
}
