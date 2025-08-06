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
  if (score >= 80) return '#22c55e'; // green
  if (score >= 60) return '#eab308'; // yellow
  return '#ef4444'; // red
};

const ScoreCard: React.FC<{
  category: keyof typeof categoryIcons;
  data: { score: number; feedback: string; suggestions: string[] };
}> = ({ category, data }) => {
  const Icon = categoryIcons[category];
  const color = getScoreColor(data.score);

  return (
    <div className="bg-[#161B22] border border-[#30363d] rounded-lg p-6 hover:border-[#58A6FF]/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#0D1117] rounded-lg border border-[#30363d] group-hover:border-[#58A6FF]/50 transition-colors duration-300">
            <Icon className="w-5 h-5 text-[#58A6FF]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#C9D1D9]">{categoryLabels[category]}</h3>
            <p className="text-sm text-[#8B949E] font-mono">AI Analysis</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold font-mono" style={{ color }}>
            {data.score}
          </div>
          <div className="text-xs text-[#8B949E] font-mono">/100</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-[#0D1117] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${data.score}%`, 
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}50`
            }}
          />
        </div>
      </div>

      <p className="text-[#C9D1D9] text-sm mb-3 leading-relaxed">{data.feedback}</p>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-[#8B949E] font-mono uppercase tracking-wide">
          Suggestions
        </p>
        {data.suggestions.slice(0, 2).map((suggestion, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="w-1 h-1 bg-[#58A6FF] rounded-full mt-2 flex-shrink-0" />
            <p className="text-xs text-[#8B949E] leading-relaxed">{suggestion}</p>
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
        <div className="inline-block bg-[#161B22] border border-[#30363d] rounded-xl p-8 mb-6">
          <div className="mb-4">
            <div 
              className="text-6xl font-bold font-mono mb-2"
              style={{ color: overallColor }}
            >
              {analysis.overall_score}
            </div>
            <div className="text-[#8B949E] font-mono">Overall Profile Score</div>
          </div>
          
          {/* Circular Progress */}
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#21262d"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke={overallColor}
                strokeWidth="10"
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
        <h2 className="text-2xl font-bold text-[#C9D1D9] mb-6 font-mono">
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
      <div className="bg-[#161B22] border border-[#30363d] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#C9D1D9] mb-4 font-mono">
          🎯 Priority Improvements
        </h3>
        <div className="space-y-3">
          {analysis.improvements.map((improvement, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-[#0D1117] rounded-md border border-[#30363d]">
              <div className="flex-shrink-0 w-6 h-6 bg-[#58A6FF] rounded-full flex items-center justify-center text-[#0D1117] font-bold text-sm">
                {index + 1}
              </div>
              <p className="text-[#C9D1D9] text-sm leading-relaxed">{improvement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};