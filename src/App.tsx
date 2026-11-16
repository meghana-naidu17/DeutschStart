
import { useMemo, useState } from "react";
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
} from "lucide-react";

import { lessons, categories } from "./data/course";

import AlphabetLesson from "./components/AlphabetLesson";
import GreetingsLesson from "./components/GreetingsLesson";
import NumbersDatesLesson from "./components/NumbersDatesLesson";
import PersonalPronounsLesson from "./components/PersonalPronounsLesson";
import ArticlesLesson from "./components/ArticlesLesson";
import VerbsLesson from "./components/VerbsLesson";
import IrregularVerbsLesson from "./components/IrregularVerbsLesson";
import SentenceStructureLesson from "./components/SentenceStructureLesson";
import NegationLesson from "./components/NegationLesson";

type Page =
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
];

const navigation = [
  {
    section: "MAIN",
    items: [
      { name: "Dashboard" as Page, icon: Home },
      { name: "Learning Path" as Page, icon: Target },
    ],
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
    ],
  },
  {
    section: "MORE LEARNING",
    items: [
      { name: "Grammar" as Page, icon: BookMarked },
      { name: "Vocabulary" as Page, icon: Languages },
      { name: "Listening" as Page, icon: Headphones },
      { name: "Speaking" as Page, icon: Mic },
      { name: "Reading" as Page, icon: BookOpen },
    ],
  },
];

const pageDescriptions: Record<string, string> = {
  Grammar: "Understand German grammar step by step.",
  Vocabulary: "Build your German vocabulary with useful words.",
  Listening: "Improve your German listening skills.",
  Speaking: "Practise speaking German with confidence.",
  Reading: "Improve your German reading and comprehension.",
};

const lessonDescriptions: Record<string, string> = {
  Alphabet: "Learn German letters and their pronunciation.",
  Greetings: "Learn how to greet and introduce yourself.",
  "Numbers & Dates": "Learn numbers, weekdays, months and dates.",
  "Personal Pronouns": "Understand German personal pronouns.",
  Articles: "Learn der, die, das, ein, eine and kein.",
  Verbs: "Learn regular German verbs and their conjugations.",
  "Irregular Verbs": "Understand important irregular German verbs.",
  "Sentence Structure": "Learn how to build correct German sentences.",
  Negation: "Learn how to make negative sentences using nicht and kein.",
};

const lessonIcons = ["🔤", "👋", "🔢", "👤", "📚", "✍️", "🔄", "🧩", "🚫"];

function App() {
  const [activePage, setActivePage] = useState<Page>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const totalLessons = lessons.length + interactivePages.length;
  const completedCount = completedLessons.length;

  const progressPercentage =
    totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0;

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
    setCompletedLessons((previous) =>
      previous.includes(lessonName)
        ? previous
        : [...previous, lessonName]
    );
  };

  const navigateTo = (page: Page) => {
    setActivePage(page);
    setSidebarOpen(false);
    setSearchQuery("");
  };

  const isCompleted = (lessonName: string) =>
    completedLessons.includes(lessonName);

  const renderNavigation = () => (
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-icon">
          <Languages size={25} />
        </div>

        <div>
          <h2>DeutschStart</h2>
          <span>Learn German with confidence</span>
        </div>

        <button
          className="mobile-close"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <X size={20} />
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
      </div>

      <div className="sidebar-bottom">
        <button
          className={`nav-item ${
            activePage === "Settings" ? "active" : ""
          }`}
          onClick={() => navigateTo("Settings")}
        >
          <Settings size={19} />
          <span>Settings</span>
        </button>

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

          <small>
            {completedCount} of {totalLessons} lessons completed
          </small>
        </div>
      </div>
    </aside>
  );

  const renderHeader = () => (
    <header className="topbar">
      <button
        className="menu-button"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={23} />
      </button>

      <div className="breadcrumb">
        <span>DeutschStart</span>
        <ChevronRight size={15} />
        <strong>{activePage}</strong>
      </div>

      <div className="topbar-search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search lessons..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
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
    const index = interactivePages.indexOf(page);

    return (
      <button
        className="interactive-lesson-card"
        key={page}
        onClick={() => navigateTo(page)}
      >
        <div className="interactive-card-top">
          <span className="interactive-card-icon">
            {lessonIcons[index]}
          </span>

          {isCompleted(page) ? (
            <CheckCircle2 size={19} className="completed-icon" />
          ) : (
            <span className="lesson-status">Start learning</span>
          )}
        </div>

        <h3>{page}</h3>
        <p>{lessonDescriptions[page]}</p>

        <div className="interactive-card-footer">
          <span>{isCompleted(page) ? "Completed" : "A1 Lesson"}</span>
          <ChevronRight size={18} />
        </div>
      </button>
    );
  };

  const renderDashboard = () => (
    <div className="page-content">
      <section className="welcome-section">
        <div>
          <span className="welcome-label">WILLKOMMEN!</span>
          <h1>Start your German learning journey.</h1>
          <p>
            Learn German one step at a time. Practise, explore and
            improve your skills every day.
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

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Your A1 interactive lessons</h2>
            <p>Learn with explanations, examples and practice.</p>
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
    </div>
  );

  const renderLearningPath = () => (
    <div className="page-content">
      <div className="page-heading">
        <span className="welcome-label">YOUR COURSE</span>
        <h1>A1 Learning Path</h1>
        <p>
          Follow the lessons in order and build your German
          foundation step by step.
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
    </div>
  );

  const renderInteractiveLesson = () => {
    switch (activePage) {
      case "Alphabet":
        return (
          <AlphabetLesson
            onComplete={() => markLessonComplete("Alphabet")}
          />
        );

      case "Greetings":
        return (
          <GreetingsLesson
            onComplete={() => markLessonComplete("Greetings")}
          />
        );

      case "Numbers & Dates":
        return (
          <NumbersDatesLesson
            onComplete={() => markLessonComplete("Numbers & Dates")}
          />
        );

      case "Personal Pronouns":
        return (
          <PersonalPronounsLesson
            onComplete={() => markLessonComplete("Personal Pronouns")}
          />
        );

      case "Articles":
        return (
          <ArticlesLesson
            onComplete={() => markLessonComplete("Articles")}
          />
        );

      case "Verbs":
        return (
          <VerbsLesson
            onComplete={() => markLessonComplete("Verbs")}
          />
        );

      case "Irregular Verbs":
        return (
          <IrregularVerbsLesson
            onComplete={() => markLessonComplete("Irregular Verbs")}
          />
        );

      case "Sentence Structure":
        return (
          <SentenceStructureLesson
            onComplete={() => markLessonComplete("Sentence Structure")}
          />
        );

      case "Negation":
        return (
          <NegationLesson
            onComplete={() => markLessonComplete("Negation")}
          />
        );

      default:
        return null;
    }
  };

  const renderGenericPage = () => {
    const description =
      pageDescriptions[activePage] ||
      "Explore your German learning materials.";

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
            {[
              "Personal Pronouns",
              "Articles",
              "Verbs",
              "Irregular Verbs",
              "Sentence Structure",
              "Negation",
            ].map((page) => renderInteractiveCard(page as Page))}
          </div>
        )}

        {matchingLessons.length > 0 ? (
          <div className="lesson-list">
            {matchingLessons.map(renderLessonCard)}
          </div>
        ) : (
          <div className="empty-state">
            <BookOpen size={35} />
            <h3>No lessons found yet</h3>
            <p>
              More {activePage.toLowerCase()} lessons will be added
              as we build your German course.
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderSettings = () => (
    <div className="page-content">
      <div className="page-heading">
        <span className="welcome-label">PREFERENCES</span>
        <h1>Settings</h1>
        <p>Manage your DeutschStart learning experience.</p>
      </div>

      <div className="settings-card">
        <div className="settings-row">
          <div className="settings-icon">
            <GraduationCap size={22} />
          </div>
          <div>
            <h3>Learning level</h3>
            <p>Your current learning level is A1.</p>
          </div>
          <span className="settings-value">A1</span>
        </div>

        <div className="settings-row">
          <div className="settings-icon">
            <Languages size={22} />
          </div>
          <div>
            <h3>Learning language</h3>
            <p>You are learning German.</p>
          </div>
          <span className="settings-value">German</span>
        </div>

        <div className="settings-row">
          <div className="settings-icon">
            <Target size={22} />
          </div>
          <div>
            <h3>Course progress</h3>
            <p>
              {completedCount} of {totalLessons} lessons completed.
            </p>
          </div>
          <span className="settings-value">
            {progressPercentage}%
          </span>
        </div>
      </div>
    </div>
  );

  const renderActivePage = () => {
    if (activePage === "Dashboard") return renderDashboard();

    if (activePage === "Learning Path") return renderLearningPath();

    if (activePage === "Settings") return renderSettings();

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
          <p>DeutschStart · Learn German one step at a time 🇩🇪</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
