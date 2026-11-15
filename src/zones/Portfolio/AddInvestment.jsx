import React, { useState, useEffect } from "react";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import { PlusCircle, Edit3 } from "lucide-react";

export default function AddInvestment({ onAdd, onUpdate, editingInvestment, onCancel }) {
  const [name, setName] = useState(editingInvestment ? editingInvestment.name : "");
  const [type, setType] = useState(editingInvestment ? editingInvestment.type : "Index Fund");
  const [amountInvested, setAmountInvested] = useState(editingInvestment ? editingInvestment.amountInvested : 25000);
  const [dateInvested, setDateInvested] = useState(
    editingInvestment ? editingInvestment.dateInvested : new Date().toISOString().split("T")[0]
  );
  const [expectedReturn, setExpectedReturn] = useState(editingInvestment ? editingInvestment.expectedReturn : 12);
  const [currentValue, setCurrentValue] = useState(editingInvestment ? editingInvestment.currentValue : "");

  useEffect(() => {
    if (editingInvestment) {
      setName(editingInvestment.name || "");
      setType(editingInvestment.type || "Index Fund");
      setAmountInvested(editingInvestment.amountInvested || 25000);
      setDateInvested(editingInvestment.dateInvested || new Date().toISOString().split("T")[0]);
      setExpectedReturn(editingInvestment.expectedReturn || 12);
      setCurrentValue(editingInvestment.currentValue || "");
    }
  }, [editingInvestment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amountInvested) return;

    const payload = {
      id: editingInvestment ? editingInvestment.id : `inv_${Date.now()}`,
      name,
      type,
      amountInvested: Number(amountInvested),
      dateInvested,
      expectedReturn: Number(expectedReturn) || 12,
      currentValue: currentValue !== "" ? Number(currentValue) : Number(amountInvested),
    };

    if (editingInvestment && onUpdate) {
      onUpdate(payload);
    } else {
      onAdd(payload);
    }
  };

  return (
    <Card className="border-[#00D4FF]/40 p-6 space-y-4">
      <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
        {editingInvestment ? (
          <><Edit3 className="w-5 h-5 text-[#00D4FF]" /> Edit Portfolio Asset</>
        ) : (
          <><PlusCircle className="w-5 h-5 text-[#00D4FF]" /> Add Portfolio Asset</>
        )}
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="text-gray-300 font-medium">Investment / Fund Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Parag Parikh Flexi Cap, UTI Nifty 50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white"
          />
        </div>

        <div>
          <label className="text-gray-300 font-medium">Asset Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full mt-1 p-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white"
          >
            <option value="Equity MF">Equity MF</option>
            <option value="Debt MF">Debt MF</option>
            <option value="Index Fund">Index Fund</option>
            <option value="ELSS">ELSS</option>
            <option value="PPF">PPF</option>
            <option value="FD">FD</option>
            <option value="Gold">Gold</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="text-gray-300 font-medium">Amount Invested (₹)</label>
          <input
            type="number"
            required
            min="100"
            value={amountInvested}
            onChange={(e) => setAmountInvested(e.target.value)}
            className="w-full mt-1 p-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white"
          />
        </div>

        <div>
          <label className="text-gray-300 font-medium">Date of Investment</label>
          <input
            type="date"
            required
            value={dateInvested}
            onChange={(e) => setDateInvested(e.target.value)}
            className="w-full mt-1 p-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white"
          />
        </div>

        <div>
          <label className="text-gray-300 font-medium">Expected Annual Return (%)</label>
          <input
            type="number"
            step="0.5"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            className="w-full mt-1 p-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white"
          />
        </div>

        <div>
          <label className="text-gray-300 font-medium">Current Value (₹) - Optional</label>
          <input
            type="number"
            placeholder="Defaults to invested amount if blank"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="w-full mt-1 p-2.5 bg-[#0A0F2C] border border-[#1E2A3A] rounded-lg text-white"
          />
        </div>

        <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
          {onCancel && (
            <Button onClick={onCancel} variant="outline" accentColor="#9CA3AF">
              Cancel
            </Button>
          )}
          <Button type="submit" accentColor="#00D4FF" className="text-[#0A0F2C] font-bold">
            {editingInvestment ? "Update Asset" : "Add to Portfolio"}
          </Button>
        </div>
      </form>
    </Card>
  );
}