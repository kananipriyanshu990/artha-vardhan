import React, { useState } from "react";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import ProgressBar from "../../components/shared/ProgressBar";
import { MODULE_QUIZZES } from "../../constants/quizData";
import { MODULES_DATA } from "../../constants/content";
import { Check, X, Award, RotateCcw, ArrowRight } from "lucide-react";

export default function Quiz({ moduleId, onBack, onComplete }) {
  const questions = MODULE_QUIZZES[moduleId] || [];
  const moduleInfo = MODULES_DATA.find((m) => m.id === moduleId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelect = (idx) => {
    if (selectedOption !== null) return; // Prevent re-selection
    setSelectedOption(idx);
    if (idx === currentQ.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      onComplete(score + (selectedOption === currentQ.correct ? 1 : 0));
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  if (!questions.length) {
    return <div className="text-center py-10">No quiz questions available for this module.</div>;
  }

  if (isFinished) {
    const finalScore = score;
    const isPerfect = finalScore === 5;

    return (
      <Card className="max-w-xl mx-auto p-8 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF]">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Quiz Completed!</h2>
          <p className="text-sm text-gray-400 mt-1">Module: {moduleInfo?.title}</p>
        </div>

        <div className="py-4">
          <span className="text-5xl font-extrabold text-[#F5C518]">{finalScore}</span>
          <span className="text-2xl text-gray-400"> / 5</span>
          <p className="text-sm text-gray-300 mt-2 font-medium">
            {finalScore === 5
              ? "Flawless score! You have truly mastered this module."
              : finalScore >= 3
              ? "Great effort! A solid foundation of key concepts."
              : "Review the module content and give it another shot!"}
          </p>
        </div>

        {isPerfect && (
          <div className="p-3 bg-[#F5C518]/15 border border-[#F5C518] rounded-xl text-xs text-[#F5C518] font-semibold">
            🏆 Badge Unlocked: &ldquo;Artha Expert — {moduleInfo?.title}&rdquo;
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={handleRestart} variant="outline" accentColor="#00D4FF">
            <RotateCcw className="w-4 h-4" /> Retry Quiz
          </Button>
          <Button onClick={onBack} accentColor="#00D4FF" className="text-[#0A0F2C]">
            Return to Learn Zone
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto p-6 sm:p-8 space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <ProgressBar current={currentIndex + 1} total={questions.length} color="#00D4FF" />
      </div>

      <div className="pt-2">
        <h3 className="font-heading text-lg font-bold text-white leading-snug">
          {currentQ.q}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentQ.options.map((opt, idx) => {
          let btnClass = "border-[#1E2A3A] bg-[#0A0F2C]/60 text-gray-200 hover:border-[#00D4FF]";
          if (selectedOption !== null) {
            if (idx === currentQ.correct) {
              btnClass = "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-semibold";
            } else if (idx === selectedOption) {
              btnClass = "border-red-500 bg-red-500/20 text-red-300";
            } else {
              btnClass = "border-[#1E2A3A] opacity-40 text-gray-500";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selectedOption !== null}
              className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-center justify-between ${btnClass}`}
            >
              <span>{opt}</span>
              {selectedOption !== null && idx === currentQ.correct && (
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              )}
              {selectedOption === idx && idx !== currentQ.correct && (
                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Instant Feedback Explanation */}
      {selectedOption !== null && (
        <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1E2A3A] text-xs text-gray-300 space-y-1 animate-fadeIn">
          <span className="font-bold text-[#00D4FF]">Explanation: </span>
          {currentQ.explanation}
        </div>
      )}

      {selectedOption !== null && (
        <div className="flex justify-end pt-2">
          <Button onClick={handleNext} accentColor="#00D4FF" className="text-[#0A0F2C] font-bold">
            {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next Question"}{" "}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </Card>
  );
}