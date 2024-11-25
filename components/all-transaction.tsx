import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { WalletTransaction } from "@/providers/wallet-context";
import icons from "@/constants/icons";
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

interface TransactionItem {
  type: "header" | "transaction";
  data: any;
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

  const renderItem = ({ item }: { item: TransactionItem }) => {
    if (item.type === "header") {
      const { year, month, totalTransactions } = item.data;
      return (
        <View className="bg-primary-300 px-5 py-2 flex-row justify-between">
          <View>
            <Text className="text-sm font-bold text-primary-100">{year}</Text>
            <Text className="text-xl font-black text-primary-100 ">
              {month}
            </Text>
          </View>
          <View>
            <Text className="text-sm font-bold text-primary-100">
              Total Transactions
            </Text>
            <Text className="text-xl font-bold text-primary-100 text-right">
              {totalTransactions}
            </Text>
          </View>
        </View>
      );
    }

    if (item.type === "transaction") {
      const transaction: WalletTransaction = item.data;
      const statusColor =
        transaction.type === "failed"
          ? "#dc2626"
          : transaction.type === "credit"
          ? "#65a30d"
          : "#46A8DF";

      return (
        <TouchableOpacity
          className="p-4 flex flex-row justify-between items-center space-x-2 border-b border-white"
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
          <View className="flex-1 ml-2">
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
                color: statusColor,
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
              tintColor={statusColor}
            />
          </View>
        </TouchableOpacity>
      );
    }

    return null;
  };

  const prepareData = (): TransactionItem[] => {
    if (Array.isArray(transactions)) {
      return transactions.map(
        (transaction) =>
          ({
            type: "transaction",
            data: transaction,
          } as TransactionItem)
      );
    }

    return Object.keys(transactions).flatMap((yearMonth) => {
      const group = transactions[yearMonth];
      return [
        {
          type: "header",
          data: {
            year: group.year,
            month: group.month,
            totalTransactions: group.totalTransactions,
          },
        } as TransactionItem,
        ...group.transactions.map(
          (transaction) =>
            ({
              type: "transaction",
              data: transaction,
            } as TransactionItem)
        ),
      ];
    });
  };

  const flatData = prepareData();

  return (
    <FlatList
      data={flatData}
      keyExtractor={(item, index) =>
        item.type === "header"
          ? `header-${index}`
          : `transaction-${item.data.name}-${index}`
      }
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor }}
    />
  );
};

export default AllTransaction;
