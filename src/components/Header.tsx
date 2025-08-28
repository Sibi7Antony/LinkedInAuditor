import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#EC4899] to-[#F97316] rounded-full animate-pulse flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                LinkedIn Profile Auditor
              </h1>
              <p className="text-white/80 font-medium text-lg">
                AI-Powered Profile Optimization • Lovable Style
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="glass-light rounded-xl px-6 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-white font-semibold">AI Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};