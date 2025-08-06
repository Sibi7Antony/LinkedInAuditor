import React, { useState } from 'react';
import { ProfileInput } from './components/ProfileInput';
import { ScoringDashboard } from './components/ScoringDashboard';
import { SuggestionsPanel } from './components/SuggestionsPanel';
import { AIAssistant } from './components/AIAssistant';
import { ExportPanel } from './components/ExportPanel';
import { Background } from './components/Background';
import { Header } from './components/Header';
import type { ProfileData, AnalysisResult } from './types';

function App() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'dashboard' | 'suggestions' | 'export'>('input');

  const handleProfileSubmit = async (data: ProfileData) => {
    setIsAnalyzing(true);
    setProfileData(data);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockAnalysis: AnalysisResult = {
      overall_score: 78,
      categories: {
        profile_picture: {
          score: 85,
          feedback: 'Professional appearance with good lighting',
          suggestions: ['Consider a slightly closer crop', 'Ensure background is not distracting']
        },
        about_section: {
          score: 72,
          feedback: 'Good content but could be more engaging',
          suggestions: ['Add more personality', 'Include specific achievements', 'Use more action words']
        },
        experience: {
          score: 80,
          feedback: 'Well-structured with good detail',
          suggestions: ['Quantify more achievements', 'Add recent project highlights', 'Include leadership examples']
        },
        skills: {
          score: 65,
          feedback: 'Limited endorsements and skills variety',
          suggestions: ['Add trending technical skills', 'Seek more endorsements', 'Include soft skills']
        },
        activity: {
          score: 68,
          feedback: 'Moderate engagement levels',
          suggestions: ['Post more consistently', 'Engage with industry content', 'Share thought leadership']
        },
        certifications: {
          score: 90,
          feedback: 'Excellent certification portfolio',
          suggestions: ['Keep certifications current', 'Add specialized credentials']
        }
      },
      improvements: [
        'Optimize headline with target keywords',
        'Add more quantified achievements',
        'Increase posting frequency',
        'Seek recommendations from colleagues'
      ]
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    setActiveTab('dashboard');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'input':
        return <ProfileInput onSubmit={handleProfileSubmit} isLoading={isAnalyzing} />;
      case 'dashboard':
        return analysis ? <ScoringDashboard analysis={analysis} /> : <div>No analysis available</div>;
      case 'suggestions':
        return analysis ? <SuggestionsPanel analysis={analysis} profileData={profileData} /> : <div>No suggestions available</div>;
      case 'export':
        return analysis ? <ExportPanel analysis={analysis} profileData={profileData} /> : <div>No data to export</div>;
      default:
        return <ProfileInput onSubmit={handleProfileSubmit} isLoading={isAnalyzing} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#C9D1D9] relative overflow-hidden">
      <Background />
      
      <div className="relative z-10">
        <Header />
        
        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="flex space-x-1 bg-[#161B22] rounded-lg p-1 border border-[#30363d]">
            {[
              { id: 'input', label: 'Profile Input', icon: '🔍' },
              { id: 'dashboard', label: 'Analysis', icon: '📊', disabled: !analysis },
              { id: 'suggestions', label: 'AI Suggestions', icon: '💡', disabled: !analysis },
              { id: 'export', label: 'Export', icon: '📤', disabled: !analysis }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab(tab.id as any)}
                disabled={tab.disabled}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#58A6FF] text-[#0D1117] shadow-lg shadow-[#58A6FF]/25'
                    : tab.disabled
                    ? 'text-[#6e7681] cursor-not-allowed opacity-50'
                    : 'text-[#C9D1D9] hover:bg-[#21262d] hover:text-[#58A6FF]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 pb-12">
          {renderActiveTab()}
        </main>
      </div>

      <AIAssistant isAnalyzing={isAnalyzing} hasAnalysis={!!analysis} />
    </div>
  );
}

export default App;