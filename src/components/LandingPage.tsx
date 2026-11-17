import {
  Languages,
  Volume2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Search,
  Lock,
  Star,
  ExternalLink,
  Globe,
  LogIn
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import type { TargetLanguage } from '../types';

interface LandingPageProps {
  onStartLearning: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenDictCc: () => void;
  onOpenDisclaimer: () => void;
  onOpenUpcoming: () => void;
}

export default function LandingPage({
  onStartLearning,
  onOpenAuth,
  onOpenDictCc,
  onOpenDisclaimer,
  onOpenUpcoming
}: LandingPageProps) {
  const { targetLanguage, setTargetLanguage, availableLanguages, currentLanguage } = useLanguage();
  const { user, login } = useAuth();

  const handleDemoStart = () => {
    if (!user) {
      login('meghana.sharma@deutschstart.app');
    }
    onStartLearning();
  };

  return (
    <div className="landing-page-container">
      {/* Top Banner Disclaimer Notice */}
      <div className="landing-top-alert" onClick={onOpenDisclaimer}>
        <div className="alert-content">
          <ShieldAlert size={16} />
          <span>
            <strong>Study Notice:</strong> DeutschStart provides a structured foundation, but website practice alone is not enough to pass Goethe A1. Make sure to use recommended YouTube videos and textbooks!
          </span>
          <span className="alert-link">
            Read Study Guide <ArrowRight size={13} />
          </span>
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="landing-navbar">
        <div className="landing-nav-brand">
          <div className="brand-icon-box">
            <Languages size={24} />
          </div>
          <div className="brand-text">
            <h2>DeutschStart</h2>
            <span>Learn German from A1 to B1 🇩🇪</span>
          </div>
        </div>

        <nav className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#curriculum">A1 Curriculum</a>
          <button className="nav-text-btn" onClick={onOpenUpcoming}>
            A2 & B1 Roadmap
          </button>
          <button className="nav-text-btn" onClick={onOpenDictCc}>
            dict.cc Tool
          </button>
          <button className="nav-text-btn" onClick={onOpenDisclaimer}>
            Study Disclaimer
          </button>
        </nav>

        <div className="landing-nav-actions">
          {/* Quick Target Language Selector */}
          <div className="landing-lang-selector" title="Change translation language">
            <Globe size={16} className="lang-icon" />
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value as TargetLanguage)}
              className="lang-select-input"
            >
              {availableLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          {user ? (
            <button className="primary-nav-btn" onClick={onStartLearning}>
              Go to Dashboard <ArrowRight size={16} />
            </button>
          ) : (
            <>
              <button className="secondary-nav-btn" onClick={() => onOpenAuth('login')}>
                <LogIn size={15} /> Log In
              </button>
              <button className="primary-nav-btn" onClick={() => onOpenAuth('signup')}>
                Start A1 Free <ArrowRight size={15} />
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-flag">🇩🇪</span>
            <span>GERMAN A1 FOUNDATION & BEYOND</span>
            <span className="badge-pill">Translations in {currentLanguage.nativeName}</span>
          </div>

          <h1 className="hero-title">
            Master German from Scratch — Step by Step with Precision
          </h1>

          <p className="hero-description">
            DeutschStart gives you an interactive, structured path to conquer German A1. Learn vocabulary with translations in <strong>{currentLanguage.name} ({currentLanguage.nativeName})</strong>, Telugu, Hindi & English, master grammar rules, listen to native audio, and verify any word on <strong>dict.cc</strong>.
          </p>

          <div className="hero-cta-group">
            <button className="hero-primary-btn" onClick={handleDemoStart}>
              Start Learning Free <ArrowRight size={19} />
            </button>
            <button className="hero-secondary-btn" onClick={onOpenDictCc}>
              <Search size={18} /> Try dict.cc Word Lookup
            </button>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <strong>20+</strong>
              <span>Interactive Lessons</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <strong>600+</strong>
              <span>A1 Words & Phrases</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <strong>6</strong>
              <span>Translation Languages</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <strong>Goethe & Telc</strong>
              <span>Curriculum Aligned</span>
            </div>
          </div>
        </div>

        <div className="hero-visual-card">
          <div className="lesson-preview-box">
            <div className="preview-top">
              <span className="preview-dot red" />
              <span className="preview-dot yellow" />
              <span className="preview-dot green" />
              <span className="preview-label">Live Interactive Preview</span>
            </div>

            <div className="preview-body">
              <div className="preview-word-card">
                <div className="preview-word-header">
                  <span className="article-pill article-der">der</span>
                  <h3>Apfel</h3>
                  <button className="audio-pill-btn" onClick={onOpenDictCc}>
                    <Volume2 size={15} /> Listen
                  </button>
                </div>
                <p className="preview-plural">Plural: die Äpfel · /AHP-fel/</p>

                <div className="preview-translation-block">
                  <span className="lang-label">{currentLanguage.flag} {currentLanguage.name} Translation:</span>
                  <strong>
                    {currentLanguage.code === 'te'
                      ? 'ఆపిల్ పండు'
                      : currentLanguage.code === 'hi'
                      ? 'सेब'
                      : currentLanguage.code === 'es'
                      ? 'Manzana'
                      : currentLanguage.code === 'fr'
                      ? 'Pomme'
                      : currentLanguage.code === 'ta'
                      ? 'ஆப்பிள்'
                      : 'Apple'}
                  </strong>
                </div>

                <div className="preview-example-block">
                  <span className="ex-de">„Ich esse jeden Tag einen Apfel.“</span>
                  <span className="ex-trans">
                    {currentLanguage.code === 'te'
                      ? '— నేను ప్రతిరోజూ ఒక ఆపిల్ పండు తింటాను.'
                      : currentLanguage.code === 'hi'
                      ? '— मैं रोज़ाना एक सेब खाता हूँ।'
                      : '— I eat an apple every day.'}
                  </span>
                </div>

                <div className="preview-dict-footer">
                  <button className="preview-dictcc-link" onClick={onOpenDictCc}>
                    Verify gender & plurals on <strong>dict.cc</strong> ↗
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multilingual Highlight Banner */}
      <section className="multilingual-banner" id="multilingual">
        <div className="section-container">
          <div className="multi-lang-header">
            <span className="section-subheading">SWITCHABLE BASE TRANSLATIONS</span>
            <h2>Learn German in Your Mother Tongue</h2>
            <p>
              Why struggle translating German into English if English isn't your first language? DeutschStart allows you to switch translations into <strong>Telugu</strong>, <strong>Hindi</strong>, <strong>Tamil</strong>, <strong>Spanish</strong>, <strong>French</strong>, or <strong>English</strong> with one click!
            </p>
          </div>

          <div className="lang-cards-grid">
            {availableLanguages.map((lang) => {
              const isSelected = targetLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  className={`lang-card-pill ${isSelected ? 'active' : ''}`}
                  onClick={() => setTargetLanguage(lang.code)}
                >
                  <span className="lang-flag-lg">{lang.flag}</span>
                  <div className="lang-card-text">
                    <strong>{lang.name}</strong>
                    <span>{lang.nativeName}</span>
                  </div>
                  {isSelected && <span className="active-dot" />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* dict.cc Verified Translation Spotlight */}
      <section className="dictcc-spotlight-section">
        <div className="section-container">
          <div className="dictcc-spotlight-card">
            <div className="dictcc-spotlight-content">
              <div className="spotlight-badge">
                <Sparkles size={16} /> ACCURATE GERMAN TRANSLATION
              </div>
              <h2>Why We Recommend dict.cc for Every Word</h2>
              <p>
                Machine translation tools often make critical mistakes with German grammatical genders (<strong>der, die, das</strong>) and plural forms. <strong>dict.cc</strong> is the world’s most trusted community-verified German dictionary with exact noun genders, declension tables, and native pronunciation.
              </p>
              <ul className="dictcc-perks-list">
                <li>
                  <CheckCircle2 size={18} className="text-success" />
                  <strong>Exact Gender:</strong> Never guess whether it's der, die, or das.
                </li>
                <li>
                  <CheckCircle2 size={18} className="text-success" />
                  <strong>Plural Forms:</strong> Learn irregular plurals (e.g. das Buch → die Bücher).
                </li>
                <li>
                  <CheckCircle2 size={18} className="text-success" />
                  <strong>Separable Verbs:</strong> See exact prefix separations (aufstehen, anrufen).
                </li>
              </ul>

              <div className="spotlight-actions">
                <button className="primary-action-btn" onClick={onOpenDictCc}>
                  <Search size={17} /> Open dict.cc Search Assistant
                </button>
                <a
                  href="https://www.dict.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-action-btn"
                >
                  Visit dict.cc Website <ExternalLink size={15} />
                </a>
              </div>
            </div>

            <div className="dictcc-spotlight-box">
              <div className="dictcc-box-header">
                <strong>dict.cc Quick Lookup Demo</strong>
                <span className="dictcc-tag">Verified Data</span>
              </div>
              <div className="dictcc-mock-table">
                <div className="mock-row">
                  <span className="mock-de">der Tisch [m]</span>
                  <span className="mock-trans">table / బల్ల / मेज़</span>
                </div>
                <div className="mock-row">
                  <span className="mock-de">die Lampe [f]</span>
                  <span className="mock-trans">lamp / దీపం / लैंप</span>
                </div>
                <div className="mock-row">
                  <span className="mock-de">das Fenster [n]</span>
                  <span className="mock-trans">window / కిటికీ / खिड़की</span>
                </div>
                <div className="mock-row">
                  <span className="mock-de">sprechen [v]</span>
                  <span className="mock-trans">to speak / మాట్లాడటం / बोलना</span>
                </div>
              </div>
              <small className="dictcc-caption">
                *Included built-in with quick search across DeutschStart!
              </small>
            </div>
          </div>
        </div>
      </section>

      {/* Important Study Disclaimer Section */}
      <section className="disclaimer-spotlight-section">
        <div className="section-container">
          <div className="disclaimer-spotlight-card">
            <div className="disclaimer-spotlight-icon">
              <ShieldAlert size={44} />
            </div>
            <div className="disclaimer-spotlight-body">
              <span className="disclaimer-tag">STUDENT ADVICE & TRANSPARENCY</span>
              <h2>DeutschStart is the Path — But Here is How to Truly Master A1</h2>
              <p>
                We believe in total honesty: <strong>no website alone is sufficient to pass the official Goethe-Zertifikat A1 exam</strong>. DeutschStart gives you the structured grammar roadmap, interactive practice drills, and vocabulary in Telugu/Hindi/English. But to achieve complete CEFR A1 certification:
              </p>

              <div className="disclaimer-two-pillars">
                <div className="pillar-card">
                  <div className="pillar-header">
                    <span className="pillar-emoji">📺</span>
                    <h4>1. Practice with YouTube Videos</h4>
                  </div>
                  <p>
                    Listen to natural German speaking speed and everyday accents with channels like <strong>Easy German</strong>, <strong>Learn German with Anja</strong>, and <strong>DW Nicos Weg</strong>.
                  </p>
                </div>

                <div className="pillar-card">
                  <div className="pillar-header">
                    <span className="pillar-emoji">📚</span>
                    <h4>2. Refer to Standard Coursebooks</h4>
                  </div>
                  <p>
                    Solve handwritten exercises and official sample exams from standard textbooks like <strong>Netzwerk neu A1</strong>, <strong>Fit fürs Goethe-Zertifikat A1</strong>, and <strong>Grammatik aktiv</strong>.
                  </p>
                </div>
              </div>

              <div className="disclaimer-cta-row">
                <button className="disclaimer-full-btn" onClick={onOpenDisclaimer}>
                  Open Full Companion Guide & Book List <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A2 and B1 Upcoming Levels Showcase */}
      <section className="upcoming-showcase-section" id="upcoming">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-subheading">YOUR FUTURE IN GERMAN</span>
            <h2>Upcoming Levels: German A2 & B1</h2>
            <p>
              Your German journey doesn’t stop at A1. We are actively developing the A2 and B1 curricula to take you to professional and academic fluency.
            </p>
          </div>

          <div className="upcoming-cards-grid">
            <div className="upcoming-level-card">
              <div className="lvl-card-top">
                <span className="lvl-badge">ELEMENTARY</span>
                <span className="status-badge upcoming">
                  <Lock size={13} /> Coming Soon · Summer 2027
                </span>
              </div>
              <h3>German A2 (Elementary)</h3>
              <p className="lvl-card-desc">
                Conquer past-tense storytelling (Perfekt), reflexive verbs, subordinate clauses with <em>weil</em> and <em>dass</em>, two-way prepositions, and German apartment hunting.
              </p>

              <ul className="lvl-features-list">
                <li>
                  <CheckCircle2 size={16} /> Past Tense: Das Perfekt (haben vs sein)
                </li>
                <li>
                  <CheckCircle2 size={16} /> Reflexive Verbs (sich freuen, sich waschen)
                </li>
                <li>
                  <CheckCircle2 size={16} /> Two-Way Prepositions (Akkusativ vs Dativ)
                </li>
                <li>
                  <CheckCircle2 size={16} /> Adjective Endings & Office Communication
                </li>
              </ul>

              <button className="lvl-explore-btn" onClick={onOpenUpcoming}>
                Preview A2 Curriculum & Syllabus <ArrowRight size={15} />
              </button>
            </div>

            <div className="upcoming-level-card featured">
              <div className="lvl-card-top">
                <span className="lvl-badge gold">INTERMEDIATE</span>
                <span className="status-badge upcoming">
                  <Lock size={13} /> In Planning · Late 2027
                </span>
              </div>
              <h3>German B1 (Goethe-Zertifikat B1)</h3>
              <p className="lvl-card-desc">
                The golden milestone required for German universities, skilled jobs, Opportunity Card (Chancenkarte), and German citizenship. Express opinions, hypotheses, and professional emails.
              </p>

              <ul className="lvl-features-list">
                <li>
                  <CheckCircle2 size={16} /> Subjunctive II (Konjunktiv II: hätte, wäre, würde)
                </li>
                <li>
                  <CheckCircle2 size={16} /> Passive Voice (Passiv with werden)
                </li>
                <li>
                  <CheckCircle2 size={16} /> Complex Connectors (obwohl, trotzdem, zwar... aber)
                </li>
                <li>
                  <CheckCircle2 size={16} /> Full Goethe B1 Exam Simulation Papers
                </li>
              </ul>

              <button className="lvl-explore-btn gold-btn" onClick={onOpenUpcoming}>
                Preview B1 Curriculum & Syllabus <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Snapshot */}
      <section className="curriculum-snapshot-section" id="curriculum">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-subheading">WHAT YOU LEARN IN A1</span>
            <h2>Complete German A1 Curriculum</h2>
            <p>19+ structured interactive lessons with quizzes, audio, and exercises.</p>
          </div>

          <div className="curriculum-grid">
            {[
              { title: 'German Alphabet', desc: 'A-Z, Ä, Ö, Ü, ß & phonetics', icon: '🔤' },
              { title: 'Greetings & Introductions', desc: 'Hallo, Guten Tag, Wie geht es dir?', icon: '👋' },
              { title: 'Numbers, Dates & Time', desc: 'Counting, days, months, and clock time', icon: '🔢' },
              { title: 'Personal Pronouns', desc: 'ich, du, er, sie, es, wir, ihr, sie, Sie', icon: '👤' },
              { title: 'Articles (der, die, das)', desc: 'Definite, indefinite and negative articles', icon: '📚' },
              { title: 'Regular & Irregular Verbs', desc: 'sein, haben, wohnen, sprechen, fahren', icon: '✍️' },
              { title: 'Sentence Structure & V2', desc: 'Subjekt - Verb - Objekt and inverted word order', icon: '🧩' },
              { title: 'Negation (nicht vs kein)', desc: 'How to negate nouns, verbs and adjectives', icon: '🚫' },
              { title: 'W-Fragen & Yes/No Questions', desc: 'Wer, Wie, Wo, Woher, Wohin & Ja/Nein', icon: '❓' },
              { title: 'Modal Verbs', desc: 'können, müssen, wollen, dürfen, sollen, möchten', icon: '⚡' },
              { title: 'Separable Verbs', desc: 'aufstehen, einkaufen, anrufen in action', icon: '🔀' },
              { title: 'Everyday Conversations', desc: 'Dialogues at café, supermarket, and doctor', icon: '💬' }
            ].map((mod, idx) => (
              <div key={idx} className="curriculum-card">
                <span className="card-emoji">{mod.icon}</span>
                <h4>{mod.title}</h4>
                <p>{mod.desc}</p>
              </div>
            ))}
          </div>

          <div className="curriculum-footer-cta">
            <button className="hero-primary-btn" onClick={handleDemoStart}>
              Open Full Course & Start Lesson 1 <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Student Reviews */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-subheading">REAL STUDENT EXPERIENCES</span>
            <h2>Loved by German Learners</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star-filled" />
                ))}
              </div>
              <p>
                „Having German translations in <strong>Telugu</strong> alongside English was an absolute game changer! The concept of case endings felt much closer to our Telugu vibhakthulu. DeutschStart made A1 grammar crystal clear.“
              </p>
              <div className="testimonial-author">
                <span className="author-avatar">👩‍💻</span>
                <div>
                  <strong>Meghana S.</strong>
                  <span>Master's Applicant, TU Munich</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star-filled" />
                ))}
              </div>
              <p>
                „The disclaimer and study guide were so honest! They told me exactly which YouTube videos and books to pair with the interactive drills. And the <strong>dict.cc</strong> lookup saves me every day with der/die/das.“
              </p>
              <div className="testimonial-author">
                <span className="author-avatar">👨‍💼</span>
                <div>
                  <strong>Rahul V.</strong>
                  <span>Software Engineer, Berlin Opportunity Card</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="landing-cta-banner">
        <div className="cta-banner-content">
          <h2>Ready to Begin Your German Adventure?</h2>
          <p>
            Start German A1 right now for free. Practice with native audio, interactive drills, and translations in your language.
          </p>
          <div className="cta-banner-buttons">
            <button className="hero-primary-btn" onClick={handleDemoStart}>
              Start Learning Now — Free <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand-col">
            <div className="brand-logo-row">
              <Languages size={22} />
              <strong>DeutschStart</strong>
            </div>
            <p>
              Learn German one step at a time. Designed with care for aspiring students, professionals, and language enthusiasts.
            </p>
          </div>

          <div className="footer-links-col">
            <strong>Learning Path</strong>
            <button onClick={onStartLearning}>German A1 Foundation</button>
            <button onClick={onOpenUpcoming}>German A2 (Coming Soon)</button>
            <button onClick={onOpenUpcoming}>German B1 (Coming Soon)</button>
          </div>

          <div className="footer-links-col">
            <strong>Companion Tools</strong>
            <button onClick={onOpenDictCc}>dict.cc Dictionary Tool</button>
            <button onClick={onOpenDisclaimer}>A1 Study Disclaimer</button>
            <button onClick={onOpenDisclaimer}>Recommended Books & YouTube</button>
          </div>

          <div className="footer-links-col">
            <strong>Language Options</strong>
            <span>English · తెలుగు · हिन्दी · Español · Français · தமிழ்</span>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p>© 2026 DeutschStart · German Learning Made Simple 🇩🇪</p>
        </div>
      </footer>
    </div>
  );
}
