import Container from "@/components/container";
import Hero from "@/components/hero";
import { router } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface TechnicalSupportProps {}

const TechnicalSupport: React.FC<TechnicalSupportProps> = () => {
  return (
    <Container>
      <Hero
        title="Technical Support"
        withBackButton
        onBackButtonClick={router.back}
      />
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className="px-6 pt-4">
            <Text className="text-lg font-isemibold">Subject</Text>
            <TextInput
              placeholder="Add a note"
              onChange={(d) => console.log(d)}
              className="bg-white border border-primary-200 text-base rounded-lg  px-4 py-2 h-14 mt-2"
              placeholderTextColor="#d8d8d8"
              maxLength={50}
              returnKeyLabel="Done"
              returnKeyType="done"
            />
          </View>
          <View className="px-6 pt-2">
            <Text className="text-lg font-isemibold">Message</Text>
            <TextInput
              multiline
              placeholder="Add a note"
              onChange={(d) => console.log(d)}
              className="bg-white border border-primary-200 text-base rounded-lg  px-4 py-2 h-44 mt-2"
              placeholderTextColor="#d8d8d8"
              maxLength={180}
              returnKeyLabel="Done"
              returnKeyType="done"
              blurOnSubmit={true}
              style={{ textAlignVertical: "top" }}
            />
          </View>
          <View className="px-6 pt-2">
            <TouchableOpacity className="flex flex-row justify-center items-center p-1 w-full mx-auto border border-secondary bg-secondary rounded-lg mt-4 h-12">
              <Text className="sfont-isemibold text-lg m-0 text-white">
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Container>
  );
};

export default TechnicalSupport;
