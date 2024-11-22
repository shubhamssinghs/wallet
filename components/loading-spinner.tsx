import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

export interface LoadingSpinnerProps {
  color?: string;
  size?: "small" | "large";
  wrapperClassName?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  color = "#46A8DF",
  size = "large",
  wrapperClassName,
}) => {
  const defaultClassName = Boolean(wrapperClassName)
    ? wrapperClassName
    : "flex justify-center items-center";

  return (
    <View className={defaultClassName}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

export default LoadingSpinner;
