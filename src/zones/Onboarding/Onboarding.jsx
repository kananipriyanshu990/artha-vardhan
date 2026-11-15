import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import WelcomeStep from "./steps/WelcomeStep";
import IncomeStep from "./steps/IncomeStep";
import SplitStep from "./steps/SplitStep";
import NudgeStep from "./steps/NudgeStep";

export default function Onboarding() {
  const { setOnboardingDone, monthlyIncome, setMonthlyIncome, setActiveZone } = useApp();
  const [step, setStep] = useState(1);

  const handleFinish = (targetZone) => {
    setOnboardingDone(true);
    setActiveZone(targetZone);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      {step === 1 && (
        <WelcomeStep
          onNext={() => setStep(2)}
          onSkip={() => handleFinish("learn")}
        />
      )}
      {step === 2 && (
        <IncomeStep
          initialIncome={monthlyIncome}
          onNext={(enteredIncome) => {
            setMonthlyIncome(enteredIncome);
            setStep(3);
          }}
        />
      )}
      {step === 3 && (
        <SplitStep
          income={monthlyIncome}
          onNext={() => setStep(4)}
        />
      )}
      {step === 4 && (
        <NudgeStep
          income={monthlyIncome}
          onExploreLearn={() => handleFinish("learn")}
          onExploreCalculators={() => handleFinish("calculators")}
        />
      )}
    </div>
  );
}