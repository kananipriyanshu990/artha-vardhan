import React, { useState } from "react";
import Card from "../../components/shared/Card";
import { MYTH_BUSTERS } from "../../constants/content";
import { AlertCircle, CheckCircle2, RotateCw } from "lucide-react";

export default function MythBusters() {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 className="font-heading text-xl font-bold text-[#F0EDE4]">
            Myth Busters <span className="text-[#00D4FF]">({MYTH_BUSTERS.length})</span>
          </h2>
          <p className="text-xs text-[#9CA3AF]">
            Click on any card to flip it and reveal the real financial fact.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MYTH_BUSTERS.map((item) => {
          const isFlipped = !!flipped[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleFlip(item.id)}
              className="cursor-pointer perspective-1000 w-full min-h-[250px]"
            >
              <div
                className={`relative w-full h-full min-h-[250px] duration-500 transform-style-preserve-3d transition-transform grid grid-cols-1 grid-rows-1 ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front (Myth) */}
                <div className="col-start-1 row-start-1 backface-hidden w-full h-full flex">
                  <Card className="w-full flex flex-col justify-between border-red-500/30 bg-[#111827] hover:border-red-400 transition-all p-5 min-h-[250px]">
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-red-400 mb-3">
                        <span className="flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> MYTH #{item.id}
                        </span>
                        <RotateCw className="w-3.5 h-3.5 opacity-60" />
                      </div>
                      <p className="font-heading font-medium text-sm sm:text-base text-[#F0EDE4] leading-snug">
                        &ldquo;{item.myth}&rdquo;
                      </p>
                    </div>
                    <div className="text-[11px] text-gray-400 italic mt-4">
                      Tap to reveal truth ➔
                    </div>
                  </Card>
                </div>

                {/* Back (Truth) */}
                <div className="col-start-1 row-start-1 backface-hidden rotate-y-180 w-full h-full flex">
                  <Card className="w-full flex flex-col justify-between border-emerald-500/40 bg-[#0A0F2C] p-5 min-h-[250px]">
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-2">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> THE TRUTH
                        </span>
                        <RotateCw className="w-3.5 h-3.5 opacity-60" />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                        {item.truth}
                      </p>
                    </div>
                    <div className="text-[11px] text-emerald-400/80 font-medium mt-4">
                      Fact-checked by Artha Vardhan
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}