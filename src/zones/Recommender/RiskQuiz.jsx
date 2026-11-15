import React from "react";
import Card from "../../components/shared/Card";
import ProgressBar from "../../components/shared/ProgressBar";
import { ArrowRight } from "lucide-react";

export default function RiskQuiz({
  currentQuestion,
  questionIndex,
  totalQuestions,
  onSelectAnswer,
}) {
  if (!currentQuestion) return null;

  const progressPercent = Math.round(
    ((questionIndex + 1) / totalQuestions) * 100
  );

  return (
    <Card className="max-w-2xl mx-auto p-6 sm:p-8 space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <span>{progressPercent}%</span>
        </div>
        <ProgressBar
          current={questionIndex + 1}
          total={totalQuestions}
          color="#00D4FF"
        />
      </div>

      <h3 className="font-heading text-lg font-bold text-white leading-snug pt-2">
        {currentQuestion.q}
      </h3>

      <div className="space-y-3">
        {currentQuestion.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onSelectAnswer(idx)}
            className="w-full text-left p-4 rounded-xl border border-[#1E2A3A] bg-[#0A0F2C]/70 text-sm text-gray-200 hover:border-[#00D4FF] hover:bg-[#00D4FF]/5 transition-all flex items-center justify-between group"
          >
            <span>{opt}</span>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#00D4FF] group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </Card>
  );
}