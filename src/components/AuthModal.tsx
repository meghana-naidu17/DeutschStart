import { useState } from 'react';
import { X, LogIn, UserPlus, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import type { TargetLanguage } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { login, register, loginAsGuest } = useAuth();
  const { availableLanguages, targetLanguage, setTargetLanguage } = useLanguage();

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedLang, setSelectedLang] = useState<TargetLanguage>(targetLanguage);
  const [goalMinutes, setGoalMinutes] = useState(25);
  const [motivation, setMotivation] = useState('Pass Goethe A1 Exam');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email or username');
      return;
    }
    setError('');
    login(email.trim(), password);
    onClose();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    setError('');
    setTargetLanguage(selectedLang);
    register(name, email, selectedLang, goalMinutes, motivation);
    onClose();
  };

  const handleDemoLogin = () => {
    login('meghana.sharma@deutschstart.app');
    onClose();
  };

  const handleGuestLogin = () => {
    loginAsGuest('Guest Learner', selectedLang);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="auth-header">
          <div className="auth-brand-badge">
            <span className="badge-flag">🇩🇪</span>
            <span>DeutschStart</span>
          </div>
          <h2>{mode === 'login' ? 'Welcome Back!' : 'Start Learning German'}</h2>
          <p>
            {mode === 'login'
              ? 'Log in to track your A1 progress, daily streak, and practice quiz scores.'
              : 'Create your free account to personalize your translations in Telugu, Hindi, or English.'}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setMode('login');
              setError('');
            }}
          >
            <LogIn size={16} /> Log In
          </button>
          <button
            className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setMode('signup');
              setError('');
            }}
          >
            <UserPlus size={16} /> Sign Up
          </button>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>Email or Username</label>
              <input
                type="text"
                placeholder="e.g. learner@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="primary-action-btn full-width">
              Log In to Course <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Meghana Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="learner@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Preferred Translation Language</label>
              <p className="form-sublabel">German words will be translated into this language:</p>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value as TargetLanguage)}
                className="auth-select"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Daily Study Goal</label>
              <div className="pill-selector">
                {[15, 25, 40, 60].map((mins) => (
                  <button
                    type="button"
                    key={mins}
                    className={`pill-btn ${goalMinutes === mins ? 'selected' : ''}`}
                    onClick={() => setGoalMinutes(mins)}
                  >
                    {mins} mins/day
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Primary Goal / Motivation</label>
              <select
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                className="auth-select"
              >
                <option value="Pass Goethe A1 Exam">Pass Goethe A1 Exam (Start Deutsch 1)</option>
                <option value="Pass Telc A1 Exam">Pass Telc A1 Exam</option>
                <option value="Master Studies / University in Germany">Master Studies / University in Germany</option>
                <option value="Job / Working in Germany">Job / Working in Germany (Opportunity Card / Blue Card)</option>
                <option value="Spouse / Family Reunion Visa">Spouse / Family Reunion Visa (Ehegattennachzug)</option>
                <option value="Personal Hobby & Travel">Personal Hobby & Travel</option>
              </select>
            </div>

            <button type="submit" className="primary-action-btn full-width">
              Create Account & Start Learning <CheckCircle2 size={18} />
            </button>
          </form>
        )}

        <div className="auth-divider">
          <span>OR QUICK ACCESS</span>
        </div>

        <div className="auth-quick-actions">
          <button type="button" className="demo-login-btn" onClick={handleDemoLogin}>
            <Sparkles size={16} /> 1-Click Demo Login (Meghana)
          </button>
          <button type="button" className="guest-login-btn" onClick={handleGuestLogin}>
            Continue as Guest Learner
          </button>
        </div>
      </div>
    </div>
  );
}
