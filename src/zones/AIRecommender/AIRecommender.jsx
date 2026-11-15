import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import Disclaimer from "../../components/shared/Disclaimer";
import RiskQuiz from "./RiskQuiz";
import RecommendationResult from "./RecommendationResult";
import { QUESTIONS, SIMPLE_MODE_TEMPLATES } from "./recommenderData";
import { Bot, Sparkles, ArrowRight, Key, Shield } from "lucide-react";

export default function AIRecommender() {
  const { setActiveZone } = useApp();
  const [mode, setMode] = useState("simple");

  // Gemini API key state (strictly in-memory, cleared on mode switch and unmount)
  const [geminiKey, setGeminiKey] = useState("");
  const [tempKeyInput, setTempKeyInput] = useState("");
  const [isKeyConfirmed, setIsKeyConfirmed] = useState(false);

  // Quiz state
  const [inQuiz, setInQuiz] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  // Results state
  const [resultProfile, setResultProfile] = useState(null);
  const [aiGeneratedText, setAiGeneratedText] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Cleanup on unmount or mode tab change
  useEffect(() => {
    return () => {
      setGeminiKey("");
      setTempKeyInput("");
      setIsKeyConfirmed(false);
    };
  }, [mode]);

  const handleModeChange = (newMode) => {
    if (newMode !== mode) {
      setGeminiKey("");
      setTempKeyInput("");
      setIsKeyConfirmed(false);
      setInQuiz(false);
      setQuestionIndex(0);
      setAnswers([]);
      setResultProfile(null);
      setAiGeneratedText("");
      setApiError(null);
      setMode(newMode);
    }
  };

  const handleConfirmKey = (e) => {
    e.preventDefault();
    if (!tempKeyInput.trim()) return;
    setGeminiKey(tempKeyInput.trim());
    setIsKeyConfirmed(true);
    setApiError(null);
  };

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
      setInQuiz(false);

      let bracketKey = "moderate";
      if (totalScore <= 18) bracketKey = "conservative";
      else if (totalScore <= 27) bracketKey = "moderate";
      else if (totalScore <= 34) bracketKey = "moderatelyAggressive";
      else bracketKey = "aggressive";

      const template = SIMPLE_MODE_TEMPLATES[bracketKey];
      setResultProfile({ score: totalScore, ...template });

      if (mode === "advanced") {
        callGeminiAPI(totalScore, template.category, nextAnswers, geminiKey);
      }
    }
  };

  const callGeminiAPI = async (score, category, quizAnswers, keyToUse) => {
    setLoadingAI(true);
    setApiError(null);

    const systemPrompt = `You are a financial literacy assistant for Artha Vardhan, an educational investment app for young Indians.
Based on the user's quiz answers below, provide:
1. Their investor personality type (1 short paragraph, friendly tone)
2. Suitable mutual fund CATEGORIES (not specific fund names) — list 3–4 categories with one line explanation each
3. One key piece of advice for someone at their life stage
4. One thing they should avoid given their risk profile

IMPORTANT RULES:
- Never recommend specific fund names or AMCs
- Never guarantee returns
- Always remind that this is educational only
- Use simple, friendly language suitable for a young Indian audience
- Keep total response under 300 words

User's risk profile score: ${score}/40
Risk category: ${category}
User's answers: ${JSON.stringify(quizAnswers)}`;

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(
        keyToUse
      )}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: systemPrompt }],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(
          errorJson?.error?.message ||
            `API Error: Status ${response.status} (${response.statusText})`
        );
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error("Received empty response from Gemini API candidates.");
      }
      setAiGeneratedText(text);
    } catch (err) {
      console.error("Gemini API execution error:", err);
      setApiError(
        err.message || "Something went wrong connecting to the Gemini API."
      );
    } finally {
      setLoadingAI(false);
    }
  };

  const handleRetake = () => {
    setInQuiz(false);
    setQuestionIndex(0);
    setAnswers([]);
    setResultProfile(null);
    setAiGeneratedText("");
    setApiError(null);
  };

  return (
    <div className="max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Zone Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#1E2A3A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00D4FF] mb-1">
            <Bot className="w-4 h-4" /> Zone 8: AI Risk Profiler &amp; Recommender
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-[#F0EDE4]">
            Risk Profiler &amp; Asset Advisor
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Assess your risk tolerance and receive personalized, educational
            mutual fund category recommendations.
          </p>
        </div>

        {/* Visual Dual Mode Toggle */}
        <div className="flex items-center bg-[#111827] p-1 rounded-xl border border-[#1E2A3A]">
          <button
            onClick={() => handleModeChange("simple")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === "simple"
                ? "bg-[#00D4FF] text-[#0A0F2C] shadow-lg shadow-[#00D4FF]/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Simple Mode
          </button>
          <button
            onClick={() => handleModeChange("advanced")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === "advanced"
                ? "bg-[#00D4FF] text-[#0A0F2C] shadow-lg shadow-[#00D4FF]/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Advanced Mode
          </button>
        </div>
      </div>

      {/* Mandatory Amber SEBI Disclaimer */}
      {!resultProfile && <Disclaimer />}

      {/* Advanced Mode Key Input Card */}
      {mode === "advanced" && !isKeyConfirmed && !resultProfile && !inQuiz && (
        <Card className="max-w-xl mx-auto p-6 sm:p-8 space-y-4 border-[#00D4FF]/40 bg-[#111827]">
          <div className="flex items-center gap-2 text-[#00D4FF]">
            <Key className="w-5 h-5" />
            <h3 className="font-heading font-bold text-base text-white">
              Gemini API Key Required
            </h3>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Enter your Gemini API key to get a personalised AI-generated
            recommendation. Your key is never stored and is cleared the moment
            you leave this tab.
          </p>
          <form onSubmit={handleConfirmKey} className="space-y-4 pt-2">
            <div>
              <label className="text-[11px] text-gray-400 block mb-1 font-medium">
                Google AI Studio API Key
              </label>
              <input
                type="password"
                required
                placeholder="AIzaSy..."
                value={tempKeyInput}
                onChange={(e) => setTempKeyInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D4FF]"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <span>Zero persistence • Cleared immediately on unmount</span>
              <Button
                type="submit"
                accentColor="#00D4FF"
                className="text-[#0A0F2C] font-bold py-2"
              >
                Confirm Key &amp; Proceed
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Start Quiz Card */}
      {!inQuiz &&
        !resultProfile &&
        (mode === "simple" || (mode === "advanced" && isKeyConfirmed)) && (
          <Card className="max-w-2xl mx-auto p-8 space-y-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF]">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Find your investor personality.
              </h2>
              <p className="text-xs text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
                {mode === "simple"
                  ? "Answer 10 quick questions for an instant, smart recommendation powered by our proven asset allocation engine (100% offline)."
                  : "Answer 10 quick questions and your personal Gemini AI model will synthesize customized, real-time fund category guidance."}
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

      {/* 10-Question Quiz Interface */}
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
          mode={mode}
          resultProfile={resultProfile}
          loadingAI={loadingAI}
          apiError={apiError}
          aiGeneratedText={aiGeneratedText}
          onRetryAPI={() =>
            callGeminiAPI(
              resultProfile.score,
              resultProfile.category,
              answers,
              geminiKey
            )
          }
          onFallbackSimple={() => setMode("simple")}
          onRetake={handleRetake}
          onGoToGoals={() => setActiveZone("goals")}
        />
      )}
    </div>
  );
}