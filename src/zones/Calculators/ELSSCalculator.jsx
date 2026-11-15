import React, { useState } from "react";
import Card from "../../components/shared/Card";
import { Info } from "lucide-react";

export default function ELSSCalculator() {
  const [annualIncome, setAnnualIncome] = useState(800000);
  const [elssInvestment, setElssInvestment] = useState(150000);
  const [regime, setRegime] = useState("old"); // 'old' | 'new'

  // Hardcoded Old Regime Tax Slabs FY 2025-26 as specified in Section 6.5:
  // Up to 2.5L: 0%, 2.5L-5L: 5%, 5L-10L: 20%, Above 10L: 30% + 4% cess
  const calculateOldTax = (income) => {
    let taxable = Math.max(0, income);
    let tax = 0;

    if (taxable > 1000000) {
      tax += (taxable - 1000000) * 0.3;
      taxable = 1000000;
    }
    if (taxable > 500000) {
      tax += (taxable - 500000) * 0.2;
      taxable = 500000;
    }
    if (taxable > 250000) {
      tax += (taxable - 250000) * 0.05;
    }

    // 4% cess
    return Math.round(tax * 1.04);
  };

  const cappedELSS = Math.min(Math.max(0, elssInvestment), 150000);
  const taxWithoutELSS = calculateOldTax(annualIncome);
  const taxWithELSS = calculateOldTax(annualIncome - cappedELSS);
  const taxSaved = taxWithoutELSS - taxWithELSS;

  return (
    <Card className="space-y-6">
      <div className="flex gap-4 border-b border-[#1E2A3A] pb-4">
        <button
          onClick={() => setRegime("old")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold ${
            regime === "old" ? "bg-[#F5C518] text-[#0A0F2C]" : "text-gray-400 hover:text-white"
          }`}
        >
          Old Tax Regime (Section 80C)
        </button>
        <button
          onClick={() => setRegime("new")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold ${
            regime === "new" ? "bg-[#F5C518] text-[#0A0F2C]" : "text-gray-400 hover:text-white"
          }`}
        >
          New Tax Regime
        </button>
      </div>

      {regime === "new" ? (
        <div className="bg-[#0A0F2C] p-6 rounded-xl border border-amber-500/40 text-amber-300 text-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#FFAA00]">
            <Info className="w-5 h-5" /> Note on New Tax Regime
          </div>
          <p>
            Under the New Tax Regime (Section 115BAC), Section 80C deductions are not available. 
            However, ELSS remains an exceptional 3-year disciplined wealth creation equity tool.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400">Annual Gross Income (₹)</label>
              <input
                type="number"
                step="25000"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full mt-1 p-3 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">ELSS Investment (Max ₹1.5L for 80C)</label>
              <input
                type="number"
                max="150000"
                step="5000"
                value={elssInvestment}
                onChange={(e) => setElssInvestment(Number(e.target.value))}
                className="w-full mt-1 p-3 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-white font-bold"
              />
            </div>
          </div>

          <div className="bg-[#0A0F2C] p-6 rounded-2xl border border-[#10B981]/40 space-y-4">
            <div>
              <p className="text-xs text-gray-400">Direct Tax Saved via ELSS (80C)</p>
              <p className="text-4xl font-extrabold text-[#10B981] mt-1">
                ₹{taxSaved.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="text-xs text-gray-300 space-y-1 border-t border-[#1E2A3A] pt-3">
              <div className="flex justify-between">
                <span>Tax without ELSS:</span>
                <span className="font-semibold">₹{taxWithoutELSS.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax with ₹{cappedELSS.toLocaleString("en-IN")} ELSS:</span>
                <span className="font-semibold text-emerald-400">₹{taxWithELSS.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}