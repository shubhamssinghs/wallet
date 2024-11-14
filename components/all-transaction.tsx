import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { WalletTransaction } from "@/providers/wallet-context";
import icons from "@/constants/icons";
import { useModal } from "@/providers/modal-context";
import TransactionOverview from "./transaction-overview";

interface AllTransactionProps {
  transactions: WalletTransaction[];
}

const AllTransaction: React.FC<AllTransactionProps> = ({ transactions }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { showModal, hideModal } = useModal();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
    <>
      <ScrollView
        className="bg-frost"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#46A8DF"]}
            tintColor="#46A8DF"
          />
        }
      >
        {transactions.map((transaction, index) => (
          <TouchableOpacity
            className={`p-4 flex flex-row justify-between items-center gap-3 ${
              transactions.length - 1 != index && "border-b border-primary-400"
            }`}
            key={transaction.name + "-" + index}
            onPress={() => handlePress(transaction)}
          >
            <Image
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
              }}
              className="h-11 w-11 rounded-full"
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="text-lg font-black text-primary-100">
                {transaction.name}
              </Text>
              <Text className="text-sm font-bold -mt-1 text-primary-500">
                21 June 2023
              </Text>
            </View>
            <View className="flex flex-row gap-1 justify-center items-center">
              <Image
                source={icons.RUPEE}
                className="h-3 w-3"
                resizeMode="contain"
                tintColor={"#0F1729"}
              />
              <Text
                className="text-center font-iblack text-xl"
                style={{
                  color:
                    transaction.type === "failed"
                      ? "#dc2626"
                      : transaction.type === "credit"
                      ? "#65a30d"
                      : "#46A8DF",
                }}
              >
                {transaction.amount}
              </Text>
              <Image
                source={
                  transaction.type === "failed"
                    ? icons.CROSS
                    : transaction.type !== "debit"
                    ? icons.ARROWIN
                    : icons.ARROWOUT
                }
                className="h-5 w-5"
                resizeMode="contain"
                tintColor={
                  transaction.type === "failed"
                    ? "#dc2626"
                    : transaction.type !== "debit"
                    ? "#65a30d"
                    : "#46A8DF"
                }
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default AllTransaction;
