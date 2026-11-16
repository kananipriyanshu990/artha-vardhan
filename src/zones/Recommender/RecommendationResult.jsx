import React from "react";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import Disclaimer from "../../components/shared/Disclaimer";
import {
  Shield,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function RecommendationResult({
  mode = "simple",
  resultProfile,
  loadingAI = false,
  apiError = null,
  aiGeneratedText = "",
  onRetryAPI,
  onFallbackSimple,
  onRetake,
  onGoToGoals,
}) {
  if (!resultProfile) return null;

  const {
    score = 0,
    maxScore = 60,
    category = "Moderate Investor",
    personality = "",
    categories = [],
    lifeStageAdvice = "",
    avoid = "",
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
      <Card className="p-6 sm:p-8 text-center space-y-4 border-[#1E2A3A]">
        <div className="flex justify-center">
          {mode === "simple" ? (
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/30 inline-flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Smart Recommendation
            </span>
          ) : (
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5C518]/15 text-[#F5C518] border border-[#F5C518]/30 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F5C518]" /> AI-Powered
              Recommendation
            </span>
          )}
        </div>

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

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0F2C] border border-[#1E2A3A] text-xs">
          <span className="text-gray-400">Risk Metric Score:</span>
          <span className="font-bold text-[#F5C518]">
            {score} / {maxScore}
          </span>
        </div>
      </Card>

      {/* AI Mode Section (Live Gemini Response) */}
      {mode === "advanced" && (
        <Card className="p-6 sm:p-8 space-y-5 border-[#00D4FF]/40 bg-[#111827]">
          <div className="flex items-center gap-2 border-b border-[#1E2A3A] pb-3 text-[#00D4FF]">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-heading font-bold text-base text-white">
              Gemini AI Personalized Synthesis
            </h3>
          </div>

          {loadingAI && (
            <div className="py-10 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-[#00D4FF] animate-pulse">
                Analyzing your 15 answers with Gemini AI...
              </p>
            </div>
          )}

          {apiError && !loadingAI && (
            <div className="p-5 bg-red-500/10 border border-red-500/40 rounded-xl space-y-4 text-center">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-red-400">
                  Gemini API Request Failed
                </p>
                <p className="text-xs text-red-300 max-w-md mx-auto">
                  {apiError}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 pt-1">
                {onRetryAPI && (
                  <Button
                    onClick={onRetryAPI}
                    accentColor="#00D4FF"
                    className="text-xs py-2 text-[#0A0F2C] font-bold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retry API Call
                  </Button>
                )}
                {onFallbackSimple && (
                  <Button
                    onClick={onFallbackSimple}
                    variant="outline"
                    accentColor="#F5C518"
                    className="text-xs py-2"
                  >
                    Switch to Simple Mode
                  </Button>
                )}
              </div>
            </div>
          )}

          {!loadingAI && !apiError && aiGeneratedText && (
            <div className="text-xs sm:text-sm text-[#F0EDE4]/90 leading-relaxed whitespace-pre-line bg-[#0A0F2C] p-5 rounded-xl border border-[#1E2A3A]">
              {aiGeneratedText}
            </div>
          )}
        </Card>
      )}

      {/* Simple Mode Section (Offline Structured Breakdown) */}
      {mode === "simple" && (
        <div className="space-y-4">
          <Card className="p-6 space-y-2 border-[#1E2A3A]">
            <h3 className="font-heading font-bold text-sm text-[#00D4FF]">
              1. Investor Personality
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {personality}
            </p>
          </Card>

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
        </div>
      )}

      {/* Mandatory Disclaimer */}
      <Disclaimer />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
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