import React, { useState } from "react";
import Card from "../../components/shared/Card";

export default function CAGRCalculator() {
  const [mode, setMode] = useState("calc_cagr"); // 'calc_cagr' | 'calc_fv'

  // Mode 1 inputs
  const [beginningVal, setBeginningVal] = useState(10000);
  const [endingVal, setEndingVal] = useState(25000);
  const [cagrYears, setCagrYears] = useState(5);

  // Mode 2 inputs
  const [principal, setPrincipal] = useState(20000);
  const [cagrRate, setCagrRate] = useState(12);
  const [fvYears, setFvYears] = useState(7);

  // Calculations
  // Formula: CAGR = (Ending / Beginning)^(1/Years) - 1
  const calculatedCAGR =
    beginningVal > 0 && endingVal > 0 && cagrYears > 0
      ? ((Math.pow(endingVal / beginningVal, 1 / cagrYears) - 1) * 100).toFixed(2)
      : 0;

  // Mode 2: FV = Principal * (1 + CAGR/100)^years
  const calculatedFV =
    principal > 0 && fvYears > 0
      ? Math.round(principal * Math.pow(1 + cagrRate / 100, fvYears))
      : 0;

  return (
    <Card className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex gap-2 border-b border-[#1E2A3A] pb-4">
        <button
          onClick={() => setMode("calc_cagr")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            mode === "calc_cagr" ? "bg-[#F5C518] text-[#0A0F2C]" : "text-gray-400 hover:text-white"
          }`}
        >
          Mode 1: Calculate CAGR %
        </button>
        <button
          onClick={() => setMode("calc_fv")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            mode === "calc_fv" ? "bg-[#F5C518] text-[#0A0F2C]" : "text-gray-400 hover:text-white"
          }`}
        >
          Mode 2: Calculate Future Value
        </button>
      </div>

      {mode === "calc_cagr" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400">Beginning Value (₹)</label>
              <input
                type="number"
                value={beginningVal}
                onChange={(e) => setBeginningVal(Number(e.target.value))}
                className="w-full mt-1 p-3 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Ending Value (₹)</label>
              <input
                type="number"
                value={endingVal}
                onChange={(e) => setEndingVal(Number(e.target.value))}
                className="w-full mt-1 p-3 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Number of Years</label>
              <input
                type="number"
                min="1"
                max="50"
                value={cagrYears}
                onChange={(e) => setCagrYears(Number(e.target.value))}
                className="w-full mt-1 p-3 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-white font-bold"
              />
            </div>
          </div>

          <div className="bg-[#0A0F2C] p-8 rounded-2xl border border-[#F5C518]/30 text-center">
            <p className="text-xs uppercase tracking-wider text-gray-400">Compounded Annual Growth Rate</p>
            <p className="text-5xl font-extrabold text-[#F5C518] mt-3">{calculatedCAGR}%</p>
            <p className="text-xs text-gray-400 mt-2">
              Formula: (Ending Value / Beginning Value)^(1/Years) – 1
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400">Principal Amount (₹)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full mt-1 p-3 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Expected CAGR (%)</label>
              <input
                type="number"
                step="0.5"
                value={cagrRate}
                onChange={(e) => setCagrRate(Number(e.target.value))}
                className="w-full mt-1 p-3 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Number of Years</label>
              <input
                type="number"
                value={fvYears}
                onChange={(e) => setFvYears(Number(e.target.value))}
                className="w-full mt-1 p-3 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-white font-bold"
              />
            </div>
          </div>

          <div className="bg-[#0A0F2C] p-8 rounded-2xl border border-[#00D4FF]/30 text-center">
            <p className="text-xs uppercase tracking-wider text-gray-400">Target Future Value</p>
            <p className="text-4xl font-extrabold text-[#00D4FF] mt-3">
              ₹{calculatedFV.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-emerald-400 mt-2">
              +₹{(calculatedFV - principal).toLocaleString("en-IN")} total capital growth
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}