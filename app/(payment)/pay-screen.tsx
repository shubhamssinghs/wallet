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
import { useLocalSearchParams, useRouter } from "expo-router";
import Hero from "@/components/hero";

import ImageWithLoader from "@/components/image-with-loader";

const PayScreen = () => {
  const params = useLocalSearchParams();
  const { empId, empName, empImage } = params;

  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState({
    amount: false,
    message: "",
  });

  const { wallet } = useWallet();
  const { showModal, hideModal } = useModal();
  const router = useRouter();

  const handleSuccessModal = () => {
    router.dismissAll();

    setTimeout(
      () =>
        showModal(
          <ProcessPayment
            close={hideModal}
            amount={amount ? parseInt(amount) : 0}
          />,
          {
            animationType: "slide",
          }
        ),
      100
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
    <Container>
      <Hero withBackButton onBackButtonClick={router.dismissAll} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-center items-center relative -mt-16">
          <View className="justify-center items-center ">
            <ImageWithLoader
              source={{ uri: empImage as string }}
              className="h-24 w-24 rounded-full"
              resizeMode="cover"
              loaderProps={{
                color: "white",
                size: "large",
              }}
            />
            <Text className="font-isemibold text-lg text-primary-500 mt-3">
              Paying
            </Text>

            <Text className="font-ibold text-2xl">{empName}</Text>
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
              returnKeyLabel="Done"
              returnKeyType="done"
            />
          </View>
          <TouchableOpacity
            disabled={error.amount || amount === ""}
            onPress={handleSuccessModal}
            style={{
              opacity: error.amount || amount === "" ? 0 : 1,
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
  );
};

export default PayScreen;
