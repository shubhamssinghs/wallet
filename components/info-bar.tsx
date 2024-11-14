import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";

interface InfoBarProps {
  title?: string | null;
  showBackButton?: boolean;
  backButtonHandler?: () => void;
}

const InfoBar: React.FC<InfoBarProps> = ({
  title = null,
  showBackButton = true,
  backButtonHandler,
}) => {
  return (
    <View className="px-2 py-4 flex flex-row justify-between items-center relative">
      {showBackButton && (
        <TouchableOpacity onPress={backButtonHandler}>
          <Image
            source={icons.BACKARROW}
            className="h-10 w-10 z-50"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {title && (
        <Text className="absolute w-3/4  ml-[14.5%] text-center bg-transparent font-ibold text-xl z-40">
          {title}
        </Text>
      )}
    </View>
  );
};

interface InfoBarProps {}

export default InfoBar;
