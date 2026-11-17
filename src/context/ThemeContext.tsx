import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AppTheme, FontSize, ThemeSettings } from '../types';

interface ThemeContextType {
  settings: ThemeSettings;
  setTheme: (theme: AppTheme) => void;
  setFontSize: (fontSize: FontSize) => void;
  setAudioSpeed: (speed: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'deutschstart_theme_settings';

const defaultSettings: ThemeSettings = {
  theme: 'light',
  fontSize: 'normal',
  audioSpeed: 0.75
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) {
        return { ...defaultSettings, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return defaultSettings;
  });

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const setTheme = (theme: AppTheme) => updateSettings({ theme });
  const setFontSize = (fontSize: FontSize) => updateSettings({ fontSize });
  const setAudioSpeed = (audioSpeed: number) => updateSettings({ audioSpeed });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
    document.documentElement.setAttribute('data-font-size', settings.fontSize);
  }, [settings.theme, settings.fontSize]);

  return (
    <ThemeContext.Provider
      value={{
        settings,
        setTheme,
        setFontSize,
        setAudioSpeed
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
