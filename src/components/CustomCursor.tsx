import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

/**
 * CustomCursor — Minimalist luxury ring cursor shown only on desktop fine pointers.
 * Automatically disabled on touch screens and when prefers-reduced-motion is active.
 */
export const CustomCursor: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoverMode, setHoverMode] = useState<'default' | 'interactive' | 'view'>('default');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 450, damping: 32, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 450, damping: 32, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    const mediaQuery = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const updateEnabled = () => setEnabled(mediaQuery.matches);
    updateEnabled();
    mediaQuery.addEventListener('change', updateEnabled);

    return () => mediaQuery.removeEventListener('change', updateEnabled);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="view"]')) {
        setHoverMode('view');
      } else if (target.closest('a, button, input, select, textarea, [role="button"]')) {
        setHoverMode('interactive');
      } else {
        setHoverMode('default');
      }
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [enabled, visible, cursorX, cursorY]);

  if (!enabled || !visible) return null;

  const scale = hoverMode === 'view' ? 2.1 : hoverMode === 'interactive' ? 1.45 : 1;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[90] pointer-events-none mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        animate={{
          scale,
          borderColor: hoverMode === 'default' ? 'rgba(201, 162, 75, 0.7)' : 'rgba(247, 245, 240, 0.95)',
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="w-7 h-7 rounded-full border flex items-center justify-center"
      >
        {hoverMode === 'view' && (
          <span className="text-[8px] font-medium tracking-widest uppercase text-[#F7F5F0]">
            View
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};
