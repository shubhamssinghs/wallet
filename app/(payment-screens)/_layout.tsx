import React from "react";
import { Stack } from "expo-router";

const PaymentScreenLayout = () => {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="pay-screen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PaymentScreenLayout;
