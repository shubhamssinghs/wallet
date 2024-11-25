import { Image, Text, TouchableOpacity, View, Animated } from "react-native";
import icons from "@/constants/icons";
import LottieView from "lottie-react-native";
import { useEffect, useState, useRef } from "react";

interface PaymentSuccessScreenProps {
  handleDoneButton?: () => void;
  amount?: number;
}

const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({
  handleDoneButton = () => {},
  amount,
}) => {
  const animatedSize = useRef(new Animated.Value(200)).current;
  const [showContent, setShowContent] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(animatedSize, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start();

      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      setShowContent(true);
    }, 2500);
  }, [animatedSize, opacity]);

  return (
    <View className="flex-1 justify-center items-center relative">
      <Animated.View
        style={{
          width: animatedSize,
          height: animatedSize,
        }}
      >
        <LottieView
          source={require("@/assets/lottie/check.json")}
          autoPlay
          loop
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>

      {showContent && (
        <Animated.View style={{ opacity }}>
          <Text className="font-ibold text-xl text-primary text-center">
            Paid
          </Text>
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
          <Text className="font-ibold text-xl text-primary mb-3 text-center">
            to Shubham
          </Text>
          <TouchableOpacity
            onPress={handleDoneButton}
            className="w-[130px] h-[40px] rounded-lg bg-secondary justify-center items-center"
          >
            <Text className="font-ibold text-lg text-white">Done</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default PaymentSuccessScreen;
