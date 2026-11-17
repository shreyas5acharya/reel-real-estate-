import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  strength?: number;
}

/**
 * MagneticButton — Subtle cursor-tracking pull on desktop pointers,
 * automatically disabled for touch devices and prefers-reduced-motion.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  type = 'button',
  ariaLabel,
  strength = 0.22,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const motionStyle = {
    x: prefersReducedMotion ? 0 : offset.x,
    y: prefersReducedMotion ? 0 : offset.y,
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={motionStyle}
      transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.4 }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          className={`inline-flex items-center justify-center whitespace-nowrap shrink-0 transition-colors duration-200 ${className}`}
        >
          {children}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          aria-label={ariaLabel}
          className={`inline-flex items-center justify-center whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer ${className}`}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
};
