import React, { ReactNode, useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Flex } from "../Flex";
import { Heading } from "../Heading";
import { Button } from "../Button";
import { Icon } from "../Icon/Icon";
import CrossIcon from "../Icon/Icons/CrossIcon";

interface ComponentProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function Component(props: ComponentProps) {
  const { children, isOpen, onClose, title } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Modal
      visible={open}
      animationType="fade"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Flex justify="flex-end" align="center" gap={16}>
            <Flex flex={1}>
              <Heading as="h5">{title}</Heading>
            </Flex>

            <TouchableOpacity onPress={handleClose}>
              <Button size="small" variant="bezeledGray">
                <Icon>
                  <CrossIcon />
                </Icon>
              </Button>
            </TouchableOpacity>
          </Flex>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(28, 28, 28, 0.95)",
  },
  modalContent: {
    width: "90%",
    maxWidth: 320,
    padding: 24,
    backgroundColor: "#f1f1f1", // Sustituye con appTheme.colors.gray15 si es necesario
    borderRadius: 24,
  },
});
