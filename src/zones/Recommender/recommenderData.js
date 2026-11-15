export const QUESTIONS = [
  {
    q: "How old are you?",
    options: ["18–22", "22–28", "28–35", "35+"],
  },
  {
    q: "What is your monthly income or pocket money?",
    options: [
      "Less than ₹10,000",
      "₹10,000–₹30,000",
      "₹30,000–₹70,000",
      "Above ₹70,000",
    ],
  },
  {
    q: "How stable is your income?",
    options: [
      "Very unstable (freelance/irregular)",
      "Somewhat stable",
      "Stable (salaried)",
      "Very stable (govt/PSU)",
    ],
  },
  {
    q: "How many people financially depend on your income?",
    options: [
      "3 or more dependents",
      "1–2 dependents",
      "Partially supporting family",
      "None — only myself",
    ],
  },
  {
    q: "Do you currently have any ongoing loans or EMIs (education, bike, personal)?",
    options: [
      "Heavy EMIs (>30% of income)",
      "Moderate EMIs (15–30% of income)",
      "Small/manageable EMI (<15%)",
      "Zero debt or EMIs",
    ],
  },
  {
    q: "What is your primary investment goal?",
    options: [
      "Save for a short-term need (<2 yrs)",
      "Build an emergency fund",
      "Grow wealth over 5–10 years",
      "Retire comfortably (15+ yrs)",
    ],
  },
  {
    q: "When will you likely need to withdraw a major chunk of this money?",
    options: [
      "Within 1–2 years",
      "In 3–5 years",
      "In 5–10 years",
      "Not for 10+ years",
    ],
  },
  {
    q: "If your investment dropped 20% in a month, what would you do?",
    options: [
      "Withdraw everything immediately",
      "Worry a lot but wait",
      "Stay calm, markets recover",
      "Invest more — it's a great opportunity",
    ],
  },
  {
    q: "How long are you willing to wait for a temporary market dip to recover?",
    options: [
      "Less than 6 months",
      "6 months to 1 year",
      "1 to 3 years",
      "3+ years without stressing",
    ],
  },
  {
    q: "How much of your monthly income can you invest?",
    options: ["Less than 5%", "5–10%", "10–20%", "More than 20%"],
  },
  {
    q: "Do you have an emergency fund (3–6 months expenses saved)?",
    options: [
      "No, not at all",
      "Partially built",
      "Yes, 3 months",
      "Yes, 6+ months",
    ],
  },
  {
    q: "Have you invested before?",
    options: [
      "Never",
      "Tried FD or RD only",
      "Have a SIP or MF",
      "Actively manage my portfolio",
    ],
  },
  {
    q: "What would you do with ₹50,000 received today?",
    options: [
      "Keep it in savings account",
      "Put it in FD",
      "Start a SIP",
      "Invest partly in equity, partly in debt",
    ],
  },
  {
    q: "Are you looking to save income tax under Section 80C alongside investing?",
    options: [
      "Yes, with guaranteed fixed returns",
      "Yes, with balanced risk",
      "Yes, willing to lock in equity for 3 years",
      "No, tax regime doesn't require 80C",
    ],
  },
  {
    q: "How important is it that your investment does not lose value in the short term?",
    options: [
      "Extremely important — safety first",
      "Fairly important",
      "Somewhat — I can handle some dips",
      "Not very — I focus on long-term growth",
    ],
  },
];

export const SIMPLE_MODE_TEMPLATES = {
  conservative: {
    category: "Conservative Investor",
    personality:
      "You are a Capital Preserver. You prioritize peace of mind and principal safety over aggressive growth. Volatility stresses you, and you prefer predictable, disciplined financial steps while you build stability.",
    categories: [
      {
        name: "Liquid & Overnight Debt Funds",
        explanation:
          "Virtual cash equivalents providing stability and immediate accessibility for emergencies.",
      },
      {
        name: "Banking & PSU Debt Funds",
        explanation:
          "High-quality bond portfolios offering steady, lower-volatility returns above traditional savings accounts.",
      },
      {
        name: "Conservative Hybrid Funds",
        explanation:
          "Primarily debt-oriented funds with a small 10–25% equity slice for modest inflation defense.",
      },
    ],
    lifeStageAdvice:
      "Focus on locking in a reliable 6-month emergency buffer before taking on any equity risk. Consistency in debt allocation will shield you from sudden life expenses.",
    avoid:
      "Avoid speculative high-beta mid/small-cap equity funds, day trading, or crypto assets that could induce panic selling during routine market drawdowns.",
  },
  moderate: {
    category: "Moderate Investor",
    personality:
      "You are a Balanced Builder. You recognize that inflation slowly erodes cash, so you embrace measured market volatility to earn healthy long-term returns without taking excessive risks.",
    categories: [
      {
        name: "Broad Market Index Funds (Nifty 50)",
        explanation:
          "Low-cost passive exposure mirroring India's top 50 bluechip industry leaders.",
      },
      {
        name: "Aggressive / Dynamic Hybrid Funds",
        explanation:
          "Automatic asset allocation between 65–80% equities and debt to cushion market downturns.",
      },
      {
        name: "Short-Duration Debt Funds",
        explanation:
          "Stable fixed-income holding for planned expenditures 2 to 3 years away.",
      },
    ],
    lifeStageAdvice:
      "Automate your SIPs right on salary day with a 60:40 Equity to Debt ratio. Rebalance once a year to keep your allocations aligned with your milestones.",
    avoid:
      "Avoid stopping your monthly SIP or attempting to time market highs and lows during short-term corrections.",
  },
  moderatelyAggressive: {
    category: "Moderately Aggressive Investor",
    personality:
      "You are an Ambitious Wealth Accumulator. You have a long-term horizon and can comfortably tolerate 15–20% temporary market drawdowns in exchange for superior compounding wealth.",
    categories: [
      {
        name: "Flexi-Cap Equity Funds",
        explanation:
          "Unconstrained equity exposure dynamically distributed across large, mid, and small businesses.",
      },
      {
        name: "Large & Mid-Cap Funds",
        explanation:
          "Blended equity portfolio capturing both market stability and fast-growing mid-tier corporate leaders.",
      },
      {
        name: "Nifty Next 50 Index Funds",
        explanation:
          "Passive high-growth exposure to India's emerging bluechips of tomorrow.",
      },
      {
        name: "Target Maturity Corporate Debt Funds",
        explanation:
          "Predictable yield buffer for portfolio rebalancing during deep equity dips.",
      },
    ],
    lifeStageAdvice:
      "Set up an annual 10% Step-up SIP so your investments scale automatically with your salary promotions and career growth.",
    avoid:
      "Avoid lifestyle inflation consuming your annual raises before you allocate at least 20% toward long-term wealth.",
  },
  aggressive: {
    category: "Aggressive Investor",
    personality:
      "You are a High-Conviction Growth Maximizer. You possess an extended investment timeline (7–10+ years), stable income, and view significant market dips not as risk, but as lucrative accumulation opportunities.",
    categories: [
      {
        name: "Broad Mid-Cap & Small-Cap Equity Funds",
        explanation:
          "High-growth engine investing in dynamic, fast-scaling companies with higher upside volatility.",
      },
      {
        name: "Flexi-Cap Equity Funds",
        explanation:
          "Core equity foundation steered across diverse Indian economic sectors without market-cap bias.",
      },
      {
        name: "International / FoF Index Funds",
        explanation:
          "Geographic diversification hedging Indian currency fluctuation with global tech exposure.",
      },
    ],
    lifeStageAdvice:
      "Maintain a strict minimum holding horizon of 7 years. Time in the market will transform your elevated volatility into exponential compound growth.",
    avoid:
      "Avoid leveraged futures and options (F&O) gambling, speculative derivative tips, or allocating emergency cash into volatile small-caps.",
  },
};