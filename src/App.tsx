import { useMemo, useState, useEffect } from "react";
import {
  BookOpen,
  GraduationCap,
  Home,
  Menu,
  Search,
  Settings,
  X,
  Languages,
  Headphones,
  Mic,
  BookMarked,
  CheckCircle2,
  Clock,
  Play,
  ChevronRight,
  LayoutDashboard,
  Target,
  Award,
  HelpCircle,
  Lock,
  Zap,
  Repeat,
  MapPin,
  Star,
  ShoppingBag,
  MessageCircle,
  ShieldAlert,
  Flame,
  Globe,
  LogIn,
  Sun,
  Moon,
  Compass
} from "lucide-react";

import { lessons, categories } from "./data/course";

// Core Lessons
import AlphabetLesson from "./components/AlphabetLesson";
import GreetingsLesson from "./components/GreetingsLesson";
import NumbersDatesLesson from "./components/NumbersDatesLesson";
import PersonalPronounsLesson from "./components/PersonalPronounsLesson";
import ArticlesLesson from "./components/ArticlesLesson";
import VerbsLesson from "./components/VerbsLesson";
import IrregularVerbsLesson from "./components/IrregularVerbsLesson";
import SentenceStructureLesson from "./components/SentenceStructureLesson";
import NegationLesson from "./components/NegationLesson";
import QuestionsLesson from "./components/QuestionsLesson";
import PossessiveArticlesLesson from "./components/PossessiveArticlesLesson";
import PluralNounsLesson from "./components/PluralNounsLesson";
import ModalVerbsLesson from "./components/ModalVerbsLesson";
import SeparableVerbsLesson from "./components/SeparableVerbsLesson";
import TimeDailyRoutineLesson from "./components/TimeDailyRoutineLesson";
import PrepositionsLesson from "./components/PrepositionsLesson";
import CasesArticleRevisionLesson from "./components/CasesArticleRevisionLesson";
import AdjectivesDescriptionsLesson from "./components/AdjectivesDescriptionsLesson";
import EverydayLifeVocabularyLesson from "./components/EverydayLifeVocabularyLesson";
import EverydayConversationsLesson from "./components/EverydayConversationsLesson";
import A1ListeningReadingWritingLesson from "./components/A1ListeningReadingWritingLesson";
import A1SpeakingFinalMockLesson from "./components/A1SpeakingFinalMockLesson";

// Modals & Panels
import LandingPage from "./components/LandingPage";
import AuthModal from "./components/AuthModal";
import DictCcModal from "./components/DictCcModal";
import DisclaimerModal from "./components/DisclaimerModal";
import UpcomingLevelsModal from "./components/UpcomingLevelsModal";
import ProfileSettings from "./components/ProfileSettings";

// Contexts
import { useAuth } from "./context/AuthContext";
import { useLanguage } from "./context/LanguageContext";
import { useTheme } from "./context/ThemeContext";
import type { TargetLanguage } from "./types";

export type Page =
  | "Dashboard"
  | "Learning Path"
  | "Alphabet"
  | "Greetings"
  | "Numbers & Dates"
  | "Personal Pronouns"
  | "Articles"
  | "Verbs"
  | "Irregular Verbs"
  | "Sentence Structure"
  | "Negation"
  | "W-Fragen & Ja/Nein-Fragen"
  | "Possessive Articles"
  | "Plural Nouns"
  | "Modal Verbs"
  | "Separable Verbs"
  | "Time & Daily Routine"
  | "Prepositions"
  | "Cases & Article Revision"
  | "Adjectives & Descriptions"
  | "Everyday Life Vocabulary"
  | "Everyday Conversations"
  | "A1 Listening & Reading"
  | "A1 Speaking Mock Exam"
  | "Grammar"
  | "Vocabulary"
  | "Listening"
  | "Speaking"
  | "Reading"
  | "Settings";

const interactivePages: Page[] = [
  "Alphabet",
  "Greetings",
  "Numbers & Dates",
  "Personal Pronouns",
  "Articles",
  "Verbs",
  "Irregular Verbs",
  "Sentence Structure",
  "Negation",
  "W-Fragen & Ja/Nein-Fragen",
  "Possessive Articles",
  "Plural Nouns",
  "Modal Verbs",
  "Separable Verbs",
  "Time & Daily Routine",
  "Prepositions",
  "Cases & Article Revision",
  "Adjectives & Descriptions",
  "Everyday Life Vocabulary",
  "Everyday Conversations",
  "A1 Listening & Reading",
  "A1 Speaking Mock Exam"
];

const navigation = [
  {
    section: "MAIN",
    items: [
      { name: "Dashboard" as Page, icon: Home },
      { name: "Learning Path" as Page, icon: Target }
    ]
  },
  {
    section: "A1 INTERACTIVE LESSONS",
    items: [
      { name: "Alphabet" as Page, icon: Languages },
      { name: "Greetings" as Page, icon: BookOpen },
      { name: "Numbers & Dates" as Page, icon: Clock },
      { name: "Personal Pronouns" as Page, icon: GraduationCap },
      { name: "Articles" as Page, icon: BookMarked },
      { name: "Verbs" as Page, icon: Play },
      { name: "Irregular Verbs" as Page, icon: Award },
      { name: "Sentence Structure" as Page, icon: LayoutDashboard },
      { name: "Negation" as Page, icon: BookMarked },
      { name: "W-Fragen & Ja/Nein-Fragen" as Page, icon: HelpCircle },
      { name: "Possessive Articles" as Page, icon: BookMarked },
      { name: "Plural Nouns" as Page, icon: BookOpen },
      { name: "Modal Verbs" as Page, icon: Zap },
      { name: "Separable Verbs" as Page, icon: Repeat },
      { name: "Time & Daily Routine" as Page, icon: Clock },
      { name: "Prepositions" as Page, icon: MapPin },
      { name: "Cases & Article Revision" as Page, icon: BookMarked },
      { name: "Adjectives & Descriptions" as Page, icon: Star },
      { name: "Everyday Life Vocabulary" as Page, icon: ShoppingBag },
      { name: "Everyday Conversations" as Page, icon: MessageCircle },
      { name: "A1 Listening & Reading" as Page, icon: Headphones },
      { name: "A1 Speaking Mock Exam" as Page, icon: Mic }
    ]
  },
  {
    section: "MORE LEARNING",
    items: [
      { name: "Grammar" as Page, icon: BookMarked },
      { name: "Vocabulary" as Page, icon: Languages },
      { name: "Listening" as Page, icon: Headphones },
      { name: "Speaking" as Page, icon: Mic },
      { name: "Reading" as Page, icon: BookOpen }
    ]
  }
];

const pageDescriptions: Record<string, string> = {
  Grammar: "Understand German grammar step by step with clear rules and drills.",
  Vocabulary: "Build your German vocabulary with useful words translated into Telugu, Hindi & English.",
  Listening: "Improve your German listening comprehension and natural ear for the language.",
  Speaking: "Practise speaking German dialogues with confidence.",
  Reading: "Improve your German reading and comprehension of everyday texts."
};

const lessonDescriptions: Record<string, string> = {
  Alphabet: "Learn German letters (A-Z, Ä, Ö, Ü, ß) and their pronunciation.",
  Greetings: "Learn how to greet and introduce yourself in formal and casual settings.",
  "Numbers & Dates": "Learn numbers, weekdays, months, and calendar dates.",
  "Personal Pronouns": "Understand ich, du, er, sie, es, wir, ihr, sie and formal Sie.",
  Articles: "Master der, die, das and indefinite & negative articles.",
  Verbs: "Learn regular German verbs and their present-tense conjugations.",
  "Irregular Verbs": "Understand irregular verbs like sein, haben, sprechen, fahren.",
  "Sentence Structure": "Learn the Verb-Second (V2) rule and sentence formation.",
  Negation: "Learn how to make negative sentences using nicht and kein.",
  "W-Fragen & Ja/Nein-Fragen": "Learn how to ask questions with Wer, Wie, Wo, and Yes/No questions.",
  "Possessive Articles": "Learn mein, dein, sein, ihr and how possessives work.",
  "Plural Nouns": "Learn how German plural nouns are formed with -e, -er, -en, -s.",
  "Modal Verbs": "Learn können, müssen, wollen, dürfen, sollen, and möchten.",
  "Separable Verbs": "Understand separable verbs (aufstehen, einkaufen, anrufen).",
  "Time & Daily Routine": "Learn to tell the time and describe your everyday routine.",
  Prepositions: "Learn in, an, auf, mit, nach, zu, and aus in everyday contexts.",
  "Cases & Article Revision": "Understand Nominative, Accusative, and introductory Dative cases.",
  "Adjectives & Descriptions": "Describe people, objects, places, colors, and feelings.",
  "Everyday Life Vocabulary": "Learn words for home, university, food, shopping, and travel.",
  "Everyday Conversations": "Interactive dialogues at a café, market, doctor, and train counter.",
  "A1 Listening & Reading": "Practice A1 Hören and Lesen comprehension passages.",
  "A1 Speaking Mock Exam": "Simulate the Goethe Start Deutsch 1 Speaking Test (Sprechen Teil 1, 2, 3)."
};

const lessonIcons: Record<string, string> = {
  Alphabet: "🔤",
  Greetings: "👋",
  "Numbers & Dates": "🔢",
  "Personal Pronouns": "👤",
  Articles: "📚",
  Verbs: "✍️",
  "Irregular Verbs": "🔄",
  "Sentence Structure": "🧩",
  Negation: "🚫",
  "W-Fragen & Ja/Nein-Fragen": "❓",
  "Possessive Articles": "👪",
  "Plural Nouns": "📖",
  "Modal Verbs": "⚡",
  "Separable Verbs": "🔀",
  "Time & Daily Routine": "🕒",
  Prepositions: "📍",
  "Cases & Article Revision": "⚖️",
  "Adjectives & Descriptions": "⭐",
  "Everyday Life Vocabulary": "🛍️",
  "Everyday Conversations": "💬",
  "A1 Listening & Reading": "🎧",
  "A1 Speaking Mock Exam": "🎤"
};

const PROGRESS_STORAGE_KEY = "deutschstart_completed_lessons";

function App() {
  const { user } = useAuth();
  const { targetLanguage, setTargetLanguage, availableLanguages, currentLanguage, t } = useLanguage();
  const { settings, setTheme } = useTheme();

  // Landing page view state: show landing page if explicitly toggled
  const [showLandingPage, setShowLandingPage] = useState<boolean>(false);

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup">("login");
  const [dictCcModalOpen, setDictCcModalOpen] = useState(false);
  const [dictCcInitialQuery, setDictCcInitialQuery] = useState("");
  const [disclaimerModalOpen, setDisclaimerModalOpen] = useState(false);
  const [upcomingModalOpen, setUpcomingModalOpen] = useState(false);
  const [upcomingLevel, setUpcomingLevel] = useState<"a2" | "b1">("a2");

  // Core navigation state
  const [activePage, setActivePage] = useState<Page>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Completed lessons persistence
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ["Alphabet", "Greetings"];
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(completedLessons));
    } catch {
      // ignore
    }
  }, [completedLessons]);

  const totalLessons = lessons.length + interactivePages.length;
  const completedCount = completedLessons.length;
  const progressPercentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const filteredLessons = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return lessons;

    return lessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(query) ||
        lesson.subtitle.toLowerCase().includes(query) ||
        lesson.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const markLessonComplete = (lessonName: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonName) ? prev : [...prev, lessonName]
    );
  };

  const navigateTo = (page: Page) => {
    setShowLandingPage(false);
    setActivePage(page);
    setSidebarOpen(false);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isCompleted = (lessonName: string) => completedLessons.includes(lessonName);

  const openAuth = (mode: "login" | "signup") => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const openDictCc = (query = "") => {
    setDictCcInitialQuery(query);
    setDictCcModalOpen(true);
  };

  const openDisclaimer = () => {
    setDisclaimerModalOpen(true);
  };

  const openUpcoming = (lvl: "a2" | "b1" = "a2") => {
    setUpcomingLevel(lvl);
    setUpcomingModalOpen(true);
  };

  const toggleTheme = () => {
    if (settings.theme === "light") setTheme("dark");
    else if (settings.theme === "dark") setTheme("deutschland");
    else if (settings.theme === "deutschland") setTheme("emerald");
    else setTheme("light");
  };

  // If user opened the landing page, render it!
  if (showLandingPage) {
    return (
      <>
        <LandingPage
          onStartLearning={() => setShowLandingPage(false)}
          onOpenAuth={openAuth}
          onOpenDictCc={() => openDictCc()}
          onOpenDisclaimer={openDisclaimer}
          onOpenUpcoming={() => openUpcoming()}
        />

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authModalMode}
        />

        <DictCcModal
          isOpen={dictCcModalOpen}
          onClose={() => setDictCcModalOpen(false)}
          initialQuery={dictCcInitialQuery}
        />

        <DisclaimerModal
          isOpen={disclaimerModalOpen}
          onClose={() => setDisclaimerModalOpen(false)}
        />

        <UpcomingLevelsModal
          isOpen={upcomingModalOpen}
          onClose={() => setUpcomingModalOpen(false)}
          initialLevel={upcomingLevel}
        />
      </>
    );
  }

  const renderComingSoonLevels = () => (
    <section className="dashboard-section">
      <div className="section-heading">
        <div>
          <h2>Upcoming German Levels (A2 & B1)</h2>
          <p>
            Continue your German journey beyond A1. A2 and B1 curricula are in active preparation.
          </p>
        </div>
        <button
          className="text-button"
          onClick={() => openUpcoming("a2")}
        >
          View Roadmap <ChevronRight size={16} />
        </button>
      </div>

      <div className="coming-soon-grid">
        <div
          className="coming-soon-card"
          onClick={() => openUpcoming("a2")}
          style={{ cursor: "pointer" }}
        >
          <div className="coming-soon-icon">🇩🇪</div>
          <div>
            <span className="coming-soon-label">NEXT LEVEL · ELEMENTARY</span>
            <h3>German A2</h3>
            <p>
              Past tense (Perfekt), reflexive verbs, subordinate clauses (weil/dass), and two-way prepositions.
            </p>
          </div>
          <span className="coming-soon-status">
            <Lock size={14} />
            Coming Soon · Summer 2027
          </span>
        </div>

        <div
          className="coming-soon-card"
          onClick={() => openUpcoming("b1")}
          style={{ cursor: "pointer" }}
        >
          <div className="coming-soon-icon">🎓</div>
          <div>
            <span className="coming-soon-label">INTERMEDIATE · GOETHE B1</span>
            <h3>German B1</h3>
            <p>
              Subjunctive II (Konjunktiv II), passive voice (Passiv), professional correspondence, and full B1 exam simulations.
            </p>
          </div>
          <span className="coming-soon-status">
            <Lock size={14} />
            Coming Soon · Late 2027
          </span>
        </div>
      </div>
    </section>
  );

  const renderNavigation = () => (
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-icon">
          <Languages size={25} />
        </div>

        <div>
          <h2>DeutschStart</h2>
          <span>Learn German with confidence 🇩🇪</span>
        </div>

        <button
          className="mobile-close"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Return to Landing Page Button */}
      <div style={{ padding: "0 8px 14px" }}>
        <button
          className="topbar-action-pill"
          style={{ width: "100%", justifyContent: "center" }}
          onClick={() => setShowLandingPage(true)}
          title="Open Landing Page overview"
        >
          <Compass size={16} />
          <span>Explore Landing Page</span>
        </button>
      </div>

      <div className="sidebar-navigation">
        {navigation.map((group) => (
          <div className="nav-group" key={group.section}>
            <p className="nav-section-title">{group.section}</p>

            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className={`nav-item ${
                    activePage === item.name ? "active" : ""
                  }`}
                  onClick={() => navigateTo(item.name)}
                >
                  <Icon size={19} />
                  <span>{item.name}</span>

                  {interactivePages.includes(item.name) &&
                    isCompleted(item.name) && (
                      <CheckCircle2
                        size={16}
                        className="nav-completed"
                      />
                    )}
                </button>
              );
            })}
          </div>
        ))}

        {/* Companion Tools Section in Sidebar */}
        <div className="nav-group">
          <p className="nav-section-title">COMPANION TOOLS</p>

          <button
            className="nav-item"
            onClick={() => openDictCc()}
          >
            <BookMarked size={19} className="text-primary" />
            <span>dict.cc Dictionary</span>
          </button>

          <button
            className="nav-item"
            onClick={openDisclaimer}
          >
            <ShieldAlert size={19} style={{ color: "#ef4444" }} />
            <span>Study Disclaimer & Books</span>
          </button>

          <button
            className="nav-item"
            onClick={() => openUpcoming("a2")}
          >
            <Lock size={19} style={{ color: "#f59e0b" }} />
            <span>A2 & B1 Roadmap</span>
          </button>
        </div>
      </div>

      <div className="sidebar-bottom">
        <button
          className={`nav-item ${
            activePage === "Settings" ? "active" : ""
          }`}
          onClick={() => navigateTo("Settings")}
        >
          <Settings size={19} />
          <span>Profile & Themes</span>
        </button>

        <div className="sidebar-progress">
          <div className="sidebar-progress-heading">
            <span>Course Progress</span>
            <strong>{progressPercentage}%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <small>
            {completedCount} of {totalLessons} lessons completed
          </small>
        </div>
      </div>
    </aside>
  );

  const renderHeader = () => (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="menu-button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="breadcrumb">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setShowLandingPage(true)}
          >
            DeutschStart
          </span>
          <ChevronRight size={15} />
          <strong>{activePage}</strong>
        </div>

        <div className="topbar-search">
          <Search size={18} />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="topbar-right">
        {/* Multilingual Base Translation Language Selector */}
        <div className="topbar-lang-select" title="Change target translation language">
          <Globe size={15} />
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value as TargetLanguage)}
            aria-label="Select translation language"
          >
            {availableLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* dict.cc Quick Action Pill */}
        <button
          className="topbar-action-pill dictcc-pill"
          onClick={() => openDictCc()}
          title="Look up accurate word translations on dict.cc"
        >
          <BookOpen size={15} />
          <span>dict.cc</span>
        </button>

        {/* Study Disclaimer Pill */}
        <button
          className="topbar-action-pill disclaimer-pill"
          onClick={openDisclaimer}
          title="Read Study Disclaimer & Recommended YouTube / Books"
        >
          <ShieldAlert size={15} />
          <span>Disclaimer</span>
        </button>

        {/* Theme Quick Switcher */}
        <button
          className="topbar-action-pill"
          onClick={toggleTheme}
          title={`Current Theme: ${settings.theme}. Click to switch theme.`}
        >
          {settings.theme === "dark" || settings.theme === "deutschland" ? (
            <Moon size={15} />
          ) : (
            <Sun size={15} />
          )}
          <span style={{ textTransform: "capitalize" }}>{settings.theme}</span>
        </button>

        {/* User Profile Badge */}
        {user ? (
          <button
            className="topbar-user-badge"
            onClick={() => navigateTo("Settings")}
            title="Open Profile Settings"
          >
            <span className="user-badge-avatar">{user.avatar}</span>
            <div className="user-badge-info">
              <span className="user-badge-name">{user.name.split(" ")[0]}</span>
              <span className="user-badge-streak">
                <Flame size={12} /> {user.streakDays || 1}d · {user.xpPoints || 100}XP
              </span>
            </div>
          </button>
        ) : (
          <button
            className="topbar-action-pill"
            onClick={() => openAuth("login")}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );

  const renderLessonCard = (lesson: (typeof lessons)[number]) => (
    <div className="lesson-card" key={lesson.id}>
      <div className="lesson-card-icon">{lesson.icon}</div>

      <div className="lesson-card-content">
        <div className="lesson-card-top">
          <span className="lesson-category">{lesson.category}</span>

          {isCompleted(String(lesson.id)) && (
            <CheckCircle2 size={17} className="completed-icon" />
          )}
        </div>

        <h3>{lesson.title}</h3>
        <p>{lesson.subtitle}</p>

        <div className="lesson-card-footer">
          <span>
            <Clock size={14} />
            {lesson.duration}
          </span>
          <span>{lesson.level}</span>
        </div>
      </div>
    </div>
  );

  const renderInteractiveCard = (page: Page) => {
    const icon = lessonIcons[page] || "📖";

    return (
      <button
        className="interactive-lesson-card"
        key={page}
        onClick={() => navigateTo(page)}
      >
        <div className="interactive-card-top">
          <span className="interactive-card-icon">{icon}</span>

          {isCompleted(page) ? (
            <CheckCircle2 size={19} className="completed-icon" />
          ) : (
            <span className="lesson-status">Start learning</span>
          )}
        </div>

        <h3>{page}</h3>
        <p>{lessonDescriptions[page] || "Interactive German lesson with audio and drills."}</p>

        <div className="interactive-card-footer">
          <span>{isCompleted(page) ? "Completed" : "A1 Lesson"}</span>
          <ChevronRight size={18} />
        </div>
      </button>
    );
  };

  const renderDashboard = () => (
    <div className="page-content">
      {/* Important Study Disclaimer Notice Banner */}
      <div className="dashboard-alert-banner">
        <div className="alert-banner-left">
          <ShieldAlert size={28} />
          <div className="alert-banner-text">
            <strong>Important Study Notice: DeutschStart is Your Path, But Not Sufficient Alone</strong>
            <p>
              Website drills alone cannot guarantee passing Goethe/Telc A1. For true fluency and exam success, always supplement with recommended YouTube channels and textbooks!
            </p>
          </div>
        </div>
        <button className="alert-action-btn" onClick={openDisclaimer}>
          View Books & YouTube Guide <ChevronRight size={16} />
        </button>
      </div>

      {/* dict.cc Quick Verification Card Banner */}
      <div className="dashboard-dictcc-banner">
        <div className="dictcc-banner-left">
          <span className="dictcc-tag-badge">dict.cc</span>
          <div>
            <strong>100% Accurate Translation Reference</strong>
            <p>
              Never guess noun genders (der, die, das) or plural endings. Look up any German word instantly on dict.cc.
            </p>
          </div>
        </div>
        <button className="dictcc-action-btn" onClick={() => openDictCc()}>
          Open Word Lookup Tool <ChevronRight size={16} />
        </button>
      </div>

      {/* Multilingual Target Translation Status */}
      <div className="multilingual-status-bar">
        <div className="multi-status-left">
          <Globe size={18} />
          <span>Current Translation Language:</span>
          <span className="multi-lang-pill">
            {currentLanguage.flag} {currentLanguage.name} ({currentLanguage.nativeName})
          </span>
        </div>
        <button
          className="text-button"
          onClick={() => navigateTo("Settings")}
        >
          Change in Settings <ChevronRight size={14} />
        </button>
      </div>

      {/* Welcome Banner */}
      <section className="welcome-section">
        <div>
          <span className="welcome-label">WILLKOMMEN!</span>
          <h1>
            {user ? `Hallo, ${user.name.split(" ")[0]}!` : "Start your German learning journey."}
          </h1>
          <p>
            Learn German step by step. Master vocabulary with translations in{" "}
            <strong>{currentLanguage.name}</strong>, practice grammar rules, and build your confidence for the Goethe A1 certification.
          </p>

          <button
            className="primary-button"
            onClick={() => navigateTo("Learning Path")}
          >
            Continue learning <ChevronRight size={18} />
          </button>
        </div>

        <div className="welcome-illustration">
          <div className="welcome-emoji">🇩🇪</div>
          <span>Hallo!</span>
          <small>Let's learn German</small>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <BookOpen size={22} />
          </div>
          <div>
            <h3>{totalLessons}</h3>
            <p>Total lessons</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h3>{completedCount}</h3>
            <p>Completed lessons</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Target size={22} />
          </div>
          <div>
            <h3>{progressPercentage}%</h3>
            <p>Course progress</p>
          </div>
        </div>
      </section>

      {/* Interactive Lessons */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Your A1 Interactive Lessons ({interactivePages.length} Modules)</h2>
            <p>Learn with explanations, examples, audio pronunciation, and interactive quizzes.</p>
          </div>

          <button
            className="text-button"
            onClick={() => navigateTo("Learning Path")}
          >
            View all <ChevronRight size={16} />
          </button>
        </div>

        <div className="interactive-lesson-grid">
          {interactivePages.map(renderInteractiveCard)}
        </div>
      </section>

      {/* Explore Categories */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Explore your course</h2>
            <p>Discover more lessons and learning topics.</p>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <div className="category-card" key={category.name}>
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* More Lessons */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>More lessons</h2>
            <p>Explore the rest of your A1 learning material.</p>
          </div>
        </div>

        <div className="lesson-list">
          {lessons.slice(0, 6).map(renderLessonCard)}
        </div>
      </section>

      {/* Upcoming Levels Section */}
      {renderComingSoonLevels()}
    </div>
  );

  const renderLearningPath = () => (
    <div className="page-content">
      <div className="page-heading">
        <span className="welcome-label">YOUR COURSE</span>
        <h1>A1 Learning Path</h1>
        <p>
          Follow the lessons in order and build your German foundation step by step.
        </p>
      </div>

      <div className="learning-progress-card">
        <div className="progress-heading">
          <div>
            <h3>Your learning progress</h3>
            <p>Keep practising to complete your A1 course.</p>
          </div>
          <strong>{progressPercentage}%</strong>
        </div>

        <div className="progress-track large">
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <p>
          {completedCount} out of {totalLessons} lessons completed
        </p>
      </div>

      <div className="learning-path-list">
        {interactivePages.map((page, index) => (
          <button
            className="learning-path-item"
            key={page}
            onClick={() => navigateTo(page)}
          >
            <div className="path-number">
              {isCompleted(page) ? (
                <CheckCircle2 size={22} />
              ) : (
                String(index + 1).padStart(2, "0")
              )}
            </div>

            <div className="path-details">
              <h3>{page}</h3>
              <p>
                {isCompleted(page)
                  ? "You have completed this lesson."
                  : "Open this lesson and start learning."}
              </p>
            </div>

            <span className="path-status">
              {isCompleted(page) ? "Completed" : "Start"}
            </span>

            <ChevronRight size={19} />
          </button>
        ))}

        {lessons.map((lesson) => (
          <div className="learning-path-item" key={lesson.id}>
            <div className="path-number">
              <BookOpen size={20} />
            </div>

            <div className="path-details">
              <h3>{lesson.title}</h3>
              <p>{lesson.subtitle}</p>
            </div>

            <span className="path-status">{lesson.level}</span>
          </div>
        ))}
      </div>

      {renderComingSoonLevels()}
    </div>
  );

  const renderInteractiveLesson = () => {
    switch (activePage) {
      case "Alphabet":
        return <AlphabetLesson onComplete={() => markLessonComplete("Alphabet")} />;
      case "Greetings":
        return <GreetingsLesson onComplete={() => markLessonComplete("Greetings")} />;
      case "Numbers & Dates":
        return <NumbersDatesLesson onComplete={() => markLessonComplete("Numbers & Dates")} />;
      case "Personal Pronouns":
        return <PersonalPronounsLesson onComplete={() => markLessonComplete("Personal Pronouns")} />;
      case "Articles":
        return <ArticlesLesson onComplete={() => markLessonComplete("Articles")} />;
      case "Verbs":
        return <VerbsLesson onComplete={() => markLessonComplete("Verbs")} />;
      case "Irregular Verbs":
        return <IrregularVerbsLesson onComplete={() => markLessonComplete("Irregular Verbs")} />;
      case "Sentence Structure":
        return <SentenceStructureLesson onComplete={() => markLessonComplete("Sentence Structure")} />;
      case "Negation":
        return <NegationLesson onComplete={() => markLessonComplete("Negation")} />;
      case "W-Fragen & Ja/Nein-Fragen":
        return <QuestionsLesson onComplete={() => markLessonComplete("W-Fragen & Ja/Nein-Fragen")} />;
      case "Possessive Articles":
        return <PossessiveArticlesLesson onComplete={() => markLessonComplete("Possessive Articles")} />;
      case "Plural Nouns":
        return <PluralNounsLesson onComplete={() => markLessonComplete("Plural Nouns")} />;
      case "Modal Verbs":
        return <ModalVerbsLesson onComplete={() => markLessonComplete("Modal Verbs")} />;
      case "Separable Verbs":
        return <SeparableVerbsLesson onComplete={() => markLessonComplete("Separable Verbs")} />;
      case "Time & Daily Routine":
        return <TimeDailyRoutineLesson onComplete={() => markLessonComplete("Time & Daily Routine")} />;
      case "Prepositions":
        return <PrepositionsLesson onComplete={() => markLessonComplete("Prepositions")} />;
      case "Cases & Article Revision":
        return <CasesArticleRevisionLesson onComplete={() => markLessonComplete("Cases & Article Revision")} />;
      case "Adjectives & Descriptions":
        return <AdjectivesDescriptionsLesson onComplete={() => markLessonComplete("Adjectives & Descriptions")} />;
      case "Everyday Life Vocabulary":
        return <EverydayLifeVocabularyLesson onComplete={() => markLessonComplete("Everyday Life Vocabulary")} />;
      case "Everyday Conversations":
        return <EverydayConversationsLesson onComplete={() => markLessonComplete("Everyday Conversations")} />;
      case "A1 Listening & Reading":
        return <A1ListeningReadingWritingLesson onComplete={() => markLessonComplete("A1 Listening & Reading")} />;
      case "A1 Speaking Mock Exam":
        return <A1SpeakingFinalMockLesson onComplete={() => markLessonComplete("A1 Speaking Mock Exam")} />;
      default:
        return null;
    }
  };

  const renderGenericPage = () => {
    const description =
      pageDescriptions[activePage] || "Explore your German learning materials.";

    const matchingLessons = filteredLessons.filter(
      (lesson) =>
        activePage === "Grammar" ||
        lesson.category.toLowerCase() === activePage.toLowerCase()
    );

    return (
      <div className="page-content">
        <div className="page-heading">
          <span className="welcome-label">DEUTSCHSTART A1</span>
          <h1>{activePage}</h1>
          <p>{description}</p>
        </div>

        {activePage === "Grammar" && (
          <div className="interactive-lesson-grid">
            {interactivePages.slice(0, 16).map(renderInteractiveCard)}
          </div>
        )}

        {activePage === "Vocabulary" && (
          <div className="interactive-lesson-grid">
            {[
              "Greetings" as Page,
              "Numbers & Dates" as Page,
              "Everyday Life Vocabulary" as Page,
              "Everyday Conversations" as Page
            ].map(renderInteractiveCard)}
          </div>
        )}

        {matchingLessons.length > 0 && (
          <div className="lesson-list">
            {matchingLessons.map(renderLessonCard)}
          </div>
        )}

        {matchingLessons.length === 0 &&
          activePage !== "Grammar" &&
          activePage !== "Vocabulary" && (
            <div className="empty-state">
              <BookOpen size={35} />
              <h3>No lessons found yet</h3>
              <p>
                More {activePage.toLowerCase()} lessons will be added as we build your German course.
              </p>
            </div>
          )}
      </div>
    );
  };

  const renderActivePage = () => {
    if (activePage === "Dashboard") return renderDashboard();
    if (activePage === "Learning Path") return renderLearningPath();
    if (activePage === "Settings") {
      return (
        <ProfileSettings
          completedCount={completedCount}
          totalLessons={totalLessons}
          onOpenDictCc={() => openDictCc()}
          onOpenDisclaimer={openDisclaimer}
          onOpenUpcoming={() => openUpcoming()}
        />
      );
    }
    if (interactivePages.includes(activePage)) {
      return renderInteractiveLesson();
    }
    return renderGenericPage();
  };

  return (
    <div className="app-container">
      {renderNavigation()}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="main-content">
        {renderHeader()}

        {searchQuery.trim() && (
          <div className="search-results">
            <p>
              Search results for: <strong>{searchQuery}</strong>
            </p>

            {filteredLessons.length > 0 ? (
              <div className="lesson-list">
                {filteredLessons.map(renderLessonCard)}
              </div>
            ) : (
              <p>No matching lessons found.</p>
            )}
          </div>
        )}

        {renderActivePage()}

        <footer className="app-footer">
          <p>
            DeutschStart · Learn German one step at a time 🇩🇪 · Accurate translations with dict.cc
          </p>
        </footer>
      </main>

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      <DictCcModal
        isOpen={dictCcModalOpen}
        onClose={() => setDictCcModalOpen(false)}
        initialQuery={dictCcInitialQuery}
      />

      <DisclaimerModal
        isOpen={disclaimerModalOpen}
        onClose={() => setDisclaimerModalOpen(false)}
      />

      <UpcomingLevelsModal
        isOpen={upcomingModalOpen}
        onClose={() => setUpcomingModalOpen(false)}
        initialLevel={upcomingLevel}
      />
    </div>
  );
}

export default App;
