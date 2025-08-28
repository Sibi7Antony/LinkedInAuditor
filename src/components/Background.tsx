import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0f0f23]" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/10 via-transparent to-[#A855F7]/10 animate-gradient" />
      
      {/* Floating orbs */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: `linear-gradient(135deg, #7C3AED, #A855F7)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0L0 0 0 60" fill="none" stroke="#7C3AED" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      {/* Radial gradient spotlight */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-[#7C3AED]/20 via-[#A855F7]/10 to-transparent rounded-full blur-3xl" />
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#7C3AED]/10 to-transparent" />
    </div>
  );
};