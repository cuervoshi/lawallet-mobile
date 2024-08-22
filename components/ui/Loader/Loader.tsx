import styled from "styled-components/native";
import { Animated, Easing } from "react-native";
import React, { useEffect } from "react";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const LoaderContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 1rem auto;
  text-align: center;
`;

const BaseLoader = styled(Animated.View)`
  width: 28px;
  height: 28px;
  border-radius: ${width * 0.5}px;
  border-top-width: 2px;
  border-top-color: ${(props) => props.theme.colors.gray50};
  border-right-width: 2px;
  border-right-color: transparent;
  box-sizing: border-box;
`;

const LoaderAnimation = () => {
  const rotateAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return <BaseLoader style={{ transform: [{ rotate }] }} />;
};

export const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderAnimation />
    </LoaderContainer>
  );
};

export const BtnLoader = () => <LoaderAnimation />;
