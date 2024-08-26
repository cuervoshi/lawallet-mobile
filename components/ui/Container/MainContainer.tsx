import { globalStyles } from "@/constants/styles";
import React, { ReactNode } from "react";
import { View } from "react-native";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return <View style={globalStyles.container}>{children}</View>;
};

export default MainContainer;
