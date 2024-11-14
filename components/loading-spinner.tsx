import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

export interface LoadingSpinnerProps {
  color?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  color = "#46A8DF",
  size = 100,
}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View
      style={{ height: size, width: size }}
      className="flex justify-center items-center"
    >
      <View
        style={{
          borderColor: color,
          borderRadius: size / 2,
          borderWidth: size / 10,
        }}
        className="w-full h-full opacity-25"
      />
      <Animated.View
        style={[
          {
            borderTopColor: color,
            borderRadius: size / 2,
            borderWidth: size / 10,
          },
          animatedStyle,
        ]}
        className="w-full h-full border-r-transparent border-l-transparent border-b-transparent absolute"
      />
    </View>
  );
};

const height = 24;

const styles = StyleSheet.create({
  container: {
    width: height,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    borderRadius: height / 2,
    borderWidth: 4,
    opacity: 0.25,
  },
  progress: {
    width: "100%",
    height: "100%",
    borderRadius: height / 2,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderWidth: 4,
    position: "absolute",
  },
});

export default LoadingSpinner;
