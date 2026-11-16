
import { useMemo, useState } from "react";
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
  UserRound,
  CheckCircle,
  Lock,
  Library,
} from "lucide-react";

import { lessons, categories } from "./data/course";

import AlphabetLesson from "./components/AlphabetLesson";
import GreetingsLesson from "./components/GreetingsLesson";
import NumbersDatesLesson from "./components/NumbersDatesLesson";
import PersonalPronounsLesson from "./components/PersonalPronounsLesson";
import ArticlesLesson from "./components/ArticlesLesson";
import VerbsLesson from "./components/VerbsLesson";
import IrregularVerbsLesson from "./components/IrregularVerbsLesson";

type LessonProgress = Record<string, boolean>;

const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Learning Path",
    icon: GraduationCap,
  },
  {
    name: "Alphabet",
    icon: Languages,
  },
  {
    name: "Greetings",
    icon: MessageCircle,
  },
  {
    name: "Numbers & Dates",
    icon: CalendarDays,
  },
  {
    name: "Personal Pronouns",
    icon: UserRound,
  },
  {
    name: "Articles",
    icon: BookMarked,
  },
  {
    name: "Verbs",
    icon: BookOpen,
  },
  {
    name: "Irregular Verbs",
    icon: Sparkles,
  },
  {
    name: "Grammar",
    icon: Library,
  },
  {
    name: "Vocabulary",
    icon: BookMarked,
  },
  {
    name: "Listening",
    icon: Headphones,
  },
  {
    name: "Speaking",
    icon: Mic,
  },
  {
    name: "Reading",
    icon: BookOpen,
  },
];

const interactivePages = [
  "Alphabet",
  "Greetings",
  "Numbers & Dates",
  "Personal Pronouns",
  "Articles",
  "Verbs",
  "Irregular Verbs",
];

const initialProgress: LessonProgress = {
  Alphabet: false,
  Greetings: false,
  "Numbers & Dates": false,
  "Personal Pronouns": false,
  Articles: false,
  Verbs: false,
  "Irregular Verbs": false,
};

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lessonProgress, setLessonProgress] =
    useState<LessonProgress>(initialProgress);

  const completedLessons = Object.values(lessonProgress).filter(
    Boolean
  ).length;

  const totalInteractiveLessons = interactivePages.length;

  const progressPercentage = Math.round(
    (completedLessons / totalInteractiveLessons) * 100
  );

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const search = searchQuery.toLowerCase();

      return (
        lesson.title.toLowerCase().includes(search) ||
        lesson.subtitle.toLowerCase().includes(search) ||
        lesson.category.toLowerCase().includes(search)
      );
    });
  }, [searchQuery]);

  function navigateTo(page: string) {
    setActivePage(page);
    setMobileMenuOpen(false);
    setSearchQuery("");
  }

  function markLessonComplete(lessonName: string) {
    setLessonProgress((previous) => ({
      ...previous,
      [lessonName]: true,
    }));
  }

  function renderLessonCard(lesson: (typeof lessons)[number]) {
    return (
      <div className="lesson-card" key={lesson.id}>
        <div className="lesson-card-icon">
          <span>{lesson.icon}</span>
        </div>

        <div className="lesson-card-content">
          <div className="lesson-card-top">
            <span className="lesson-category">{lesson.category}</span>
            <span className="lesson-level">{lesson.level}</span>
          </div>

          <h3>{lesson.title}</h3>

          <p>{lesson.subtitle}</p>

          <div className="lesson-card-footer">
            <span>
              <Clock size={14} />
              {lesson.duration}
            </span>

            <button
              className="lesson-open-button"
              onClick={() => navigateTo(lesson.title)}
            >
              Start learning
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderInteractiveLessonCard(
    title: string,
    subtitle: string,
    icon: string,
    duration: string
  ) {
    const completed = lessonProgress[title];

    return (
      <div className="lesson-card" key={title}>
        <div className="lesson-card-icon">
          <span>{icon}</span>
        </div>

        <div className="lesson-card-content">
          <div className="lesson-card-top">
            <span className="lesson-category">German A1</span>

            {completed ? (
              <span className="lesson-level">Completed</span>
            ) : (
              <span className="lesson-level">In progress</span>
            )}
          </div>

          <h3>{title}</h3>
          <p>{subtitle}</p>

          <div className="lesson-card-footer">
            <span>
              <Clock size={14} />
              {duration}
            </span>

            <button
              className="lesson-open-button"
              onClick={() => navigateTo(title)}
            >
              {completed ? "Revise lesson" : "Start learning"}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderDashboard() {
    return (
      <div className="page-content">
        <div className="welcome-section">
          <div>
            <span className="welcome-label">YOUR GERMAN LEARNING SPACE</span>
            <h1>Guten Tag! 👋</h1>
            <p>
              Every new word brings you one step closer to speaking German
              confidently.
            </p>
          </div>

          <div className="welcome-decoration">
            <Languages size={65} />
            <span>Hallo!</span>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple">
              <BookOpen size={22} />
            </div>
            <div>
              <h2>{completedLessons}</h2>
              <p>Lessons completed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <Flame size={22} />
            </div>
            <div>
              <h2>{progressPercentage}%</h2>
              <p>Course progress</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <Target size={22} />
            </div>
            <div>
              <h2>{totalInteractiveLessons}</h2>
              <p>Interactive lessons</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pink">
              <GraduationCap size={22} />
            </div>
            <div>
              <h2>A1</h2>
              <p>Current level</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Your learning progress</h2>
              <p>Keep moving forward, one lesson at a time.</p>
            </div>

            <button
              className="text-button"
              onClick={() => navigateTo("Learning Path")}
            >
              View learning path
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="progress-card">
            <div className="progress-heading">
              <div>
                <h3>German A1 progress</h3>
                <p>
                  {completedLessons} of {totalInteractiveLessons} interactive
                  lessons completed
                </p>
              </div>

              <strong>{progressPercentage}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Continue learning</h2>
              <p>Choose a lesson and continue your German journey.</p>
            </div>
          </div>

          <div className="lesson-list">
            {renderInteractiveLessonCard(
              "Alphabet",
              "Learn German letters and their pronunciation.",
              "🔤",
              "15 min"
            )}

            {renderInteractiveLessonCard(
              "Greetings",
              "Learn greetings and introduce yourself.",
              "👋",
              "20 min"
            )}

            {renderInteractiveLessonCard(
              "Numbers & Dates",
              "Learn numbers, weekdays, months and dates.",
              "📅",
              "20 min"
            )}

            {renderInteractiveLessonCard(
              "Personal Pronouns",
              "Understand ich, du, er, sie, es and more.",
              "👥",
              "20 min"
            )}

            {renderInteractiveLessonCard(
              "Articles",
              "Learn der, die, das, ein, eine and kein.",
              "📚",
              "25 min"
            )}

            {renderInteractiveLessonCard(
              "Verbs",
              "Learn regular verbs and sein and haben.",
              "✍️",
              "25 min"
            )}

            {renderInteractiveLessonCard(
              "Irregular Verbs",
              "Understand vowel changes and irregular conjugations.",
              "🔄",
              "30 min"
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Explore course categories</h2>
              <p>Discover different parts of German learning.</p>
            </div>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <div
                className="category-card"
                key={category.name}
                onClick={() => navigateTo(category.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    navigateTo(category.name);
                  }
                }}
              >
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="category-link">
                  Explore
                  <ChevronRight size={15} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Course lessons</h2>
              <p>Explore the lessons available in your course data.</p>
            </div>
          </div>

          <div className="lesson-list">
            {lessons.map(renderLessonCard)}
          </div>
        </div>
      </div>
    );
  }

  function renderLearningPath() {
    return (
      <div className="page-content">
        <div className="page-heading">
          <span className="welcome-label">YOUR COURSE JOURNEY</span>
          <h1>German A1 Learning Path</h1>
          <p>
            Follow the lessons in order and build your German skills step by
            step.
          </p>
        </div>

        <div className="progress-card">
          <div className="progress-heading">
            <div>
              <h3>Your A1 progress</h3>
              <p>
                {completedLessons} out of {totalInteractiveLessons} interactive
                lessons completed
              </p>
            </div>
            <strong>{progressPercentage}%</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="learning-path-list">
          {[
            {
              title: "Alphabet",
              subtitle: "Letters and pronunciation",
              icon: "🔤",
              duration: "15 min",
            },
            {
              title: "Greetings",
              subtitle: "Greetings and introductions",
              icon: "👋",
              duration: "20 min",
            },
            {
              title: "Numbers & Dates",
              subtitle: "Numbers, days and months",
              icon: "📅",
              duration: "20 min",
            },
            {
              title: "Personal Pronouns",
              subtitle: "German subject pronouns",
              icon: "👥",
              duration: "20 min",
            },
            {
              title: "Articles",
              subtitle: "Definite, indefinite and negative articles",
              icon: "📚",
              duration: "25 min",
            },
            {
              title: "Verbs",
              subtitle: "Regular verbs, sein and haben",
              icon: "✍️",
              duration: "25 min",
            },
            {
              title: "Irregular Verbs",
              subtitle: "Vowel changes and irregular conjugation",
              icon: "🔄",
              duration: "30 min",
            },
          ].map((lesson, index) => {
            const completed = lessonProgress[lesson.title];

            return (
              <div className="path-lesson" key={lesson.title}>
                <div className="path-number">
                  {completed ? (
                    <CheckCircle size={22} />
                  ) : (
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  )}
                </div>

                <div className="path-lesson-card">
                  <div className="path-lesson-icon">{lesson.icon}</div>

                  <div className="path-lesson-content">
                    <span>LESSON {String(index + 1).padStart(2, "0")}</span>
                    <h3>{lesson.title}</h3>
                    <p>{lesson.subtitle}</p>
                    <small>
                      <Clock size={13} />
                      {lesson.duration}
                    </small>
                  </div>

                  <button
                    className="lesson-open-button"
                    onClick={() => navigateTo(lesson.title)}
                  >
                    {completed ? "Revise" : "Start"}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="dashboard-section">
          <div className="section-heading">
            <div>
              <h2>Additional course lessons</h2>
              <p>More lessons from your course data.</p>
            </div>
          </div>

          <div className="lesson-list">
            {lessons.map(renderLessonCard)}
          </div>
        </div>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="page-content">
        <div className="page-heading">
          <span className="welcome-label">PREFERENCES</span>
          <h1>Settings</h1>
          <p>Manage your DeutschStart learning experience.</p>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            <UserRound size={25} />
          </div>
          <div>
            <h3>Learning profile</h3>
            <p>German learner · A1 level</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            <Languages size={25} />
          </div>
          <div>
            <h3>Learning language</h3>
            <p>German</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            <Target size={25} />
          </div>
          <div>
            <h3>Current learning level</h3>
            <p>A1 – Beginner</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            <BookOpen size={25} />
          </div>
          <div>
            <h3>Lesson progress</h3>
            <p>
              {completedLessons} of {totalInteractiveLessons} interactive
              lessons completed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  function renderActivePage() {
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

      case "Verbs":
        return (
          <div className="page-content">
            <VerbsLesson
              onComplete={() => markLessonComplete("Verbs")}
            />
          </div>
        );

      case "Irregular Verbs":
        return (
          <div className="page-content">
            <IrregularVerbsLesson
              onComplete={() => markLessonComplete("Irregular Verbs")}
            />
          </div>
        );

      case "Settings":
        return renderSettings();

      default: {
        const pageLessons = filteredLessons.filter(
          (lesson) =>
            lesson.category.toLowerCase() === activePage.toLowerCase() ||
            lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
          <div className="page-content">
            <div className="page-heading">
              <span className="welcome-label">DEUTSCHSTART COURSE</span>
              <h1>{activePage}</h1>
              <p>
                Explore lessons and practise your German skills.
              </p>
            </div>

            <div className="search-box">
              <Search size={19} />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="lesson-list">
              {pageLessons.length > 0 ? (
                pageLessons.map(renderLessonCard)
              ) : (
                <div className="empty-state">
                  <BookOpen size={38} />
                  <h3>No lessons found</h3>
                  <p>
                    No lessons match this section yet. More learning content
                    will be added as the course grows.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      }
    }
  }

  return (
    <div className="app-container">
      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-logo">
            <Languages size={26} />
          </div>

          <div>
            <h2>DeutschStart</h2>
            <span>Learn German step by step</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-level">
          <div>
            <span>CURRENT LEVEL</span>
            <strong>German A1</strong>
          </div>
          <GraduationCap size={23} />
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-title">MENU</span>

          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.name;

            return (
              <button
                key={item.name}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => navigateTo(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>

                {interactivePages.includes(item.name) &&
                  lessonProgress[item.name] && (
                    <CheckCircle
                      size={15}
                      className="nav-completed-icon"
                    />
                  )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-progress">
            <div className="sidebar-progress-heading">
              <span>Your progress</span>
              <strong>{progressPercentage}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <p>{completedLessons} lessons completed</p>
          </div>

          <button
            className={`nav-item ${activePage === "Settings" ? "active" : ""}`}
            onClick={() => navigateTo("Settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="sidebar-footer">
            <span>DeutschStart</span>
            <small>Learn. Practise. Improve.</small>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={23} />
            </button>

            <div className="breadcrumb">
              <span>DeutschStart</span>
              <ChevronRight size={15} />
              <strong>{activePage}</strong>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-search">
              <Search size={17} />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);

                  if (activePage !== "Dashboard") {
                    setActivePage("Grammar");
                  }
                }}
              />
            </div>

            <button
              className="topbar-icon-button"
              title="Notifications"
            >
              <Bell size={19} />
            </button>

            <div className="profile-avatar">
              <UserRound size={20} />
            </div>
          </div>
        </header>

        <div className="content-area">{renderActivePage()}</div>

        <footer className="app-footer">
          <div>
            <strong>DeutschStart</strong>
            <span> Your journey to learning German starts here.</span>
          </div>

          <span>German A1 · Learn at your own pace</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
