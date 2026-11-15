import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import Disclaimer from "../../components/shared/Disclaimer";
import RiskQuiz from "./RiskQuiz";
import RecommendationResult from "./RecommendationResult";
import { QUESTIONS, SIMPLE_MODE_TEMPLATES } from "./recommenderData";
import { Bot, ArrowRight } from "lucide-react";

export default function AIRecommender() {
  const { setActiveZone } = useApp();

  // Quiz state
  const [inQuiz, setInQuiz] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  // Results state
  const [resultProfile, setResultProfile] = useState(null);

  const handleAnswerSelect = (optIndex) => {
    const points = optIndex + 1;
    const nextAnswers = [
      ...answers,
      {
        question: QUESTIONS[questionIndex].q,
        answer: QUESTIONS[questionIndex].options[optIndex],
        points,
      },
    ];
    setAnswers(nextAnswers);

    if (questionIndex + 1 < QUESTIONS.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const totalScore = nextAnswers.reduce((sum, item) => sum + item.points, 0);
      const maxScore = QUESTIONS.length * 4;
      setInQuiz(false);

      // Score brackets for 15 questions (range: 15 to 60)
      let bracketKey = "moderate";
      if (totalScore <= 26) bracketKey = "conservative";
      else if (totalScore <= 39) bracketKey = "moderate";
      else if (totalScore <= 50) bracketKey = "moderatelyAggressive";
      else bracketKey = "aggressive";

      const template = SIMPLE_MODE_TEMPLATES[bracketKey];
      setResultProfile({ score: totalScore, maxScore, ...template });
    }
  };

  const handleRetake = () => {
    setInQuiz(false);
    setQuestionIndex(0);
    setAnswers([]);
    setResultProfile(null);
  };

  return (
    <div className="max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Zone Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#1E2A3A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00D4FF] mb-1">
            <Bot className="w-4 h-4" /> Zone 8: Risk Profiler &amp; Recommender
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-[#F0EDE4]">
            Risk Profiler &amp; Asset Advisor
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Assess your risk tolerance and receive personalized, educational
            mutual fund category recommendations.
          </p>
        </div>
      </div>

      {/* Mandatory Amber SEBI Disclaimer */}
      {!resultProfile && <Disclaimer />}

      {/* Start Quiz Card */}
      {!inQuiz && !resultProfile && (
        <Card className="max-w-2xl mx-auto p-8 space-y-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF]">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-white">
              Find your investor personality.
            </h2>
            <p className="text-xs text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
              Answer {QUESTIONS.length} quick questions for an instant, smart
              recommendation powered by our proven asset allocation engine (100%
              offline).
            </p>
          </div>
          <Button
            onClick={() => setInQuiz(true)}
            accentColor="#00D4FF"
            className="w-full sm:w-auto px-8 py-3 text-[#0A0F2C] font-bold mx-auto"
          >
            Start Risk Assessment <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Card>
      )}

      {/* Quiz Interface */}
      {inQuiz && (
        <RiskQuiz
          currentQuestion={QUESTIONS[questionIndex]}
          questionIndex={questionIndex}
          totalQuestions={QUESTIONS.length}
          onSelectAnswer={handleAnswerSelect}
        />
      )}

      {/* Recommendation Results */}
      {!inQuiz && resultProfile && (
        <RecommendationResult
          resultProfile={resultProfile}
          onRetake={handleRetake}
          onGoToGoals={() => setActiveZone("goals")}
        />
      )}
    </div>
  );
}