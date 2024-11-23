import { Image, Platform, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import icons from "@/constants/icons";

const tabs = [
  {
    id: 1,
    icon: icons.HOME,
    name: "Home",
    path: "index",
  },
  {
    id: 2,
    icon: icons.HISTORY,
    name: "Transactions",
    path: "transaction-history",
  },
  {
    id: 3,
    icon: icons.QR,
    name: "My QR",
    path: "my-qr",
  },
];

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#46A8DF",
        tabBarInactiveTintColor: "#000000",
        animation: "shift",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#F9F9F9",
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 100 : 80,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          color: "#000000",
          fontFamily: "Inter-Bold",
        },
      }}
    >
      {tabs?.map((tab) => (
        <Tabs.Screen
          key={tab.id}
          name={tab.path}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text
                className={`${
                  focused ? "text-secondary" : "text-black"
                } font-isemibold text-xs`}
              >
                {tab.name}
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <Image
                source={tab.icon}
                resizeMode="contain"
                tintColor={color}
                className={`w-8 flex-1 mb-1`}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
