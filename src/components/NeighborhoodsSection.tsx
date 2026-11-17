import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { NEIGHBORHOODS, NeighborhoodCity } from '../data/realEstateData';

interface NeighborhoodsSectionProps {
  onSelectCity: (locationLabel: string) => void;
}

export const NeighborhoodsSection: React.FC<NeighborhoodsSectionProps> = ({
  onSelectCity,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const desktopStageRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: desktopStageRef,
    offset: ['start start', 'end end'],
  });

  // Translate 5 cards horizontally across the sticky viewport on desktop scroll
  const xTransform = useTransform(scrollYProgress, [0, 1], ['0%', '-48%']);
  const imageParallax = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  const scrollMobileTrack = (direction: 'prev' | 'next') => {
    if (!mobileTrackRef.current) return;
    const distance = direction === 'next' ? 360 : -360;
    mobileTrackRef.current.scrollBy({ left: distance, behavior: 'smooth' });
  };

  const renderCityCard = (city: NeighborhoodCity, useParallax: boolean) => (
    <article
      key={city.id}
      className="group relative flex-shrink-0 w-[82vw] sm:w-[380px] lg:w-[440px] bg-[#152036] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0B1220]">
        <motion.img
          src={city.image}
          alt={city.imageAlt}
          loading="lazy"
          referrerPolicy="no-referrer"
          style={useParallax && !prefersReducedMotion ? { x: imageParallax, scale: 1.08 } : undefined}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/25 to-transparent"
        />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-[#C9A24B] font-medium tracking-wider uppercase">
              {city.district}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F5F0] font-medium mt-0.5">
              {city.city}, {city.state}
            </h3>
          </div>
          <span className="text-xs font-mono tabular-nums text-[#F7F5F0]/80">
            {city.activeResidences} Listings
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
        <p className="text-sm text-[#F7F5F0]/75 leading-relaxed">{city.character}</p>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs tabular-nums">
            <div>
              <span className="block text-[#F7F5F0]/50">Median Luxury</span>
              <span className="font-semibold text-[#F7F5F0]">{city.medianPrice}</span>
            </div>
            <div className="h-6 w-[1px] bg-white/10" aria-hidden="true" />
            <div>
              <span className="block text-[#F7F5F0]/50">Annual Trend</span>
              <span className="font-semibold text-[#C9A24B]">{city.yoyAppreciation}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCity(`${city.city}, ${city.state}`)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C9A24B] hover:text-[#DFBE6F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Explore Market</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <section
      id="neighborhoods"
      aria-labelledby="neighborhoods-heading"
      className="bg-[#0B1220] text-[#F7F5F0]"
    >
      {/* Desktop Scroll-Linked Horizontal Parallax Stage */}
      {!prefersReducedMotion ? (
        <div ref={desktopStageRef} className="hidden lg:block relative h-[220vh]">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-16">
            <div className="max-w-7xl w-full mx-auto px-12 mb-10 flex items-end justify-between gap-8">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium mb-3">
                  Keystone Corridors
                </p>
                <h2
                  id="neighborhoods-heading"
                  className="font-serif text-4xl lg:text-5xl font-medium tracking-tight text-[#F7F5F0]"
                >
                  Five Flagship American Markets
                </h2>
              </div>
              <p className="text-sm text-[#F7F5F0]/65 max-w-sm leading-relaxed">
                From pre-war Manhattan avenues to alpine retreats in Aspen, each office operates
                with dedicated local partners.
              </p>
            </div>

            <div className="pl-12 overflow-visible">
              <motion.div style={{ x: xTransform }} className="flex gap-8 w-max pr-24">
                {NEIGHBORHOODS.map((city) => renderCityCard(city, true))}
              </motion.div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile / Tablet / Reduced-Motion Horizontal Scroll Track */}
      <div className={`${prefersReducedMotion ? 'block' : 'lg:hidden'} py-20 px-6 sm:px-10`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium mb-3">
                Keystone Corridors
              </p>
              <h2
                id={prefersReducedMotion ? 'neighborhoods-heading' : undefined}
                className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#F7F5F0]"
              >
                Five Flagship American Markets
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollMobileTrack('prev')}
                aria-label="Scroll neighborhoods left"
                className="w-11 h-11 inline-flex items-center justify-center rounded-sm border border-white/15 text-[#F7F5F0] hover:border-[#C9A24B] hover:text-[#C9A24B] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollMobileTrack('next')}
                aria-label="Scroll neighborhoods right"
                className="w-11 h-11 inline-flex items-center justify-center rounded-sm border border-white/15 text-[#F7F5F0] hover:border-[#C9A24B] hover:text-[#C9A24B] transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={mobileTrackRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin"
          >
            {NEIGHBORHOODS.map((city) => (
              <div key={city.id} className="snap-start">
                {renderCityCard(city, false)}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-[#F7F5F0]/55">
            <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" aria-hidden="true" />
            <span>Select any city to filter featured residences</span>
          </div>
        </div>
      </div>
    </section>
  );
};
