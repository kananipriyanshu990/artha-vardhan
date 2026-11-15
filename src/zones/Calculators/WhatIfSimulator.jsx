import React, { useState, useMemo } from "react";
import Card from "../../components/shared/Card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function WhatIfSimulator() {
  const [baseSip, setBaseSip] = useState(5000);
  const [baseReturn, setBaseReturn] = useState(12);
  const [yearsRemaining, setYearsRemaining] = useState(15);
  const [activeScenario, setActiveScenario] = useState("increase"); // 'increase' | 'pause' | 'return_change' | 'lumpsum'

  // Scenario 1: Increase SIP by X at Year Y
  const [increaseAmount, setIncreaseAmount] = useState(2000);
  const [increaseYear, setIncreaseYear] = useState(3);

  // Scenario 2: Pause SIP for Z months
  const [pauseMonths, setPauseMonths] = useState(12);

  // Scenario 3: Return is X% instead of Y%
  const [newReturnRate, setNewReturnRate] = useState(15);

  // Scenario 4: Add lumpsum X at Year Y
  const [lumpsumAmount, setLumpsumAmount] = useState(50000);
  const [lumpsumYear, setLumpsumYear] = useState(5);

  const { originalCorpus, scenarioCorpus, difference, chartData } = useMemo(() => {
    const monthlyRate = baseReturn / 100 / 12;
    const totalMonths = yearsRemaining * 12;

    let originalRunning = 0;
    let scenarioRunning = 0;
    const data = [];

    for (let m = 1; m <= totalMonths; m++) {
      // Original growth
      originalRunning = (originalRunning + baseSip) * (1 + monthlyRate);

      // Scenario growth calculation
      const currentYear = Math.ceil(m / 12);
      let currentMonthlyRate = monthlyRate;
      let monthlyContribution = baseSip;

      if (activeScenario === "increase") {
        if (currentYear >= increaseYear) {
          monthlyContribution = baseSip + Number(increaseAmount);
        }
      } else if (activeScenario === "pause") {
        if (m <= pauseMonths) {
          monthlyContribution = 0;
        }
      } else if (activeScenario === "return_change") {
        currentMonthlyRate = newReturnRate / 100 / 12;
      }

      scenarioRunning = (scenarioRunning + monthlyContribution) * (1 + currentMonthlyRate);

      if (activeScenario === "lumpsum" && m === lumpsumYear * 12) {
        scenarioRunning += Number(lumpsumAmount);
      }

      if (m % 12 === 0) {
        data.push({
          year: `Yr ${m / 12}`,
          Original: Math.round(originalRunning),
          WhatIf: Math.round(scenarioRunning),
        });
      }
    }

    return {
      originalCorpus: Math.round(originalRunning),
      scenarioCorpus: Math.round(scenarioRunning),
      difference: Math.round(scenarioRunning - originalRunning),
      chartData: data,
    };
  }, [
    baseSip,
    baseReturn,
    yearsRemaining,
    activeScenario,
    increaseAmount,
    increaseYear,
    pauseMonths,
    newReturnRate,
    lumpsumAmount,
    lumpsumYear,
  ]);

  return (
    <Card className="space-y-6">
      {/* Scenario Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#1E2A3A] pb-4">
        {[
          { id: "increase", label: "1. Increase SIP Later" },
          { id: "pause", label: "2. Pause SIP for Months" },
          { id: "return_change", label: "3. Returns Change" },
          { id: "lumpsum", label: "4. Inject Lumpsum" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveScenario(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeScenario === tab.id
                ? "bg-[#00D4FF] text-[#0A0F2C]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-gray-400">Base Monthly SIP (₹)</label>
          <input
            type="number"
            value={baseSip}
            onChange={(e) => setBaseSip(Number(e.target.value))}
            className="w-full mt-1 p-2 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white font-bold text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400">Base Expected Return (%)</label>
          <input
            type="number"
            value={baseReturn}
            onChange={(e) => setBaseReturn(Number(e.target.value))}
            className="w-full mt-1 p-2 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white font-bold text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400">Years Remaining</label>
          <input
            type="number"
            value={yearsRemaining}
            onChange={(e) => setYearsRemaining(Number(e.target.value))}
            className="w-full mt-1 p-2 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white font-bold text-sm"
          />
        </div>
      </div>

      {/* Scenario Specific Inputs */}
      <div className="p-4 bg-[#0A0F2C] rounded-xl border border-[#1E2A3A] flex flex-wrap items-center gap-4 text-xs">
        {activeScenario === "increase" && (
          <>
            <span>Increase SIP by ₹</span>
            <input
              type="number"
              value={increaseAmount}
              onChange={(e) => setIncreaseAmount(Number(e.target.value))}
              className="w-24 p-1.5 bg-[#111827] border border-gray-700 rounded text-white font-bold"
            />
            <span>per month starting from Year</span>
            <input
              type="number"
              value={increaseYear}
              onChange={(e) => setIncreaseYear(Number(e.target.value))}
              className="w-16 p-1.5 bg-[#111827] border border-gray-700 rounded text-white font-bold"
            />
          </>
        )}
        {activeScenario === "pause" && (
          <>
            <span>Pause my SIP completely for</span>
            <input
              type="number"
              value={pauseMonths}
              onChange={(e) => setPauseMonths(Number(e.target.value))}
              className="w-20 p-1.5 bg-[#111827] border border-gray-700 rounded text-white font-bold"
            />
            <span>months at start</span>
          </>
        )}
        {activeScenario === "return_change" && (
          <>
            <span>What if overall market returns are</span>
            <input
              type="number"
              value={newReturnRate}
              onChange={(e) => setNewReturnRate(Number(e.target.value))}
              className="w-20 p-1.5 bg-[#111827] border border-gray-700 rounded text-white font-bold"
            />
            <span>% instead of {baseReturn}%?</span>
          </>
        )}
        {activeScenario === "lumpsum" && (
          <>
            <span>Add a one-time bonus lumpsum of ₹</span>
            <input
              type="number"
              value={lumpsumAmount}
              onChange={(e) => setLumpsumAmount(Number(e.target.value))}
              className="w-28 p-1.5 bg-[#111827] border border-gray-700 rounded text-white font-bold"
            />
            <span>at Year</span>
            <input
              type="number"
              value={lumpsumYear}
              onChange={(e) => setLumpsumYear(Number(e.target.value))}
              className="w-16 p-1.5 bg-[#111827] border border-gray-700 rounded text-white font-bold"
            />
          </>
        )}
      </div>

      {/* Difference Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-[#0A0F2C] p-4 rounded-xl border border-[#1E2A3A]">
          <p className="text-xs text-gray-400">Original Plan Corpus</p>
          <p className="text-xl font-bold text-gray-300">₹{originalCorpus.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-[#0A0F2C] p-4 rounded-xl border border-[#1E2A3A]">
          <p className="text-xs text-gray-400">What-If Corpus</p>
          <p className="text-xl font-bold text-[#00D4FF]">₹{scenarioCorpus.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-[#0A0F2C] p-4 rounded-xl border border-[#F5C518]/50">
          <p className="text-xs text-gray-400">Difference in Final Wealth</p>
          <p className={`text-xl font-extrabold ${difference >= 0 ? "text-[#F5C518]" : "text-red-400"}`}>
            {difference >= 0 ? "+" : ""}₹{difference.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Side-by-side Chart */}
      <div className="h-64 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <XAxis dataKey="year" stroke="#9CA3AF" fontSize={11} />
            <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
            <Tooltip
              contentStyle={{ backgroundColor: "#111827", borderColor: "#1E2A3A", borderRadius: "8px" }}
              formatter={(val) => [`₹${Number(val).toLocaleString("en-IN")}`, ""]}
            />
            <Area type="monotone" dataKey="Original" stroke="#9CA3AF" fill="#4B5563" opacity={0.3} />
            <Area type="monotone" dataKey="WhatIf" stroke="#F5C518" fill="#F5C518" opacity={0.4} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}