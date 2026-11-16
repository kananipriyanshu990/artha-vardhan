import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import Disclaimer from "../../components/shared/Disclaimer";
import RiskQuiz from "./RiskQuiz";
import RecommendationResult from "./RecommendationResult";
import { QUESTIONS, SIMPLE_MODE_TEMPLATES } from "./recommenderData";
import {
  Bot,
  Sparkles,
  ArrowRight,
  Key,
  Shield,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

const PREFERRED_MODELS = [
  "models/gemini-2.5-flash",
  "models/gemini-2.0-flash",
  "models/gemini-1.5-flash",
  "models/gemini-1.5-flash-latest",
];

export default function AIRecommender() {
  const { setActiveZone } = useApp();
  const [mode, setMode] = useState("simple");

  // Gemini API key & resolved model state (strictly in-memory, cleared on mode switch and unmount)
  const [geminiKey, setGeminiKey] = useState("");
  const [activeModel, setActiveModel] = useState("models/gemini-2.5-flash");
  const [tempKeyInput, setTempKeyInput] = useState("");
  const [isKeyConfirmed, setIsKeyConfirmed] = useState(false);
  const [validatingKey, setValidatingKey] = useState(false);
  const [keyError, setKeyError] = useState(null);

  // Quiz state
  const [inQuiz, setInQuiz] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  // Results state
  const [resultProfile, setResultProfile] = useState(null);
  const [aiGeneratedText, setAiGeneratedText] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Cleanup sensitive key from memory on unmount or mode change
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
      setValidatingKey(false);
      setKeyError(null);
      setInQuiz(false);
      setQuestionIndex(0);
      setAnswers([]);
      setResultProfile(null);
      setAiGeneratedText("");
      setApiError(null);
      setMode(newMode);
    }
  };

  // Validate Gemini API key via /v1beta/models and auto-detect supported Flash model
  const handleConfirmKey = async (e) => {
    e.preventDefault();
    const cleanedKey = tempKeyInput.replace(/\s+/g, "");
    setKeyError(null);

    if (!cleanedKey) {
      setKeyError("Please enter your Gemini API key.");
      return;
    }

    setValidatingKey(true);
    try {
      const response = await fetch(
        `${GEMINI_BASE_URL}/models?key=${encodeURIComponent(cleanedKey)}`,
        { method: "GET" }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const msg =
          data?.error?.message ||
          `Google AI Studio rejected the key (HTTP ${response.status}).`;
        throw new Error(msg);
      }

      // Find all models enabled for this key that support generateContent
      const availableModels = (data.models || []).filter(
        (m) =>
          Array.isArray(m.supportedGenerationMethods) &&
          m.supportedGenerationMethods.includes("generateContent")
      );

      if (availableModels.length === 0) {
        throw new Error(
          "This API key is valid, but no text-generation Gemini models are enabled for its Google Cloud project."
        );
      }

      // Pick the best available Flash model, or fall back to any available Gemini model
      const matchedPreferred = PREFERRED_MODELS.find((pref) =>
        availableModels.some((m) => m.name === pref)
      );
      const fallbackGemini = availableModels.find((m) =>
        m.name.includes("gemini")
      );

      const chosenModel =
        matchedPreferred || fallbackGemini?.name || availableModels[0].name;

      setActiveModel(chosenModel);
      setGeminiKey(cleanedKey);
      setIsKeyConfirmed(true);
      setApiError(null);
    } catch (err) {
      setIsKeyConfirmed(false);
      setGeminiKey("");
      setKeyError(
        err.message ||
          "Network or verification error. Check your internet connection and API key."
      );
    } finally {
      setValidatingKey(false);
    }
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
      const maxScore = QUESTIONS.length * 4;
      setInQuiz(false);

      // Score brackets for 15 questions (range: 15 to 60)
      let bracketKey = "moderate";
      if (totalScore <= 26) bracketKey = "conservative";
      else if (totalScore <= 39) bracketKey = "moderate";
      else if (totalScore <= 50) bracketKey = "moderatelyAggressive";
      else bracketKey = "aggressive";

      const template = SIMPLE_MODE_TEMPLATES[bracketKey];
      const profilePayload = { score: totalScore, maxScore, ...template };
      setResultProfile(profilePayload);

      if (mode === "advanced" && geminiKey) {
        callGeminiAPI(
          totalScore,
          maxScore,
          template.category,
          nextAnswers,
          geminiKey,
          activeModel
        );
      }
    }
  };

  const callGeminiAPI = async (
    score,
    maxScore,
    category,
    quizAnswers,
    keyToUse,
    modelToUse
  ) => {
    setLoadingAI(true);
    setApiError(null);

    const systemPrompt = `You are a financial literacy assistant for Artha Vardhan, an educational investment app for young Indians.
Based on the user's 15-question risk assessment below, provide:
1. Their investor personality type (1 short paragraph, friendly tone)
2. Suitable mutual fund CATEGORIES (not specific fund names) — list 3–4 categories with one line explanation each
3. One key piece of advice tailored to their exact life stage, dependents, and EMI situation
4. One thing they should avoid given their risk profile

IMPORTANT RULES:
- Never recommend specific fund names or AMCs
- Never guarantee returns
- Always remind that this is educational only
- Use simple, friendly language suitable for a young Indian audience
- Keep total response under 300 words

User's risk profile score: ${score}/${maxScore}
Risk category: ${category}
User's answers: ${JSON.stringify(quizAnswers)}`;

    try {
      const normalizedModel = modelToUse.startsWith("models/")
        ? modelToUse
        : `models/${modelToUse}`;

      const response = await fetch(
        `${GEMINI_BASE_URL}/${normalizedModel}:generateContent?key=${encodeURIComponent(
          keyToUse
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
            `API Error: Status ${response.status} (${response.statusText})`
        );
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error("Received an empty response from Gemini API.");
      }
      setAiGeneratedText(String(text));
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
      {/* Zone Header + Dual Mode Toggle */}
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
        <div className="flex flex-col items-start md:items-end gap-1.5">
          <div
            role="group"
            aria-label="Recommender Mode Toggle"
            className="flex items-center bg-[#111827] p-1 rounded-xl border border-[#1E2A3A]"
          >
            <button
              type="button"
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
              type="button"
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
          <span className="text-[11px] text-gray-400">
            {mode === "simple"
              ? "100% Offline • No API key needed"
              : "Live Gemini AI • Requires Google AI Studio key"}
          </span>
        </div>
      </div>

      {/* Mandatory Amber SEBI Disclaimer */}
      {!resultProfile && <Disclaimer />}

      {/* Advanced Mode Key Verification Card */}
      {mode === "advanced" && !isKeyConfirmed && !resultProfile && !inQuiz && (
        <Card className="max-w-xl mx-auto p-6 sm:p-8 space-y-4 border-[#00D4FF]/40 bg-[#111827]">
          <div className="flex items-center gap-2 text-[#00D4FF]">
            <Key className="w-5 h-5" />
            <h3 className="font-heading font-bold text-base text-white">
              Verify Gemini API Key
            </h3>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Enter a valid Google AI Studio API key to unlock personalized AI
            analysis. Your key is verified directly with Google AI Studio, never
            stored in browser storage, and wiped automatically when you leave
            this tab.
          </p>

          <form onSubmit={handleConfirmKey} className="space-y-4 pt-2">
            <div>
              <label className="text-[11px] text-gray-400 block mb-1 font-medium">
                Google AI Studio API Key
              </label>
              <input
                type="password"
                required
                disabled={validatingKey}
                placeholder="Paste your Gemini API key..."
                value={tempKeyInput}
                onChange={(e) => {
                  setTempKeyInput(e.target.value);
                  if (keyError) setKeyError(null);
                }}
                className="w-full px-3.5 py-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D4FF] disabled:opacity-50"
              />
            </div>

            {keyError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 flex items-start gap-2 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="break-words">{keyError}</span>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 text-[11px] text-gray-400">
              <span>Zero persistence • Cleared on unmount</span>
              <Button
                type="submit"
                disabled={validatingKey}
                accentColor="#00D4FF"
                className="text-[#0A0F2C] font-bold py-2"
              >
                {validatingKey ? "Verifying Key..." : "Verify Key & Proceed"}
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
            {mode === "advanced" && isKeyConfirmed && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Key Verified (
                {activeModel.replace("models/", "")})
              </div>
            )}

            <div className="w-16 h-16 mx-auto rounded-full bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF]">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Find your investor personality.
              </h2>
              <p className="text-xs text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
                {mode === "simple"
                  ? `Answer ${QUESTIONS.length} quick questions for an instant, smart recommendation powered by our proven asset allocation engine (100% offline).`
                  : `Answer ${QUESTIONS.length} quick questions and Gemini AI will synthesize customized, real-time fund category guidance based on your profile.`}
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

      {/* 15-Question Quiz Interface */}
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
              resultProfile.maxScore,
              resultProfile.category,
              answers,
              geminiKey,
              activeModel
            )
          }
          onFallbackSimple={() => handleModeChange("simple")}
          onRetake={handleRetake}
          onGoToGoals={() => setActiveZone("goals")}
        />
      )}
    </div>
  );
}
