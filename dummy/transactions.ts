import { WalletTransaction } from "@/providers/wallet-context";

const transactions: WalletTransaction[] = [
  {
    type: "credit",
    amount: 150.25,
    date: "15 Jul 2024",
    name: "John",
  },
  {
    type: "debit",
    amount: 140.0,
    date: "15 Jul 2024",
    name: "Liam",
  },
  {
    type: "credit",
    amount: 160.0,
    date: "15 Jul 2024",
    name: "Abigail",
  },
  {
    type: "debit",
    amount: 80.0,
    date: "15 Jul 2024",
    name: "Jacob",
  },
  {
    type: "credit",
    amount: 190.0,
    date: "15 Jul 2024",
    name: "Stella",
  },
  {
    type: "debit",
    amount: 75.5,
    date: "15 Jul 2024",
    name: "Jane",
  },
  {
    type: "failed",
    amount: 20.0,
    date: "17 Jun 2023",
    name: "Michael",
  },
  {
    type: "credit",
    amount: 200.0,
    date: "17 Jun 2023",
    name: "Emily",
  },
  {
    type: "debit",
    amount: 50.0,
    date: "17 Jun 2023",
    name: "David",
  },
  {
    type: "credit",
    amount: 120.75,
    date: "17 Jun 2023",
    name: "Sarah",
  },
  {
    type: "debit",
    amount: 30.0,
    date: "21 Jun 2023",
    name: "Daniel",
  },
  {
    type: "failed",
    amount: 45.0,
    date: "22 Jun 2023",
    name: "Jessica",
  },
  {
    type: "credit",
    amount: 250.0,
    date: "22 Jun 2023",
    name: "Robert",
  },
  {
    type: "debit",
    amount: 100.0,
    date: "22 Jun 2023",
    name: "Laura",
  },
  {
    type: "credit",
    amount: 180.5,
    date: "22 Jun 2023",
    name: "William",
  },
  {
    type: "debit",
    amount: 85.25,
    date: "26 Jun 2023",
    name: "Olivia",
  },
];

export default transactions;
