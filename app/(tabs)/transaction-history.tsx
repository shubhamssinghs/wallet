import React from "react";

import Container from "@/components/container";
import NoTransaction from "@/components/no-transaction";
import AllTransaction from "@/components/all-transaction";
import { useWallet } from "@/providers/wallet-context";
import Hero from "@/components/hero";

const TransactionHistory = () => {
  const { wallet } = useWallet();

  return (
    <Container>
      {/* <NoTransaction /> */}
      <Hero title="All Transactions" />
      <AllTransaction transactions={wallet.transactions} />
    </Container>
  );
};

export default TransactionHistory;
