import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import AddInvestment from "./AddInvestment";
import InvestmentCard from "./InvestmentCard";
import PortfolioChart from "./PortfolioChart";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import { PieChart as PieIcon, Plus, Download } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function Portfolio() {
  const { portfolio, setPortfolio } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState(null);

  const handleAdd = (inv) => {
    setPortfolio([...portfolio, inv]);
    setShowAddForm(false);
  };

  const handleUpdate = (updatedInv) => {
    setPortfolio(portfolio.map((p) => (p.id === updatedInv.id ? updatedInv : p)));
    setEditingInvestment(null);
    setShowAddForm(false);
  };

  const handleEditClick = (inv) => {
    setEditingInvestment(inv);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    setPortfolio(portfolio.filter((p) => p.id !== id));
    if (editingInvestment && editingInvestment.id === id) {
      setEditingInvestment(null);
      setShowAddForm(false);
    }
  };

  const handleCancelForm = () => {
    setEditingInvestment(null);
    setShowAddForm(false);
  };

  const { totalInvested, totalCurrentValue, overallReturn, overallReturnPct, bestPerformer } = useMemo(() => {
    const inv = portfolio.reduce((a, b) => a + b.amountInvested, 0);
    const cur = portfolio.reduce((a, b) => a + b.currentValue, 0);
    const ret = cur - inv;
    const retPct = inv > 0 ? (ret / inv) * 100 : 0;

    let best = null;
    let maxPct = -Infinity;
    portfolio.forEach((p) => {
      const pRetPct = p.amountInvested > 0 ? ((p.currentValue - p.amountInvested) / p.amountInvested) * 100 : 0;
      if (pRetPct > maxPct) {
        maxPct = pRetPct;
        best = { name: p.name, returnPct: pRetPct.toFixed(1) };
      }
    });

    return {
      totalInvested: inv,
      totalCurrentValue: cur,
      overallReturn: ret,
      overallReturnPct: retPct.toFixed(1),
      bestPerformer: best,
    };
  }, [portfolio]);

  const projectionChartData = useMemo(() => {
    const data = [];
    const avgRate = portfolio.length > 0
      ? portfolio.reduce((a, b) => a + (b.expectedReturn || 12), 0) / portfolio.length / 100
      : 0.12;

    for (let yr = 0; yr <= 10; yr++) {
      data.push({
        year: `Yr ${yr}`,
        Value: Math.round(totalCurrentValue * Math.pow(1 + avgRate, yr)),
      });
    }
    return data;
  }, [portfolio, totalCurrentValue]);

  const handleExportText = () => {
    let summary = `ARTHA VARDHAN - PORTFOLIO SUMMARY\nGenerated on: ${new Date().toLocaleDateString()}\n`;
    summary += `--------------------------------------------------\n`;
    summary += `Total Invested: Rs. ${totalInvested.toLocaleString("en-IN")}\n`;
    summary += `Current Value:  Rs. ${totalCurrentValue.toLocaleString("en-IN")}\n`;
    summary += `Net Return:     Rs. ${overallReturn.toLocaleString("en-IN")} (${overallReturnPct}%)\n`;
    summary += `--------------------------------------------------\n\nHOLDINGS:\n`;

    portfolio.forEach((p, idx) => {
      summary += `${idx + 1}. ${p.name} [${p.type}]\n`;
      summary += `   Invested: Rs. ${p.amountInvested} on ${p.dateInvested}\n`;
      summary += `   Current:  Rs. ${p.currentValue} | Return Exp: ${p.expectedReturn}%\n\n`;
    });

    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ArthaVardhan_Portfolio_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1E2A3A] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00D4FF] mb-1">
            <PieIcon className="w-4 h-4" /> Zone 5: Passive Portfolio Tracker
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-[#F0EDE4]">
            Portfolio Tracker
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Zero-API manual ledger. Completely private, offline-ready tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {portfolio.length > 0 && (
            <Button onClick={handleExportText} variant="outline" accentColor="#00D4FF">
              <Download className="w-4 h-4" /> Export Summary
            </Button>
          )}
          {!showAddForm && (
            <Button
              onClick={() => {
                setEditingInvestment(null);
                setShowAddForm(true);
              }}
              accentColor="#00D4FF"
              className="text-[#0A0F2C] font-bold"
            >
              <Plus className="w-4 h-4" /> Add Asset
            </Button>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {portfolio.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            <div>
              <p className="text-xs text-gray-400">Total Invested</p>
              <p className="text-xl font-bold text-white mt-1">
                ₹{totalInvested.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Current Value</p>
              <p className="text-xl font-bold text-[#00D4FF] mt-1">
                ₹{totalCurrentValue.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Overall Return</p>
              <p className={`text-xl font-bold mt-1 ${overallReturn >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {overallReturn >= 0 ? "+" : ""}₹{overallReturn.toLocaleString("en-IN")}
              </p>
              <span className="text-[11px] text-gray-400">({overallReturnPct}%)</span>
            </div>
            <div>
              <p className="text-xs text-gray-400">Best Performer</p>
              {bestPerformer ? (
                <p className="text-xs font-bold text-[#F5C518] mt-1 truncate" title={bestPerformer.name}>
                  {bestPerformer.name} (+{bestPerformer.returnPct}%)
                </p>
              ) : (
                <span className="text-xs text-gray-500">-</span>
              )}
            </div>
          </Card>

          <Card className="flex flex-col items-center justify-center p-4">
            <p className="text-xs font-semibold text-gray-400 mb-2">Asset Allocation by Type</p>
            <PortfolioChart portfolio={portfolio} />
          </Card>
        </div>
      )}

      {showAddForm && (
        <AddInvestment
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editingInvestment={editingInvestment}
          onCancel={handleCancelForm}
        />
      )}

      {/* Investment List or Fix 6 Empty State */}
      {portfolio.length === 0 && !showAddForm ? (
        <div className="text-center py-16 bg-[#111827] border border-[#1E2A3A] rounded-2xl space-y-4">
          <PieIcon className="w-12 h-12 mx-auto text-gray-600" />
          <h3 className="font-heading text-lg font-bold text-gray-300">
            Your portfolio is empty. Add your first investment to get started.
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Log your equity funds, index investments, or PPF holdings to visualize your growth trajectory.
          </p>
          <Button
            onClick={() => {
              setEditingInvestment(null);
              setShowAddForm(true);
            }}
            accentColor="#00D4FF"
            className="text-[#0A0F2C] font-bold mx-auto"
          >
            Add First Investment
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {portfolio.map((item) => (
              <InvestmentCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onEdit={handleEditClick}
              />
            ))}
          </div>

          <Card className="p-6">
            <h3 className="font-heading font-bold text-base text-white mb-2">
              Combined Portfolio 10-Year Growth Projection
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Compounded projection based on the weighted expected return of all assets.
            </p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionChartData}>
                  <XAxis dataKey="year" stroke="#9CA3AF" fontSize={11} />
                  <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111827", borderColor: "#1E2A3A", borderRadius: "8px" }}
                    formatter={(val) => [`₹${Number(val).toLocaleString("en-IN")}`, "Projected Value"]}
                  />
                  <Area type="monotone" dataKey="Value" stroke="#00D4FF" fill="#00D4FF" opacity="0.3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}