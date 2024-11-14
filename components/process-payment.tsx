import React, { useEffect, useState } from "react";

import Container from "./container";
import PaymentSuccessScreen from "./payment-success-screen";
import FullScreenLoader from "./fullscreen-loader";
import PaymentErrorScreen from "./payment-error-screen";

interface ProcessPaymentProps {
  close?: () => void;
  amount?: number;
}

const ProcessPayment: React.FC<ProcessPaymentProps> = ({ close, amount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 5000);
  }, []);

  if (isLoading) {
    return <FullScreenLoader text="Processing transaction..." />;
  }

  if (success) {
    return (
      <Container>
        <PaymentSuccessScreen handleDoneButton={close} amount={amount} />
      </Container>
    );
  }

  return (
    <Container>
      <PaymentErrorScreen handleDoneButton={close} />
    </Container>
  );
};

export default ProcessPayment;
