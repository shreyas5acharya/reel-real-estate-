import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  BedDouble,
  Bath,
  Maximize2,
  RotateCcw,
  Search,
  X,
  Check,
} from 'lucide-react';
import {
  FEATURED_LISTINGS,
  ListingCategory,
  ListingTransaction,
  PropertyListing,
} from '../data/realEstateData';
import { MagneticButton } from './MagneticButton';

export interface SearchFilters {
  location: string;
  category: ListingCategory | 'All';
  priceRange: 'any' | 'under-6m' | '6m-12m' | '12m-plus';
  minBeds: number;
  transaction: ListingTransaction | 'All';
}

interface ListingsSectionProps {
  filters: SearchFilters;
  onFiltersChange: React.Dispatch<React.SetStateAction<SearchFilters>>;
  onRequestTourForProperty: (property: PropertyListing) => void;
}

const FILTER_CATEGORIES: Array<ListingCategory | 'All'> = [
  'All',
  'Luxury',
  'Condos',
  'Family Homes',
  'Investment',
];

const LOCATIONS = [
  'All Markets',
  'Miami, FL',
  'New York, NY',
  'Los Angeles, CA',
  'Austin, TX',
  'Aspen, CO',
  'San Francisco, CA',
];

const formatUsd = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

export const ListingsSection: React.FC<ListingsSectionProps> = ({
  filters,
  onFiltersChange,
  onRequestTourForProperty,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const filteredListings = useMemo(() => {
    return FEATURED_LISTINGS.filter((item) => {
      if (filters.transaction !== 'All' && item.transaction !== filters.transaction) {
        return false;
      }
      if (filters.category !== 'All' && item.category !== filters.category) {
        return false;
      }
      if (filters.location !== 'All Markets' && item.locationLabel !== filters.location) {
        return false;
      }
      if (filters.minBeds > 0 && item.beds < filters.minBeds) {
        return false;
      }
      if (filters.priceRange === 'under-6m' && item.price >= 6000000) {
        return false;
      }
      if (
        filters.priceRange === '6m-12m' &&
        (item.price < 6000000 || item.price > 12000000)
      ) {
        return false;
      }
      if (filters.priceRange === '12m-plus' && item.price <= 12000000) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const hasActiveFilters =
    filters.location !== 'All Markets' ||
    filters.category !== 'All' ||
    filters.priceRange !== 'any' ||
    filters.minBeds > 0 ||
    filters.transaction !== 'All';

  const resetFilters = () => {
    onFiltersChange({
      location: 'All Markets',
      category: 'All',
      priceRange: 'any',
      minBeds: 0,
      transaction: 'All',
    });
  };

  return (
    <section
      id="listings"
      aria-labelledby="listings-heading"
      className="py-20 lg:py-28 bg-[#F7F5F0] text-[#0B1220]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium mb-3">
              Curated Portfolio
            </p>
            <h2
              id="listings-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0B1220]"
            >
              Featured Residences Across America
            </h2>
          </div>

          {/* Buy / Rent Segmented Switch */}
          <div
            role="group"
            aria-label="Listing transaction type"
            className="inline-flex items-center p-1 bg-[#ECE8DF] rounded-sm self-start lg:self-auto"
          >
            {(['All', 'Buy', 'Rent'] as const).map((mode) => {
              const active = filters.transaction === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() =>
                    onFiltersChange((prev) => ({ ...prev, transaction: mode }))
                  }
                  className={`px-4 py-2 text-xs font-medium rounded-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0B1220] text-[#F7F5F0]'
                      : 'text-[#0B1220]/70 hover:text-[#0B1220]'
                  }`}
                >
                  {mode === 'All' ? 'All Offerings' : mode === 'Buy' ? 'For Sale' : 'For Lease'}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Smart Search Bar */}
        <div
          id="search"
          className="bg-white border border-[#0B1220]/10 rounded-sm p-5 sm:p-6 mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Location */}
            <div>
              <label
                htmlFor="search-location"
                className="block text-xs font-medium text-[#0B1220]/70 mb-2"
              >
                Location
              </label>
              <select
                id="search-location"
                value={filters.location}
                onChange={(e) =>
                  onFiltersChange((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full h-11 px-3 bg-[#F7F5F0] border border-[#0B1220]/15 rounded-sm text-sm text-[#0B1220] focus:border-[#C9A24B]"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label
                htmlFor="search-type"
                className="block text-xs font-medium text-[#0B1220]/70 mb-2"
              >
                Property Type
              </label>
              <select
                id="search-type"
                value={filters.category}
                onChange={(e) =>
                  onFiltersChange((prev) => ({
                    ...prev,
                    category: e.target.value as ListingCategory | 'All',
                  }))
                }
                className="w-full h-11 px-3 bg-[#F7F5F0] border border-[#0B1220]/15 rounded-sm text-sm text-[#0B1220] focus:border-[#C9A24B]"
              >
                {FILTER_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Property Types' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label
                htmlFor="search-price"
                className="block text-xs font-medium text-[#0B1220]/70 mb-2"
              >
                Price Range (USD)
              </label>
              <select
                id="search-price"
                value={filters.priceRange}
                onChange={(e) =>
                  onFiltersChange((prev) => ({
                    ...prev,
                    priceRange: e.target.value as SearchFilters['priceRange'],
                  }))
                }
                className="w-full h-11 px-3 bg-[#F7F5F0] border border-[#0B1220]/15 rounded-sm text-sm text-[#0B1220] focus:border-[#C9A24B]"
              >
                <option value="any">Any Valuation</option>
                <option value="under-6m">Under $6,000,000</option>
                <option value="6m-12m">$6,000,000 – $12,000,000</option>
                <option value="12m-plus">$12,000,000+</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label
                htmlFor="search-beds"
                className="block text-xs font-medium text-[#0B1220]/70 mb-2"
              >
                Bedrooms
              </label>
              <select
                id="search-beds"
                value={filters.minBeds}
                onChange={(e) =>
                  onFiltersChange((prev) => ({
                    ...prev,
                    minBeds: Number(e.target.value),
                  }))
                }
                className="w-full h-11 px-3 bg-[#F7F5F0] border border-[#0B1220]/15 rounded-sm text-sm text-[#0B1220] focus:border-[#C9A24B]"
              >
                <option value={0}>Any Bedrooms</option>
                <option value={4}>4+ Bedrooms</option>
                <option value={5}>5+ Bedrooms</option>
                <option value={6}>6+ Bedrooms</option>
              </select>
            </div>

            {/* Status / Reset */}
            <div className="flex items-center justify-between sm:justify-end gap-3 h-11">
              <span className="text-xs text-[#0B1220]/65 font-mono tabular-nums whitespace-nowrap">
                {filteredListings.length}{' '}
                {filteredListings.length === 1 ? 'Residence' : 'Residences'}
              </span>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 h-11 px-4 text-xs font-medium text-[#0B1220] bg-[#ECE8DF] hover:bg-[#DFD9CC] rounded-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-1.5 h-11 px-4 text-xs font-medium text-[#F7F5F0] bg-[#0B1220] rounded-sm whitespace-nowrap shrink-0">
                  <Search className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
                  <span>Live Filter</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter listings by architectural category"
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {FILTER_CATEGORIES.map((category) => {
            const isActive = filters.category === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() =>
                  onFiltersChange((prev) => ({ ...prev, category }))
                }
                className={`px-4 py-2 text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0B1220] text-[#F7F5F0] border-[#0B1220]'
                    : 'bg-transparent text-[#0B1220]/75 border-[#0B1220]/15 hover:border-[#0B1220]/40 hover:text-[#0B1220]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Property Grid */}
        {filteredListings.length === 0 ? (
          <div className="bg-white border border-[#0B1220]/10 rounded-sm py-16 px-6 text-center">
            <p className="font-serif text-2xl text-[#0B1220] mb-2">
              No residences match your current criteria
            </p>
            <p className="text-sm text-[#0B1220]/65 max-w-md mx-auto mb-6">
              Expand your valuation range or clear active filters to view our full nationwide
              collection.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1220] text-[#F7F5F0] text-xs font-medium rounded-sm hover:bg-[#152036] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Show All 6 Featured Residences</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((property, index) => (
              <motion.article
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: (index % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-white border border-[#0B1220]/10 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C9A24B]/60 flex flex-col"
              >
                {/* Property Image */}
                <button
                  type="button"
                  data-cursor="view"
                  onClick={() => setSelectedProperty(property)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#152036] text-left cursor-pointer"
                  aria-label={`View details for ${property.title} in ${property.locationLabel}`}
                >
                  {!brokenImages[property.id] ? (
                    <img
                      src={property.image}
                      alt={property.imageAlt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setBrokenImages((prev) => ({ ...prev, [property.id]: true }))
                      }
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-[#F7F5F0]/80 bg-gradient-to-br from-[#0B1220] to-[#152036]">
                      <span className="font-serif text-lg text-center">{property.title}</span>
                      <span className="text-xs text-[#C9A24B] mt-1">
                        {property.locationLabel}
                      </span>
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 text-xs font-medium text-[#F7F5F0] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    <span>View Residence</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A24B]" />
                  </span>
                </button>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Quiet unboxed metadata line */}
                    <div className="flex items-center gap-2 text-xs text-[#0B1220]/60 mb-2">
                      <span className="font-medium text-[#0B1220]/85">
                        {property.locationLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{property.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {property.transaction === 'Buy' ? 'For Sale' : 'For Lease'}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-medium text-[#0B1220] leading-snug mb-1 group-hover:text-[#0B1220]">
                      <button
                        type="button"
                        onClick={() => setSelectedProperty(property)}
                        className="text-left hover:underline decoration-[#C9A24B] underline-offset-4 cursor-pointer"
                      >
                        {property.title}
                      </button>
                    </h3>
                    <p className="text-xs text-[#0B1220]/55 mb-4">{property.address}</p>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-4">
                      <p className="font-serif text-2xl font-semibold text-[#0B1220] tabular-nums">
                        {property.transaction === 'Rent' && property.monthlyRent
                          ? `${formatUsd(property.monthlyRent)} / mo`
                          : formatUsd(property.price)}
                      </p>
                      {property.transaction === 'Rent' && (
                        <span className="text-xs text-[#0B1220]/55 tabular-nums">
                          Ask: {formatUsd(property.price)}
                        </span>
                      )}
                    </div>

                    {/* Specs Row */}
                    <div className="pt-4 border-t border-[#0B1220]/10 flex items-center justify-between text-xs text-[#0B1220]/75 tabular-nums">
                      <span className="inline-flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
                        <span>{property.beds} Beds</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Bath className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
                        <span>{property.baths} Baths</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
                        <span>{property.sqft.toLocaleString('en-US')} sq ft</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Property Quick-View Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-[#0B1220]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-property-title"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F7F5F0] text-[#0B1220] w-full max-w-4xl rounded-sm overflow-hidden border border-[#C9A24B]/30 shadow-2xl my-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full bg-[#152036]">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-xs text-[#C9A24B] font-medium tracking-wider uppercase mb-1">
                          {selectedProperty.locationLabel} · {selectedProperty.category}
                        </p>
                        <h3
                          id="modal-property-title"
                          className="font-serif text-2xl sm:text-3xl font-medium text-[#0B1220]"
                        >
                          {selectedProperty.title}
                        </h3>
                        <p className="text-xs text-[#0B1220]/60 mt-1">
                          {selectedProperty.address} · Built {selectedProperty.yearBuilt} ·{' '}
                          {selectedProperty.architect}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedProperty(null)}
                        aria-label="Close property details"
                        className="w-10 h-10 inline-flex items-center justify-center rounded-sm border border-[#0B1220]/15 text-[#0B1220] hover:bg-[#0B1220] hover:text-[#F7F5F0] transition-colors shrink-0 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-serif text-3xl font-semibold text-[#0B1220] tabular-nums mb-4">
                      {selectedProperty.transaction === 'Rent' && selectedProperty.monthlyRent
                        ? `${formatUsd(selectedProperty.monthlyRent)} / month`
                        : formatUsd(selectedProperty.price)}
                    </p>

                    <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#0B1220]/10 text-xs tabular-nums mb-5">
                      <div>
                        <span className="block text-[#0B1220]/55">Bedrooms</span>
                        <span className="font-semibold text-sm">{selectedProperty.beds}</span>
                      </div>
                      <div>
                        <span className="block text-[#0B1220]/55">Bathrooms</span>
                        <span className="font-semibold text-sm">{selectedProperty.baths}</span>
                      </div>
                      <div>
                        <span className="block text-[#0B1220]/55">Interior Area</span>
                        <span className="font-semibold text-sm">
                          {selectedProperty.sqft.toLocaleString('en-US')} sq ft
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[#0B1220]/80 leading-relaxed mb-5">
                      {selectedProperty.summary}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {selectedProperty.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-[#0B1220]/80">
                          <Check className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#0B1220]/10">
                    <MagneticButton
                      onClick={() => {
                        const prop = selectedProperty;
                        setSelectedProperty(null);
                        onRequestTourForProperty(prop);
                      }}
                      className="bg-[#0B1220] hover:bg-[#152036] text-[#F7F5F0] text-xs font-medium px-6 py-3.5 rounded-sm"
                    >
                      Schedule Private Tour
                    </MagneticButton>
                    <button
                      type="button"
                      onClick={() => setSelectedProperty(null)}
                      className="px-5 py-3.5 text-xs font-medium text-[#0B1220]/70 hover:text-[#0B1220] cursor-pointer"
                    >
                      Continue Browsing
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
