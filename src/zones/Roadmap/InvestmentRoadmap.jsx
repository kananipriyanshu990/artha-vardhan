import React, { useState } from "react";
import Card from "../../components/shared/Card";
import { Compass, CheckCircle2, MapPin } from "lucide-react";

export default function InvestmentRoadmap() {
  const [userAge, setUserAge] = useState(21);

  const stages = [
    {
      stage: 1,
      minAge: 18,
      maxAge: 22,
      rangeLabel: "Age 18–22",
      title: "Foundation",
      categoryTag: "Large Cap / Index Funds (low risk, stable)",
      bullets: [
        "Build an emergency fund (3–6 months expenses)",
        "Open a savings account with good interest",
        "Start a SIP with even ₹500/month",
        "Get term insurance if dependents exist",
        "Understand KYC and start investing directly",
      ],
    },
    {
      stage: 2,
      minAge: 22,
      maxAge: 25,
      rangeLabel: "Age 22–25",
      title: "Acceleration",
      categoryTag: "Flexi Cap / Multi Cap",
      bullets: [
        "Increase SIP with every salary hike (Step-up SIP)",
        "Start ELSS for tax saving under Section 80C",
        "Build a 6-month emergency fund if not done",
        "Avoid lifestyle inflation — invest the raise",
      ],
    },
    {
      stage: 3,
      minAge: 25,
      maxAge: 30,
      rangeLabel: "Age 25–30",
      title: "Diversification",
      categoryTag: "Diversified Equity + Some Debt",
      bullets: [
        "Add international exposure through fund of funds",
        "Start goal-based investing (home, education, travel)",
        "Review and rebalance portfolio annually",
        "Consider NPS for additional tax benefit",
      ],
    },
    {
      stage: 4,
      minAge: 30,
      maxAge: 40,
      rangeLabel: "Age 30–40",
      title: "Growth",
      categoryTag: "Balanced / Aggressive Hybrid",
      bullets: [
        "SIP should be 20–30% of income by now",
        "Ensure adequate health and term insurance",
        "Start planning for child’s education if applicable",
        "Real estate consideration (informed, not impulsive)",
      ],
    },
    {
      stage: 5,
      minAge: 40,
      maxAge: 50,
      rangeLabel: "Age 40–50",
      title: "Consolidation",
      categoryTag: "Hybrid / Conservative Hybrid",
      bullets: [
        "Gradually shift from pure equity to hybrid",
        "Review risk appetite — reduce if dependents have grown",
        "Maximize EPF and PPF contributions",
        "Estate planning basics",
      ],
    },
    {
      stage: 6,
      minAge: 50,
      maxAge: 100,
      rangeLabel: "Age 50+",
      title: "Preservation",
      categoryTag: "Debt Funds / Liquid Funds",
      bullets: [
        "Capital protection becomes priority",
        "Shift to debt-heavy allocation",
        "SWP (Systematic Withdrawal Plan) planning for retirement",
        "Keep 2–3 years expenses in liquid funds",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#1E2A3A] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#7C3AED] mb-1">
            <Compass className="w-4 h-4" /> Zone 7: Life Stage Roadmap
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-[#F0EDE4]">
            Investment Roadmap
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Step-by-step financial blueprints tailored to your current age and career stage.
          </p>
        </div>

        {/* Age Input Box */}
        <div className="bg-[#111827] border border-[#1E2A3A] p-3 rounded-xl flex items-center gap-3">
          <span className="text-xs text-gray-400">Enter Your Age:</span>
          <input
            type="number"
            min="18"
            max="80"
            value={userAge}
            onChange={(e) => setUserAge(Number(e.target.value))}
            className="w-16 p-1 bg-[#0A0F2C] border border-[#7C3AED] rounded font-bold text-center text-white"
          />
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-8">
        {/* Timeline Gradient Line: Cyan -> Gold as specified in Section 10 */}
        <div
          style={{
            background: "linear-gradient(180deg, #00D4FF 0%, #F5C518 100%)",
          }}
          className="absolute left-2.5 top-4 bottom-4 w-1 rounded-full pointer-events-none"
        />

        {stages.map((stg) => {
          const isCurrent = userAge >= stg.minAge && userAge < stg.maxAge;
          const isFuture = userAge < stg.minAge;

          return (
            <div key={stg.stage} className="relative">
              {/* Timeline Pin */}
              <div
                className={`absolute -left-[27px] sm:-left-[35px] top-6 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isCurrent
                    ? "bg-[#F5C518] text-[#0A0F2C] ring-4 ring-[#F5C518]/30"
                    : isFuture
                    ? "bg-[#1E2A3A] text-gray-400"
                    : "bg-[#00D4FF] text-[#0A0F2C]"
                }`}
              >
                {stg.stage}
              </div>

              {/* Stage Card */}
              <Card
                className={`transition-all duration-300 p-6 space-y-4 ${
                  isCurrent
                    ? "border-[#F5C518] bg-[#111827] shadow-xl shadow-[#F5C518]/10"
                    : isFuture
                    ? "opacity-60 bg-[#111827]/60 border-[#1E2A3A]"
                    : "border-[#1E2A3A]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/40">
                      {stg.rangeLabel}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-white">
                      Stage {stg.stage}: {stg.title}
                    </h3>
                  </div>

                  {isCurrent && (
                    <span className="flex items-center gap-1 text-xs font-extrabold text-[#F5C518] bg-[#F5C518]/15 px-3 py-1 rounded-full border border-[#F5C518]/40">
                      <MapPin className="w-3.5 h-3.5" /> YOU ARE HERE
                    </span>
                  )}
                </div>

                {/* Bullets */}
                <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                  {stg.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7C3AED] flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Recommended Fund Category Tag */}
                <div className="pt-2 border-t border-[#1E2A3A]">
                  <span className="text-xs text-gray-400">Recommended Category: </span>
                  <span className="text-xs font-semibold text-[#00D4FF]">
                    {stg.categoryTag}
                  </span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}