/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { ScrollHero } from './components/ScrollHero';
import { StatsBar } from './components/StatsBar';
import { ListingsSection, SearchFilters } from './components/ListingsSection';
import { NeighborhoodsSection } from './components/NeighborhoodsSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUsTimeline } from './components/WhyChooseUsTimeline';
import { MortgageCalculator } from './components/MortgageCalculator';
import { AgentsSection } from './components/AgentsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactPrefill, ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import {
  AgentProfile,
  ListingTransaction,
  PropertyListing,
} from './data/realEstateData';

const INITIAL_FILTERS: SearchFilters = {
  location: 'All Markets',
  category: 'All',
  priceRange: 'any',
  minBeds: 0,
  transaction: 'All',
};

const formatUsd = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

export default function App() {
  const [filters, setFilters] = useState<SearchFilters>(INITIAL_FILTERS);
  const [activeServiceId, setActiveServiceId] = useState<string>('buying');
  const [contactPrefill, setContactPrefill] = useState<ContactPrefill | null>(null);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectTransaction = (mode: ListingTransaction | 'All') => {
    setFilters((prev) => ({
      ...prev,
      transaction: mode,
    }));
  };

  const handleSelectCity = (locationLabel: string) => {
    setFilters({
      location: locationLabel,
      category: 'All',
      priceRange: 'any',
      minBeds: 0,
      transaction: 'All',
    });
    scrollToId('listings');
  };

  const handleScheduleTour = () => {
    setContactPrefill({
      interest: 'Schedule a Private Tour',
      marketOrProperty: 'New York, NY',
      message:
        'I would like to schedule a confidential private tour with a senior market partner.',
    });
    scrollToId('contact');
  };

  const handleRequestTourForProperty = (property: PropertyListing) => {
    setContactPrefill({
      interest: 'Schedule a Private Tour',
      marketOrProperty: `${property.title} (${property.locationLabel})`,
      message: `Please arrange a private tour for ${property.title} at ${property.address}, ${property.locationLabel} (${formatUsd(property.price)}).`,
    });
    scrollToId('contact');
  };

  const handleInquireService = (serviceTitle: string) => {
    const interestMap: Record<string, string> = {
      Buying: 'Buying Representation',
      Selling: 'Selling / Property Valuation',
      'Property Management': 'Property Management',
      'Investment Advisory': 'Investment Advisory',
      Relocation: 'Executive Relocation',
    };

    setContactPrefill({
      interest: interestMap[serviceTitle] ?? 'Schedule a Private Tour',
      message: `I would like to speak with an advisor regarding ${serviceTitle} services.`,
    });
    scrollToId('contact');
  };

  const handleApplyBudget = (homePrice: number) => {
    setContactPrefill({
      interest: 'Buying Representation',
      message: `Target acquisition budget modeled at ${formatUsd(homePrice)}. Please share matching public and off-market residences.`,
    });
    scrollToId('contact');
  };

  const handleConnectAgent = (agent: AgentProfile) => {
    setContactPrefill({
      interest: 'Schedule a Private Tour',
      marketOrProperty: agent.market,
      message: `Please connect me directly with ${agent.name} (${agent.role}) regarding opportunities in ${agent.market}.`,
    });
    scrollToId('contact');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F7F5F0] text-[#0B1220] selection:bg-[#C9A24B]/30 selection:text-[#0B1220]">
        <a
          href="#listings"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:bg-[#C9A24B] focus:text-[#0B1220] focus:px-4 focus:py-2 focus:rounded-sm focus:text-xs focus:font-medium"
        >
          Skip to featured listings
        </a>

        <CustomCursor />

        <Navbar
          onSelectTransaction={handleSelectTransaction}
          onSelectService={setActiveServiceId}
          onScheduleTour={handleScheduleTour}
        />

        <main>
          <ScrollHero
            onExploreListings={() => scrollToId('listings')}
            onBookTour={handleScheduleTour}
          />

          <StatsBar />

          <ListingsSection
            filters={filters}
            onFiltersChange={setFilters}
            onRequestTourForProperty={handleRequestTourForProperty}
          />

          <NeighborhoodsSection onSelectCity={handleSelectCity} />

          <ServicesSection
            activeServiceId={activeServiceId}
            onSelectService={setActiveServiceId}
            onInquireService={handleInquireService}
          />

          <WhyChooseUsTimeline />

          <MortgageCalculator onApplyBudget={handleApplyBudget} />

          <AgentsSection onConnectAgent={handleConnectAgent} />

          <TestimonialsSection />

          <ContactSection prefill={contactPrefill} />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
