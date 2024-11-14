import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import Container from "@/components/container";

import icons from "@/constants/icons";

import { useModal } from "@/providers/modal-context";
import { useWallet } from "@/providers/wallet-context";
import ProcessPayment from "@/components/process-payment";
import { useRouter } from "expo-router";

const PayScreen = () => {
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState({
    amount: false,
    message: "",
  });

  const { wallet } = useWallet();
  const { showModal, hideModal } = useModal();
  const router = useRouter();

  const handleSuccessModal = () => {
    showModal(
      <ProcessPayment
        close={hideModal}
        amount={amount ? parseInt(amount) : 0}
      />,
      {
        animationType: "slide",
      }
    );
  };

  const handleAmount = (amount: string) => {
    if (amount.length > 6 || amount == "." || amount == "0") return;
    const numericAmount = parseFloat(amount);
    if (numericAmount > wallet.balance) {
      setError({
        ...error,
        amount: true,
        message: `Entered amount cannot be greater than Rs. ${wallet.balance}`,
      });
    } else {
      setError({ ...error, amount: false, message: "" });
    }

    setAmount(amount);
  };

  return (
    <>
      <Container>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className="flex-1 justify-center items-center relative">
            <View className="">
              <View className="justify-center items-center">
                <Image
                  source={{
                    uri: "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
                  }}
                  className="h-24 w-24 rounded-full"
                  resizeMode="cover"
                />
                <Text className="font-isemibold text-lg text-primary-500 mt-3">
                  Paying
                </Text>

                <Text className="font-ibold text-2xl">John Doe</Text>
              </View>
              <View className="justify-center items-center mt-3">
                <Image
                  source={icons.ARROWUP}
                  resizeMode="contain"
                  className="h-10 w-10 mb-3"
                  tintColor={"#292D32"}
                />
                <Text className="font-isemibold text-lg text-primary-500 mb-5">
                  Enter amount to pay
                </Text>
                <View className="flex-row justify-center items-center">
                  <Image
                    source={icons.RUPEE}
                    className="h-6 w-6 -mt-2"
                    resizeMode="contain"
                    tintColor={"#0F1729"}
                  />
                  <View className="flex-row items-end">
                    <TextInput
                      autoFocus
                      keyboardType="numeric"
                      placeholder="0"
                      value={amount}
                      onChangeText={handleAmount}
                      className="text-primary text-4xl font-iblack"
                      placeholderTextColor="#d8d8d8"
                    />
                    <Text className="text-base text-primary font-iblack">
                      {" "}
                      / {wallet.balance}
                    </Text>
                  </View>
                </View>
                {error.amount && (
                  <Text className="font-isemibold text-xs text-red-600 mt-2">
                    {error.message}
                  </Text>
                )}
                <TextInput
                  placeholder="Add a note"
                  onChange={(d) => console.log(d)}
                  className="bg-white border border-primary-200 rounded-full px-3 py-2 min-w-[150px] max-w-[200px] text-center mt-5 "
                  placeholderTextColor="#d8d8d8"
                />
              </View>
            </View>
            <TouchableOpacity
              disabled={error.amount}
              onPress={() => (router.dismissAll(), handleSuccessModal())}
              style={{
                opacity: error.amount ? 0.5 : 1,
              }}
              className="absolute bottom-[55px] right-[20px] bg-secondary h-12 w-16 justify-center items-center rounded-xl"
            >
              <Image
                source={icons.SEND}
                resizeMode="contain"
                className="h-8 w-8"
                tintColor={"white"}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Container>
    </>
  );
};

export default PayScreen;
