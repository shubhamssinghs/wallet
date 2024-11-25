import { Alert, Image, TouchableOpacity } from "react-native";
import React from "react";

import icons from "@/constants/icons";
import QRScanner from "./qr-reader";
import { router } from "expo-router";
import { BarcodeScanningResult } from "expo-camera";
import { QRData } from "@/types/qr.types";

interface UnknownInputParams {
  [key: string]: any;
}

const PayButton = () => {
  const handleQRScan = (result: BarcodeScanningResult) => {
    if (!result.data) {
      Alert.alert("Invalid QR", "The QR you are trying to scan is invalid.");
      return;
    }
    const empData: QRData = JSON.parse(result.data);

    if (!empData.isActive) {
      Alert.alert(
        "User Blocked",
        "Your account is inactive. Please contact the administrator."
      );
      return;
    } else if (!empData.canReceivePayment) {
      Alert.alert(
        "Payment Blocked",
        "You are not authorized to receive payments. Please contact the administrator."
      );
      return;
    }

    router.push({
      pathname: "/pay-screen",
      params: empData as UnknownInputParams,
    });
  };

  return (
    <QRScanner
      onScanComplete={handleQRScan}
      renderLink={({ open }) => (
        <TouchableOpacity
          onPress={open}
          className="p-4 h-16 bg-frost w-16 rounded-2xl shadow-2xl"
        >
          <Image source={icons.QR} resizeMode="contain" className="h-8 w-8" />
        </TouchableOpacity>
      )}
    />
  );
};

export default PayButton;
