import React from "react";
import Card from "../../components/shared/Card";
import { Trash2, Pencil } from "lucide-react";

export default function GoalCard({ goal, onDelete, onEdit }) {
  const calculateRequiredSip = () => {
    const today = new Date();
    const target = new Date(goal.targetDate);
    const diffMonths = Math.max(
      1,
      (target.getFullYear() - today.getFullYear()) * 12 + (target.getMonth() - today.getMonth())
    );

    const r = (goal.expectedReturn || 12) / 100 / 12;
    const n = diffMonths;
    const goalAmt = goal.targetAmount;
    const currentSav = goal.currentSavings || 0;

    const numerator = (goalAmt - currentSav * Math.pow(1 + r, n)) * r;
    const denominator = Math.pow(1 + r, n) - 1;

    if (denominator <= 0) return 0;
    const sip = Math.round(numerator / denominator);
    return Math.max(0, sip);
  };

  const reqSip = calculateRequiredSip();
  const progressPct = Math.min(
    100,
    Math.round(((goal.currentSavings || 0) / goal.targetAmount) * 100)
  );

  return (
    <Card className="border-[#1E2A3A] hover:border-[#10B981] transition-all p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-[#0A0F2C] rounded-xl border border-[#1E2A3A]">
            {goal.emoji}
          </span>
          <div>
            <h3 className="font-heading font-bold text-base text-white">{goal.name}</h3>
            <p className="text-xs text-gray-400">Target Date: {goal.targetDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(goal)}
            className="text-gray-400 hover:text-[#10B981] p-1.5 transition-colors rounded-lg hover:bg-[#10B981]/10"
            title="Edit goal"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="text-gray-400 hover:text-red-400 p-1.5 transition-colors rounded-lg hover:bg-red-500/10"
            title="Delete goal"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
        <div className="bg-[#0A0F2C] p-3 rounded-xl border border-[#1E2A3A]">
          <span className="text-gray-400">Target Amount</span>
          <p className="text-sm font-bold text-white mt-0.5">
            ₹{goal.targetAmount.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="bg-[#0A0F2C] p-3 rounded-xl border border-[#10B981]/30">
          <span className="text-gray-400">Required Monthly SIP</span>
          <p className="text-sm font-bold text-[#10B981] mt-0.5">
            ₹{reqSip.toLocaleString("en-IN")}/mo
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-[11px] text-gray-400">
          <span>Saved: ₹{(goal.currentSavings || 0).toLocaleString("en-IN")}</span>
          <span>{progressPct}% reached</span>
        </div>
        <div className="w-full bg-[#0A0F2C] h-2 rounded-full overflow-hidden border border-[#1E2A3A]">
          <div
            className="h-full bg-[#10B981] transition-all duration-500 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </Card>
  );
}