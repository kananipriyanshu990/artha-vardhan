import React from "react";
import Button from "../../../components/shared/Button";
import Card from "../../../components/shared/Card";

export default function SplitStep({ income, onNext }) {
  const needs = Math.round(income * 0.5);
  const wants = Math.round(income * 0.3);
  const savings = Math.round(income * 0.2);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#F0EDE4]">
            Here’s a simple rule that changes everything.
          </h2>
          <p className="text-sm text-[#9CA3AF]">
            The 50/30/20 Rule creates financial peace of mind without starving your lifestyle.
          </p>
        </div>

        {/* Visual Bar Breakdown */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-400 font-medium">50% Needs (Rent, Food, Bills)</span>
              <span className="text-gray-300 font-semibold">₹{needs.toLocaleString("en-IN")}</span>
            </div>
            <div className="w-full bg-[#0A0F2C] h-4 rounded-full overflow-hidden border border-[#1E2A3A]">
              <div
                className="bg-gray-500 h-full rounded-full transition-all duration-1000"
                style={{ width: "50%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#FFAA00] font-medium">30% Wants (Dining out, Subscriptions)</span>
              <span className="text-[#FFAA00] font-semibold">₹{wants.toLocaleString("en-IN")}</span>
            </div>
            <div className="w-full bg-[#0A0F2C] h-4 rounded-full overflow-hidden border border-[#1E2A3A]">
              <div
                className="bg-[#FFAA00] h-full rounded-full transition-all duration-1000"
                style={{ width: "30%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-[#F5C518] font-bold">20% Savings &amp; Investments</span>
              <span className="text-[#F5C518] font-bold">₹{savings.toLocaleString("en-IN")}</span>
            </div>
            <div className="w-full bg-[#0A0F2C] h-4 rounded-full overflow-hidden border border-[#1E2A3A]">
              <div
                className="bg-[#F5C518] h-full rounded-full transition-all duration-1000"
                style={{ width: "20%" }}
              />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#F5C518]/10 border border-[#F5C518]/30 text-center">
          <p className="text-base text-[#F0EDE4]">
            Even <strong className="text-[#F5C518]">₹{savings.toLocaleString("en-IN")}</strong> per month, invested consistently, can build serious wealth.
          </p>
        </div>

        <Button
          onClick={onNext}
          accentColor="#F5C518"
          className="w-full py-3 text-base text-[#0A0F2C]"
        >
          See What ₹{savings.toLocaleString("en-IN")}/mo Becomes
        </Button>
      </Card>
    </div>
  );
}