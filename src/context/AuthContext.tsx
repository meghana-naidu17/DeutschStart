import { createContext, useContext, useState, type ReactNode } from 'react';
import type { TargetLanguage, UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, password?: string) => boolean;
  loginAsGuest: (name?: string, language?: TargetLanguage) => void;
  register: (name: string, email: string, language: TargetLanguage, goalMinutes: number, motivation: string) => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  logout: () => void;
  addXP: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'deutschstart_user_profile';

const defaultDemoUser: UserProfile = {
  id: 'user-demo-1',
  name: 'Meghana Sharma',
  email: 'meghana.learner@example.com',
  avatar: '👩‍🎓',
  nativeLanguage: 'te',
  dailyGoalMinutes: 30,
  learningMotivation: 'Goethe-Zertifikat A1 & Master Studies in Germany',
  streakDays: 5,
  xpPoints: 340,
  isGuest: false,
  joinedDate: 'November 2026'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    // Default to demo user so the app is immediately usable and welcoming,
    // but the user can also log out to test the landing page / sign in flow!
    return defaultDemoUser;
  });

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    try {
      if (u) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  };

  const login = (email: string): boolean => {
    // If logging into demo or any email, create or restore profile
    const namePart = email.split('@')[0] || 'German Learner';
    const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    
    const loggedUser: UserProfile = {
      id: 'user-' + Date.now(),
      name: capitalizedName.includes('.') ? capitalizedName.replace('.', ' ') : capitalizedName,
      email: email,
      avatar: '🇩🇪',
      nativeLanguage: 'en',
      dailyGoalMinutes: 20,
      learningMotivation: 'Pass Goethe A1 and speak fluent German',
      streakDays: 1,
      xpPoints: 50,
      isGuest: false,
      joinedDate: 'Today'
    };
    saveUser(loggedUser);
    return true;
  };

  const loginAsGuest = (name = 'Guest Learner', language: TargetLanguage = 'en') => {
    const guestUser: UserProfile = {
      id: 'guest-' + Date.now(),
      name,
      email: 'guest@deutschstart.app',
      avatar: '🌟',
      nativeLanguage: language,
      dailyGoalMinutes: 15,
      learningMotivation: 'Exploring German A1 basics',
      streakDays: 1,
      xpPoints: 20,
      isGuest: true,
      joinedDate: 'Today'
    };
    saveUser(guestUser);
  };

  const register = (
    name: string,
    email: string,
    language: TargetLanguage,
    goalMinutes: number,
    motivation: string
  ) => {
    const newUser: UserProfile = {
      id: 'user-' + Date.now(),
      name: name.trim() || 'German Learner',
      email: email.trim(),
      avatar: '🚀',
      nativeLanguage: language,
      dailyGoalMinutes: goalMinutes || 25,
      learningMotivation: motivation || 'Goethe A1 Exam Preparation',
      streakDays: 1,
      xpPoints: 100,
      isGuest: false,
      joinedDate: 'November 2026'
    };
    saveUser(newUser);
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    saveUser(updated);
  };

  const logout = () => {
    saveUser(null);
  };

  const addXP = (amount: number) => {
    if (!user) return;
    updateProfile({ xpPoints: (user.xpPoints || 0) + amount });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        loginAsGuest,
        register,
        updateProfile,
        logout,
        addXP
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
