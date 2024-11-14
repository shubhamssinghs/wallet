import React from "react";
import Container from "@/components/container";
import Hero from "@/components/hero";
import { ScrollView } from "react-native-gesture-handler";
import { Text, TouchableOpacity, View } from "react-native";
import { useModal } from "@/providers/modal-context";
import Profile from "@/components/profile";

const Settings = () => {
  const { showModal, hideModal } = useModal();

  return (
    <Container>
      <Hero title="Settings" />
      <ScrollView className="pt-5">
        <TouchableOpacity
          className="bg-transparent px-4 py-2"
          onPress={() => {
            showModal(<Profile close={hideModal} />, {
              animationType: "slide",
              presentationStyle: "pageSheet",
            });
          }}
        >
          <Text className="font-isemibold text-lg text-gray-600">Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

export default Settings;
