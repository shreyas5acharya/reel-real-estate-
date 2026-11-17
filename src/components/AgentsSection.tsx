import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { AGENTS, AgentProfile } from '../data/realEstateData';

interface AgentsSectionProps {
  onConnectAgent: (agent: AgentProfile) => void;
}

export const AgentsSection: React.FC<AgentsSectionProps> = ({ onConnectAgent }) => {
  const [brokenPortraits, setBrokenPortraits] = useState<Record<string, boolean>>({});

  return (
    <section
      id="agents"
      aria-labelledby="agents-heading"
      className="py-20 lg:py-28 bg-[#F7F5F0] text-[#0B1220]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium mb-3">
              Senior Partnership
            </p>
            <h2
              id="agents-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0B1220]"
            >
              Meet the Managing Advisors
            </h2>
          </div>
          <p className="text-sm text-[#0B1220]/70 max-w-md leading-relaxed">
            Every mandate is led directly by a senior partner—never handed off to junior teams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {AGENTS.map((agent, idx) => (
            <motion.article
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group bg-white border border-[#0B1220]/10 rounded-sm overflow-hidden flex flex-col"
            >
              {/* 3:4 Portrait with Hover Reveal Dossier */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#152036]">
                {!brokenPortraits[agent.id] ? (
                  <img
                    src={agent.image}
                    alt={`${agent.name}, ${agent.role} for ${agent.market}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setBrokenPortraits((prev) => ({ ...prev, [agent.id]: true }))
                    }
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#152036] text-[#F7F5F0] font-serif text-2xl">
                    {agent.name}
                  </div>
                )}

                {/* Hover & Focus Reveal Overlay */}
                <div className="absolute inset-0 bg-[#0B1220]/88 p-6 flex flex-col justify-between opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300">
                  <div>
                    <p className="text-xs text-[#C9A24B] font-mono tabular-nums mb-2">
                      {agent.closedVolume}
                    </p>
                    <p className="text-sm text-[#F7F5F0]/90 leading-relaxed mb-4">
                      {agent.bio}
                    </p>
                    <p className="text-xs text-[#F7F5F0]/60">
                      Languages: {agent.languages}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/15">
                    <div className="space-y-1.5 text-xs text-[#F7F5F0]/80">
                      <a
                        href={`tel:${agent.phone}`}
                        className="flex items-center gap-2 hover:text-[#C9A24B] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
                        <span className="tabular-nums">{agent.phone}</span>
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex items-center gap-2 hover:text-[#C9A24B] transition-colors truncate"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" aria-hidden="true" />
                        <span className="truncate">{agent.email}</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => onConnectAgent(agent)}
                      className="w-full h-10 bg-[#C9A24B] hover:bg-[#DFBE6F] text-[#0B1220] text-xs font-medium rounded-sm inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Connect with {agent.name.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Footer Info (Always Visible) */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#0B1220]">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-[#0B1220]/65 mt-0.5">
                    {agent.role} · {agent.market}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#0B1220]/10 flex items-center justify-between text-xs">
                  <span className="font-mono tabular-nums text-[#0B1220]/75">
                    {agent.closedVolume}
                  </span>
                  <button
                    type="button"
                    onClick={() => onConnectAgent(agent)}
                    className="font-medium text-[#0B1220] hover:text-[#C9A24B] transition-colors cursor-pointer"
                  >
                    Direct Inquiry
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
