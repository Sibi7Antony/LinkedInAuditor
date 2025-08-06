export interface ProfileData {
  type: 'url' | 'pdf' | 'manual';
  url?: string;
  file?: File;
  manualData?: {
    name: string;
    headline: string;
    about: string;
    experience: string;
    skills: string;
  };
}

export interface CategoryScore {
  score: number;
  feedback: string;
  suggestions: string[];
}

export interface AnalysisResult {
  overall_score: number;
  categories: {
    profile_picture: CategoryScore;
    about_section: CategoryScore;
    experience: CategoryScore;
    skills: CategoryScore;
    activity: CategoryScore;
    certifications: CategoryScore;
  };
  improvements: string[];
}