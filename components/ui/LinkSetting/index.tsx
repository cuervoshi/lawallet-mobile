import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { LinkSettingProps } from "./types";
import { useTheme } from "styled-components/native";
import { LinkSettingPrimitive, IconWrapper } from "./style";
import { Icon } from "../Icon/Icon";
import { CaretRightIcon } from "../Icon/Icons/CaretRightIcon";

export function LinkSetting(props: LinkSettingProps) {
  const { children, onClick } = props;
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onClick}>
      <LinkSettingPrimitive>
        <Text style={{ color: theme.colors.text, fontSize: 14 }}>
          {children}
        </Text>
        <IconWrapper>
          <Icon color={theme.colors.gray40} size="small">
            <CaretRightIcon color="white" />
          </Icon>
        </IconWrapper>
      </LinkSettingPrimitive>
    </TouchableOpacity>
  );
}
