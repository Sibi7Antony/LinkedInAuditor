import React, { useState, useEffect } from 'react';
import { Bot, Copy, CheckCircle } from 'lucide-react';
import { Header } from './components/Header';
import { Background } from './components/Background';
import { ProfileInput } from './components/ProfileInput';
import { ScoringDashboard } from './components/ScoringDashboard';
import { ExportPanel } from './components/ExportPanel';
import { AIAssistant } from './components/AIAssistant';
import type { AnalysisResult, ProfileData } from '../types';

interface SuggestionsPanelProps {
  analysis: AnalysisResult;
  profileData: ProfileData | null;
}

interface ChatMessage {
  type: 'ai' | 'suggestion';
  content: string;
  category?: string;
  timestamp: Date;
}

const App: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (data: ProfileData, analysisResult: AnalysisResult) => {
    setProfileData(data);
    setAnalysis(analysisResult);
  };

  if (!analysis || !profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Background />
        <Header />
        <main className="relative z-10 container mx-auto px-6 py-12">
          <ProfileInput onAnalysisComplete={handleAnalysisComplete} />
          <AIAssistant />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Background />
      <Header />
      <main className="relative z-10 container mx-auto px-6 py-12">
        <ScoringDashboard analysis={analysis} profileData={profileData} />
        <SuggestionsPanel analysis={analysis} profileData={profileData} />
        <ExportPanel analysis={analysis} profileData={profileData} />
        <AIAssistant />
      </main>
    </div>
  );
};

const SuggestionsPanel: React.FC<SuggestionsPanelProps> = ({ analysis, profileData }) => {
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
        <h2 className="text-4xl font-bold gradient-text mb-6">
          AI Suggestions
        </h2>
        <p className="text-[#94a3b8] text-xl font-medium">
          Personalized recommendations to optimize your LinkedIn profile
        </p>
      </div>

      <div className="glass rounded-2xl h-96 overflow-hidden flex flex-col">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#7C3AED]/20 to-[#A855F7]/20 border-b border-white/10 p-6 flex items-center space-x-4">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#A855F7] rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0f0f23] animate-pulse"></div>
          </div>
          <div>
            <p className="font-bold text-[#e2e8f0] text-lg">LinkedIn Copilot</p>
            <p className="text-sm text-[#94a3b8]">Online • Ready to help optimize your profile</p>
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
                <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#A855F7] rounded-xl flex items-center justify-center shadow-lg shadow-[#7C3AED]/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1 max-w-lg">
                <div className="glass-light rounded-xl p-4">
                  {message.category && (
                    <div className="text-sm text-[#A855F7] font-semibold mb-2 uppercase tracking-wide">
                      {message.category}
                    </div>
                  )}
                  <p className="text-[#e2e8f0] leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>
                  {message.type === 'suggestion' && (
                    <button
                      onClick={() => handleCopy(message.content, index)}
                      className="mt-3 flex items-center space-x-2 text-sm text-[#94a3b8] hover:text-[#A855F7] transition-colors duration-200"
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
        <div className="border-t border-white/10 p-6">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Ask for specific improvements..."
              disabled
              className="flex-1 px-4 py-3 bg-[#1a1a2e]/50 border border-white/20 rounded-xl text-[#94a3b8] cursor-not-allowed"
            />
            <button
              disabled
              className="px-6 py-3 bg-gradient-to-r from-[#7C3AED]/50 to-[#A855F7]/50 text-[#94a3b8] rounded-xl font-medium cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold gradient-text mb-6">
            ✍️ Improved About Section
          </h3>
          <div className="glass-light rounded-xl p-6 mb-6">
            <pre className="text-sm text-[#e2e8f0] leading-relaxed whitespace-pre-wrap font-sans">
              {generateImprovedContent('about section')}
            </pre>
          </div>
          <button
            onClick={() => handleCopy(generateImprovedContent('about section'), -1)}
            className="w-full btn-primary py-3 px-6 rounded-xl font-semibold"
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