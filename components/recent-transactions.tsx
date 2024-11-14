import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { WalletTransaction } from "@/providers/wallet-context";

interface RecentTransactionProps {
  recentTransactions: WalletTransaction[];
  handleClick?: (transaction: WalletTransaction) => void;
}

const RecentTransactions: React.FC<RecentTransactionProps> = ({
  recentTransactions,
  handleClick,
}) => {
  return (
    <View className="flex flex-row flex-wrap justify-between p-4 pt-2 gap-4">
      {recentTransactions.map((transaction, index) => (
        <TouchableOpacity
          onPress={() => handleClick(transaction)}
          key={transaction.name + "-" + index}
          className="flex justify-center items-center gap-2"
        >
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
            }}
            className="h-16 w-16 rounded-full"
            resizeMode="cover"
          />
          <Text className="font-ibold text-base">John Doe</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RecentTransactions;
