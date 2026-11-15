import React from "react";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import { MODULES_DATA } from "../../constants/content";
import { ArrowLeft, CheckCircle, Award } from "lucide-react";

export default function ModuleDetail({
  moduleId,
  onBack,
  onCompleteAndQuiz,
  isCompleted
}) {
  const mod = MODULES_DATA.find((m) => m.id === moduleId);

  if (!mod) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-[#00D4FF] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Modules
      </button>

      <Card className="space-y-8 p-6 sm:p-10">
        <div className="border-b border-[#1E2A3A] pb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#00D4FF] mb-2">
            Module Guide • {mod.readTime} Read
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#F0EDE4]">
            {mod.title}
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-2">{mod.summary}</p>
        </div>

        {/* Full Written Content */}
        <div className="space-y-6">
          {mod.content.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="font-heading text-lg font-semibold text-[#F5C518]">
                {sec.heading}
              </h2>
              <p className="text-[#F0EDE4]/90 text-sm sm:text-base leading-relaxed bg-[#0A0F2C]/40 p-4 rounded-xl border border-[#1E2A3A]">
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-[#1E2A3A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <CheckCircle className={`w-4 h-4 ${isCompleted ? "text-emerald-400" : "text-gray-500"}`} />
            {isCompleted ? "You have finished reading this module!" : "Read through thoroughly to unlock the quiz."}
          </div>

          <Button
            onClick={onCompleteAndQuiz}
            accentColor="#00D4FF"
            className="w-full sm:w-auto text-[#0A0F2C] font-bold"
          >
            <Award className="w-4 h-4" /> Take Knowledge Quiz
          </Button>
        </div>
      </Card>
    </div>
  );
}