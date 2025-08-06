import React, { useState, useEffect } from 'react';
import { Bot, MessageCircle, X } from 'lucide-react';

interface AIAssistantProps {
  isAnalyzing: boolean;
  hasAnalysis: boolean;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isAnalyzing, hasAnalysis }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const tips = [
    "💡 Tip: Use keywords from your target job postings in your headline",
    "🎯 Pro tip: Quantify achievements whenever possible (e.g., 'Increased sales by 25%')",
    "📸 Remember: Your profile photo should be professional but approachable",
    "✨ Suggestion: Update your status weekly to stay visible in the feed",
    "🔗 Don't forget: Ask colleagues for recommendations to build credibility"
  ];

  useEffect(() => {
    if (isAnalyzing) {
      setMessage("🔄 Analyzing your profile with AI...");
    } else if (hasAnalysis) {
      setMessage("✅ Analysis complete! Check out your personalized recommendations.");
    } else {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setMessage(randomTip);
    }
  }, [isAnalyzing, hasAnalysis]);

  return (
    <>
      {/* Floating Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-[#58A6FF] text-[#0D1117] w-14 h-14 rounded-full shadow-lg shadow-[#58A6FF]/25 hover:shadow-[#58A6FF]/40 transition-all duration-300 flex items-center justify-center group hover:scale-110"
        >
          <Bot className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#22c55e] rounded-full border-2 border-[#0D1117] animate-pulse"></div>
          
          {/* Floating animation */}
          <div className="absolute inset-0 rounded-full bg-[#58A6FF] animate-ping opacity-75 group-hover:animate-none"></div>
        </button>
      </div>

      {/* Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          <div className="bg-[#161B22] border border-[#30363d] rounded-lg shadow-2xl w-80 max-h-96 overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-[#0D1117] border-b border-[#30363d] p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="w-6 h-6 text-[#58A6FF]" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#22c55e] rounded-full border border-[#0D1117]"></div>
                </div>
                <div>
                  <p className="font-semibold text-[#C9D1D9] font-mono">LinkedIn Copilot</p>
                  <p className="text-xs text-[#8B949E] font-mono">Your AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8B949E] hover:text-[#C9D1D9] transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-[#58A6FF] rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#0D1117]" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-[#0D1117] border border-[#30363d] rounded-lg p-3">
                    <p className="text-[#C9D1D9] text-sm leading-relaxed">
                      {message}
                    </p>
                    {isAnalyzing && (
                      <div className="mt-3 flex space-x-1">
                        <div className="w-2 h-2 bg-[#58A6FF] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#58A6FF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-[#58A6FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!isAnalyzing && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-[#8B949E] font-mono uppercase tracking-wide">
                    Quick Actions
                  </p>
                  <div className="space-y-1">
                    <button className="w-full text-left px-3 py-2 text-sm text-[#C9D1D9] hover:bg-[#21262d] rounded-md transition-colors duration-200 font-mono">
                      📊 View Analysis Details
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-[#C9D1D9] hover:bg-[#21262d] rounded-md transition-colors duration-200 font-mono">
                      💡 Get More Tips
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-[#C9D1D9] hover:bg-[#21262d] rounded-md transition-colors duration-200 font-mono">
                      📤 Export Results
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};