import React from "react";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import Disclaimer from "../../components/shared/Disclaimer";
import { Shield, TrendingUp, AlertTriangle, RotateCcw, ArrowRight, Sparkles } from "lucide-react";

export default function RecommendationResult({
  resultData,
  aiResponse,
  loading,
  error,
  onRetry,
  onRetake,
  onGoToGoals,
}) {
  const { score, category } = resultData;

  const getBadgeMeta = () => {
    switch (category) {
      case "Aggressive Investor":
        return { color: "#EF4444", icon: TrendingUp, text: "Aggressive Growth" };
      case "Moderately Aggressive Investor":
        return { color: "#F5C518", icon: TrendingUp, text: "High Growth" };
      case "Moderate Investor":
        return { color: "#00D4FF", icon: Sparkles, text: "Balanced Core" };
      case "Conservative Investor":
      default:
        return { color: "#10B981", icon: Shield, text: "Capital Defense" };
    }
  };

  const badgeMeta = getBadgeMeta();
  const IconComponent = badgeMeta.icon;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
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
          <span className="text-sm font-bold text-[#F5C518]">{score} / 40</span>
        </div>
      </Card>

      {/* AI Response Card or Loading/Error State */}
      <Card className="p-6 sm:p-8 space-y-6 border-[#00D4FF]/30">
        <div className="flex items-center gap-2 border-b border-[#1E2A3A] pb-4">
          <Sparkles className="w-5 h-5 text-[#00D4FF]" />
          <h3 className="font-heading font-bold text-lg text-white">
            Gemini AI Personalized Synthesis
          </h3>
        </div>

        {loading && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-[#00D4FF] animate-pulse">
              Our AI is thinking...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl space-y-4 text-center">
            <p className="text-sm text-red-300 font-medium">{error}</p>
            <Button
              onClick={onRetry}
              accentColor="#00D4FF"
              className="mx-auto text-[#0A0F2C] font-bold"
            >
              <RotateCcw className="w-4 h-4" /> Retry AI Synthesis
            </Button>
          </div>
        )}

        {!loading && !error && aiResponse && (
          <div className="space-y-6 text-sm text-[#F0EDE4]/90 leading-relaxed">
            {aiResponse.split("\n\n").map((paragraph, idx) => (
              <div
                key={idx}
                className="bg-[#0A0F2C]/60 p-4 rounded-xl border border-[#1E2A3A]"
              >
                <p className="whitespace-pre-line">{paragraph}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

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