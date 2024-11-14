import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BarcodeScanningResult,
  CameraView,
  CameraViewRef,
  PermissionStatus,
  useCameraPermissions,
} from "expo-camera";

import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import icons from "@/constants/icons";

interface BarcodeScannerProps {
  onScanComplete: (result: BarcodeScanningResult) => void;
  renderLink?: ({ open }: { open: () => void }) => JSX.Element;
}

const QRScanner: React.FC<BarcodeScannerProps> = ({
  onScanComplete,
  renderLink = () => null,
}) => {
  const [open, setOpen] = useState(false);
  const [torch, setTorch] = useState(false);
  const [data, setData] = useState<BarcodeScanningResult>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const backdropRef = useRef<View>(null);
  const sheetRef = useRef<BottomSheet>(null);

  const { height, width } = Dimensions.get("screen");

  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    if (result && Boolean(Object.keys(result).length) && !data) {
      sheetRef.current?.close();
      setData(result);
    }
  };

  const handleOpen = () => {
    if (permission) {
      if (permission.status === PermissionStatus.UNDETERMINED) {
        requestPermission()
          .then(() => {
            setOpen(true);
            setCameraActive(true);
          })
          .catch((error) => {
            Alert.alert("Error", error.message);
          });

        return;
      }

      if (permission.status === PermissionStatus.DENIED) {
        Alert.alert(
          "Permission Required!",
          "We need your permission to show the camera.",
          [
            { text: "Cancel", style: "destructive" },
            {
              text: "Settings",
              style: "default",
              onPress: () => {
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]
        );
        return;
      }

      setOpen(true);
      setCameraActive(true);
    }
  };

  const handleBottomSheetClose = useCallback(() => {
    setOpen(false);
    setCameraActive(false);
    if (data) {
      onScanComplete(data);
    }
    setData(null);
  }, [data]);

  const handlePressableClick = (e: any) => {
    if (e.target === backdropRef.current) {
      sheetRef.current?.close();
    }
  };

  if (!permission) {
    return null;
  }

  return (
    <Fragment>
      {renderLink({ open: handleOpen })}
      <Modal transparent visible={Boolean(open && permission.granted)}>
        <Pressable onPress={handlePressableClick} style={{ flex: 1 }}>
          <View
            ref={backdropRef}
            style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <BottomSheet
              style={{
                flex: 1,
                justifyContent: "center",
              }}
              enablePanDownToClose
              snapPoints={["50%"]}
              ref={sheetRef}
              onClose={handleBottomSheetClose}
            >
              <BottomSheetScrollView
                style={{ paddingVertical: 20, height: "155%" }}
              >
                {cameraActive && (
                  <View className="relative rounded-2xl overflow-hidden bg-gray-500 mx-5">
                    <CameraView
                      autofocus="on"
                      facing={"back"}
                      barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                      }}
                      enableTorch={torch}
                      onBarcodeScanned={handleBarCodeScanned}
                      style={{
                        flex: 1,
                        height: height / 2.4,
                        width: width - 40,
                      }}
                    >
                      <View className="flex-1 bg-transparent">
                        <TouchableOpacity
                          onPress={() => setTorch(!torch)}
                          className="p-2 bg-primary-600 shadow w-12 h-12 justify-center items-center absolute right-2 top-2 rounded-full"
                        >
                          <Image
                            source={icons.FLASH}
                            resizeMode="contain"
                            className="h-7 w-7"
                            tintColor={torch ? "#EEBF00" : "white"}
                          />
                        </TouchableOpacity>
                      </View>
                    </CameraView>
                  </View>
                )}
              </BottomSheetScrollView>
            </BottomSheet>
          </View>
        </Pressable>
      </Modal>
    </Fragment>
  );
};

export default QRScanner;
