import React, { useState, useMemo } from "react";
import Card from "../../components/shared/Card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function LumpsumCalculator() {
  const [investment, setInvestment] = useState(50000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(10);

  const { totalValue, totalReturns, roi, chartData } = useMemo(() => {
    const P = Number(investment);
    const r = Number(expectedReturn);
    const t = Number(years);

    // Formula: A = P * (1 + r/100)^t
    const A = P * Math.pow(1 + r / 100, t);
    const returns = A - P;
    const returnOnInvestment = (returns / P) * 100;

    const data = [];
    for (let yr = 0; yr <= t; yr++) {
      data.push({
        year: `Yr ${yr}`,
        Value: Math.round(P * Math.pow(1 + r / 100, yr)),
      });
    }

    return {
      totalValue: Math.round(A),
      totalReturns: Math.round(returns),
      roi: Math.round(returnOnInvestment),
      chartData: data,
    };
  }, [investment, expectedReturn, years]);

  return (
    <Card className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-300 font-medium">One-Time Investment</span>
              <span className="text-[#F5C518] font-bold text-lg">
                ₹{Number(investment).toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="5000000"
              step="5000"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full accent-[#00D4FF] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>₹1,000</span>
              <span>₹50,00,000</span>
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
              <span className="text-gray-300 font-medium">Time Horizon</span>
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

        <div className="space-y-4">
          <div className="bg-[#0A0F2C] p-5 rounded-xl border border-[#F5C518]/30">
            <p className="text-xs text-gray-400">Total Future Value</p>
            <p className="text-3xl font-extrabold text-[#F5C518] mt-1">
              ₹{totalValue.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-emerald-400 font-medium mt-1">
              Total Returns: ₹{totalReturns.toLocaleString("en-IN")} (+{roi}%)
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#1E2A3A]">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
          Lumpsum Growth Curve
        </h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="year" stroke="#9CA3AF" fontSize={11} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#111827", borderColor: "#1E2A3A", borderRadius: "8px" }}
                formatter={(val) => [`₹${Number(val).toLocaleString("en-IN")}`, "Corpus"]}
              />
              <Line type="monotone" dataKey="Value" stroke="#00D4FF" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}