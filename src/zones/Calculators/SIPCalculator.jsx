import React, { useState, useMemo } from "react";
import Card from "../../components/shared/Card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(15);

  const { totalInvested, estimatedReturns, totalValue, wealthGainedPct, chartData } = useMemo(() => {
    const P = Number(monthlyInvestment);
    const r = Number(expectedReturn) / 100 / 12;
    const n = Number(years) * 12;

    const M = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = P * n;
    const returns = M - invested;
    const gainedPct = invested > 0 ? (returns / invested) * 100 : 0;

    const data = [];
    for (let y = 1; y <= Number(years); y++) {
      const months = y * 12;
      const inv = P * months;
      const fv = P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      data.push({
        year: `Yr ${y}`,
        Invested: Math.round(inv),
        Returns: Math.round(fv - inv),
      });
    }

    return {
      totalInvested: Math.round(invested),
      estimatedReturns: Math.round(returns),
      totalValue: Math.round(M),
      wealthGainedPct: Math.round(gainedPct),
      chartData: data,
    };
  }, [monthlyInvestment, expectedReturn, years]);

  return (
    <Card className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sliders Input */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-300 font-medium">Monthly Investment</span>
              <span className="text-[#F5C518] font-bold text-lg">
                ₹{Number(monthlyInvestment).toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="100000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="w-full accent-[#00D4FF] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>₹100</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-300 font-medium">Expected Annual Return</span>
              <span className="text-[#F5C518] font-bold text-lg">{expectedReturn}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full accent-[#00D4FF] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-300 font-medium">Time Period</span>
              <span className="text-[#F5C518] font-bold text-lg">{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full accent-[#00D4FF] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>1 Yr</span>
              <span>40 Yrs</span>
            </div>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0A0F2C] p-4 rounded-xl border border-[#1E2A3A]">
            <p className="text-xs text-gray-400">Total Invested</p>
            <p className="text-xl font-bold text-gray-300 mt-1">
              ₹{totalInvested.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-[#0A0F2C] p-4 rounded-xl border border-[#1E2A3A]">
            <p className="text-xs text-gray-400">Estimated Returns</p>
            <p className="text-xl font-bold text-[#F5C518] mt-1">
              ₹{estimatedReturns.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="col-span-2 bg-[#0A0F2C] p-4 rounded-xl border border-[#F5C518]/30">
            <p className="text-xs text-gray-400">Total Accumulated Corpus</p>
            <p className="text-3xl font-extrabold text-[#F5C518] mt-1">
              ₹{totalValue.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-emerald-400 font-medium mt-1">
              +{wealthGainedPct}% wealth generated on your principal
            </p>
          </div>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="pt-4 border-t border-[#1E2A3A]">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
          Year-by-Year Growth Projection
        </h4>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <XAxis dataKey="year" stroke="#9CA3AF" fontSize={11} />
              <YAxis
                stroke="#9CA3AF"
                fontSize={11}
                tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#111827", borderColor: "#1E2A3A", borderRadius: "8px" }}
                formatter={(val) => [`₹${Number(val).toLocaleString("en-IN")}`, ""]}
              />
              <Area type="monotone" dataKey="Invested" stackId="1" stroke="#6B7280" fill="#4B5563" />
              <Area type="monotone" dataKey="Returns" stackId="1" stroke="#F5C518" fill="#F5C518" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}