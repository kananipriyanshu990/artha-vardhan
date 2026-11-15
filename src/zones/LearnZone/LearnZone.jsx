import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import ModuleList from "./ModuleList";
import ModuleDetail from "./ModuleDetail";
import MythBusters from "./MythBusters";
import JargonDictionary from "./JargonDictionary";
import Quiz from "./Quiz";
import { MODULES_DATA } from "../../constants/content";
import { BookOpen, Award, CheckCircle } from "lucide-react";

export default function LearnZone() {
  const { modulesRead, markModuleAsRead, quizScores, recordQuizScore, badges } = useApp();
  const [activeTab, setActiveTab] = useState("modules"); // 'modules' | 'myths' | 'jargon'
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [isQuizMode, setIsQuizMode] = useState(false);

  // Overall Quiz Progress
  const totalQuizzes = MODULES_DATA.length;
  const completedQuizCount = Object.keys(quizScores).length;

  return (
    <div className="max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Zone Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2A3A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00D4FF] mb-1">
            <BookOpen className="w-4 h-4" /> Zone 2: Financial Literacy Hub
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-[#F0EDE4]">
            Learn Zone
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Build your investment fundamentals. Zero jargon without plain-language explanations.
          </p>
        </div>

        {/* Global Quiz Progress Tracker */}
        <div className="flex items-center gap-4 bg-[#111827] px-4 py-2.5 rounded-xl border border-[#1E2A3A] text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span>Modules: {modulesRead.length}/{MODULES_DATA.length}</span>
          </div>
          <div className="h-4 w-px bg-gray-700" />
          <div className="flex items-center gap-1.5 text-[#F5C518]">
            <Award className="w-4 h-4" />
            <span>Quizzes: {completedQuizCount}/{totalQuizzes}</span>
          </div>
          {badges.length > 0 && (
            <>
              <div className="h-4 w-px bg-gray-700" />
              <span className="text-[#00D4FF] font-bold">Badges: {badges.length}</span>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      {!selectedModuleId && (
        <div className="flex items-center gap-2 border-b border-[#1E2A3A] pb-3">
          <button
            onClick={() => setActiveTab("modules")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "modules"
                ? "bg-[#00D4FF] text-[#0A0F2C]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Learning Modules
          </button>
          <button
            onClick={() => setActiveTab("myths")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "myths"
                ? "bg-[#00D4FF] text-[#0A0F2C]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Myth Busters
          </button>
          <button
            onClick={() => setActiveTab("jargon")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "jargon"
                ? "bg-[#00D4FF] text-[#0A0F2C]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Jargon Dictionary
          </button>
        </div>
      )}

      {/* Views */}
      {selectedModuleId ? (
        isQuizMode ? (
          <Quiz
            moduleId={selectedModuleId}
            onBack={() => setIsQuizMode(false)}
            onComplete={(score) => {
              recordQuizScore(selectedModuleId, score, selectedModuleId);
            }}
          />
        ) : (
          <ModuleDetail
            moduleId={selectedModuleId}
            onBack={() => setSelectedModuleId(null)}
            isCompleted={modulesRead.includes(selectedModuleId)}
            onCompleteAndQuiz={() => {
              markModuleAsRead(selectedModuleId);
              setIsQuizMode(true);
            }}
          />
        )
      ) : (
        <>
          {activeTab === "modules" && (
            <ModuleList
              completedModules={modulesRead}
              onSelectModule={(id) => {
                setSelectedModuleId(id);
                setIsQuizMode(false);
              }}
            />
          )}
          {activeTab === "myths" && <MythBusters />}
          {activeTab === "jargon" && <JargonDictionary />}
        </>
      )}
    </div>
  );
}