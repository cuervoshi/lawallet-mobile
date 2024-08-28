import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacityProps,
} from "react-native";
import { Design } from "@lawallet/react/types";
import { appTheme } from "@/utils/theme";

interface ComponentProps extends TouchableOpacityProps {
  data: { design: Design };
  active: boolean;
}

const images: Record<string, ImageSourcePropType> = {
  "0f7a4368-03ac-4b11-aafe-41a520759e2d": require("@/assets/images/cards/0f7a4368-03ac-4b11-aafe-41a520759e2d.png"),
  "5a69866c-06d1-4761-be8e-28d52c337abd": require("@/assets/images/cards/5a69866c-06d1-4761-be8e-28d52c337abd.png"),
  "70d31cc4-cc8b-4587-8681-246616195ddf": require("@/assets/images/cards/70d31cc4-cc8b-4587-8681-246616195ddf.png"),
  "6783cc8c-79d0-4e32-8457-aa13bb34649c": require("@/assets/images/cards/6783cc8c-79d0-4e32-8457-aa13bb34649c.png"),
  "43171fff-5b0a-4f89-aa3b-465db7792de9": require("@/assets/images/cards/43171fff-5b0a-4f89-aa3b-465db7792de9.png"),
  "0946745e-a0cd-4ce1-af4f-6e1b5bb2a56f": require("@/assets/images/cards/0946745e-a0cd-4ce1-af4f-6e1b5bb2a56f.png"),
  "a0f6803c-a75a-49d5-89e9-fb091aab4ede": require("@/assets/images/cards/a0f6803c-a75a-49d5-89e9-fb091aab4ede.png"),
  "b1b95247-98b8-4d1c-ba2c-f11a743fddc4": require("@/assets/images/cards/b1b95247-98b8-4d1c-ba2c-f11a743fddc4.png"),
  "c2f96146-e3e5-405b-b3e0-5c7ef05473f7": require("@/assets/images/cards/c2f96146-e3e5-405b-b3e0-5c7ef05473f7.png"),
  "c252f9d8-6c89-4e07-a481-82cef8169a14": require("@/assets/images/cards/c252f9d8-6c89-4e07-a481-82cef8169a14.png"),
  "f4c5d58b-1476-470a-880c-e42ef2d95484": require("@/assets/images/cards/f4c5d58b-1476-470a-880c-e42ef2d95484.png"),
  "fd54e006-a714-4699-9fd0-3898c622aed8": require("@/assets/images/cards/fd54e006-a714-4699-9fd0-3898c622aed8.png"),
};

export default function Component(props: ComponentProps) {
  const { data, active } = props;

  const imageSource = images[data.design.uuid];

  return (
    <View
      style={[styles.card, active ? styles.activeCard : styles.inactiveCard]}
    >
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    width: 280,
    height: 176,
    borderRadius: 12,
  },
  activeCard: {
    opacity: 1,
    backgroundColor: appTheme.colors.primary,
  },
  inactiveCard: {
    opacity: 0.3,
    backgroundColor: appTheme.colors.gray15,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
