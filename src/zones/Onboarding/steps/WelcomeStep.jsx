import React from "react";
import Button from "../../../components/shared/Button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function WelcomeStep({ onNext, onSkip }) {
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center p-6 overflow-hidden">
      {/* Subtle pulse gold gradient background */}
      <div className="absolute w-96 h-96 bg-[#F5C518]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 max-w-2xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5C518]/15 border border-[#F5C518]/40 text-[#F5C518] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Welcome to Artha Vardhan
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#F0EDE4] leading-tight">
          You earned it. <br />
          <span className="text-[#F5C518]">Now make it work for you.</span>
        </h1>

        <p className="text-base sm:text-lg text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
          Artha Vardhan will teach you how to invest, plan your goals, and watch your money grow — in plain language.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={onNext}
            accentColor="#F5C518"
            className="w-full sm:w-auto px-8 py-3 text-base text-[#0A0F2C]"
          >
            Let&apos;s Begin <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <button
            onClick={onSkip}
            className="text-sm text-[#9CA3AF] hover:text-white transition-colors py-2"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}