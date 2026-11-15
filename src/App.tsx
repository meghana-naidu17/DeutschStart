
import { useState } from "react";
import {
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  Languages,
  Headphones,
  Mic,
  BookMarked,
  Flame,
  Search,
  Bell,
  Settings,
  Menu,
  X,
  ChevronRight,
  Clock,
  Play,
  Target,
  Sparkles,
  MessageCircle,
  CalendarDays,
  UserRound
} from "lucide-react";

import { lessons, categories } from "./data/course";

import AlphabetLesson from "./components/AlphabetLesson";
import GreetingsLesson from "./components/GreetingsLesson";
import NumbersDatesLesson from "./components/NumbersDatesLesson";
import PersonalPronounsLesson from "./components/PersonalPronounsLesson";
import ArticlesLesson from "./components/ArticlesLesson";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Learning Path", icon: GraduationCap },
  { label: "Alphabet", icon: Languages },
  { label: "Greetings", icon: MessageCircle },
  { label: "Numbers & Dates", icon: CalendarDays },
  { label: "Personal Pronouns", icon: UserRound },
  { label: "Articles", icon: BookMarked },
  { label: "Grammar", icon: BookOpen },
  { label: "Vocabulary", icon: BookMarked },
  { label: "Listening", icon: Headphones },
  { label: "Speaking", icon: Mic },
  { label: "Reading", icon: BookOpen }
];

const interactivePages = [
  "Alphabet",
  "Greetings",
  "Numbers & Dates",
  "Personal Pronouns",
  "Articles"
];

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [completed, setCompleted] = useState<number[]>([]);

  const [lessonProgress, setLessonProgress] = useState<Record<string, boolean>>({
    Alphabet: false,
    Greetings: false,
    "Numbers & Dates": false,
    "Personal Pronouns": false,
    Articles: false
  });

  const totalCompleted =
    completed.length +
    Object.values(lessonProgress).filter(Boolean).length;

  const totalLessons = lessons.length + interactivePages.length;

  const progress =
    totalLessons > 0
      ? Math.min(Math.round((totalCompleted / totalLessons) * 100), 100)
      : 0;

  const filteredLessons = lessons.filter((lesson) => {
    const searchText = search.toLowerCase();

    return (
      lesson.title.toLowerCase().includes(searchText) ||
      lesson.subtitle.toLowerCase().includes(searchText) ||
      lesson.category.toLowerCase().includes(searchText)
    );
  });

  const changePage = (page: string) => {
    setActivePage(page);
    setMobileMenu(false);
    setSearch("");
  };

  const markLessonComplete = (page: string) => {
    setLessonProgress((previous) => ({
      ...previous,
      [page]: true
    }));
  };

  const toggleComplete = (id: number) => {
    setCompleted((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const renderLessonCard = (lesson: (typeof lessons)[number]) => {
    const isCompleted = completed.includes(lesson.id);

    return (
      <div className="lesson-card" key={lesson.id}>
        <div className="lesson-emoji">{lesson.icon}</div>

        <div className="lesson-info">
          <span className="lesson-category">{lesson.category}</span>
          <h3>{lesson.title}</h3>
          <p>{lesson.subtitle}</p>

          <div className="lesson-meta">
            <span>
              <Clock size={14} /> {lesson.duration}
            </span>
            <span>
              <GraduationCap size={14} /> {lesson.level}
            </span>
          </div>
        </div>

        <button
          className={
            isCompleted
              ? "complete-button completed"
              : "complete-button"
          }
          onClick={() => toggleComplete(lesson.id)}
        >
          {isCompleted ? "Completed ✓" : "Mark Done"}
        </button>
      </div>
    );
  };

  const renderInteractiveCard = (
    title: string,
    description: string,
    icon: string,
    page: string,
    lessonNumber: string
  ) => {
    const isCompleted = lessonProgress[page];

    return (
      <div className="lesson-card" key={page}>
        <div className="lesson-emoji">{icon}</div>

        <div className="lesson-info">
          <span className="lesson-category">
            {lessonNumber} · A1
          </span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <button
          className={
            isCompleted
              ? "complete-button completed"
              : "primary-button"
          }
          onClick={() => changePage(page)}
        >
          {isCompleted ? "Completed ✓" : "Open Lesson"}
          {!isCompleted && <ChevronRight size={16} />}
        </button>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="page-content">
      <div className="welcome-section">
        <div>
          <span className="eyebrow">DEUTSCHSTART · GERMAN A1</span>
          <h1>Hallo! Welcome back 👋</h1>
          <p>
            Every new word brings you one step closer to speaking German.
          </p>
        </div>
        <div className="welcome-decoration">🇩🇪</div>
      </div>

      <div className="hero-card">
        <div className="hero-content">
          <span className="hero-tag">
            <Sparkles size={14} /> YOUR LEARNING JOURNEY
          </span>

          <h2>Start speaking German with confidence!</h2>

          <p>
            Learn German from the basics with simple lessons, examples,
            pronunciation and fun practice exercises.
          </p>

          <button
            className="primary-button"
            onClick={() => changePage("Alphabet")}
          >
            <Play size={16} /> Start Learning
          </button>
        </div>

        <div className="hero-illustration">📖</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <BookOpen size={22} />
          </div>
          <div>
            <h3>{totalCompleted}</h3>
            <p>Lessons completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pink">
            <Target size={22} />
          </div>
          <div>
            <h3>{progress}%</h3>
            <p>Overall progress</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <Flame size={22} />
          </div>
          <div>
            <h3>0</h3>
            <p>Day streak</p>
          </div>
        </div>
      </div>

      <div className="progress-card">
        <div className="section-heading">
          <div>
            <h2>Your A1 Progress</h2>
            <p>Keep learning a little every day!</p>
          </div>
          <span>{progress}%</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="progress-caption">
          <span>{totalCompleted} lessons completed</span>
          <span>{Math.max(totalLessons - totalCompleted, 0)} remaining</span>
        </div>
      </div>

      <div className="section-block">
        <div className="section-heading">
          <div>
            <h2>Explore Categories</h2>
            <p>Choose what you want to learn today.</p>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              className="category-card"
              key={category.name}
              onClick={() => changePage(category.name)}
            >
              <span className="category-emoji">{category.icon}</span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <ChevronRight size={17} />
            </button>
          ))}
        </div>
      </div>

      <div className="section-block">
        <div className="section-heading">
          <div>
            <h2>Your A1 Lessons</h2>
            <p>Start with the basics and move forward step by step.</p>
          </div>

          <button
            className="text-button"
            onClick={() => changePage("Learning Path")}
          >
            View all <ChevronRight size={16} />
          </button>
        </div>

        <div className="lesson-list">
          {renderInteractiveCard(
            "German Alphabet",
            "Learn letters and pronunciation.",
            "🔤",
            "Alphabet",
            "LESSON 01"
          )}

          {renderInteractiveCard(
            "Greetings and Introductions",
            "Say hello and introduce yourself.",
            "👋",
            "Greetings",
            "LESSON 02"
          )}

          {renderInteractiveCard(
            "Numbers and Dates",
            "Numbers, weekdays and months.",
            "🔢",
            "Numbers & Dates",
            "LESSON 03"
          )}

          {renderInteractiveCard(
            "Personal Pronouns",
            "Learn ich, du, er, sie, es and more.",
            "👥",
            "Personal Pronouns",
            "LESSON 04"
          )}

          {renderInteractiveCard(
            "German Articles",
            "Understand der, die and das.",
            "📚",
            "Articles",
            "LESSON 05"
          )}
        </div>
      </div>
    </div>
  );

  const renderLearningPath = () => (
    <div className="page-content">
      <div className="page-heading">
        <span className="eyebrow">YOUR COURSE</span>
        <h1>German A1 Learning Path</h1>
        <p>
          Follow the lessons in order and build your German step by step.
        </p>
      </div>

      <div className="lesson-list">
        {renderInteractiveCard(
          "German Alphabet",
          "Letters, sounds and pronunciation.",
          "🔤",
          "Alphabet",
          "LESSON 01"
        )}

        {renderInteractiveCard(
          "Greetings and Introductions",
          "Say hello, introduce yourself and ask names.",
          "👋",
          "Greetings",
          "LESSON 02"
        )}

        {renderInteractiveCard(
          "Numbers and Dates",
          "Numbers, weekdays, months and dates.",
          "🔢",
          "Numbers & Dates",
          "LESSON 03"
        )}

        {renderInteractiveCard(
          "Personal Pronouns",
          "Learn ich, du, er, sie, es, wir, ihr and Sie.",
          "👥",
          "Personal Pronouns",
          "LESSON 04"
        )}

        {renderInteractiveCard(
          "German Articles",
          "Learn der, die and das.",
          "📚",
          "Articles",
          "LESSON 05"
        )}

        {lessons.map(renderLessonCard)}
      </div>
    </div>
  );

  const renderGenericPage = () => (
    <div className="page-content">
      <div className="page-heading">
        <span className="eyebrow">DEUTSCHSTART · A1</span>
        <h1>{activePage}</h1>
        <p>Explore your German learning materials.</p>
      </div>

      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder={`Search ${activePage.toLowerCase()} lessons...`}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="lesson-list">
        {filteredLessons.length > 0 ? (
          filteredLessons.map(renderLessonCard)
        ) : (
          <div className="empty-state">
            <span>📚</span>
            <h3>No lessons found</h3>
            <p>Try another search term.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderActivePage = () => {
    switch (activePage) {
      case "Dashboard":
        return renderDashboard();

      case "Learning Path":
        return renderLearningPath();

      case "Alphabet":
        return (
          <div className="page-content">
            <AlphabetLesson
              onComplete={() => markLessonComplete("Alphabet")}
            />
          </div>
        );

      case "Greetings":
        return (
          <div className="page-content">
            <GreetingsLesson
              onComplete={() => markLessonComplete("Greetings")}
            />
          </div>
        );

      case "Numbers & Dates":
        return (
          <div className="page-content">
            <NumbersDatesLesson
              onComplete={() => markLessonComplete("Numbers & Dates")}
            />
          </div>
        );

      case "Personal Pronouns":
        return (
          <div className="page-content">
            <PersonalPronounsLesson
              onComplete={() => markLessonComplete("Personal Pronouns")}
            />
          </div>
        );

      case "Articles":
        return (
          <div className="page-content">
            <ArticlesLesson
              onComplete={() => markLessonComplete("Articles")}
            />
          </div>
        );

      case "Settings":
        return (
          <div className="page-content">
            <div className="page-heading">
              <span className="eyebrow">PREFERENCES</span>
              <h1>Settings</h1>
              <p>Manage your DeutschStart learning experience.</p>
            </div>

            <div className="progress-card">
              <h2>Learning preferences</h2>
              <p>
                More settings and personalisation options will be added here.
              </p>
            </div>
          </div>
        );

      default:
        return renderGenericPage();
    }
  };

  return (
    <div className="app-container">
      {mobileMenu && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside className={mobileMenu ? "sidebar sidebar-open" : "sidebar"}>
        <div className="brand">
          <div className="brand-icon">🇩🇪</div>

          <div>
            <h2>DeutschStart</h2>
            <span>Learn German with joy</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="nav-label">MENU</div>

        <nav>
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={
                  activePage === item.label
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() => changePage(item.label)}
              >
                <Icon size={19} />
                <span>{item.label}</span>

                {activePage === item.label && (
                  <ChevronRight size={16} className="nav-arrow" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="streak-card">
            <span className="streak-emoji">🔥</span>
            <div>
              <strong>Start your streak!</strong>
              <p>Learn a little every day.</p>
            </div>
          </div>

          <button
            className={
              activePage === "Settings"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => changePage("Settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMobileMenu(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumb">
            <span>DeutschStart</span>
            <ChevronRight size={15} />
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-right">
            <div className="streak">
              <Flame size={17} />
              <span>0 days</span>
            </div>

            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
            </button>

            <div className="profile-avatar">M</div>
          </div>
        </header>

        {renderActivePage()}

        <footer className="footer">
          <p>Made with ❤️ for German learners · DeutschStart</p>
        </footer>
      </main>
    </div>
  );
}
