export type TargetLanguage = 'en' | 'te' | 'hi' | 'es' | 'fr' | 'ta';

export interface LanguageOption {
  code: TargetLanguage;
  name: string;
  nativeName: string;
  flag: string;
  direction?: 'ltr' | 'rtl';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  nativeLanguage: TargetLanguage;
  dailyGoalMinutes: number;
  learningMotivation: string;
  streakDays: number;
  xpPoints: number;
  isGuest: boolean;
  joinedDate: string;
}

export type AppTheme = 'light' | 'dark' | 'deutschland' | 'emerald';
export type FontSize = 'normal' | 'large';

export interface ThemeSettings {
  theme: AppTheme;
  fontSize: FontSize;
  audioSpeed: number; // 0.75, 1.0
}

export interface YoutubeResource {
  id: string;
  channelName: string;
  creator: string;
  subscribers: string;
  description: string;
  recommendedFor: string;
  topics: string[];
  url: string;
  embedQuery: string;
  featuredPlaylist: string;
  badge: string;
}

export interface BookResource {
  id: string;
  title: string;
  authorOrPublisher: string;
  level: string;
  type: 'Coursebook' | 'Grammar Practice' | 'Exam Prep' | 'Vocabulary';
  description: string;
  highlights: string[];
  isbnOrStoreLink: string;
  coverEmoji: string;
}

export interface UpcomingLevel {
  id: 'a2' | 'b1';
  level: string;
  title: string;
  subtitle: string;
  cefrDescription: string;
  estimatedHours: string;
  topics: {
    title: string;
    description: string;
    icon: string;
  }[];
  expectedRelease: string;
  status: 'In Development' | 'Curriculum Planning';
}
