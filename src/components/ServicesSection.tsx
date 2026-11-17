import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '../data/realEstateData';
import { MagneticButton } from './MagneticButton';

interface ServicesSectionProps {
  activeServiceId: string;
  onSelectService: (serviceId: string) => void;
  onInquireService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  activeServiceId,
  onSelectService,
  onInquireService,
}) => {
  const activeService =
    SERVICES.find((s) => s.id === activeServiceId) ?? SERVICES[0];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 lg:py-28 bg-[#F7F5F0] text-[#0B1220]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium mb-3">
            Advisory Disciplines
          </p>
          <h2
            id="services-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0B1220] mb-4"
          >
            End-to-End Stewardship Across Every Transaction
          </h2>
          <p className="text-base text-[#0B1220]/70 leading-relaxed">
            Whether acquiring an off-market landmark or structuring a multi-city portfolio, our
            five specialized practices operate under one senior partnership.
          </p>
        </motion.div>

        {/* Asymmetric 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Index Selector */}
          <div
            role="tablist"
            aria-label="Brokerage Services"
            className="lg:col-span-5 flex flex-col divide-y divide-[#0B1220]/10 border-y border-[#0B1220]/10"
          >
            {SERVICES.map((service) => {
              const isSelected = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => onSelectService(service.id)}
                  className={`group py-5 px-4 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#0B1220] text-[#F7F5F0]' : 'hover:bg-[#ECE8DF]/70'
                  }`}
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        isSelected ? 'text-[#C9A24B]' : 'text-[#0B1220]/45'
                      }`}
                    >
                      {service.number}.
                    </span>
                    <span className="font-serif text-xl sm:text-2xl font-medium truncate">
                      {service.title}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isSelected
                        ? 'text-[#C9A24B] translate-x-0.5'
                        : 'text-[#0B1220]/40 group-hover:translate-x-1'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {/* Right Active Service Dossier */}
          <div className="lg:col-span-7 bg-white border border-[#0B1220]/10 rounded-sm p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-[#0B1220]/10">
                    <span className="text-xs font-mono tabular-nums tracking-widest uppercase text-[#C9A24B]">
                      {activeService.number}. {activeService.title}
                    </span>
                    <span className="text-xs font-medium text-[#0B1220]/65 tabular-nums">
                      {activeService.outcomeMetric}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#0B1220] mb-4">
                    {activeService.headline}
                  </h3>
                  <p className="text-base text-[#0B1220]/75 leading-relaxed mb-8">
                    {activeService.description}
                  </p>

                  <div className="space-y-3 mb-10">
                    <p className="text-xs tracking-[0.16em] uppercase text-[#0B1220]/55 font-medium">
                      Key Practice Deliverables
                    </p>
                    <ul className="space-y-3">
                      {activeService.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-[#0B1220]/85"
                        >
                          <Check
                            className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#0B1220]/10 flex flex-wrap items-center justify-between gap-4">
                  <MagneticButton
                    onClick={() => onInquireService(activeService.title)}
                    className="bg-[#0B1220] hover:bg-[#152036] text-[#F7F5F0] text-xs font-medium px-6 py-3.5 rounded-sm gap-2"
                  >
                    <span>Inquire About {activeService.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
                  </MagneticButton>
                  <span className="text-xs text-[#0B1220]/55">
                    Direct partner response within 4 business hours
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
