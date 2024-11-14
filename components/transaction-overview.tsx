import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { WalletTransaction } from "@/providers/wallet-context";
import InfoBar from "./info-bar";
import Container from "./container";
import icons from "@/constants/icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface TransactionOverviewProps {
  transaction: WalletTransaction;
  handleBackButton?: () => void;
}

const TransactionOverview: React.FC<TransactionOverviewProps> = ({
  transaction,
  handleBackButton,
}) => {
  return (
    <Container>
      <InfoBar backButtonHandler={handleBackButton} />
      <ScrollView style={{ flex: 1 }}>
        <View className="p-4 flex justify-center items-center h-full w-full  mt-12">
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
            }}
            className="h-24 w-24 rounded-full"
            resizeMode="cover"
          />
          <Text className="font-ibold text-base mt-3">
            {transaction.type === "credit"
              ? "To"
              : transaction.type === "debit"
              ? "From"
              : ""}{" "}
            {transaction.name}
          </Text>
          <View className="flex flex-row gap-1 justify-center items-center mt-4">
            <Image
              source={icons.RUPEE}
              className="h-6 w-6"
              resizeMode="contain"
              tintColor={"#0F1729"}
            />
            <Text className="text-center text-primary font-iblack text-5xl">
              {transaction.amount}
            </Text>
          </View>
          <View className="flex-row gap-2 justify-center items-center mt-2 border-b w-1/2 pb-1 border-primary-200">
            <Image
              source={
                transaction.type !== "failed"
                  ? icons.CHECKFILLED
                  : icons.CROSSFILLED
              }
              className={` ${
                transaction.type !== "failed" ? "h-5 w-5" : "h-4 w-4"
              }`}
              resizeMode="contain"
              tintColor={transaction.type !== "failed" ? "#65a30d" : "#dc2626"}
            />
            <Text className="text-center text-gray-500 text-base font-imedium">
              {transaction.type !== "failed" ? "Completed" : "Failed"}
            </Text>
          </View>
          <Text className="text-center text-primary text-base font-isemibold mt-1 mb-5">
            {transaction.date}
          </Text>
          <View className="p-2 border w-full rounded-lg border-primary-200 flex gap-1">
            <View className="flex-row justify-between items-center">
              <Text className="text-primary-100 font-isemibold text-sm">
                Transaction Status
              </Text>
              <View
                className="px-2 rounded-full"
                style={{
                  backgroundColor:
                    transaction.type === "failed"
                      ? "#dc2626"
                      : transaction.type === "credit"
                      ? "#65a30d"
                      : "#46A8DF",
                }}
              >
                <Text className="text-center font-isemibold text-sm text-white">
                  {transaction.type}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-primary-100 font-isemibold text-sm">
                Transaction Id
              </Text>
              <Text className="text-center font-isemibold text-sm text-primary">
                GT89XpudsTfJLLFBKHK
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-primary-100 font-isemibold text-sm">
                To
              </Text>
              <Text className="text-center font-isemibold text-sm text-primary">
                {transaction.name}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-primary-100 font-isemibold text-sm">
                From
              </Text>
              <Text className="text-center font-isemibold text-sm text-primary">
                Text User
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="w-[130px] h-[30px] rounded-lg border border-secondary justify-center items-center mx-auto flex-row">
          <Image
            source={icons.ROUNDQUESTIONMARK}
            resizeMode="contain"
            className="h-4 w-4 mr-1"
            tintColor={"#46A8DF"}
          />
          <Text className="font-imedium text-sm text-secondary">
            Having Issue?
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

export default TransactionOverview;
