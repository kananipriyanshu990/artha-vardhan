import React, { useState } from "react";
import Card from "../../components/shared/Card";

export default function InflationCalculator() {
  const [todayAmount, setTodayAmount] = useState(10000);
  const [inflationRate, setInflationRate] = useState(6);
  const [years, setYears] = useState(10);

  // Formula: Future Value = Amount * (1 + inflation/100)^years
  const neededInFuture = Math.round(
    todayAmount * Math.pow(1 + inflationRate / 100, years)
  );

  // Purchasing power decay: what todayAmount will feel like in today's terms
  const purchasingPowerDecay = Math.round(
    todayAmount / Math.pow(1 + inflationRate / 100, years)
  );

  return (
    <Card className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <div>
            <label className="text-xs text-gray-300 font-medium">Today’s Amount (₹)</label>
            <input
              type="number"
              value={todayAmount}
              onChange={(e) => setTodayAmount(Number(e.target.value))}
              className="w-full mt-1 p-3 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-white font-bold"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300">Expected Annual Inflation Rate</span>
              <span className="text-[#F5C518] font-bold">{inflationRate}%</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="0.5"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full accent-[#00D4FF] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300">Years into the Future</span>
              <span className="text-[#F5C518] font-bold">{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-[#00D4FF] cursor-pointer"
            />
          </div>
        </div>

        {/* Visual Callout */}
        <div className="space-y-4">
          <div className="bg-[#0A0F2C] p-6 rounded-2xl border border-red-500/30">
            <p className="text-xs text-gray-400">Purchasing Power Loss</p>
            <p className="text-2xl font-bold text-red-400 mt-1">
              ₹{todayAmount.toLocaleString("en-IN")} today will feel like ₹{purchasingPowerDecay.toLocaleString("en-IN")} in {years} years.
            </p>
          </div>

          <div className="bg-[#0A0F2C] p-6 rounded-2xl border border-[#F5C518]/30">
            <p className="text-xs text-gray-400">Future Cost Equivalent</p>
            <p className="text-3xl font-extrabold text-[#F5C518] mt-1">
              ₹{neededInFuture.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-gray-300 mt-1">
              You will need this much in {years} years to buy what ₹{todayAmount.toLocaleString("en-IN")} buys today.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}