import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { STATS_METRICS, StatMetric } from '../data/realEstateData';

const AnimatedCounter: React.FC<{ metric: StatMetric }> = ({ metric }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(
    prefersReducedMotion ? metric.value : 0
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(metric.value);
      return;
    }
    if (!isInView) return;

    let rafId = 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      // Cubic ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(metric.value * eased);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(metric.value);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, metric.value, prefersReducedMotion]);

  const formatted = metric.decimals
    ? displayValue.toFixed(metric.decimals)
    : Math.round(displayValue).toLocaleString('en-US');

  return (
    <span ref={ref} className="tabular-nums">
      {metric.prefix}
      {formatted}
      {metric.suffix}
    </span>
  );
};

export const StatsBar: React.FC = () => {
  return (
    <section
      aria-label="Brokerage Key Metrics"
      className="bg-[#0B1220] text-[#F7F5F0] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/15">
          {STATS_METRICS.map((metric) => (
            <div key={metric.id} className="lg:px-8 first:lg:pl-0 last:lg:pr-0">
              <p className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#C9A24B] font-medium tracking-tight">
                <AnimatedCounter metric={metric} />
              </p>
              <p className="mt-2 text-sm font-medium text-[#F7F5F0] tracking-wide">
                {metric.label}
              </p>
              <p className="mt-1 text-xs text-[#F7F5F0]/60">
                {metric.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
