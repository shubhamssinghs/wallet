import { View, Text, Image } from "react-native";
import React from "react";

import icons from "@/constants/icons";

import Container from "@/components/container";
import PayButton from "@/components/pay-button";
import { useWallet } from "@/providers/wallet-context";
import ShowIf from "@/components/show-if";
import NoTransaction from "@/components/no-transaction";
import AllTransaction from "@/components/all-transaction";

const Home = () => {
  const { isLoaded, wallet } = useWallet();

  if (!isLoaded) return null;

  return (
    <Container>
      <View className="px-6  w-full ml-0 left-0 py-4 flex-row justify-between items-center">
        <View className="relative">
          <View>
            <Text className="text-white text-2xl font-iblack ">BALANCE</Text>
            <View className="flex flex-row justify-start items-center mt-2">
              <Image
                source={icons.RUPEE}
                className="h-9 w-9 -mt-2"
                resizeMode="contain"
                tintColor={"#0F1729"}
              />
              <Text className="text-primary text-5xl font-iblack ">
                {wallet.balance}
              </Text>
            </View>
          </View>
          <Text className="text-primary-100 font-imedium">
            last top-up date: {wallet.topUpOn}
          </Text>
        </View>
        <PayButton />
      </View>

      <ShowIf condition={Boolean(wallet.transactions.length)}>
        <Text className="text-2xl font-iextrabold px-4 mb-2 mt-4">Recent</Text>
        <AllTransaction transactions={wallet.transactions} />
      </ShowIf>
      <ShowIf condition={!wallet.transactions.length}>
        <NoTransaction />
      </ShowIf>
    </Container>
  );
};

export default Home;
