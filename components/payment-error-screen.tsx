import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import icons from "@/constants/icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface PaymentErrorScreenProps {
  handleDoneButton?: () => void;
}

const PaymentErrorScreen: React.FC<PaymentErrorScreenProps> = ({
  handleDoneButton,
}) => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSequence(
      withTiming(-30, { duration: 150 }),
      withTiming(10, { duration: 130 }),
      withTiming(-30, { duration: 100 }),
      withTiming(10, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );
  }, []);

  // @ts-ignore
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <>
      <Animated.View
        style={animatedStyle}
        className="justify-center items-center m-0 w-full absolute top-[36%]"
      >
        <Image
          source={icons.CROSSFILLED}
          resizeMode="contain"
          className="h-24 w-24"
          tintColor={"#dc2626"}
        />
      </Animated.View>
      <View className="flex justify-center items-center absolute top-[48%] w-full">
        <Text className="font-ibold text-xl text-primary text-center w-full">
          Transaction Failed!
        </Text>
        <Text className="font-isemibold text-base text-primary text-center w-full mt-2 max-w-[60%]">
          Somthing went wrong. Unable to process transaction.
        </Text>
      </View>
      <View className="flex justify-center items-center gap-1 absolute w-full  m-0 top-[60%]">
        <TouchableOpacity
          onPress={handleDoneButton}
          className="w-[130px] h-[40px] rounded-lg bg-secondary justify-center items-center"
        >
          <Text className="font-ibold text-lg text-white">Done</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PaymentErrorScreen;
