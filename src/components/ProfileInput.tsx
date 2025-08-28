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
          <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-[#A855F7] rounded-2xl flex items-center justify-center animate-pulse-glow">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold gradient-text mb-3">Analyzing Your Profile</h3>
          <p className="text-[#94a3b8] text-lg">AI is processing your LinkedIn data...</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-[#A855F7] to-[#EC4899] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-[#EC4899] to-[#F97316] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold gradient-text mb-6">
          Upload Your LinkedIn Profile
        </h2>
        <p className="text-[#94a3b8] text-xl font-medium">
          Get AI-powered insights and recommendations to optimize your professional presence
        </p>
      </div>

      {/* Input Type Selector */}
      <div className="flex justify-center mb-8">
        <div className="glass rounded-xl p-1">
          {[
            { id: 'url', label: 'LinkedIn URL', icon: Link },
            { id: 'pdf', label: 'PDF Upload', icon: Upload },
            { id: 'manual', label: 'Manual Input', icon: User }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setInputType(id as any)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                inputType === id
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-lg shadow-[#7C3AED]/30'
                  : 'text-[#e2e8f0] hover:bg-white/10 hover:text-[#A855F7]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Forms */}
      <div className="glass rounded-2xl p-8">
        {inputType === 'url' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#e2e8f0] mb-3">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full px-6 py-4 bg-[#1a1a2e]/50 border border-white/20 rounded-xl text-[#e2e8f0] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all duration-300 backdrop-blur-sm"
                  required
                />
              </div>
              <p className="text-sm text-[#94a3b8] mt-3">
                💡 Make sure your profile is set to public for best analysis
              </p>
            </div>
            <button
              type="submit"
              disabled={!url.trim()}
              className="w-full btn-primary py-4 px-8 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="border-2 border-dashed border-white/20 rounded-2xl p-12 cursor-pointer hover:border-[#7C3AED] transition-all duration-300 group glass-light"
              >
                <Upload className="w-16 h-16 text-[#94a3b8] mx-auto mb-6 group-hover:text-[#A855F7] transition-colors duration-300" />
                <p className="text-[#e2e8f0] font-semibold text-lg mb-3">
                  Drop your LinkedIn PDF export here
                </p>
                <p className="text-[#94a3b8]">
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
            <div className="glass-light rounded-xl p-6">
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                <strong className="text-[#A855F7]">How to export your LinkedIn data:</strong><br />
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
                <label className="block text-sm font-semibold text-[#e2e8f0] mb-3">Name</label>
                <input
                  type="text"
                  value={manualData.name}
                  onChange={(e) => setManualData({ ...manualData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-[#1a1a2e]/50 border border-white/20 rounded-xl text-[#e2e8f0] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#e2e8f0] mb-3">Headline</label>
                <input
                  type="text"
                  value={manualData.headline}
                  onChange={(e) => setManualData({ ...manualData, headline: e.target.value })}
                  placeholder="Senior Software Engineer at TechCorp"
                  className="w-full px-4 py-3 bg-[#1a1a2e]/50 border border-white/20 rounded-xl text-[#e2e8f0] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all duration-300"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-[#e2e8f0] mb-3">About Section</label>
              <textarea
                value={manualData.about}
                onChange={(e) => setManualData({ ...manualData, about: e.target.value })}
                placeholder="Tell us about yourself, your expertise, and what drives you professionally..."
                rows={4}
                className="w-full px-4 py-3 bg-[#1a1a2e]/50 border border-white/20 rounded-xl text-[#e2e8f0] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all duration-300 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#e2e8f0] mb-3">Experience</label>
              <textarea
                value={manualData.experience}
                onChange={(e) => setManualData({ ...manualData, experience: e.target.value })}
                placeholder="List your recent work experience, roles, and key achievements..."
                rows={4}
                className="w-full px-4 py-3 bg-[#1a1a2e]/50 border border-white/20 rounded-xl text-[#e2e8f0] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all duration-300 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#e2e8f0] mb-3">Skills</label>
              <input
                type="text"
                value={manualData.skills}
                onChange={(e) => setManualData({ ...manualData, skills: e.target.value })}
                placeholder="JavaScript, React, Node.js, Python, AWS, etc."
                className="w-full px-4 py-3 bg-[#1a1a2e]/50 border border-white/20 rounded-xl text-[#e2e8f0] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] transition-all duration-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-4 px-8 rounded-xl font-semibold text-lg"
            >
              Analyze Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};