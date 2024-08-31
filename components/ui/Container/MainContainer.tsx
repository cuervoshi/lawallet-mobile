import React, { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";
import { globalStyles } from "./style";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView style={globalStyles.layout}>
      <View style={globalStyles.container}>{children}</View>
    </SafeAreaView>
  );
};

export default MainContainer;
