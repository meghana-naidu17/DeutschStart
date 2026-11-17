import { useState } from 'react';
import {
  User,
  Palette,
  Check,
  Shield,
  Volume2,
  Type,
  Flame,
  Award,
  BookOpen,
  LogOut,
  Sparkles,
  ExternalLink,
  Save
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import type { AppTheme, FontSize, TargetLanguage } from '../types';

interface ProfileSettingsProps {
  completedCount: number;
  totalLessons: number;
  onOpenDictCc: () => void;
  onOpenDisclaimer: () => void;
  onOpenUpcoming: () => void;
}

const avatarList = ['👩‍🎓', '👨‍🎓', '🇩🇪', '🥨', '🏰', '🚀', '🌟', '📚', '🦉', '☕'];

export default function ProfileSettings({
  completedCount,
  totalLessons,
  onOpenDictCc,
  onOpenDisclaimer,
  onOpenUpcoming
}: ProfileSettingsProps) {
  const { user, updateProfile, logout } = useAuth();
  const { settings, setTheme, setFontSize, setAudioSpeed } = useTheme();
  const { availableLanguages, targetLanguage, setTargetLanguage } = useLanguage();

  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'learning'>('profile');

  // Local form state
  const [name, setName] = useState(user?.name || 'German Learner');
  const [email, setEmail] = useState(user?.email || 'learner@example.com');
  const [avatar, setAvatar] = useState(user?.avatar || '👩‍🎓');
  const [selectedLang, setSelectedLang] = useState<TargetLanguage>(targetLanguage);
  const [dailyGoal, setDailyGoal] = useState(user?.dailyGoalMinutes || 25);
  const [motivation, setMotivation] = useState(
    user?.learningMotivation || 'Goethe-Zertifikat A1 Preparation'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      avatar,
      nativeLanguage: selectedLang,
      dailyGoalMinutes: dailyGoal,
      learningMotivation: motivation
    });
    setTargetLanguage(selectedLang);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const themes: { id: AppTheme; name: string; desc: string; preview: string[] }[] = [
    {
      id: 'light',
      name: 'Clean Light',
      desc: 'Crisp alpine white with vibrant lavender accents. Perfect for daytime study.',
      preview: ['#ffffff', '#f5f3ff', '#7956ca']
    },
    {
      id: 'dark',
      name: 'Dark Slate',
      desc: 'Deep midnight obsidian with high-contrast text. Easy on your eyes at night.',
      preview: ['#0f172a', '#1e293b', '#a855f7']
    },
    {
      id: 'deutschland',
      name: 'Deutschland Heritage',
      desc: 'Inspired by the German flag: Charcoal black, German Crimson Red & Gold Amber.',
      preview: ['#18181b', '#dc2626', '#f59e0b']
    },
    {
      id: 'emerald',
      name: 'Nordic Forest',
      desc: 'Refreshing emerald green & mint palette. Calming and focus-enhancing.',
      preview: ['#064e3b', '#059669', '#34d399']
    }
  ];

  return (
    <div className="page-content settings-page">
      <div className="page-heading">
        <span className="welcome-label">PERSONALIZATION & PREFERENCES</span>
        <h1>Settings & Profile</h1>
        <p>Customize your learning experience, interface theme, and study goals.</p>
      </div>

      {/* Tabs */}
      <div className="settings-nav-tabs">
        <button
          className={`settings-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={18} /> Profile & Goals
        </button>
        <button
          className={`settings-nav-btn ${activeTab === 'appearance' ? 'active' : ''}`}
          onClick={() => setActiveTab('appearance')}
        >
          <Palette size={18} /> Theme & UI Options
        </button>
        <button
          className={`settings-nav-btn ${activeTab === 'learning' ? 'active' : ''}`}
          onClick={() => setActiveTab('learning')}
        >
          <Shield size={18} /> Companion Tools & Disclaimer
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="settings-tab-pane">
          {/* User Stats Card */}
          <div className="profile-stats-card">
            <div className="profile-avatar-wrap">
              <span className="profile-large-avatar">{avatar}</span>
              <div>
                <h2>{name}</h2>
                <p className="profile-email">{email}</p>
                <div className="profile-tags">
                  <span className="profile-tag">
                    {user?.isGuest ? 'Guest Learner' : 'Registered Student'}
                  </span>
                  <span className="profile-tag">CEFR Level: German A1</span>
                </div>
              </div>
            </div>

            <div className="profile-stat-numbers">
              <div className="stat-pill">
                <Flame size={20} className="flame-icon" />
                <div>
                  <strong>{user?.streakDays || 1} Days</strong>
                  <small>Daily Streak</small>
                </div>
              </div>

              <div className="stat-pill">
                <Award size={20} className="award-icon" />
                <div>
                  <strong>{user?.xpPoints || 100} XP</strong>
                  <small>Practice Points</small>
                </div>
              </div>

              <div className="stat-pill">
                <BookOpen size={20} className="book-icon" />
                <div>
                  <strong>{completedCount} / {totalLessons}</strong>
                  <small>Lessons Completed</small>
                </div>
              </div>
            </div>
          </div>

          {savedSuccess && (
            <div className="save-success-banner">
              <Check size={18} /> Profile & language settings saved successfully!
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSaveProfile} className="settings-form-card">
            <h3>Edit Profile Information</h3>

            {/* Avatar picker */}
            <div className="form-group">
              <label>Choose Your Avatar</label>
              <div className="avatar-picker-grid">
                {avatarList.map((av) => (
                  <button
                    type="button"
                    key={av}
                    className={`avatar-option-btn ${avatar === av ? 'selected' : ''}`}
                    onClick={() => setAvatar(av)}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Default Translation Language</label>
              <p className="form-sublabel">
                German words, vocabulary, and phrases across all lessons will be translated into this language:
              </p>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value as TargetLanguage)}
                className="settings-select"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Daily Study Goal (Minutes)</label>
              <div className="pill-selector">
                {[15, 25, 40, 60].map((mins) => (
                  <button
                    type="button"
                    key={mins}
                    className={`pill-btn ${dailyGoal === mins ? 'selected' : ''}`}
                    onClick={() => setDailyGoal(mins)}
                  >
                    {mins} mins/day
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Learning Motivation / Target Exam</label>
              <select
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                className="settings-select"
              >
                <option value="Pass Goethe A1 Exam (Start Deutsch 1)">
                  Pass Goethe A1 Exam (Start Deutsch 1)
                </option>
                <option value="Pass Telc A1 Exam">Pass Telc A1 Exam</option>
                <option value="Master Studies / University in Germany">
                  Master Studies / University in Germany
                </option>
                <option value="Job / Opportunity Card in Germany">
                  Job / Opportunity Card in Germany
                </option>
                <option value="Spouse Visa / Family Reunion">
                  Spouse Visa / Family Reunion (Ehegattennachzug)
                </option>
                <option value="Hobby, Travel & Culture">Hobby, Travel & Culture</option>
              </select>
            </div>

            <div className="form-actions-row">
              <button type="submit" className="primary-action-btn">
                <Save size={18} /> Save Changes
              </button>
              <button
                type="button"
                className="logout-btn"
                onClick={logout}
                title="Log out from DeutschStart"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Appearance & Theme */}
      {activeTab === 'appearance' && (
        <div className="settings-tab-pane">
          <div className="settings-card">
            <h3>Visual Themes</h3>
            <p className="card-desc">
              Choose the visual theme that suits your mood and environment. Changes apply instantly across all pages and lessons.
            </p>

            <div className="theme-options-grid">
              {themes.map((th) => {
                const isSelected = settings.theme === th.id;
                return (
                  <button
                    key={th.id}
                    className={`theme-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setTheme(th.id)}
                  >
                    <div className="theme-card-top">
                      <div className="theme-swatches">
                        {th.preview.map((color, i) => (
                          <span
                            key={i}
                            className="theme-swatch"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      {isSelected && (
                        <span className="active-badge">
                          <Check size={14} /> Active
                        </span>
                      )}
                    </div>
                    <h4>{th.name}</h4>
                    <p>{th.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="settings-card">
            <h3>Text & Font Size</h3>
            <p className="card-desc">Adjust reading scale for better comfort and accessibility.</p>
            <div className="font-size-options">
              {(['normal', 'large'] as FontSize[]).map((size) => (
                <button
                  key={size}
                  className={`font-size-btn ${settings.fontSize === size ? 'selected' : ''}`}
                  onClick={() => setFontSize(size)}
                >
                  <Type size={size === 'large' ? 22 : 18} />
                  <span>{size === 'normal' ? 'Standard (16px)' : 'Large (18px) for easier reading'}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="settings-card">
            <h3>German Audio Pronunciation Speed</h3>
            <p className="card-desc">
              Set speech synthesis rate for German audio pronunciation playback across all lessons.
            </p>
            <div className="audio-speed-options">
              {[
                { speed: 0.75, label: '0.75x Slow (Recommended for Beginners)' },
                { speed: 1.0, label: '1.0x Normal Speed' }
              ].map((opt) => (
                <button
                  key={opt.speed}
                  className={`audio-speed-btn ${settings.audioSpeed === opt.speed ? 'selected' : ''}`}
                  onClick={() => setAudioSpeed(opt.speed)}
                >
                  <Volume2 size={18} />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Learning Companion & Disclaimers */}
      {activeTab === 'learning' && (
        <div className="settings-tab-pane">
          <div className="settings-card alert-highlight-card">
            <div className="card-icon-header">
              <Shield size={24} className="text-warning" />
              <div>
                <h3>Important Study Disclaimer & Companion Notice</h3>
                <p>
                  DeutschStart is an interactive pathway, but website drills alone are not sufficient to clear Goethe A1. Make sure to combine with YouTube and books.
                </p>
              </div>
            </div>
            <button className="primary-action-btn" onClick={onOpenDisclaimer}>
              View Recommended YouTube Channels & Books <ExternalLink size={16} />
            </button>
          </div>

          <div className="settings-card dictcc-card-highlight">
            <div className="card-icon-header">
              <Sparkles size={24} className="text-primary" />
              <div>
                <h3>dict.cc Verified German Dictionary</h3>
                <p>
                  Always look up unfamiliar German words on dict.cc to get the exact grammatical gender (der, die, das) and plural forms.
                </p>
              </div>
            </div>
            <button className="secondary-action-btn" onClick={onOpenDictCc}>
              Open dict.cc Quick Search Tool <ExternalLink size={16} />
            </button>
          </div>

          <div className="settings-card">
            <div className="card-icon-header">
              <BookOpen size={24} className="text-accent" />
              <div>
                <h3>Upcoming German Levels (A2 & B1)</h3>
                <p>
                  View planned curricula for German A2 and Goethe B1, including past tense (Perfekt), subjunctive (Konjunktiv II), and passive voice.
                </p>
              </div>
            </div>
            <button className="secondary-action-btn" onClick={onOpenUpcoming}>
              Explore A2 & B1 Roadmap <ExternalLink size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
