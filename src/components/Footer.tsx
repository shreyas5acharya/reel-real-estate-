import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Instagram, Linkedin, X, Youtube } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/realEstateData';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#0B1220] text-[#F7F5F0] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand & Offices */}
          <div className="lg:col-span-4 space-y-4">
            <p className="font-serif text-2xl font-medium text-[#F7F5F0]">
              {COMPANY_CONFIG.name}
            </p>
            <p className="text-sm text-[#F7F5F0]/65 leading-relaxed max-w-sm">
              {COMPANY_CONFIG.tagline}. Serving New York, Miami, Los Angeles, Austin, Aspen, and
              San Francisco.
            </p>
            <p className="text-xs text-[#F7F5F0]/55">{COMPANY_CONFIG.headquarters}</p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#contact"
                aria-label={`${COMPANY_CONFIG.name} on Instagram`}
                className="w-10 h-10 rounded-sm border border-white/15 inline-flex items-center justify-center text-[#F7F5F0]/75 hover:border-[#C9A24B] hover:text-[#C9A24B] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                aria-label={`${COMPANY_CONFIG.name} on LinkedIn`}
                className="w-10 h-10 rounded-sm border border-white/15 inline-flex items-center justify-center text-[#F7F5F0]/75 hover:border-[#C9A24B] hover:text-[#C9A24B] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                aria-label={`${COMPANY_CONFIG.name} on YouTube`}
                className="w-10 h-10 rounded-sm border border-white/15 inline-flex items-center justify-center text-[#F7F5F0]/75 hover:border-[#C9A24B] hover:text-[#C9A24B] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5 text-sm text-[#F7F5F0]/75">
              <li>
                <a href="#listings" className="hover:text-[#F7F5F0] transition-colors">
                  Featured Residences
                </a>
              </li>
              <li>
                <a href="#neighborhoods" className="hover:text-[#F7F5F0] transition-colors">
                  US Markets &amp; Cities
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F7F5F0] transition-colors">
                  Advisory Services
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#F7F5F0] transition-colors">
                  Mortgage Estimator
                </a>
              </li>
              <li>
                <a href="#agents" className="hover:text-[#F7F5F0] transition-colors">
                  Managing Advisors
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium">
              Quarterly Market Dossier
            </p>
            <p className="text-sm text-[#F7F5F0]/70 leading-relaxed">
              Receive private off-market previews and quarterly US luxury transaction intelligence.
            </p>
            <form onSubmit={handleNewsletterSubmit} noValidate className="flex flex-col sm:flex-row gap-2.5">
              <label htmlFor="footer-newsletter" className="sr-only">
                Email address for quarterly market dossier
              </label>
              <input
                id="footer-newsletter"
                type="email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  if (newsletterStatus === 'error') setNewsletterStatus('idle');
                }}
                placeholder="Enter your email address"
                className="flex-1 h-11 px-3.5 bg-[#152036] border border-white/15 rounded-sm text-sm text-[#F7F5F0] placeholder:text-[#F7F5F0]/40 focus:border-[#C9A24B]"
              />
              <button
                type="submit"
                className="h-11 px-6 bg-[#C9A24B] hover:bg-[#DFBE6F] text-[#0B1220] text-xs font-medium rounded-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
            {newsletterStatus === 'error' && (
              <p className="text-xs text-red-400">Please enter a valid email address.</p>
            )}
            {newsletterStatus === 'success' && (
              <p className="text-xs text-[#C9A24B] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Subscribed to the Quarterly Market Dossier.</span>
              </p>
            )}
          </div>
        </div>

        {/* Bottom Compliance & Equal Housing Row */}
        <div className="pt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-xs text-[#F7F5F0]/55">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Equal Housing Opportunity SVG + Notice */}
            <div className="flex items-center gap-2.5 text-[#F7F5F0]/75 shrink-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="text-[#C9A24B]"
              >
                <path
                  d="M12 3L2 10H5V20H19V10H22L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M8.5 12.5H15.5M8.5 15.5H15.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="font-medium">Equal Housing Opportunity</span>
            </div>
            <span className="hidden sm:inline" aria-hidden="true">
              ·
            </span>
            <span>{COMPANY_CONFIG.licensePlaceholder}</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <span>
              &copy; {COMPANY_CONFIG.copyrightYear} {COMPANY_CONFIG.legalName}
            </span>
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-[#F7F5F0] underline underline-offset-4 decoration-white/20 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-[#F7F5F0] underline underline-offset-4 decoration-white/20 cursor-pointer"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      {/* Privacy / Terms Modal */}
      <AnimatePresence>
        {legalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#0B1220]/80 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
            onClick={() => setLegalModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F7F5F0] text-[#0B1220] max-w-lg w-full rounded-sm p-6 sm:p-8 border border-[#C9A24B]/30"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 id="legal-modal-title" className="font-serif text-2xl font-medium">
                  {legalModal === 'privacy' ? 'Privacy & Confidentiality Policy' : 'Terms of Use & Fair Housing'}
                </h3>
                <button
                  type="button"
                  onClick={() => setLegalModal(null)}
                  aria-label="Close legal notice"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-sm border border-[#0B1220]/15 hover:bg-[#0B1220] hover:text-[#F7F5F0] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-[#0B1220]/75 space-y-3 leading-relaxed">
                {legalModal === 'privacy' ? (
                  <>
                    <p>
                      {COMPANY_CONFIG.legalName} treats all client inquiries, financial modeling
                      inputs, and tour requests with strict confidentiality. Contact details
                      submitted via this website are used solely to coordinate brokerage services.
                    </p>
                    <p>
                      This website operates as a client-side showcase with placeholder brokerage
                      data; no personal information is transmitted to external third-party brokers.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      All property specifications, pricing, and square footage figures displayed on
                      this site are placeholder representations for architectural demonstration and
                      are subject to prior sale, change, or withdrawal without notice.
                    </p>
                    <p>
                      {COMPANY_CONFIG.legalName} is committed to compliance with the Federal Fair
                      Housing Act and state equal housing opportunity statutes across all US
                      jurisdictions.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
