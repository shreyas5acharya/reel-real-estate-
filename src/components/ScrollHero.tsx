import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/realEstateData';
import { MagneticButton } from './MagneticButton';

/**
 * Hero Sequence Configuration
 * Adjust FRAME_COUNT, FRAME_PATH, or SCROLL_HEIGHT to customize the scroll-driven drone sequence.
 */
export const FRAME_COUNT = 120;
export const FRAME_PATH = (index: number) =>
  `/frames/frame_${String(index).padStart(3, '0')}.webp`;
export const SCROLL_HEIGHT = '400vh';

const LERP_FACTOR = 0.1;

interface ScrollHeroProps {
  onExploreListings: () => void;
  onBookTour: () => void;
}

export const ScrollHero: React.FC<ScrollHeroProps> = ({
  onExploreListings,
  onBookTour,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store loaded HTMLImageElement instances indexed 0..(FRAME_COUNT - 1)
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const scrollProgressRef = useRef<number>(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Draw a specific frame onto the high-DPI canvas using object-fit: cover math
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex));
    // Fallback to nearest loaded image if a frame is missing
    let img = imagesRef.current[clampedIndex];
    if (!img) {
      img = imagesRef.current.find((item) => item !== null) ?? null;
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Cover-fit calculation (equivalent to object-fit: cover)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Preload all frames (or only frame 1 when reduced motion is active)
  useEffect(() => {
    let isCancelled = false;
    const countToLoad = prefersReducedMotion ? 1 : FRAME_COUNT;
    imagesRef.current = new Array(FRAME_COUNT).fill(null);

    let completedCount = 0;

    const handleAssetSettled = () => {
      if (isCancelled) return;
      completedCount += 1;
      const pct = Math.round((completedCount / countToLoad) * 100);
      setLoadProgress(pct);

      if (completedCount >= countToLoad) {
        setIsLoaded(true);
        // Ensure frame 0 is drawn immediately on reveal
        requestAnimationFrame(() => {
          drawFrame(0);
          lastDrawnFrameRef.current = 0;
        });
      }
    };

    for (let i = 1; i <= countToLoad; i++) {
      const img = new Image();
      img.decoding = 'async';
      const idx = i - 1;
      img.onload = () => {
        imagesRef.current[idx] = img;
        if (idx === 0) {
          drawFrame(0);
        }
        handleAssetSettled();
      };
      img.onerror = () => {
        handleAssetSettled();
      };
      img.src = FRAME_PATH(i);
    }

    return () => {
      isCancelled = true;
    };
  }, [prefersReducedMotion]);

  // Handle scroll progress, window resize, and requestAnimationFrame lerp loop
  useEffect(() => {
    if (!isLoaded) return;

    const handleResize = () => {
      lastDrawnFrameRef.current = -1;
      drawFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    if (prefersReducedMotion) {
      drawFrame(0);
      return () => window.removeEventListener('resize', handleResize);
    }

    const updateScrollTarget = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scrollableDistance = Math.max(1, wrapper.offsetHeight - window.innerHeight);
      const rawProgress = -rect.top / scrollableDistance;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      scrollProgressRef.current = clamped;
      targetFrameRef.current = clamped * (FRAME_COUNT - 1);
      setScrollProgress(clamped);
    };

    updateScrollTarget();
    window.addEventListener('scroll', updateScrollTarget, { passive: true });

    let rafId = 0;
    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * LERP_FACTOR;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const roundedFrame = Math.round(currentFrameRef.current);
      if (roundedFrame !== lastDrawnFrameRef.current) {
        drawFrame(roundedFrame);
        lastDrawnFrameRef.current = roundedFrame;
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, prefersReducedMotion]);

  // Compute smooth opacities & vertical drifts for the three scroll beats
  const getPhaseOpacity = (p: number, fadeInStart: number, peakStart: number, peakEnd: number, fadeOutEnd: number) => {
    if (prefersReducedMotion) return fadeInStart === 0 ? 1 : 0;
    if (p <= fadeInStart && fadeInStart > 0) return 0;
    if (p >= fadeOutEnd && fadeOutEnd < 1) return 0;
    if (p < peakStart) {
      return Math.max(0, Math.min(1, (p - fadeInStart) / Math.max(0.001, peakStart - fadeInStart)));
    }
    if (p > peakEnd && fadeOutEnd < 1) {
      return Math.max(0, Math.min(1, 1 - (p - peakEnd) / Math.max(0.001, fadeOutEnd - peakEnd)));
    }
    return 1;
  };

  // Beat 1: 0–20% (visible at 0%, fades out cleanly between 16% and 26%)
  const phase1Opacity = prefersReducedMotion ? 1 : getPhaseOpacity(scrollProgress, 0, 0, 0.16, 0.25);
  // Beat 2: 35–60% (fades in 28%–35%, holds 35%–58%, fades out 58%–66%)
  const phase2Opacity = prefersReducedMotion ? 0 : getPhaseOpacity(scrollProgress, 0.28, 0.35, 0.58, 0.66);
  // Beat 3: 75–100% (fades in 69%–76%, stays visible through 100%)
  const phase3Opacity = prefersReducedMotion ? 0 : scrollProgress >= 0.69 ? Math.min(1, (scrollProgress - 0.69) / 0.08) : 0;

  const scrollCueOpacity = prefersReducedMotion ? 0 : Math.max(0, 1 - scrollProgress / 0.07);

  return (
    <>
      {/* Minimalist Fullscreen Frame Preloader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="hero-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#0B1220] text-[#F7F5F0] flex flex-col items-center justify-center px-6"
            role="status"
            aria-label="Loading architectural experience"
          >
            <div className="w-full max-w-xs text-center space-y-6">
              <p className="font-serif text-2xl sm:text-3xl tracking-tight text-[#F7F5F0]">
                {COMPANY_CONFIG.name}
              </p>
              <div className="space-y-3">
                <div className="h-[1px] w-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full bg-[#C9A24B] transition-all duration-150 ease-out"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs tracking-widest uppercase text-[#F7F5F0]/70 font-mono tabular-nums">
                  <span>Preparing Residences</span>
                  <span>{loadProgress}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll-Driven Hero Wrapper */}
      <section
        id="hero"
        ref={wrapperRef}
        aria-label="Architectural Showcase"
        style={{ height: prefersReducedMotion ? '100vh' : SCROLL_HEIGHT }}
        className="relative w-full bg-[#0B1220]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Fullscreen High-DPI Canvas */}
          <canvas
            ref={canvasRef}
            className="block w-full h-full"
            aria-label="Aerial architectural drone sequence of a luxury residential tower at twilight"
          />

          {/* Subtle Dark Contrast Scrim */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/60 via-[#0B1220]/30 to-[#0B1220]/85 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/65 via-transparent to-[#0B1220]/30 pointer-events-none"
          />

          {/* Overlay Story Beats */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center pointer-events-none">
            {/* Beat 1: 0–20% */}
            <div
              style={{
                opacity: phase1Opacity,
                transform: `translate3d(0, ${(1 - phase1Opacity) * 18}px, 0)`,
              }}
              className={`max-w-2xl transition-none ${
                phase1Opacity > 0.25 ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              aria-hidden={phase1Opacity < 0.1}
            >
              <p className="text-xs sm:text-sm tracking-[0.22em] uppercase text-[#C9A24B] font-medium mb-4">
                {COMPANY_CONFIG.name} · Coast to Coast
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4.25rem] leading-[1.06] text-[#F7F5F0] font-medium tracking-tight mb-6">
                Find Your Place in America.
              </h1>
              <p className="text-base sm:text-lg text-[#F7F5F0]/85 leading-relaxed max-w-xl mb-8">
                Private brokerage and architectural advisory for landmark penthouses, coastal
                estates, and mountain sanctuaries across fourteen flagship US markets.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton
                  onClick={onExploreListings}
                  className="bg-[#C9A24B] hover:bg-[#DFBE6F] text-[#0B1220] font-medium text-sm px-7 py-3.5 rounded-sm tracking-wide gap-2.5"
                >
                  <span>Explore Listings</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </MagneticButton>
                {prefersReducedMotion && (
                  <MagneticButton
                    onClick={onBookTour}
                    className="border border-[#F7F5F0]/40 hover:border-[#C9A24B] text-[#F7F5F0] font-medium text-sm px-7 py-3.5 rounded-sm tracking-wide"
                  >
                    Book a Private Tour
                  </MagneticButton>
                )}
              </div>
            </div>

            {/* Beat 2: 35–60% */}
            <div
              style={{
                opacity: phase2Opacity,
                transform: `translate3d(0, ${(1 - phase2Opacity) * 20}px, 0)`,
              }}
              className="absolute inset-x-6 sm:inset-x-10 lg:inset-x-12 max-w-3xl pointer-events-none"
              aria-hidden={phase2Opacity < 0.1}
            >
              <p className="text-xs sm:text-sm tracking-[0.22em] uppercase text-[#C9A24B] font-medium mb-4">
                National Track Record · Placeholder Benchmark
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.1] text-[#F7F5F0] font-medium tracking-tight tabular-nums mb-5">
                12,000+ Homes Sold. $4.2B in Closed Volume.
              </h2>
              <p className="text-base sm:text-lg text-[#F7F5F0]/80 leading-relaxed max-w-xl">
                Representing buyers, architectural developers, and family offices from Fifth Avenue
                to Beverly Hills with discreet market intelligence.
              </p>
            </div>

            {/* Beat 3: 75–100% */}
            <div
              style={{
                opacity: phase3Opacity,
                transform: `translate3d(0, ${(1 - phase3Opacity) * 20}px, 0)`,
              }}
              className={`absolute inset-x-6 sm:inset-x-10 lg:inset-x-12 max-w-2xl ${
                phase3Opacity > 0.25 ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              aria-hidden={phase3Opacity < 0.1}
            >
              <p className="text-xs sm:text-sm tracking-[0.22em] uppercase text-[#C9A24B] font-medium mb-4">
                Private Client Advisory
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-[#F7F5F0] font-medium tracking-tight mb-6">
                Your Next Chapter Starts Here.
              </h2>
              <p className="text-base sm:text-lg text-[#F7F5F0]/85 leading-relaxed max-w-xl mb-8">
                Arrange an unhurried private showing—in person or via live 4K architectural
                walkthrough—guided by a senior market partner.
              </p>
              <MagneticButton
                onClick={onBookTour}
                className="bg-[#C9A24B] hover:bg-[#DFBE6F] text-[#0B1220] font-medium text-sm px-7 py-3.5 rounded-sm tracking-wide gap-2.5"
              >
                <span>Book a Private Tour</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </div>

          {/* Scroll Progress Micro-Rail (right edge on desktop) */}
          {!prefersReducedMotion && (
            <div
              aria-hidden="true"
              className="hidden md:flex flex-col items-center gap-2 absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <span className="text-[10px] font-mono tabular-nums text-[#F7F5F0]/70 tracking-widest">
                {String(Math.round(scrollProgress * (FRAME_COUNT - 1)) + 1).padStart(3, '0')}
              </span>
              <div className="w-[1px] h-24 bg-white/20 relative overflow-hidden">
                <div
                  className="w-full bg-[#C9A24B] origin-top"
                  style={{ height: `${Math.max(8, scrollProgress * 100)}%` }}
                />
              </div>
              <span className="text-[10px] font-mono tabular-nums text-[#F7F5F0]/45 tracking-widest">
                {FRAME_COUNT}
              </span>
            </div>
          )}

          {/* Scroll-Down Indicator that fades out on scroll */}
          {!prefersReducedMotion && (
            <div
              style={{ opacity: scrollCueOpacity }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
              aria-hidden={scrollCueOpacity < 0.05}
            >
              <span className="text-[11px] tracking-[0.22em] uppercase text-[#F7F5F0]/75">
                Scroll to Ascend
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="w-4 h-4 text-[#C9A24B]" />
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
