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
import ImageWithLoader from "./image-with-loader";
import { formatDate } from "@/utils";
import { router } from "expo-router";

interface AllTransactionProps {
  transactions:
    | WalletTransaction[]
    | Record<
        string,
        {
          year: number;
          month: string;
          totalTransactions: number;
          transactions: WalletTransaction[];
        }
      >;
  backgroundColor?: string;
}

const AllTransaction: React.FC<AllTransactionProps> = ({
  transactions,
  backgroundColor = "transparent",
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handlePress = (transaction: WalletTransaction) => {
    router.push({
      pathname: "/transaction-overview",
      params: transaction as any,
    });
  };

  const renderTransaction = (transaction: WalletTransaction, index: number) => (
    <TouchableOpacity
      className={`p-4 flex flex-row justify-between items-center space-x-2  ${
        transactions instanceof Array &&
        transactions.length - 1 !== index &&
        "border-b border-white"
      }`}
      key={transaction.name + "-" + index}
      onPress={() => handlePress(transaction)}
    >
      <ImageWithLoader
        source={{
          uri: transaction.image,
        }}
        className="h-11 w-11 rounded-full"
        resizeMode="cover"
        loaderProps={{
          size: "small",
        }}
      />
      <View className="flex-1">
        <Text className="text-lg font-bold text-primary-100">
          {transaction.name}
        </Text>
        <Text className="text-sm font-bold -mt-1 text-primary-500">
          {formatDate(transaction.date)}
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
  );

  return (
    <ScrollView
      style={{
        backgroundColor,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#46A8DF"]}
          tintColor="#46A8DF"
        />
      }
    >
      {Array.isArray(transactions)
        ? transactions.map((transaction, index) =>
            renderTransaction(transaction, index)
          )
        : Object.keys(transactions).map((yearMonth) => {
            const group = transactions[yearMonth];
            return (
              <View key={yearMonth}>
                <View className="bg-primary-300 px-5 py-2 flex-row justify-between">
                  <View>
                    <Text className="text-sm font-bold text-primary-100">
                      {group.year}
                    </Text>
                    <Text className="text-xl font-black text-primary-100 ">
                      {group.month}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-sm font-bold text-primary-100">
                      Total Transactions
                    </Text>
                    <Text className="text-xl font-bold text-primary-100 text-right">
                      {group.totalTransactions}
                    </Text>
                  </View>
                </View>
                {group.transactions.map((transaction, index) =>
                  renderTransaction(transaction, index)
                )}
              </View>
            );
          })}
    </ScrollView>
  );
};

export default AllTransaction;
