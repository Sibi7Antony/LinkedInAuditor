import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-white/10 glass sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] to-[#A855F7] rounded-xl flex items-center justify-center shadow-lg shadow-[#7C3AED]/30 animate-pulse-glow">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#EC4899] to-[#F97316] rounded-full animate-pulse">
                <Sparkles className="w-2 h-2 text-white m-1" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                LinkedIn Profile Auditor
              </h1>
              <p className="text-[#94a3b8] font-medium">
                AI-Powered Profile Optimization • GitHub Copilot Style
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="glass-light rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-[#e2e8f0]">AI Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};