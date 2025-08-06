import React from 'react';
import { Bot } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-[#30363d] bg-[#161B22]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bot className="w-8 h-8 text-[#58A6FF]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#7C3AED] rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono text-[#C9D1D9]">
              LinkedIn Profile Auditor
            </h1>
            <p className="text-sm text-[#8B949E] font-mono">
              AI-Powered Profile Optimization • Copilot Style
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};