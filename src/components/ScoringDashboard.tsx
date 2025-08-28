import React from 'react';
import { User, FileText, Briefcase, Award, Activity, BookOpen } from 'lucide-react';
import type { AnalysisResult } from '../types';

interface ScoringDashboardProps {
  analysis: AnalysisResult;
}

const categoryIcons = {
  profile_picture: User,
  about_section: FileText,
  experience: Briefcase,
  skills: Award,
  activity: Activity,
  certifications: BookOpen
};

const categoryLabels = {
  profile_picture: 'Profile Picture',
  about_section: 'About Section',
  experience: 'Experience',
  skills: 'Skills & Endorsements',
  activity: 'Posts & Activity',
  certifications: 'Certifications'
};

const getScoreColor = (score: number) => {
  if (score >= 80) return '#10b981'; // emerald
  if (score >= 60) return '#f59e0b'; // amber
  return '#ef4444'; // red
};

const ScoreCard: React.FC<{
  category: keyof typeof categoryIcons;
  data: { score: number; feedback: string; suggestions: string[] };
}> = ({ category, data }) => {
  const Icon = categoryIcons[category];
  const color = getScoreColor(data.score);

  return (
    <div className="glass rounded-2xl p-6 hover:border-[#7C3AED]/50 transition-all duration-300 group hover:shadow-lg hover:shadow-[#7C3AED]/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-[#7C3AED]/20 to-[#A855F7]/20 rounded-xl border border-white/10 group-hover:border-[#7C3AED]/50 transition-all duration-300">
            <Icon className="w-5 h-5 text-[#A855F7]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#e2e8f0] text-lg">{categoryLabels[category]}</h3>
            <p className="text-sm text-[#94a3b8]">AI Analysis</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold" style={{ color }}>
            {data.score}
          </div>
          <div className="text-sm text-[#94a3b8]">/100</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-3 bg-[#1a1a2e] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1500 ease-out"
            style={{ 
              width: `${data.score}%`, 
              background: `linear-gradient(90deg, ${color}, ${color}dd)`,
              boxShadow: `0 0 10px ${color}50`
            }}
          />
        </div>
      </div>

      <p className="text-[#e2e8f0] mb-4 leading-relaxed">{data.feedback}</p>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wide">
          Suggestions
        </p>
        {data.suggestions.slice(0, 2).map((suggestion, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] rounded-full mt-2 flex-shrink-0" />
            <p className="text-sm text-[#94a3b8] leading-relaxed">{suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ScoringDashboard: React.FC<ScoringDashboardProps> = ({ analysis }) => {
  const overallColor = getScoreColor(analysis.overall_score);

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="text-center">
        <div className="inline-block glass rounded-3xl p-12 mb-8 animate-pulse-glow">
          <div className="mb-4">
            <div 
              className="text-7xl font-bold mb-4"
              style={{ color: overallColor }}
            >
              {analysis.overall_score}
            </div>
            <div className="text-[#94a3b8] text-xl font-medium">Overall Profile Score</div>
          </div>
          
          {/* Circular Progress */}
          <div className="relative w-40 h-40 mx-auto">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#1a1a2e"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke={overallColor}
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - analysis.overall_score / 100)}`}
                className="transition-all duration-2000 ease-out"
                style={{ filter: `drop-shadow(0 0 5px ${overallColor}50)` }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Scores */}
      <div>
        <h2 className="text-3xl font-bold gradient-text mb-8">
          Detailed Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(analysis.categories).map(([category, data]) => (
            <ScoreCard
              key={category}
              category={category as keyof typeof categoryIcons}
              data={data}
            />
          ))}
        </div>
      </div>

      {/* Key Improvements */}
      <div className="glass rounded-2xl p-8">
        <h3 className="text-2xl font-bold gradient-text mb-6">
          🎯 Priority Improvements
        </h3>
        <div className="space-y-3">
          {analysis.improvements.map((improvement, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 glass-light rounded-xl">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <p className="text-[#e2e8f0] leading-relaxed">{improvement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};