import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Container from "./container";
import icons from "@/constants/icons";
import InfoBar from "./info-bar";

interface ProfileProps {
  close?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ close }) => {
  return (
    <Container>
      <InfoBar title="Profile" backButtonHandler={close} />
      <View className="justify-center items-center pt-20 gap-2">
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
          }}
          className="h-24 w-24 rounded-full"
          resizeMode="cover"
        />
        <Text className="font-ibold text-2xl">John Doe</Text>
      </View>
    </Container>
  );
};

export default Profile;
