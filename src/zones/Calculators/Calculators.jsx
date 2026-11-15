import React, { useState } from "react";
import SIPCalculator from "./SIPCalculator";
import LumpsumCalculator from "./LumpsumCalculator";
import CAGRCalculator from "./CAGRCalculator";
import InflationCalculator from "./InflationCalculator";
import ELSSCalculator from "./ELSSCalculator";
import WhatIfSimulator from "./WhatIfSimulator";
import { Calculator } from "lucide-react";

export default function Calculators() {
  const [activeTab, setActiveTab] = useState("sip");

  const tabs = [
    { id: "sip", label: "SIP Calculator" },
    { id: "lumpsum", label: "Lumpsum" },
    { id: "cagr", label: "CAGR" },
    { id: "inflation", label: "Inflation Adjuster" },
    { id: "elss", label: "ELSS Tax Saver" },
    { id: "whatif", label: "What-If Simulator" },
  ];

  return (
    <div className="max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#1E2A3A] pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F5C518] mb-1">
          <Calculator className="w-4 h-4" /> Zone 3: High Precision Financial Engines
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-[#F0EDE4]">
          Investment Calculators
        </h1>
        <p className="text-sm text-[#9CA3AF] mt-1">
          Mathematically rigorous models to compute compounding, tax savings, and purchasing power.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#1E2A3A] pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-[#F5C518] text-[#0A0F2C] shadow-lg shadow-[#F5C518]/20"
                : "text-gray-400 hover:text-white hover:bg-[#111827]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "sip" && <SIPCalculator />}
      {activeTab === "lumpsum" && <LumpsumCalculator />}
      {activeTab === "cagr" && <CAGRCalculator />}
      {activeTab === "inflation" && <InflationCalculator />}
      {activeTab === "elss" && <ELSSCalculator />}
      {activeTab === "whatif" && <WhatIfSimulator />}
    </div>
  );
}