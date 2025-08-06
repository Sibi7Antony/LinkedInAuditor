import React, { useState, useRef } from 'react';
import { Upload, Link, User, Loader2 } from 'lucide-react';
import type { ProfileData } from '../types';

interface ProfileInputProps {
  onSubmit: (data: ProfileData) => void;
  isLoading: boolean;
}

export const ProfileInput: React.FC<ProfileInputProps> = ({ onSubmit, isLoading }) => {
  const [inputType, setInputType] = useState<'url' | 'pdf' | 'manual'>('url');
  const [url, setUrl] = useState('');
  const [manualData, setManualData] = useState({
    name: '',
    headline: '',
    about: '',
    experience: '',
    skills: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputType === 'url') {
      onSubmit({ type: 'url', url });
    } else if (inputType === 'manual') {
      onSubmit({ type: 'manual', manualData });
    }
  };

  const handleFileUpload = (file: File) => {
    onSubmit({ type: 'pdf', file });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-[#58A6FF] animate-spin" />
          <div className="absolute inset-0 w-12 h-12 border-2 border-[#58A6FF]/20 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-[#C9D1D9] mb-2">Analyzing Your Profile</h3>
          <p className="text-[#8B949E] font-mono">AI is processing your LinkedIn data...</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-[#58A6FF] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-[#58A6FF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-[#58A6FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#C9D1D9] mb-4">
          Upload Your LinkedIn Profile
        </h2>
        <p className="text-[#8B949E] text-lg">
          Get AI-powered insights and recommendations to optimize your professional presence
        </p>
      </div>

      {/* Input Type Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#161B22] rounded-lg p-1 border border-[#30363d]">
          {[
            { id: 'url', label: 'LinkedIn URL', icon: Link },
            { id: 'pdf', label: 'PDF Upload', icon: Upload },
            { id: 'manual', label: 'Manual Input', icon: User }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setInputType(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                inputType === id
                  ? 'bg-[#58A6FF] text-[#0D1117] shadow-lg shadow-[#58A6FF]/25'
                  : 'text-[#C9D1D9] hover:bg-[#21262d] hover:text-[#58A6FF]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Forms */}
      <div className="bg-[#161B22] rounded-lg border border-[#30363d] p-8">
        {inputType === 'url' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#C9D1D9] mb-2 font-mono">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363d] rounded-md text-[#C9D1D9] font-mono focus:outline-none focus:ring-2 focus:ring-[#58A6FF] focus:border-transparent transition-all duration-200"
                  required
                />
                <div className="absolute inset-0 border border-[#58A6FF]/0 rounded-md transition-all duration-200 pointer-events-none group-focus-within:border-[#58A6FF]/50"></div>
              </div>
              <p className="text-xs text-[#8B949E] mt-2 font-mono">
                💡 Make sure your profile is set to public for best analysis
              </p>
            </div>
            <button
              type="submit"
              disabled={!url.trim()}
              className="w-full bg-[#58A6FF] text-[#0D1117] py-3 px-6 rounded-md font-semibold hover:bg-[#4493e0] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-[#58A6FF]/25 hover:shadow-[#58A6FF]/40"
            >
              Analyze Profile
            </button>
          </form>
        )}

        {inputType === 'pdf' && (
          <div className="space-y-6">
            <div className="text-center">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#30363d] rounded-lg p-8 cursor-pointer hover:border-[#58A6FF] transition-colors duration-200 group"
              >
                <Upload className="w-12 h-12 text-[#8B949E] mx-auto mb-4 group-hover:text-[#58A6FF] transition-colors duration-200" />
                <p className="text-[#C9D1D9] font-medium mb-2">
                  Drop your LinkedIn PDF export here
                </p>
                <p className="text-[#8B949E] text-sm font-mono">
                  or click to browse files
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className="hidden"
              />
            </div>
            <div className="bg-[#0D1117] border border-[#30363d] rounded-md p-4">
              <p className="text-xs text-[#8B949E] font-mono leading-relaxed">
                <strong className="text-[#58A6FF]">How to export your LinkedIn data:</strong><br />
                1. Go to Settings & Privacy → Data Privacy<br />
                2. Download your data → Select "Profile" → Request Archive<br />
                3. LinkedIn will email you a download link
              </p>
            </div>
          </div>
        )}

        {inputType === 'manual' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#C9D1D9] mb-2 font-mono">Name</label>
                <input
                  type="text"
                  value={manualData.name}
                  onChange={(e) => setManualData({ ...manualData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363d] rounded-md text-[#C9D1D9] font-mono focus:outline-none focus:ring-2 focus:ring-[#58A6FF] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#C9D1D9] mb-2 font-mono">Headline</label>
                <input
                  type="text"
                  value={manualData.headline}
                  onChange={(e) => setManualData({ ...manualData, headline: e.target.value })}
                  placeholder="Senior Software Engineer at TechCorp"
                  className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363d] rounded-md text-[#C9D1D9] font-mono focus:outline-none focus:ring-2 focus:ring-[#58A6FF] focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#C9D1D9] mb-2 font-mono">About Section</label>
              <textarea
                value={manualData.about}
                onChange={(e) => setManualData({ ...manualData, about: e.target.value })}
                placeholder="Tell us about yourself, your expertise, and what drives you professionally..."
                rows={4}
                className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363d] rounded-md text-[#C9D1D9] font-mono focus:outline-none focus:ring-2 focus:ring-[#58A6FF] focus:border-transparent resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#C9D1D9] mb-2 font-mono">Experience</label>
              <textarea
                value={manualData.experience}
                onChange={(e) => setManualData({ ...manualData, experience: e.target.value })}
                placeholder="List your recent work experience, roles, and key achievements..."
                rows={4}
                className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363d] rounded-md text-[#C9D1D9] font-mono focus:outline-none focus:ring-2 focus:ring-[#58A6FF] focus:border-transparent resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#C9D1D9] mb-2 font-mono">Skills</label>
              <input
                type="text"
                value={manualData.skills}
                onChange={(e) => setManualData({ ...manualData, skills: e.target.value })}
                placeholder="JavaScript, React, Node.js, Python, AWS, etc."
                className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363d] rounded-md text-[#C9D1D9] font-mono focus:outline-none focus:ring-2 focus:ring-[#58A6FF] focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#58A6FF] text-[#0D1117] py-3 px-6 rounded-md font-semibold hover:bg-[#4493e0] transition-all duration-200 shadow-lg shadow-[#58A6FF]/25 hover:shadow-[#58A6FF]/40"
            >
              Analyze Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};