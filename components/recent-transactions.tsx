import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { WalletTransaction } from "@/providers/wallet-context";
import ImageWithLoader from "./image-with-loader";

interface RecentTransactionProps {
  recentTransactions: WalletTransaction[];
  handleClick?: (transaction: WalletTransaction) => void;
}

const RecentTransactions: React.FC<RecentTransactionProps> = ({
  recentTransactions,
  handleClick,
}) => {
  return (
    <View className="flex flex-row flex-wrap justify-between p-4 pt-2 bg-green-500 gap-5">
      {recentTransactions.map((transaction, index) => (
        <TouchableOpacity
          onPress={() => handleClick(transaction)}
          key={transaction.name + "-" + index}
          className="flex justify-center items-center"
        >
          <ImageWithLoader
            source={{
              uri: transaction.image,
            }}
            className="h-16 w-16 rounded-full"
            resizeMode="cover"
            loaderProps={{
              color: "white",
              size: 40,
            }}
          />
          <Text className="font-ibold text-base">{transaction.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RecentTransactions;
