import { View, Text } from "react-native";
import React from "react";

interface HeroProps {
  title?: string;
}

const Hero: React.FC<HeroProps> = ({ title = null }) => {
  if (!title) return;

  return (
    <View className="w-full bg-transparent justify-end p-4 gap-2 relative">
      <Text className="text-2xl text-center font-iblack text-primary">
        {title}
      </Text>
    </View>
  );
};

export default Hero;
