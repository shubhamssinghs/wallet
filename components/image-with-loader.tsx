import { useState } from "react";
import {
  Image,
  ImageLoadEventData,
  ImageProps,
  NativeSyntheticEvent,
  View,
} from "react-native";
import LoadingSpinner, { LoadingSpinnerProps } from "./loading-spinner";

interface ImageWithLoaderProps extends ImageProps {
  loaderProps?: Omit<LoadingSpinnerProps, "className">;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  loaderProps,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageOnLoad = (_e: NativeSyntheticEvent<ImageLoadEventData>) => {
    setImageLoaded(true);
  };

  return (
    <View
      className={`flex-nowrap h-auto w-auto flex justify-center items-center `}
    >
      {!imageLoaded && (
        <LoadingSpinner {...loaderProps} wrapperClassName="absolute z-50" />
      )}
      <Image {...props} onLoad={handleImageOnLoad} />
    </View>
  );
};

export default ImageWithLoader;
