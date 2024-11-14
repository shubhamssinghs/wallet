import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React from "react";

import icons from "@/constants/icons";
import Container from "@/components/container";
import PayButton from "@/components/pay-button";
import { useWallet, WalletTransaction } from "@/providers/wallet-context";
import RecentTransactions from "@/components/recent-transactions";
import { useModal } from "@/providers/modal-context";
import TransactionOverview from "@/components/transaction-overview";

const Home = () => {
  const { wallet } = useWallet();
  const { showModal, hideModal } = useModal();

  const handlePress = (transactions: WalletTransaction) => {
    showModal(
      <TransactionOverview
        transaction={transactions}
        handleBackButton={hideModal}
      />,
      {
        animationType: "slide",
        presentationStyle: "pageSheet",
      }
    );
  };

  return (
    <Container>
      <View className="gap-3 w-full ml-0 left-0 py-12">
        <Text className="text-center text-white text-2xl font-iblack">
          BALANCE
        </Text>
        <View className="flex flex-row justify-center items-center">
          <Image
            source={icons.RUPEE}
            className="h-9 w-9 -mt-2"
            resizeMode="contain"
            tintColor={"#0F1729"}
          />
          <Text className="text-center text-primary text-5xl font-iblack">
            {wallet.balance}
          </Text>
        </View>
        <Text className="text-center text-primary-100 font-imedium">
          last top-up date: {wallet.topUpOn}
        </Text>
      </View>
      <View className="justify-center items-center">
        <PayButton />
      </View>
      <Text className="text-2xl font-iextrabold px-6 mt-8">Recent</Text>
      <ScrollView>
        <RecentTransactions
          recentTransactions={wallet.transactions}
          handleClick={handlePress}
        />
      </ScrollView>
    </Container>
  );
};

export default Home;
