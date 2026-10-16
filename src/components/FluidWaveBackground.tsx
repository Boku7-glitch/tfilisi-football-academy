'use client';

import React from 'react';

interface FluidWaveBackgroundProps {
  variant?: 'light' | 'navy';
  className?: string;
  intensity?: 'subtle' | 'medium' | 'vivid';
}

/**
 * FluidWaveBackground
 * 
 * An ultra-smooth, organic vector wave background inspired by fluid marble & topographic contours.
 * Uses bespoke Bézier curves and layered athletic gradients strictly in White, Royal Blue (#0052ff),
 * Sky Blue (#38bdf8), and Deep Navy (#061325).
 * 
 * 100% vector SVG: zero raster artifacts, zero heavy image requests, razor-sharp on all screens.
 */
export default function FluidWaveBackground({
  variant = 'light',
  className = '',
  intensity = 'medium'
}: FluidWaveBackgroundProps) {
  const isNavy = variant === 'navy';

  // Opacities calibrated for high-end legibility and silky aesthetics
  const strokeOpacity1 = isNavy ? 0.35 : (intensity === 'subtle' ? 0.06 : 0.12);
  const strokeOpacity2 = isNavy ? 0.25 : (intensity === 'subtle' ? 0.04 : 0.08);
  const strokeOpacity3 = isNavy ? 0.18 : (intensity === 'subtle' ? 0.03 : 0.05);

  const fillOpacity1 = isNavy ? 0.18 : (intensity === 'subtle' ? 0.025 : 0.045);
  const fillOpacity2 = isNavy ? 0.12 : (intensity === 'subtle' ? 0.015 : 0.03);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* Ambient Radial Spotlight (Stadium Atmosphere) */}
      <div
        className="absolute inset-0"
        style={{
          background: isNavy
            ? 'radial-gradient(ellipse 70% 60% at 85% 20%, rgba(0, 82, 255, 0.28) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 15% 85%, rgba(56, 189, 248, 0.14) 0%, transparent 65%)'
            : 'radial-gradient(ellipse 65% 55% at 85% 15%, rgba(0, 82, 255, 0.06) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 10% 85%, rgba(56, 189, 248, 0.04) 0%, transparent 65%)'
        }}
      />

      {/* Smooth Organic Fluid Wave SVG Composition */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Light Gradients */}
          <linearGradient id="fluidBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052ff" stopOpacity={strokeOpacity1} />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity={strokeOpacity2} />
            <stop offset="100%" stopColor="#0052ff" stopOpacity={strokeOpacity1} />
          </linearGradient>

          <linearGradient id="fluidRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052ff" stopOpacity={fillOpacity1} />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity={fillOpacity2} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="fluidRibbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity={fillOpacity1} />
            <stop offset="70%" stopColor="#0052ff" stopOpacity={fillOpacity2} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Navy Gradients */}
          <linearGradient id="navyGlowStroke" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#0052ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="navyRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052ff" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#061325" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Fluid Wave Ribbon Layer (Soft volumetric flow) */}
        <path
          d="M -100 520 
             C 180 580, 340 380, 620 460 
             C 900 540, 1140 300, 1550 400 
             L 1550 850 
             L -100 850 Z"
          fill={isNavy ? 'url(#navyRibbonGrad)' : 'url(#fluidRibbonGrad1)'}
        />

        <path
          d="M -100 280 
             C 240 340, 420 120, 720 220 
             C 1020 320, 1220 80, 1550 180 
             L 1550 600 
             C 1220 450, 950 680, 650 560 
             C 350 440, 150 600, -100 520 Z"
          fill={isNavy ? 'url(#navyRibbonGrad)' : 'url(#fluidRibbonGrad2)'}
        />

        {/* 2. Primary S-Curve Flow Contour Lines (Inspired by fluid marble ridges) */}
        <path
          d="M -100 600 
             C 160 670, 320 440, 580 520 
             C 840 600, 1100 360, 1550 460"
          stroke={isNavy ? 'url(#navyGlowStroke)' : 'url(#fluidBlueGrad)'}
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M -100 520 
             C 180 580, 340 380, 620 460 
             C 900 540, 1140 300, 1550 400"
          stroke={isNavy ? 'url(#navyGlowStroke)' : 'url(#fluidBlueGrad)'}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeOpacity={strokeOpacity1}
        />

        <path
          d="M -100 440 
             C 200 490, 360 320, 660 400 
             C 960 480, 1180 240, 1550 340"
          stroke={isNavy ? 'url(#navyGlowStroke)' : 'url(#fluidBlueGrad)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity={strokeOpacity2}
        />

        <path
          d="M -100 360 
             C 220 410, 390 260, 700 340 
             C 1010 420, 1220 180, 1550 280"
          stroke={isNavy ? 'url(#navyGlowStroke)' : 'url(#fluidBlueGrad)'}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeOpacity={strokeOpacity3}
        />

        {/* 3. Secondary Counter-Flow Waves (Fluid Swirl & Dynamic Energy) */}
        <path
          d="M -50 180 
             C 250 240, 420 50, 740 140 
             C 1060 230, 1260 20, 1500 110"
          stroke={isNavy ? 'url(#navyGlowStroke)' : 'url(#fluidBlueGrad)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity={strokeOpacity2}
        />

        <path
          d="M -50 120 
             C 270 170, 440 -10, 760 80 
             C 1080 170, 1280 -40, 1500 50"
          stroke={isNavy ? 'url(#navyGlowStroke)' : 'url(#fluidBlueGrad)'}
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity={strokeOpacity3}
        />

        <path
          d="M 50 780 
             C 320 680, 520 740, 840 640 
             C 1160 540, 1340 680, 1550 580"
          stroke={isNavy ? 'url(#navyGlowStroke)' : 'url(#fluidBlueGrad)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity={strokeOpacity2}
        />

        <path
          d="M 120 840 
             C 360 740, 560 800, 880 700 
             C 1200 600, 1380 740, 1550 640"
          stroke={isNavy ? 'url(#navyGlowStroke)' : 'url(#fluidBlueGrad)'}
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity={strokeOpacity3}
        />

        {/* 4. Delicate Topographic Micro-Echo Lines (Depth & Elegance) */}
        <path
          d="M -80 480 
             C 190 535, 350 350, 640 430 
             C 930 510, 1160 270, 1550 370"
          stroke={isNavy ? 'url(#navyGlowStroke)' : 'url(#fluidBlueGrad)'}
          strokeWidth="0.75"
          strokeDasharray="4 6"
          strokeOpacity={strokeOpacity3 * 0.7}
        />

        <path
          d="M -60 230 
             C 245 285, 410 85, 730 180 
             C 1040 275, 1240 50, 1500 145"
          stroke={isNavy ? 'url(#navyGlowStroke)' : 'url(#fluidBlueGrad)'}
          strokeWidth="0.75"
          strokeDasharray="6 8"
          strokeOpacity={strokeOpacity3 * 0.7}
        />
      </svg>
    </div>
  );
}
