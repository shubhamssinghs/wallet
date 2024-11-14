import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import icons from "@/constants/icons";

interface PaymentSuccessScreenProps {
  handleDoneButton?: () => void;
  amount?: number;
}

const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({
  handleDoneButton = () => {},
  amount,
}) => {
  const translateY = useSharedValue(-300);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const otherViewOpacity = useSharedValue(0);

  const { height } = Dimensions.get("screen");

  useEffect(() => {
    translateY.value = withSequence(
      withTiming(0, { duration: 200 }),
      withDelay(450, withSpring(-height / 1.35)),
      withDelay(0, withSpring(-height / 1.13))
    );

    scale.value = withSequence(
      withDelay(250, withTiming(1, { duration: 250 })),
      withDelay(700, withSpring(2)),
      withDelay(1, withSpring(0.8))
    );

    opacity.value = withDelay(750, withTiming(1, { duration: 250 }));

    otherViewOpacity.value = withDelay(2800, withTiming(1, { duration: 250 }));
  }, []);

  // @ts-ignore
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: otherViewOpacity.value,
    };
  });

  return (
    <>
      <Animated.View
        style={animatedStyle}
        className="justify-center items-center m-0 w-full absolute -bottom-[300px]"
      >
        <Image
          source={icons.CHECKFILLED}
          resizeMode="contain"
          className="h-32 w-32"
          tintColor={"#22C55E"}
        />
      </Animated.View>
      <Animated.View
        style={[animatedOpacity]}
        className="flex justify-center items-center gap-1 absolute w-full  m-0 top-[43.5%]"
      >
        <Text className="font-ibold text-xl text-primary">Paid</Text>
        <View className="flex flex-row justify-center items-center">
          <Image
            source={icons.RUPEE}
            className="h-4 w-4"
            resizeMode="contain"
            tintColor={"#0F1729"}
          />
          <Text className="text-center text-primary text-3xl font-iblack">
            {amount}
          </Text>
        </View>
        <Text className="font-ibold text-xl text-primary mb-3">to Shubham</Text>
        <TouchableOpacity
          onPress={handleDoneButton}
          className=" w-[130px] h-[40px] rounded-lg bg-secondary justify-center items-center"
        >
          <Text className="font-ibold text-lg text-white">Done</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default PaymentSuccessScreen;
