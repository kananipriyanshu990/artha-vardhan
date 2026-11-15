import React from "react";
import Card from "../../components/shared/Card";
import { MODULES_DATA } from "../../constants/content";
import { Clock, CheckCircle2, ChevronRight } from "lucide-react";

export default function ModuleList({ onSelectModule, completedModules }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {MODULES_DATA.map((mod) => {
        const isDone = completedModules.includes(mod.id);
        return (
          <div
            key={mod.id}
            onClick={() => onSelectModule(mod.id)}
            className="cursor-pointer group"
          >
            <Card className="h-full flex flex-col justify-between hover:border-[#00D4FF] transition-all duration-200 group-hover:-translate-y-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-[#00D4FF] font-medium bg-[#00D4FF]/10 px-2 py-1 rounded">
                    <Clock className="w-3.5 h-3.5" /> {mod.readTime}
                  </span>
                  {isDone && (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" /> Read
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-semibold text-lg text-[#F0EDE4] group-hover:text-[#00D4FF] transition-colors">
                  {mod.title}
                </h3>

                <p className="text-xs text-[#9CA3AF] line-clamp-3 leading-relaxed">
                  {mod.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1E2A3A] flex items-center justify-between text-xs text-[#00D4FF] font-medium">
                <span>Start Reading</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}