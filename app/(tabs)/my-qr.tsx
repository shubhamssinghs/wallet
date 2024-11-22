import React, { useMemo, useRef } from "react";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Container from "@/components/container";
import images from "@/constants/images";
import icons from "@/constants/icons";
import ImageWithLoader from "@/components/image-with-loader";
import QRScanner from "@/components/qr-reader";
import { router } from "expo-router";
import { QRData } from "@/types/qr.types";

const userImages = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
];

const MyQR = () => {
  const userImage = userImages[Math.floor(Math.random() * userImages.length)];

  const empData = JSON.stringify({
    empId: "123456",
    empName: "Shubham Singh",
    empImage: userImage,
    isActive: true,
    canReceivePayment: true,
  } as QRData);

  const svgRef = useRef(null);

  const saveQrToDisk = () => {
    if (svgRef.current) {
      svgRef.current.toDataURL(async (dataURL) => {
        console.log(dataURL);
        const fileUri = FileSystem.documentDirectory + "QRCode.png";

        try {
          await FileSystem.writeAsStringAsync(fileUri, dataURL, {
            encoding: FileSystem.EncodingType.Base64,
          });
          console.log(`File saved at ${fileUri}`);

          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUri);
          }
        } catch (error) {
          console.error("Error saving image:", error);
        }
      });
    }
  };

  const handleQRScan = () => router.push("/pay-screen");

  const handleIssueButtonClick = () => router.push("/technical-support");

  return (
    <Container>
      <View className="flex flex-1 justify-center items-center">
        <View className="flex -mt-16">
          <View className="flex flex-row justify-center items-center py-3 mb-3 ">
            <ImageWithLoader
              source={{ uri: userImage }}
              className="h-8 w-8 rounded-full"
              resizeMode="cover"
              loaderProps={{
                color: "white",
                size: 25,
              }}
            />
            <Text className="font-isemibold text-2xl ml-2">Shubham Singh</Text>
          </View>
          <View className="rounded-3xl overflow-hidden">
            <QRCode
              value={empData}
              logo={images.APPICON}
              size={300}
              backgroundColor="white"
              quietZone={30}
              ecl="M"
              logoSize={60}
              getRef={(c) => (svgRef.current = c)}
            />
          </View>
          <Text className="text-sm font-imedium mx-auto mt-3 text-primary-500">
            Scan with Wallet app to pay
          </Text>
          <TouchableOpacity
            className="flex flex-row justify-center items-center p-1 w-40 mx-auto border rounded-3xl mt-4"
            onPress={saveQrToDisk}
          >
            <Image
              source={icons.DOWNLOAD}
              resizeMode="contain"
              className={`w-4 h-4 flex mr-2`}
            />
            <Text className="text-sm font-isemibold">Download QR</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row space-x-3 absolute bottom-4">
          <QRScanner
            onScanComplete={handleQRScan}
            renderLink={({ open }) => (
              <TouchableOpacity
                onPress={open}
                className="flex flex-row justify-center items-center p-1 w-40 mx-auto border border-secondary bg-secondary rounded-lg mt-4"
              >
                <Image
                  source={icons.QR}
                  resizeMode="contain"
                  tintColor="white"
                  className={`w-4 h-4 flex mr-2`}
                />
                <Text className="text-base font-isemibold text m-0 text-white">
                  Scan to pay
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            className="flex flex-row justify-center items-center p-1 w-40 mx-auto border rounded-lg mt-4"
            onPress={handleIssueButtonClick}
          >
            <Image
              source={icons.ROUNDQUESTIONMARK}
              resizeMode="contain"
              className="h-4 w-4 mr-1"
            />
            <Text className="font-imedium text-sm">Having Issue?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default MyQR;
