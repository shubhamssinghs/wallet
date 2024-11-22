import { WalletTransaction } from "@/providers/wallet-context";

const userImages = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg",
];

const transactions: WalletTransaction[] = [
  {
    type: "credit",
    amount: 150.25,
    date: "2024-07-15T09:15:30.000Z", // ISO format with time
    name: "John",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "debit",
    amount: 140.0,
    date: "2024-07-15T12:30:45.000Z", // ISO format with time
    name: "Liam",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "credit",
    amount: 160.0,
    date: "2024-07-15T15:45:15.000Z", // ISO format with time
    name: "Abigail",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "debit",
    amount: 80.0,
    date: "2024-07-15T18:00:00.000Z", // ISO format with time
    name: "Jacob",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "credit",
    amount: 190.0,
    date: "2024-07-15T20:15:45.000Z", // ISO format with time
    name: "Stella",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "debit",
    amount: 75.5,
    date: "2024-07-15T22:30:30.000Z", // ISO format with time
    name: "Jane",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "failed",
    amount: 20.0,
    date: "2023-06-17T08:45:00.000Z", // ISO format with time
    name: "Michael",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "credit",
    amount: 200.0,
    date: "2023-06-17T11:15:15.000Z", // ISO format with time
    name: "Emily",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "debit",
    amount: 50.0,
    date: "2023-06-17T14:00:00.000Z", // ISO format with time
    name: "David",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "credit",
    amount: 120.75,
    date: "2023-06-17T16:30:30.000Z", // ISO format with time
    name: "Sarah",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "debit",
    amount: 30.0,
    date: "2023-06-21T10:00:00.000Z", // ISO format with time
    name: "Daniel",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "failed",
    amount: 45.0,
    date: "2023-06-22T14:15:45.000Z", // ISO format with time
    name: "Jessica",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "credit",
    amount: 250.0,
    date: "2023-06-22T17:30:30.000Z", // ISO format with time
    name: "Robert",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "debit",
    amount: 100.0,
    date: "2023-06-22T20:00:00.000Z", // ISO format with time
    name: "Laura",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "credit",
    amount: 180.5,
    date: "2023-06-22T22:45:45.000Z", // ISO format with time
    name: "William",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "debit",
    amount: 85.25,
    date: "2023-06-26T08:00:00.000Z", // ISO format with time
    name: "Olivia",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "credit",
    amount: 100.0,
    date: "2024-05-10T11:15:15.000Z", // ISO format with time
    name: "Samuel",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "debit",
    amount: 200.0,
    date: "2024-05-12T13:30:30.000Z", // ISO format with time
    name: "Olivia",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "credit",
    amount: 300.0,
    date: "2024-05-15T15:45:45.000Z", // ISO format with time
    name: "Max",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "failed",
    amount: 50.0,
    date: "2024-04-20T17:00:00.000Z", // ISO format with time
    name: "Jack",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "debit",
    amount: 120.0,
    date: "2024-04-22T18:30:30.000Z", // ISO format with time
    name: "Sophie",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "credit",
    amount: 500.0,
    date: "2024-04-28T20:15:45.000Z", // ISO format with time
    name: "Chris",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
  {
    type: "debit",
    amount: 40.0,
    date: "2024-04-30T22:00:00.000Z", // ISO format with time
    name: "Nina",
    image: userImages[Math.floor(Math.random() * userImages.length)],
  },
];

export default transactions;
