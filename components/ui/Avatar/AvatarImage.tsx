import React from "react";
import { Image } from "react-native";
import { AvatarImagePrimitive } from "./style";

interface ComponentProps {
  src: string;
  alt: string;
}

export function AvatarImage(props: ComponentProps) {
  const { src, alt } = props;

  return (
    <AvatarImagePrimitive source={{ uri: src }} accessibilityLabel={alt} />
  );
}
