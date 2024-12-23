import { View, Text } from "react-native";
import React from "react";

import Container from "./container";
import LoadingSpinner, { LoadingSpinnerProps } from "./loading-spinner";
import { StatusBar } from "expo-status-bar";

export interface FullScreenLoaderProps extends LoadingSpinnerProps {
  text?: string | null;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = (props) => {
  return (
    <Container>
      <StatusBar style="auto" backgroundColor="#46A8DF" />
      <View className="flex h-full w-full justify-center items-center gap-4 ml-0">
        <LoadingSpinner {...props} />
        {props?.text && (
          <Text className="font-isemibold text-gray-500 text-lg">
            {props.text}
          </Text>
        )}
      </View>
    </Container>
  );
};

export default FullScreenLoader;
