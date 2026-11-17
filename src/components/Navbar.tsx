import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { COMPANY_CONFIG, ListingTransaction } from '../data/realEstateData';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  onSelectTransaction: (mode: ListingTransaction | 'All') => void;
  onSelectService?: (serviceId: string) => void;
  onScheduleTour: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectTransaction,
  onSelectService,
  onScheduleTour,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavAction = (action: 'Buy' | 'Rent' | 'Sell' | 'Neighborhoods' | 'Agents' | 'Contact') => {
    if (action === 'Buy') {
      onSelectTransaction('Buy');
      scrollToSection('listings');
    } else if (action === 'Rent') {
      onSelectTransaction('Rent');
      scrollToSection('listings');
    } else if (action === 'Sell') {
      onSelectService?.('selling');
      scrollToSection('services');
    } else if (action === 'Neighborhoods') {
      scrollToSection('neighborhoods');
    } else if (action === 'Agents') {
      scrollToSection('agents');
    } else if (action === 'Contact') {
      scrollToSection('contact');
    }
  };

  const navItems: Array<'Buy' | 'Rent' | 'Sell' | 'Neighborhoods' | 'Agents' | 'Contact'> = [
    'Buy',
    'Rent',
    'Sell',
    'Neighborhoods',
    'Agents',
    'Contact',
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1220]/85 backdrop-blur-lg border-b border-white/10 py-3.5 shadow-sm'
          : 'bg-[#0B1220]/35 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#F7F5F0] whitespace-nowrap shrink-0 hover:text-[#C9A24B] transition-colors"
        >
          {COMPANY_CONFIG.name}
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-normal text-[#F7F5F0]/85"
        >
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleNavAction(item)}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#F7F5F0] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#C9A24B] hover:after:w-full after:transition-all after:duration-200 cursor-pointer"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block">
            <MagneticButton
              onClick={() => {
                setMobileOpen(false);
                onScheduleTour();
              }}
              className="bg-[#C9A24B] hover:bg-[#DFBE6F] text-[#0B1220] text-xs font-medium tracking-wide px-5 py-2.5 rounded-sm"
            >
              Schedule a Tour
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-sm text-[#F7F5F0] hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#0B1220]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleNavAction(item)}
                  className="text-left py-3 px-2 text-base font-medium text-[#F7F5F0]/90 hover:text-[#C9A24B] border-b border-white/5 transition-colors"
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onScheduleTour();
                }}
                className="mt-4 w-full bg-[#C9A24B] hover:bg-[#DFBE6F] text-[#0B1220] font-medium text-sm py-3.5 px-4 rounded-sm transition-colors"
              >
                Schedule a Tour
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
