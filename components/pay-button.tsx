import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";

import icons from "@/constants/icons";
import QRScanner from "./qr-reader";
import { router } from "expo-router";

const PayButton = () => {
  const handleQRScan = (result: any) => {
    router.push("/pay-screen");
  };

  return (
    <QRScanner
      onScanComplete={handleQRScan}
      renderLink={({ open }) => (
        <TouchableOpacity
          onPress={open}
          className="px-4 py-2 justify-center items-center gap-2"
        >
          <Image source={icons.QR} resizeMode="contain" className="h-8 w-8" />
          <Text className="text-base font-isemibold text m-0 ">
            Scan to pay
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default PayButton;
