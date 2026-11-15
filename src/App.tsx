
import { useState } from "react";

import {
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  Languages,
  Headphones,
  Mic,
  BookMarked,
  Trophy,
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

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [completed, setCompleted] = useState<number[]>([]);
  const [alphabetCompleted, setAlphabetCompleted] = useState(false);
  const [greetingsCompleted, setGreetingsCompleted] = useState(false);
  const [numbersDatesCompleted, setNumbersDatesCompleted] = useState(false);
  const [pronounsCompleted, setPronounsCompleted] = useState(false);

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Learning Path", icon: GraduationCap },
    { name: "Alphabet", icon: Languages },
    { name: "Greetings", icon: MessageCircle },
    { name: "Numbers & Dates", icon: CalendarDays },
    { name: "Personal Pronouns", icon: UserRound },
    { name: "Grammar", icon: BookOpen },
    { name: "Vocabulary", icon: BookMarked },
    { name: "Listening", icon: Headphones },
    { name: "Speaking", icon: Mic },
    { name: "Reading", icon: BookMarked }
  ];

  const totalCompleted =
    completed.length +
    (alphabetCompleted ? 1 : 0) +
    (greetingsCompleted ? 1 : 0) +
    (numbersDatesCompleted ? 1 : 0) +
    (pronounsCompleted ? 1 : 0);

  const totalLessons = lessons.length + 4;

  const progress =
    totalLessons > 0
      ? Math.round((totalCompleted / totalLessons) * 100)
      : 0;

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(search.toLowerCase()) ||
      lesson.subtitle.toLowerCase().includes(search.toLowerCase());

    const matchesPage =
      activePage === "Dashboard" ||
      activePage === "Learning Path" ||
      lesson.category === activePage;

    return matchesSearch && matchesPage;
  });

  const handleNavigation = (page: string) => {
    setActivePage(page);
    setMobileMenu(false);
    setSearch("");
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
      <article className="lesson-card" key={lesson.id}>
        <div className="lesson-emoji">{lesson.icon}</div>

        <div className="lesson-info">
          <span className="lesson-category">{lesson.category}</span>
          <h3>{lesson.title}</h3>
          <p>{lesson.subtitle}</p>

          <div className="lesson-meta">
            <span>
              <Clock size={14} />
              {lesson.duration}
            </span>

            <span>
              <Target size={14} />
              {lesson.level}
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
          {isCompleted ? (
            "Completed ✓"
          ) : (
            <>
              Mark complete <Play size={14} />
            </>
          )}
        </button>
      </article>
    );
  };

  const renderDashboard = () => (
    <>
      <section className="welcome-section">
        <div>
          <span className="eyebrow">
            <Sparkles size={15} /> YOUR GERMAN JOURNEY
          </span>

          <h1>Hallo, learner! 🌷</h1>

          <p>
            Every new word brings you closer to speaking German.
            Let's learn something today!
          </p>
        </div>

        <div className="welcome-decoration">Guten Tag!</div>
      </section>

      <section className="hero-card">
        <div className="hero-content">
          <span className="hero-tag">YOUR LEARNING JOURNEY</span>

          <h2>Start your German adventure!</h2>

          <p>
            Begin with the basics and gradually build your German
            language skills.
          </p>

          <button
            className="primary-button"
            onClick={() => handleNavigation("Learning Path")}
          >
            Start Learning <ChevronRight size={18} />
          </button>
        </div>

        <div className="hero-illustration">🇩🇪</div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <BookOpen />
          </div>
          <div>
            <span>Lessons completed</span>
            <h2>{totalCompleted}/{totalLessons}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pink">
            <Trophy />
          </div>
          <div>
            <span>Learning points</span>
            <h2>{totalCompleted * 10} XP</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <Flame />
          </div>
          <div>
            <span>Daily streak</span>
            <h2>0 days</h2>
          </div>
        </div>
      </section>

      <section className="progress-card">
        <div className="section-heading">
          <div>
            <h2>Your progress</h2>
            <p>Every small step counts!</p>
          </div>

          <strong>{progress}%</strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="progress-caption">
          {totalCompleted} of {totalLessons} lessons completed
        </p>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Explore learning</h2>
            <p>Choose what you want to practise.</p>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              className="category-card"
              key={category.name}
              onClick={() => handleNavigation(category.name)}
            >
              <span className="category-emoji">{category.icon}</span>
              <strong>{category.name}</strong>
              <span>{category.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Continue learning</h2>
            <p>Your German A1 lessons.</p>
          </div>

          <button
            className="view-all-button"
            onClick={() => handleNavigation("Learning Path")}
          >
            View all <ChevronRight size={15} />
          </button>
        </div>

        <div className="lesson-list">
          {lessons.slice(0, 3).map(renderLessonCard)}
        </div>
      </section>
    </>
  );

  const renderGenericLessons = () => (
    <>
      <section className="page-heading">
        <span className="eyebrow">DEUTSCHSTART • A1</span>
        <h1>{activePage}</h1>
        <p>Learn step by step. Understand, practise and improve.</p>
      </section>

      <div className="search-box">
        <Search size={19} />

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search lessons..."
        />
      </div>

      <div className="lesson-list">
        {filteredLessons.length > 0 ? (
          filteredLessons.map(renderLessonCard)
        ) : (
          <div className="empty-state">
            <Search size={30} />
            <h3>No lessons found</h3>
            <p>Try another search term.</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="app-container">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">D</div>

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

        <div className="nav-label">LEARN</div>

        <nav>
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => handleNavigation(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="streak-card">
            <span className="streak-emoji">🔥</span>

            <div>
              <strong>Start a streak!</strong>
              <p>Learn a little every day.</p>
            </div>
          </div>

          <button
            className={`nav-item ${
              activePage === "Settings" ? "active" : ""
            }`}
            onClick={() => handleNavigation("Settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {mobileMenu && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMobileMenu(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>

          <div className="breadcrumb">
            DeutschStart <ChevronRight size={15} /> {activePage}
          </div>

          <div className="topbar-right">
            <div className="streak">
              <Flame size={18} />
              <span>0 days</span>
            </div>

            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
            </button>

            <div className="profile-avatar">M</div>
          </div>
        </header>

        <div className="page-content">
          {activePage === "Dashboard" && renderDashboard()}

          {activePage === "Alphabet" && (
            <AlphabetLesson
              onComplete={() => setAlphabetCompleted(true)}
            />
          )}

          {activePage === "Greetings" && (
            <GreetingsLesson
              onComplete={() => setGreetingsCompleted(true)}
            />
          )}

          {activePage === "Numbers & Dates" && (
            <NumbersDatesLesson
              onComplete={() => setNumbersDatesCompleted(true)}
            />
          )}

          {activePage === "Personal Pronouns" && (
            <PersonalPronounsLesson
              onComplete={() => setPronounsCompleted(true)}
            />
          )}

          {activePage === "Settings" && (
            <section className="welcome-section">
              <div>
                <span className="eyebrow">PREFERENCES</span>
                <h1>Settings ⚙️</h1>
                <p>Manage your learning experience.</p>
                <p>Current course: German A1 Beginner.</p>
                <p>
                  Lessons completed: {totalCompleted} of {totalLessons}.
                </p>
              </div>
            </section>
          )}

          {![
            "Dashboard",
            "Settings",
            "Alphabet",
            "Greetings",
            "Numbers & Dates",
            "Personal Pronouns"
          ].includes(activePage) && renderGenericLessons()}

          <footer className="footer">
            Made with <span>♥</span> for German learners everywhere.
            <p>DeutschStart • Learn a little. Grow a lot.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
