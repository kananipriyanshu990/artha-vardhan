import React, { useState, useEffect } from "react";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import { PlusCircle, Edit3 } from "lucide-react";

export default function GoalForm({ onAddGoal, onUpdateGoal, editingGoal, onCancel }) {
  const [name, setName] = useState(editingGoal ? editingGoal.name : "");
  const [targetAmount, setTargetAmount] = useState(editingGoal ? editingGoal.targetAmount : 200000);
  const [targetDate, setTargetDate] = useState(editingGoal ? editingGoal.targetDate : "");
  const [currentSavings, setCurrentSavings] = useState(editingGoal ? editingGoal.currentSavings : 0);
  const [expectedReturn, setExpectedReturn] = useState(editingGoal ? editingGoal.expectedReturn : 12);

  useEffect(() => {
    if (editingGoal) {
      setName(editingGoal.name || "");
      setTargetAmount(editingGoal.targetAmount || 200000);
      setTargetDate(editingGoal.targetDate || "");
      setCurrentSavings(editingGoal.currentSavings || 0);
      setExpectedReturn(editingGoal.expectedReturn || 12);
    }
  }, [editingGoal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !targetDate) return;

    const lower = name.toLowerCase();
    let emoji = "🎯";
    let category = "default";

    if (lower.includes("travel") || lower.includes("trip") || lower.includes("europe") || lower.includes("vacation") || lower.includes("goa")) {
      emoji = "✈️";
      category = "travel";
    } else if (lower.includes("education") || lower.includes("mba") || lower.includes("study") || lower.includes("college")) {
      emoji = "🎓";
      category = "education";
    } else if (lower.includes("emergency") || lower.includes("safety") || lower.includes("buffer")) {
      emoji = "🛡️";
      category = "emergency";
    } else if (lower.includes("home") || lower.includes("house") || lower.includes("flat") || lower.includes("downpayment")) {
      emoji = "🏠";
      category = "home";
    }

    const goalPayload = {
      id: editingGoal ? editingGoal.id : `goal_${Date.now()}`,
      name,
      emoji,
      category,
      targetAmount: Number(targetAmount),
      targetDate,
      currentSavings: Number(currentSavings) || 0,
      expectedReturn: Number(expectedReturn) || 12,
    };

    if (editingGoal && onUpdateGoal) {
      onUpdateGoal(goalPayload);
    } else {
      onAddGoal(goalPayload);
    }
  };

  return (
    <Card className="border-[#10B981]/50 p-6 space-y-4">
      <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
        {editingGoal ? (
          <><Edit3 className="w-5 h-5 text-[#10B981]" /> Edit Financial Milestone</>
        ) : (
          <><PlusCircle className="w-5 h-5 text-[#10B981]" /> Create New Financial Milestone</>
        )}
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="text-gray-300 font-medium">Goal Name</label>
          <input
            type="text"
            required
            placeholder="e.g. MBA Fund, Goa Trip, House Downpayment"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white"
          />
        </div>

        <div>
          <label className="text-gray-300 font-medium">Target Amount (₹)</label>
          <input
            type="number"
            min="1000"
            required
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full mt-1 p-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white"
          />
        </div>

        <div>
          <label className="text-gray-300 font-medium">Target Date (Min 6 months)</label>
          <input
            type="date"
            required
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full mt-1 p-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white"
          />
        </div>

        <div>
          <label className="text-gray-300 font-medium">Current Savings toward this goal (₹)</label>
          <input
            type="number"
            min="0"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            className="w-full mt-1 p-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white"
          />
        </div>

        <div>
          <label className="text-gray-300 font-medium">Expected Annual Return (%)</label>
          <input
            type="number"
            step="0.5"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            className="w-full mt-1 p-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white"
          />
        </div>

        <div className="flex items-end gap-2 pt-2">
          <Button type="submit" accentColor="#10B981" className="flex-1 py-2.5 text-[#0A0F2C]">
            {editingGoal ? "Update Goal" : "Save Goal"}
          </Button>
          {onCancel && (
            <Button onClick={onCancel} variant="outline" accentColor="#9CA3AF" className="py-2.5">
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}