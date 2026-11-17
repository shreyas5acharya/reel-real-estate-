import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface MortgageCalculatorProps {
  onApplyBudget: (homePrice: number) => void;
}

const formatUsd = (val: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(val);

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  onApplyBudget,
}) => {
  const [homePrice, setHomePrice] = useState<number>(6500000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(6.25);
  const [loanTermYears, setLoanTermYears] = useState<15 | 20 | 30>(30);

  const calculation = useMemo(() => {
    const downPaymentAmount = (homePrice * downPaymentPct) / 100;
    const principal = Math.max(0, homePrice - downPaymentAmount);
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    let monthlyPI = 0;
    if (principal > 0) {
      if (monthlyRate === 0) {
        monthlyPI = principal / totalPayments;
      } else {
        const factor = Math.pow(1 + monthlyRate, totalPayments);
        monthlyPI = (principal * (monthlyRate * factor)) / (factor - 1);
      }
    }

    // Illustrative US luxury property tax (~1.15% annual) and homeowner insurance (~0.35% annual)
    const estimatedMonthlyTax = (homePrice * 0.0115) / 12;
    const estimatedMonthlyInsurance = (homePrice * 0.0035) / 12;
    const totalMonthly = monthlyPI + estimatedMonthlyTax + estimatedMonthlyInsurance;

    return {
      downPaymentAmount,
      principal,
      monthlyPI,
      estimatedMonthlyTax,
      estimatedMonthlyInsurance,
      totalMonthly,
      piShare: totalMonthly > 0 ? (monthlyPI / totalMonthly) * 100 : 0,
      taxShare: totalMonthly > 0 ? (estimatedMonthlyTax / totalMonthly) * 100 : 0,
      insShare: totalMonthly > 0 ? (estimatedMonthlyInsurance / totalMonthly) * 100 : 0,
    };
  }, [homePrice, downPaymentPct, interestRate, loanTermYears]);

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="py-20 lg:py-28 bg-[#ECE8DF] text-[#0B1220]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium mb-3">
            Financial Planning
          </p>
          <h2
            id="calculator-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0B1220] mb-4"
          >
            Private Financing Estimator
          </h2>
          <p className="text-base text-[#0B1220]/70 leading-relaxed">
            Model jumbo and private-bank mortgage scenarios in real time. Figures update
            immediately in US dollars.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Inputs */}
          <div className="lg:col-span-7 bg-white border border-[#0B1220]/10 rounded-sm p-6 sm:p-8 lg:p-10 space-y-8">
            {/* Home Price */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label
                  htmlFor="calc-home-price"
                  className="text-sm font-medium text-[#0B1220]"
                >
                  Home Price
                </label>
                <span className="font-serif text-xl sm:text-2xl font-semibold text-[#0B1220] tabular-nums">
                  {formatUsd(homePrice)}
                </span>
              </div>
              <input
                id="calc-home-price"
                type="range"
                min={500000}
                max={25000000}
                step={100000}
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full luxury-slider"
              />
              <div className="flex justify-between text-xs text-[#0B1220]/50 font-mono tabular-nums mt-2">
                <span>$500K</span>
                <span>$12.5M</span>
                <span>$25M</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label
                  htmlFor="calc-down-payment"
                  className="text-sm font-medium text-[#0B1220]"
                >
                  Down Payment ({downPaymentPct}%)
                </label>
                <span className="font-serif text-xl font-semibold text-[#0B1220] tabular-nums">
                  {formatUsd(calculation.downPaymentAmount)}
                </span>
              </div>
              <input
                id="calc-down-payment"
                type="range"
                min={5}
                max={60}
                step={5}
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full luxury-slider"
              />
              <div className="flex justify-between text-xs text-[#0B1220]/50 font-mono tabular-nums mt-2">
                <span>5%</span>
                <span>25%</span>
                <span>60%</span>
              </div>
            </div>

            {/* Interest Rate & Loan Term */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <label
                    htmlFor="calc-interest-rate"
                    className="text-sm font-medium text-[#0B1220]"
                  >
                    Interest Rate
                  </label>
                  <span className="font-mono text-base font-semibold text-[#0B1220] tabular-nums">
                    {interestRate.toFixed(2)}%
                  </span>
                </div>
                <input
                  id="calc-interest-rate"
                  type="range"
                  min={3.0}
                  max={10.0}
                  step={0.125}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full luxury-slider"
                />
                <div className="flex justify-between text-xs text-[#0B1220]/50 font-mono tabular-nums mt-2">
                  <span>3.0%</span>
                  <span>6.5%</span>
                  <span>10.0%</span>
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-[#0B1220] mb-3">
                  Loan Term
                </span>
                <div
                  role="group"
                  aria-label="Loan term in years"
                  className="grid grid-cols-3 gap-2"
                >
                  {([15, 20, 30] as const).map((term) => {
                    const active = loanTermYears === term;
                    return (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setLoanTermYears(term)}
                        className={`h-11 rounded-sm text-xs font-medium border transition-colors tabular-nums cursor-pointer ${
                          active
                            ? 'bg-[#0B1220] text-[#F7F5F0] border-[#0B1220]'
                            : 'bg-[#F7F5F0] text-[#0B1220] border-[#0B1220]/15 hover:border-[#0B1220]/40'
                        }`}
                      >
                        {term} Years
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Output */}
          <div className="lg:col-span-5 bg-[#0B1220] text-[#F7F5F0] rounded-sm p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium mb-2">
                Estimated Monthly Outlay
              </p>
              <p
                aria-live="polite"
                className="font-serif text-4xl sm:text-5xl font-medium text-[#F7F5F0] tabular-nums mb-2"
              >
                {formatUsd(calculation.totalMonthly)}
                <span className="text-base font-sans font-normal text-[#F7F5F0]/60">
                  {' '}
                  / mo
                </span>
              </p>
              <p className="text-xs text-[#F7F5F0]/60 tabular-nums mb-8">
                Loan Principal: {formatUsd(calculation.principal)} at{' '}
                {interestRate.toFixed(2)}% APR ({loanTermYears}-Year Fixed)
              </p>

              {/* Proportion Bar */}
              <div
                aria-hidden="true"
                className="h-2.5 w-full rounded-full overflow-hidden flex bg-white/10 mb-6"
              >
                <div
                  className="bg-[#C9A24B] h-full transition-all duration-300"
                  style={{ width: `${calculation.piShare}%` }}
                />
                <div
                  className="bg-[#F7F5F0]/60 h-full transition-all duration-300"
                  style={{ width: `${calculation.taxShare}%` }}
                />
                <div
                  className="bg-[#F7F5F0]/25 h-full transition-all duration-300"
                  style={{ width: `${calculation.insShare}%` }}
                />
              </div>

              {/* Breakdown Rows */}
              <dl className="space-y-3.5 text-sm border-t border-white/10 pt-5 mb-8">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2.5 text-[#F7F5F0]/80">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#C9A24B]" aria-hidden="true" />
                    <span>Principal &amp; Interest</span>
                  </dt>
                  <dd className="font-mono font-medium tabular-nums">
                    {formatUsd(calculation.monthlyPI)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2.5 text-[#F7F5F0]/80">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#F7F5F0]/60" aria-hidden="true" />
                    <span>Est. Property Tax (1.15%)</span>
                  </dt>
                  <dd className="font-mono font-medium tabular-nums">
                    {formatUsd(calculation.estimatedMonthlyTax)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2.5 text-[#F7F5F0]/80">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#F7F5F0]/25" aria-hidden="true" />
                    <span>Est. Insurance (0.35%)</span>
                  </dt>
                  <dd className="font-mono font-medium tabular-nums">
                    {formatUsd(calculation.estimatedMonthlyInsurance)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="pt-5 border-t border-white/10 space-y-3">
              <MagneticButton
                onClick={() => onApplyBudget(homePrice)}
                className="w-full bg-[#C9A24B] hover:bg-[#DFBE6F] text-[#0B1220] text-xs font-medium py-3.5 px-6 rounded-sm gap-2"
              >
                <span>Apply {formatUsd(homePrice)} Budget to Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </MagneticButton>
              <p className="text-[11px] text-[#F7F5F0]/50 leading-relaxed">
                For illustrative planning only. Private-bank jumbo terms depend on borrower
                qualification and state tax rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
