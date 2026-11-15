import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import GoalCard from "./GoalCard";
import GoalForm from "./GoalForm";
import Button from "../../components/shared/Button";
import { Target, Plus } from "lucide-react";

export default function GoalPlanner() {
  const { goals, setGoals } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const handleAddGoal = (newGoal) => {
    if (goals.length >= 10) {
      alert("You have reached the maximum limit of 10 goals.");
      return;
    }
    setGoals([...goals, newGoal]);
    setShowAddForm(false);
  };

  const handleUpdateGoal = (updatedGoal) => {
    setGoals(goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)));
    setEditingGoal(null);
    setShowAddForm(false);
  };

  const handleEditClick = (goal) => {
    setEditingGoal(goal);
    setShowAddForm(true);
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter((g) => g.id !== goalId));
    if (editingGoal && editingGoal.id === goalId) {
      setEditingGoal(null);
      setShowAddForm(false);
    }
  };

  const handleCancelForm = () => {
    setEditingGoal(null);
    setShowAddForm(false);
  };

  const totalTargetAmount = goals.reduce((acc, g) => acc + g.targetAmount, 0);

  const combinedSip = goals.reduce((acc, g) => {
    const today = new Date();
    const target = new Date(g.targetDate);
    const diffMonths = Math.max(
      1,
      (target.getFullYear() - today.getFullYear()) * 12 + (target.getMonth() - today.getMonth())
    );
    const r = (g.expectedReturn || 12) / 100 / 12;
    const n = diffMonths;
    const num = (g.targetAmount - (g.currentSavings || 0) * Math.pow(1 + r, n)) * r;
    const den = Math.pow(1 + r, n) - 1;
    const sip = den > 0 ? Math.max(0, Math.round(num / den)) : 0;
    return acc + sip;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1E2A3A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#10B981] mb-1">
            <Target className="w-4 h-4" /> Zone 4: Reverse Goal Planner
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-[#F0EDE4]">
            Goal Planner
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Calculate the exact monthly SIP required to reach every milestone in life.
          </p>
        </div>

        {!showAddForm && goals.length < 10 && (
          <Button
            onClick={() => {
              setEditingGoal(null);
              setShowAddForm(true);
            }}
            accentColor="#10B981"
            className="text-[#0A0F2C] font-bold"
          >
            <Plus className="w-4 h-4" /> Add Goal ({goals.length}/10)
          </Button>
        )}
      </div>

      {/* Summary Banner */}
      {goals.length > 0 && (
        <div className="p-5 rounded-2xl bg-[#111827] border border-[#10B981]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">Total Planning Commitment</p>
            <h3 className="font-heading text-xl font-bold text-white mt-0.5">
              You are planning for <span className="text-[#10B981]">{goals.length}</span> goals totalling{" "}
              <span className="text-[#10B981]">₹{totalTargetAmount.toLocaleString("en-IN")}</span>.
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400">Combined Monthly SIP:</span>
            <div className="text-2xl font-extrabold text-[#10B981]">
              ₹{combinedSip.toLocaleString("en-IN")}/mo
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <GoalForm
          onAddGoal={handleAddGoal}
          onUpdateGoal={handleUpdateGoal}
          editingGoal={editingGoal}
          onCancel={handleCancelForm}
        />
      )}

      {/* Goals Grid or Empty State */}
      {goals.length === 0 && !showAddForm ? (
        <div className="text-center py-16 bg-[#111827] border border-[#1E2A3A] rounded-2xl space-y-4">
          <Target className="w-12 h-12 mx-auto text-gray-600" />
          <h3 className="font-heading text-lg font-bold text-gray-300">
            No goals yet. What are you saving for?
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Add a trip, an education fund, or an emergency reserve to let Artha Vardhan calculate your path.
          </p>
          <Button
            onClick={() => {
              setEditingGoal(null);
              setShowAddForm(true);
            }}
            accentColor="#10B981"
            className="text-[#0A0F2C] font-bold mx-auto"
          >
            Create Your First Goal
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDelete={handleDeleteGoal}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}