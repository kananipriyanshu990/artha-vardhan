import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#00D4FF", "#F5C518", "#10B981", "#7C3AED", "#FFAA00", "#EF4444", "#3B82F6", "#EC4899"];

export default function PortfolioChart({ portfolio }) {
  // Aggregate by type
  const typeMap = {};
  portfolio.forEach((p) => {
    typeMap[p.type] = (typeMap[p.type] || 0) + p.currentValue;
  });

  const pieData = Object.keys(typeMap).map((key) => ({
    name: key,
    value: typeMap[key],
  }));

  if (pieData.length === 0) return null;

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#111827", borderColor: "#1E2A3A", borderRadius: "8px" }}
            formatter={(val) => [`₹${Number(val).toLocaleString("en-IN")}`, "Allocation"]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}