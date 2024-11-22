import React from "react";

import Container from "@/components/container";
import NoTransaction from "@/components/no-transaction";
import AllTransaction from "@/components/all-transaction";
import { useWallet } from "@/providers/wallet-context";
import Hero from "@/components/hero";
import ShowIf from "@/components/show-if";
import { groupTransactionsByMonth } from "@/utils";

const TransactionHistory = () => {
  const { wallet } = useWallet();

  return (
    <Container>
      <Hero title="All Transactions" />

      <ShowIf condition={Boolean(wallet.transactions.length)}>
        <AllTransaction
          transactions={groupTransactionsByMonth(wallet.transactions)}
        />
      </ShowIf>

      <ShowIf condition={!Boolean(wallet.transactions.length)}>
        <NoTransaction />
      </ShowIf>
    </Container>
  );
};

export default TransactionHistory;
