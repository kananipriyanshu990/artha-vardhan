import React, { useState, useMemo } from "react";
import Card from "../../components/shared/Card";
import { JARGON_TERMS } from "../../constants/content";
import { Search, BookOpen } from "lucide-react";

export default function JargonDictionary() {
  const [search, setSearch] = useState("");

  const sortedTerms = useMemo(() => {
    return [...JARGON_TERMS].sort((a, b) => a.term.localeCompare(b.term));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return sortedTerms;
    const q = search.toLowerCase();
    return sortedTerms.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q)
    );
  }, [sortedTerms, search]);

  // Highlight helper
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="bg-[#F5C518] text-[#0A0F2C] px-0.5 rounded font-bold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-[#F0EDE4] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#00D4FF]" /> Jargon Dictionary
          </h2>
          <p className="text-xs text-[#9CA3AF]">
            Plain-English definitions for every Indian investment term.
          </p>
        </div>

        {/* Search bar with Gold highlight */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search AUM, NAV, ELSS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#111827] border border-[#1E2A3A] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <Card key={item.term} className="p-4 space-y-2 border-[#1E2A3A] hover:border-[#00D4FF]/40 transition-colors">
            <div className="text-sm font-bold font-heading text-[#00D4FF]">
              {highlightMatch(item.term, search)}
            </div>
            <p className="text-xs text-[#F0EDE4]/80 leading-relaxed">
              {highlightMatch(item.definition, search)}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}