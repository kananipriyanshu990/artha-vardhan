import React, { useState } from "react";
import Button from "../../../components/shared/Button";
import Card from "../../../components/shared/Card";
import { IndianRupee, ShieldCheck } from "lucide-react";

export default function IncomeStep({ initialIncome, onNext }) {
  const [income, setIncome] = useState(initialIncome || 25000);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (income > 0) {
      onNext(Number(income));
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <Card className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#F0EDE4]">
            How much do you earn or receive monthly?
          </h2>
          <p className="text-sm text-[#9CA3AF]">
            This could be your salary, pocket money, or stipend. We store nothing on any server.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#F5C518]">
              ₹
            </span>
            <input
              type="number"
              min="100"
              step="500"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-2xl font-bold text-white focus:outline-none focus:border-[#F5C518] transition-colors"
              placeholder="e.g. 25000"
              required
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>100% Client-Side Privacy: Your numbers stay exclusively in your browser storage.</span>
          </div>

          <Button
            type="submit"
            accentColor="#F5C518"
            className="w-full py-3 text-base text-[#0A0F2C]"
          >
            Next: Discover The Golden Split
          </Button>
        </form>
      </Card>
    </div>
  );
}