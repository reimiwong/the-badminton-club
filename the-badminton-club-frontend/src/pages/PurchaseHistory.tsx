// src/pages/PurchaseHistory.tsx
import { useState } from "react";

interface Transaction {
  id: number;
  type: "purchase" | "refund";
  item: string;
  date: string;
  paymentMethod: string;
  amount: number;
  invoiceId: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "purchase",
    item: "Single Session: Casual Play",
    date: "2026-05-08",
    paymentMethod: "Visa ****1234",
    amount: 15,
    invoiceId: "INV-2026-1047",
  },
  {
    id: 2,
    type: "purchase",
    item: "Single Session: Coaching - Intermediate",
    date: "2026-05-06",
    paymentMethod: "Visa ****1234",
    amount: 25,
    invoiceId: "INV-2026-1046",
  },
  {
    id: 3,
    type: "refund",
    item: "Cancelled Session (May 3)",
    date: "2026-05-03",
    paymentMethod: "Credit Applied",
    amount: 25,
    invoiceId: "REF-2026-0523",
  },
  {
    id: 4,
    type: "purchase",
    item: "10-Session Package",
    date: "2026-05-01",
    paymentMethod: "Visa ****1234",
    amount: 200,
    invoiceId: "INV-2026-1039",
  },
];

export default function PurchaseHistory() {
  const [filter, setFilter] = useState<"all" | "purchase" | "refund">("all");

  const filtered = filter === "all" ? mockTransactions : mockTransactions.filter(t => t.type === filter);

  const totalSpent = mockTransactions.filter(t => t.type === "purchase").reduce((sum, t) => sum + t.amount, 0);
  const totalRefunds = mockTransactions.filter(t => t.type === "refund").reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Purchase History</h1>
      <p className="text-gray-500 mb-6">View your transactions and download invoices</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
          <span className="text-gray-500">Total Spent</span>
          <span className="font-semibold text-lg">€{totalSpent.toFixed(2)}</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
          <span className="text-gray-500">Total Refunds</span>
          <span className="font-semibold text-lg">€{totalRefunds.toFixed(2)}</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
          <span className="text-gray-500">Transactions</span>
          <span className="font-semibold text-lg">{mockTransactions.length}</span>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 bg-gray-100 rounded-xl p-2 mb-6">
        {(["all", "purchase", "refund"] as const).map(opt => (
          <button
            key={opt}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              filter === opt ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter(opt)}
          >
            {opt === "all" ? "All Transactions" : opt.charAt(0).toUpperCase() + opt.slice(1) + (opt === "refund" ? "s" : "")}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="flex flex-col gap-4">
        {filtered.map(t => (
          <div
            key={t.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow border"
          >
            <div className="flex flex-col">
              <span className="font-semibold">{t.item}</span>
              <span className="text-gray-500 text-sm">
                📅 {new Date(t.date).toLocaleDateString()} • {t.paymentMethod}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className={`font-semibold text-lg ${t.type === "refund" ? "text-red-600" : "text-green-600"}`}>
                {t.type === "refund" ? "-" : ""}€{t.amount}
              </span>
              <span className="text-gray-500 text-sm">{t.invoiceId}</span>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200">
                ⬇️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}