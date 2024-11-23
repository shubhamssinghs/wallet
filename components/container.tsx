import React from "react";
import { LinearGradient } from "expo-linear-gradient";

interface ContainerProps {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <LinearGradient
      colors={["#46A8DF", "#ffffff"]}
      className="h-full w-full absolute top-0 left-0"
    >
      {children}
    </LinearGradient>
  );
};

export default Container;
