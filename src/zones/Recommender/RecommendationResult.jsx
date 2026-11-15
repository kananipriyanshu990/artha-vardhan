import React from "react";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import Disclaimer from "../../components/shared/Disclaimer";
import {
  Shield,
  TrendingUp,
  RotateCcw,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function RecommendationResult({
  resultProfile,
  onRetake,
  onGoToGoals,
}) {
  const {
    score,
    maxScore,
    category,
    personality,
    categories,
    lifeStageAdvice,
    avoid,
  } = resultProfile;

  const getBadgeMeta = () => {
    switch (category) {
      case "Aggressive Investor":
        return { color: "#EF4444", icon: TrendingUp };
      case "Moderately Aggressive Investor":
        return { color: "#F5C518", icon: TrendingUp };
      case "Moderate Investor":
        return { color: "#00D4FF", icon: Sparkles };
      case "Conservative Investor":
      default:
        return { color: "#10B981", icon: Shield };
    }
  };

  const badgeMeta = getBadgeMeta();
  const IconComponent = badgeMeta.icon;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Result Header Badge */}
      <Card className="p-8 text-center space-y-4 border-[#1E2A3A]">
        <div
          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center border"
          style={{
            backgroundColor: `${badgeMeta.color}15`,
            borderColor: badgeMeta.color,
            color: badgeMeta.color,
          }}
        >
          <IconComponent className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-gray-400">
            Assessed Investor Archetype
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-white mt-1">
            {category}
          </h2>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0F2C] border border-[#1E2A3A]">
          <span className="text-xs text-gray-400">Risk Metric Score:</span>
          <span className="text-sm font-bold text-[#F5C518]">
            {score} / {maxScore}
          </span>
        </div>
      </Card>

      {/* Investor Personality */}
      <Card className="p-6 space-y-2 border-[#1E2A3A]">
        <h3 className="font-heading font-bold text-sm text-[#00D4FF]">
          1. Investor Personality
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          {personality}
        </p>
      </Card>

      {/* Suitable Fund Categories */}
      <Card className="p-6 space-y-3 border-[#1E2A3A]">
        <h3 className="font-heading font-bold text-sm text-[#00D4FF]">
          2. Suitable Fund Categories (Educational Only)
        </h3>
        <div className="space-y-2">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="p-3 bg-[#0A0F2C] rounded-xl border border-[#1E2A3A] text-xs"
            >
              <div className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{cat.name}</span>
              </div>
              <p className="text-gray-400 mt-1 pl-5">{cat.explanation}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Life Stage Advice & What to Avoid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5 space-y-1.5 border-[#10B981]/30 bg-[#111827]">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-emerald-400">
            3. Key Life Stage Advice
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            {lifeStageAdvice}
          </p>
        </Card>
        <Card className="p-5 space-y-1.5 border-red-500/30 bg-[#111827]">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-red-400">
            4. What to Avoid
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">{avoid}</p>
        </Card>
      </div>

      {/* Mandatory Disclaimer */}
      <Disclaimer />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <Button onClick={onRetake} variant="outline" accentColor="#9CA3AF">
          <RotateCcw className="w-4 h-4" /> Retake Quiz
        </Button>
        <Button
          onClick={onGoToGoals}
          accentColor="#10B981"
          className="w-full sm:w-auto text-[#0A0F2C] font-bold"
        >
          Go to Goal Planner <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}