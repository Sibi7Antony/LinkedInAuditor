import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Main Lovable-inspired gradient background */}
      <div className="absolute inset-0 lovable-gradient" />
      
      {/* Mesh gradient overlay for depth */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-mesh"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              background: `radial-gradient(circle, ${
                ['#7C3AED', '#A855F7', '#EC4899', '#F97316', '#EAB308'][Math.floor(Math.random() * 5)]
              }, transparent)`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              filter: 'blur(2px)'
            }}
          />
        ))}
      </div>

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Radial spotlight effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-radial from-white/10 via-white/5 to-transparent rounded-full blur-3xl" />
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};