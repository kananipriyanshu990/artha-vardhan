import React from "react";
import Card from "../../components/shared/Card";
import { Trash2, Pencil } from "lucide-react";

export default function InvestmentCard({ item, onDelete, onEdit }) {
  const absReturn = item.currentValue - item.amountInvested;
  const absReturnPct = item.amountInvested > 0 ? (absReturn / item.amountInvested) * 100 : 0;
  const isGain = absReturn >= 0;

  const calculateCAGR = () => {
    const invDate = new Date(item.dateInvested);
    const today = new Date();
    const diffYears = Math.max(0.1, (today - invDate) / (1000 * 60 * 60 * 24 * 365.25));
    if (item.amountInvested <= 0 || item.currentValue <= 0) return 0;
    const cagr = (Math.pow(item.currentValue / item.amountInvested, 1 / diffYears) - 1) * 100;
    return cagr.toFixed(1);
  };

  const cagr = calculateCAGR();

  const rate = (item.expectedReturn || 12) / 100;
  const projections = [1, 3, 5, 10].map((yr) => ({
    yr,
    val: Math.round(item.currentValue * Math.pow(1 + rate, yr)),
  }));

  return (
    <Card className="border-[#1E2A3A] hover:border-[#00D4FF] transition-all p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30">
            {item.type}
          </span>
          <h3 className="font-heading font-bold text-base text-white mt-2">{item.name}</h3>
          <p className="text-xs text-gray-400">Invested: {item.dateInvested}</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(item)}
            className="text-gray-400 hover:text-[#00D4FF] p-1.5 transition-colors rounded-lg hover:bg-[#00D4FF]/10"
            title="Edit asset"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="text-gray-400 hover:text-red-400 p-1.5 transition-colors rounded-lg hover:bg-red-500/10"
            title="Delete asset"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-[#0A0F2C] p-3 rounded-xl border border-[#1E2A3A]">
          <span className="text-gray-400">Invested</span>
          <p className="text-sm font-bold text-white mt-0.5">
            ₹{item.amountInvested.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="bg-[#0A0F2C] p-3 rounded-xl border border-[#1E2A3A]">
          <span className="text-gray-400">Current Value</span>
          <p className="text-sm font-bold text-white mt-0.5">
            ₹{item.currentValue.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-1 border-t border-[#1E2A3A]">
        <div>
          <span className="text-gray-400">Absolute Gain: </span>
          <span className={`font-bold ${isGain ? "text-[#00D4FF]" : "text-[#EF4444]"}`}>
            {isGain ? "+" : ""}₹{absReturn.toLocaleString("en-IN")} ({absReturnPct.toFixed(1)}%)
          </span>
        </div>
        <div>
          <span className="text-gray-400">CAGR: </span>
          <span className="font-bold text-[#F5C518]">{cagr}%</span>
        </div>
      </div>

      {/* Future Projections Table */}
      <div className="pt-2 border-t border-[#1E2A3A]">
        <p className="text-[11px] font-medium text-gray-400 mb-2">
          Future Projections (@{item.expectedReturn}% Return):
        </p>
        <div className="grid grid-cols-4 gap-1 text-center text-[11px]">
          {projections.map((p) => (
            <div key={p.yr} className="bg-[#0A0F2C] p-1.5 rounded border border-[#1E2A3A]">
              <span className="text-gray-500 block">{p.yr} Yr</span>
              <span className="text-gray-200 font-semibold">₹{(p.val / 1000).toFixed(0)}k</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}