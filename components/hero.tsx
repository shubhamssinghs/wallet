import {
  View,
  Text,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
} from "react-native";
import React from "react";

import icons from "@/constants/icons";

interface HeroProps {
  title?: string;
  withBackButton?: boolean;
  onBackButtonClick?: (e: GestureResponderEvent) => void;
}

const Hero: React.FC<HeroProps> = ({
  title = null,
  withBackButton = false,
  onBackButtonClick = () => {},
}) => {
  if (!title && !withBackButton) return;

  return (
    <View className="w-full bg-transparent flex-row  justify-center items-center relative p-4 h-16 z-50">
      {withBackButton && (
        <TouchableOpacity
          className="absolute left-0 ml-4 justify-center items-center"
          onPress={onBackButtonClick}
        >
          <Image
            source={icons.BACKARROW}
            resizeMode="contain"
            className="h-8 w-8"
          />
        </TouchableOpacity>
      )}
      {title && (
        <Text className="text-2xl text-center font-iblack text-primary">
          {title}
        </Text>
      )}
    </View>
  );
};

export default Hero;
