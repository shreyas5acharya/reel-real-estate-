import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TIMELINE_STEPS } from '../data/realEstateData';

export const WhyChooseUsTimeline: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          rootMargin: '-38% 0px -42% 0px',
          threshold: 0.1,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [prefersReducedMotion]);

  const scrollToStep = (index: number) => {
    setActiveIndex(index);
    const el = stepRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="why-choose-us"
      aria-labelledby="timeline-heading"
      className="py-20 lg:py-28 bg-[#0B1220] text-[#F7F5F0]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Pinned Left Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium mb-3">
              The Acquisition Standard
            </p>
            <h2
              id="timeline-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F7F5F0] mb-5"
            >
              Why Discerning Principals Choose Us
            </h2>
            <p className="text-base text-[#F7F5F0]/75 leading-relaxed mb-10">
              Every engagement follows a disciplined four-phase protocol engineered to protect
              confidentiality, valuation accuracy, and closing certainty.
            </p>

            {/* Interactive Step Rail */}
            <div className="space-y-2" role="navigation" aria-label="Acquisition stages">
              {TIMELINE_STEPS.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToStep(idx)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-sm border text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#152036] border-[#C9A24B]/70 text-[#F7F5F0]'
                        : 'bg-transparent border-white/10 text-[#F7F5F0]/60 hover:text-[#F7F5F0] hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          isActive ? 'text-[#C9A24B]' : 'text-[#F7F5F0]/40'
                        }`}
                      >
                        {item.step}
                      </span>
                      <span className="font-serif text-lg font-medium">{item.phase}</span>
                    </div>
                    <span className="text-xs text-[#F7F5F0]/55 hidden sm:inline">
                      {item.benchmark}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Scroll-Reveal Steps */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-12">
            {TIMELINE_STEPS.map((item, idx) => {
              const isActive = activeIndex === idx || Boolean(prefersReducedMotion);
              return (
                <motion.div
                  key={item.id}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  initial={{ opacity: 0.35, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-20%' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`p-8 sm:p-10 rounded-sm border transition-colors duration-300 ${
                    isActive
                      ? 'bg-[#152036] border-[#C9A24B]/50'
                      : 'bg-[#152036]/45 border-white/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm tabular-nums text-[#C9A24B]">
                        {item.step}.
                      </span>
                      <span className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium">
                        {item.phase}
                      </span>
                    </div>
                    <span className="text-xs text-[#F7F5F0]/60 tabular-nums">
                      {item.benchmark}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F5F0] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base text-[#F7F5F0]/85 leading-relaxed mb-4">
                    {item.summary}
                  </p>
                  <p className="text-sm text-[#F7F5F0]/65 leading-relaxed">
                    {item.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
