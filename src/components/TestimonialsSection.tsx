import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/realEstateData';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-20 lg:py-28 bg-[#0B1220] text-[#F7F5F0]"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium mb-3">
              Client Perspectives · Placeholder Content
            </p>
            <h2
              id="testimonials-heading"
              className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#F7F5F0]"
            >
              Representative Client Outcomes
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 inline-flex items-center justify-center rounded-sm border border-white/15 text-[#F7F5F0] hover:border-[#C9A24B] hover:text-[#C9A24B] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-11 h-11 inline-flex items-center justify-center rounded-sm border border-white/15 text-[#F7F5F0] hover:border-[#C9A24B] hover:text-[#C9A24B] transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Frame */}
        <div className="bg-[#152036] border border-white/10 rounded-sm p-8 sm:p-12 relative">
          <Quote className="w-8 h-8 text-[#C9A24B]/50 mb-6" aria-hidden="true" />

          <div className="min-h-[190px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <p className="font-serif text-xl sm:text-2xl lg:text-[1.7rem] leading-relaxed text-[#F7F5F0] font-normal">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <footer className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <cite className="not-italic font-medium text-base text-[#F7F5F0] block">
                      {current.author}
                    </cite>
                    <span className="text-xs text-[#F7F5F0]/65">
                      {current.role} · {current.location}
                    </span>
                  </div>

                  <div className="text-xs text-[#C9A24B] font-mono tabular-nums sm:text-right">
                    <span className="block">{current.transactionType}</span>
                    <span className="text-[#F7F5F0]/70">{current.outcome}</span>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Pagination Indicators */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
              {TESTIMONIALS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`View testimonial ${idx + 1} of ${TESTIMONIALS.length}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-8 bg-[#C9A24B]'
                      : 'w-3 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <span className="text-[11px] text-[#F7F5F0]/45">
              Sample placeholder client stories
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
