import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ModalProvider } from "@/providers/modal-context";
import { LoaderProvider } from "@/providers/loader-context";
import { WalletProvider } from "@/providers/wallet-context";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Inter-Thin": require("@/assets/fonts/Inter-Thin.ttf"),
    "Inter-ExtraLight": require("@/assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("@/assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("@/assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("@/assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("@/assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Black": require("@/assets/fonts/Inter-Black.ttf"),
  });

  useEffect(() => {
    if (error) throw Error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ModalProvider>
        <LoaderProvider>
          <WalletProvider>
            <SafeAreaView
              className="flex-1 bg-secondary"
              edges={["top", "left", "right"]}
            >
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(payment-screens)"
                  options={{ headerShown: false }}
                />
              </Stack>
            </SafeAreaView>
          </WalletProvider>
        </LoaderProvider>
      </ModalProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
