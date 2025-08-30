import React, { useState, useEffect } from 'react';
import { Bot, Copy, CheckCircle } from 'lucide-react';
import type { AnalysisResult, ProfileData } from '../types';

interface ProfileInputProps {
  analysis: AnalysisResult;
  profileData: ProfileData | null;
}

interface ChatMessage {
  type: 'ai' | 'suggestion';
  content: string;
  category?: string;
  timestamp: Date;
}

export const ProfileInput: React.FC<ProfileInputProps> = ({ analysis, profileData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        type: 'ai',
        content: "Hi! I've analyzed your LinkedIn profile and found several areas where we can boost your professional impact. Let me share some personalized recommendations:",
        timestamp: new Date()
      }
    ];

    // Add category-specific suggestions
    Object.entries(analysis.categories).forEach(([category, data]) => {
      if (data.score < 80) {
        data.suggestions.forEach(suggestion => {
          initialMessages.push({
            type: 'suggestion',
            content: suggestion,
            category: category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            timestamp: new Date()
          });
        });
      }
    });

    // Add improvement suggestions
    analysis.improvements.forEach(improvement => {
      initialMessages.push({
        type: 'suggestion',
        content: improvement,
        category: 'General',
        timestamp: new Date()
      });
    });

    // Simulate typing effect
    let index = 0;
    const interval = setInterval(() => {
      if (index < initialMessages.length) {
        setMessages(prev => [...prev, initialMessages[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [analysis]);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  const generateImprovedContent = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'about section':
        return `Passionate software engineer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud architecture, having led teams that delivered products used by 100K+ users. I'm driven by solving complex problems and mentoring the next generation of developers.

Key achievements:
• Led development of customer-facing platform serving 100K+ daily active users
• Reduced application load time by 40% through performance optimization
• Mentored 8 junior developers, with 90% promotion rate within 18 months

I'm always excited to discuss innovative tech solutions and team leadership strategies. Let's connect!`;

      case 'headline':
        return 'Senior Full-Stack Engineer | React & Node.js Expert | Team Lead | Building Products that Scale';

      default:
        return 'Improved content generated based on AI analysis...';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#C9D1D9] mb-4 font-mono">
          AI Suggestions
        </h2>
        <p className="text-[#8B949E] text-lg">
          Personalized recommendations to optimize your LinkedIn profile
        </p>
      </div>

      <div className="bg-[#161B22] border border-[#30363d] rounded-lg h-96 overflow-hidden flex flex-col">
        {/* Chat Header */}
        <div className="bg-[#0D1117] border-b border-[#30363d] p-4 flex items-center space-x-3">
          <div className="relative">
            <Bot className="w-6 h-6 text-[#58A6FF]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div>
            <p className="font-semibold text-[#C9D1D9] font-mono">LinkedIn Copilot</p>
            <p className="text-xs text-[#8B949E] font-mono">Online • Ready to help</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex space-x-3 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-[#58A6FF] rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#0D1117]" />
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="bg-[#0D1117] border border-[#30363d] rounded-lg p-3">
                  {message.category && (
                    <div className="text-xs text-[#58A6FF] font-mono mb-2 uppercase tracking-wide">
                      {message.category}
                    </div>
                  )}
                  <p className="text-[#C9D1D9] text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>
                  {message.type === 'suggestion' && (
                    <button
                      onClick={() => handleCopy(message.content, index)}
                      className="mt-2 flex items-center space-x-1 text-xs text-[#8B949E] hover:text-[#58A6FF] transition-colors duration-200"
                    >
                      {copiedIndex === index ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area (Placeholder) */}
        <div className="border-t border-[#30363d] p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Ask for specific improvements..."
              disabled
              className="flex-1 px-3 py-2 bg-[#0D1117] border border-[#30363d] rounded-md text-[#8B949E] font-mono text-sm cursor-not-allowed"
            />
            <button
              disabled
              className="px-4 py-2 bg-[#30363d] text-[#8B949E] rounded-md font-mono text-sm cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#161B22] border border-[#30363d] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#C9D1D9] mb-4 font-mono">
            ✍️ Improved About Section
          </h3>
          <div className="bg-[#0D1117] border border-[#30363d] rounded-md p-4 mb-4">
            <pre className="text-sm text-[#C9D1D9] leading-relaxed whitespace-pre-wrap font-sans">
              {generateImprovedContent('about section')}
            </pre>
          </div>
          <button
            onClick={() => handleCopy(generateImprovedContent('about section'), -1)}
            className="w-full bg-[#58A6FF] text-[#0D1117] py-2 px-4 rounded-md font-semibold hover:bg-[#4493e0] transition-colors duration-200"
          >
            Copy Improved Version
          </button>
        </div>

        <div className="bg-[#161B22] border border-[#30363d] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#C9D1D9] mb-4 font-mono">
            🎯 Optimized Headline
          </h3>
          <div className="bg-[#0D1117] border border-[#30363d] rounded-md p-4 mb-4">
            <p className="text-sm text-[#C9D1D9] leading-relaxed">
              {generateImprovedContent('headline')}
            </p>
          </div>
          <button
            onClick={() => handleCopy(generateImprovedContent('headline'), -2)}
            className="w-full bg-[#58A6FF] text-[#0D1117] py-2 px-4 rounded-md font-semibold hover:bg-[#4493e0] transition-colors duration-200"
          >
            Copy Optimized Headline
          </button>
        </div>
      </div>
    </div>
  );
};