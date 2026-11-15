import React, { useState } from "react";
import Card from "../../components/shared/Card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, Share2, Sparkles } from "lucide-react";

export default function CompoundingWow() {
  const [userAge, setUserAge] = useState(20);
  const [monthlySip, setMonthlySip] = useState(500);
  const [expectedReturn, setExpectedReturn] = useState(12);

  // Pre-loaded baseline comparison from Section 9:
  // Person A: Starts SIP ₹500/mo at 18, stops at 25 (7 yrs) -> Invests ₹42,000 -> Corpus at 60 ~₹1.57 Cr
  // Person B: Starts SIP ₹500/mo at 25, continues till 60 (35 yrs) -> Invests ₹2,10,000 -> Corpus at 60 ~₹1.76 Cr
  const comparisonData = [
    { name: "Person A (Invests Age 18-25)", Invested: 42000, Corpus: 15700000 },
    { name: "Person B (Invests Age 25-60)", Invested: 210000, Corpus: 17600000 },
  ];

  // Interactive Section: Start today vs wait 5 years
  // Horizon till age 60
  const calculateCorpus = (startDelayYears) => {
    const yearsToInvest = Math.max(1, 60 - (Number(userAge) + startDelayYears));
    const r = Number(expectedReturn) / 100 / 12;
    const n = yearsToInvest * 12;
    const fv = Number(monthlySip) * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return Math.round(fv);
  };

  const corpusToday = calculateCorpus(0);
  const corpusDelay5 = calculateCorpus(5);
  const costOfWaiting = Math.max(0, corpusToday - corpusDelay5);

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #0D2B1D 0%, #0A0F2C 100%)",
      }}
      className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn"
    >
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5C518]/15 border border-[#F5C518]/30 text-[#F5C518] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Zone 6: Visual Proof of Compounding
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#F0EDE4]">
          The earlier you start, <br />
          <span className="text-[#F5C518]">the less you need.</span>
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
          Time in the market does 80% of the heavy lifting. Witness the mathematical paradox of compounding.
        </p>
      </div>

      {/* Main Pre-loaded Comparison Card */}
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 sm:p-8 space-y-6 bg-[#111827]/90 border-[#1E2A3A]">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={(v) => `₹${(v / 10000000).toFixed(1)}Cr`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111827", borderColor: "#1E2A3A", borderRadius: "8px" }}
                  formatter={(val) => [`₹${Number(val).toLocaleString("en-IN")}`, ""]}
                />
                <Bar dataKey="Invested" fill="#6B7280" name="Total Invested Out of Pocket" />
                <Bar dataKey="Corpus" fill="#F5C518" name="Final Corpus at Age 60" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 rounded-xl bg-[#F5C518]/10 border border-[#F5C518]/40 text-center">
            <p className="font-heading text-base sm:text-lg font-bold text-[#F5C518]">
              Person A invested ₹42,000. Person B invested ₹2,10,000. <br />
              The early starter invested 5x LESS money and won nearly the SAME result.
            </p>
          </div>
        </Card>
      </div>

      {/* Interactive Section */}
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 sm:p-8 space-y-6">
          <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#F5C518]" /> Test With Your Own Age
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-400">Your Current Age</label>
              <input
                type="number"
                min="15"
                max="50"
                value={userAge}
                onChange={(e) => setUserAge(e.target.value)}
                className="w-full mt-1 p-3 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Monthly SIP Amount (₹)</label>
              <input
                type="number"
                step="500"
                value={monthlySip}
                onChange={(e) => setMonthlySip(e.target.value)}
                className="w-full mt-1 p-3 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Expected Annual Return (%)</label>
              <input
                type="number"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full mt-1 p-3 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-white font-bold"
              />
            </div>
          </div>

          <div className="bg-[#0A0F2C] p-6 rounded-2xl border border-red-500/30 text-center space-y-2">
            <p className="text-sm text-gray-300">
              If you start today vs if you wait just 5 years — the penalty difference is:
            </p>
            <p className="text-4xl sm:text-5xl font-extrabold text-[#F5C518]">
              ₹{costOfWaiting.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-red-400 font-medium">
              Waiting 5 years burns ₹{costOfWaiting.toLocaleString("en-IN")} in pure compounding wealth!
            </p>
          </div>

          {/* Share prompt as specified in Section 9 */}
          <div className="text-center pt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Share2 className="w-4 h-4 text-[#F5C518]" />
            <span>Screenshot this and send it to a friend who hasn’t started yet.</span>
          </div>
        </Card>
      </div>
    </div>
  );
}