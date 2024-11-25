import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import Container from "@/components/container";
import icons from "@/constants/icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageWithLoader from "@/components/image-with-loader";
import { router, useLocalSearchParams } from "expo-router";
import Hero from "@/components/hero";
import { formatFriendlyDateTime } from "@/utils";

import "../../global.css";
import HelpButton from "@/components/help-button";

interface TransactionOverviewProps {}

const TransactionOverview: React.FC<TransactionOverviewProps> = ({}) => {
  const params = useLocalSearchParams();

  const handleIssueButtonClick = () => router.push("/technical-support");

  return (
    <Container>
      <Hero withBackButton onBackButtonClick={() => router.back()} />
      <ScrollView className="flex-1 -mt-16">
        <View className="p-4 justify-center items-center pt-24">
          <ImageWithLoader
            source={{
              uri: params.image as string,
            }}
            className="h-24 w-24 rounded-full"
            resizeMode="cover"
            loaderProps={{
              color: "white",
              size: "large",
            }}
          />
          {params.type !== "failed" && (
            <Text className="font-ibold text-base mt-3">
              {params.type === "credit"
                ? `From ${params.name}`
                : `To ${params.name}`}
            </Text>
          )}
          <View className="flex flex-row gap-1 justify-center items-center mt-4">
            <Image
              source={icons.RUPEE}
              className="h-6 w-6"
              resizeMode="contain"
              tintColor={"#0F1729"}
            />
            <Text className="text-center text-primary font-iblack text-5xl">
              {params.amount}
            </Text>
          </View>
          <View className="flex-row gap-2 justify-center items-center mt-2 border-b w-1/2 pb-1 border-primary-200">
            <Image
              source={
                params.type !== "failed" ? icons.CHECKFILLED : icons.CROSSFILLED
              }
              className={` ${params.type !== "failed" ? "h-5 w-5" : "h-4 w-4"}`}
              resizeMode="contain"
              tintColor={params.type !== "failed" ? "#65a30d" : "#dc2626"}
            />
            <Text className="text-center text-gray-500 text-base font-imedium">
              {params.type !== "failed" ? "Completed" : "Failed"}
            </Text>
          </View>
          <Text className="text-center text-primary text-sm font-isemibold mt-1 mb-5">
            {formatFriendlyDateTime(params.date as string)}
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
                    params.type === "failed"
                      ? "#dc2626"
                      : params.type === "credit"
                      ? "#65a30d"
                      : "#46A8DF",
                }}
              >
                <Text className="text-center font-isemibold text-sm text-white">
                  {params.type}
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
            {params.type !== "failed" && (
              <View className="flex-row justify-between items-center">
                <Text className="text-primary-100 font-isemibold text-sm">
                  {params.type === "credit" ? `To` : `From`}
                </Text>
                <Text className="text-center font-isemibold text-sm text-primary">
                  You
                </Text>
              </View>
            )}
          </View>
          <HelpButton onPress={handleIssueButtonClick} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default TransactionOverview;
