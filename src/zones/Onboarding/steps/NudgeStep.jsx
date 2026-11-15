import React from "react";
import Button from "../../../components/shared/Button";
import Card from "../../../components/shared/Card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function NudgeStep({ income, onExploreLearn, onExploreCalculators }) {
  const monthlySip = Math.round(income * 0.2);
  const annualRate = 0.12;
  const monthlyRate = annualRate / 12;
  const years = 10;
  const totalMonths = years * 12;

  // FV of SIP formula: M = P * ({[1 + r]^n - 1} / r) * (1 + r)
  const futureValue = Math.round(
    monthlySip *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate)
  );

  const chartData = [];
  for (let yr = 1; yr <= 10; yr++) {
    const m = yr * 12;
    const invested = monthlySip * m;
    const fv = Math.round(
      monthlySip *
        ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) *
        (1 + monthlyRate)
    );
    chartData.push({
      year: `Yr ${yr}`,
      Invested: invested,
      Wealth: fv,
    });
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#F0EDE4]">
            Starting a SIP with ₹{monthlySip.toLocaleString("en-IN")} today could give you{" "}
            <span className="text-[#F5C518]">₹{futureValue.toLocaleString("en-IN")}</span> in 10 years.
          </h2>
          <p className="text-sm text-[#9CA3AF]">
            Assuming a modest historic Indian equity CAGR of 12% per year.
          </p>
        </div>

        {/* SIP Growth Chart */}
        <div className="h-60 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <XAxis dataKey="year" stroke="#9CA3AF" fontSize={12} />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#111827", borderColor: "#1E2A3A", borderRadius: "8px" }}
                formatter={(val) => [`₹${val.toLocaleString("en-IN")}`, ""]}
              />
              <Area type="monotone" dataKey="Invested" stroke="#9CA3AF" fill="#4B5563" opacity={0.3} />
              <Area type="monotone" dataKey="Wealth" stroke="#F5C518" fill="#F5C518" opacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <Button
            onClick={onExploreLearn}
            variant="outline"
            accentColor="#00D4FF"
            className="w-full py-3"
          >
            Explore Learn Zone
          </Button>
          <Button
            onClick={onExploreCalculators}
            accentColor="#F5C518"
            className="w-full py-3 text-[#0A0F2C]"
          >
            Go to Calculators
          </Button>
        </div>
      </Card>
    </div>
  );
}