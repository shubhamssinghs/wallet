import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";

const NoTransaction = () => {
  return (
    <View className="flex-1 justify-center items-center gap-3">
      <Image
        source={images.NOTRANSACTION}
        resizeMode="contain"
        className="w-64 h-64"
      />
      <Text className="font-ibold text-lg text-primary-500">
        No transaction found.
      </Text>
    </View>
  );
};

export default NoTransaction;
