import icons from "@/constants/icons";
import { Image, Text, TouchableOpacity } from "react-native";

interface HelpButtonProps {
  onPress: () => void;
}

const HelpButton: React.FC<HelpButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      className="flex flex-1 flex-row justify-center items-center p-1 w-40 mx-auto border rounded-lg mt-4"
      onPress={onPress}
    >
      <Image
        source={icons.ROUNDQUESTIONMARK}
        resizeMode="contain"
        className="h-4 w-4 mr-1"
      />
      <Text className="font-imedium text-sm">Having Issue?</Text>
    </TouchableOpacity>
  );
};

export default HelpButton;
