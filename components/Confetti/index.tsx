import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { StyleSheet } from "react-native";

const Confetti = () => {
  const confettiRef = useRef<LottieView>(null);

  return (
    <LottieView
      ref={confettiRef}
      source={require("@/assets/confetti.json")}
      autoPlay={true}
      loop={false}
      style={styles.lottie}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  lottie: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
});

export default Confetti;
