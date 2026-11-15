import { useMemo, useState } from "react";
import {
  Volume2,
  BookOpen,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Table,
  GraduationCap,
} from "lucide-react";

type Props = {
  onComplete: () => void;
};

type ArticleTab = "overview" | "bestimmte" | "unbestimmte" | "kein" | "practice";
type ArticleKind = "bestimmte" | "unbestimmte" | "kein";

type Example = {
  sentence: string;
  translation: string;
  note: string;
};

type ArticleSection = {
  title: string;
  subtitle: string;
  description: string;
  forms: string[];
  table: string[][];
  examples: Example[];
  tips: string[];
};

const caseNames = ["Nominative", "Accusative", "Dative", "Genitive"];

const articleSections: Record<ArticleKind, ArticleSection> = {
  bestimmte: {
    title: "Bestimmte Artikel",
    subtitle: "Definite articles — the",
    description:
      "Use der, die and das when you mean a specific person, animal or thing, or when the listener already knows which one you mean.",
    forms: ["der", "die", "das", "die"],
    table: [
      ["Nominative", "der", "die", "das", "die"],
      ["Accusative", "den", "die", "das", "die"],
      ["Dative", "dem", "der", "dem", "den"],
      ["Genitive", "des", "der", "des", "der"],
    ],
    examples: [
      {
        sentence: "Der Mann kommt.",
        translation: "The man is coming.",
        note: "Nominative: der Mann is the subject.",
      },
      {
        sentence: "Ich sehe den Mann.",
        translation: "I see the man.",
        note: "Accusative: den Mann is the direct object.",
      },
      {
        sentence: "Ich helfe dem Mann.",
        translation: "I help the man.",
        note: "Dative: helfen takes the dative case.",
      },
      {
        sentence: "Das Auto des Mannes ist neu.",
        translation: "The man's car is new.",
        note: "Genitive: des Mannes shows possession.",
      },
    ],
    tips: [
      "The biggest visible change is masculine: der → den → dem → des.",
      "In the dative plural, the article is den. The noun often also gets an -n: den Kindern.",
      "Learn every new German noun together with its article: der Tisch, die Lampe, das Buch.",
    ],
  },
  unbestimmte: {
    title: "Unbestimmte Artikel",
    subtitle: "Indefinite articles — a / an",
    description:
      "Use ein or eine when you mean one non-specific person or thing. English uses “a” or “an”. German has no indefinite article form for plural nouns.",
    forms: ["ein", "eine", "ein", "—"],
    table: [
      ["Nominative", "ein", "eine", "ein", "—"],
      ["Accusative", "einen", "eine", "ein", "—"],
      ["Dative", "einem", "einer", "einem", "—"],
      ["Genitive", "eines", "einer", "eines", "—"],
    ],
    examples: [
      {
        sentence: "Ein Mann kommt.",
        translation: "A man is coming.",
        note: "Nominative: ein Mann is the subject.",
      },
      {
        sentence: "Ich sehe einen Mann.",
        translation: "I see a man.",
        note: "Accusative: masculine ein changes to einen.",
      },
      {
        sentence: "Ich helfe einem Mann.",
        translation: "I help a man.",
        note: "Dative: masculine ein changes to einem.",
      },
      {
        sentence: "Das Auto eines Mannes ist neu.",
        translation: "A man's car is new.",
        note: "Genitive: eines Mannes shows possession.",
      },
    ],
    tips: [
      "There is no plural of ein/eine. Say Bücher, not “eine Bücher”.",
      "Remember the masculine pattern: ein → einen → einem → eines.",
      "The feminine forms are eine → eine → einer → einer.",
    ],
  },
  kein: {
    title: "Kein-Artikel",
    subtitle: "Negative article — no / not a / not any",
    description:
      "Use kein or keine to say that someone or something does not exist, is not present, or is not what you are talking about. Kein follows the same endings pattern as ein, but it also has plural forms.",
    forms: ["kein", "keine", "kein", "keine"],
    table: [
      ["Nominative", "kein", "keine", "kein", "keine"],
      ["Accusative", "keinen", "keine", "kein", "keine"],
      ["Dative", "keinem", "keiner", "keinem", "keinen"],
      ["Genitive", "keines", "keiner", "keines", "keiner"],
    ],
    examples: [
      {
        sentence: "Kein Mann ist hier.",
        translation: "No man is here.",
        note: "Nominative: kein Mann is the subject.",
      },
      {
        sentence: "Ich sehe keinen Mann.",
        translation: "I do not see a man.",
        note: "Accusative: masculine kein changes to keinen.",
      },
      {
        sentence: "Ich helfe keinem Mann.",
        translation: "I do not help any man.",
        note: "Dative: masculine kein changes to keinem.",
      },
      {
        sentence: "Die Namen keiner Kinder stehen hier.",
        translation: "No children's names are written here.",
        note: "Genitive plural: keiner is the negative article form.",
      },
    ],
    tips: [
      "Kein is used to negate nouns with ein or with no article: ein Buch → kein Buch; Bücher → keine Bücher.",
      "Kein changes its ending like ein, but it has plural forms: keine, keinen, keiner.",
      "Do not confuse kein with nicht. Kein negates a noun; nicht can negate verbs, adjectives or whole ideas.",
    ],
  },
};

const practiceQuestions: {
  kind: ArticleKind;
  caseName: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}[] = [
  {
    kind: "bestimmte",
    caseName: "Nominative",
    question: "_____ Hund schläft. (the dog)",
    options: ["Der", "Den", "Dem", "Das"],
    answer: "Der",
    explanation: "Hund is masculine and is the subject, so use nominative der.",
  },
  {
    kind: "bestimmte",
    caseName: "Accusative",
    question: "Ich sehe _____ Hund. (the dog)",
    options: ["der", "den", "dem", "des"],
    answer: "den",
    explanation: "Sehen takes a direct object. Masculine der changes to den in the accusative.",
  },
  {
    kind: "bestimmte",
    caseName: "Dative",
    question: "Ich helfe _____ Frau. (the woman)",
    options: ["die", "der", "den", "des"],
    answer: "der",
    explanation: "Helfen takes the dative. Feminine die changes to der.",
  },
  {
    kind: "bestimmte",
    caseName: "Genitive",
    question: "Das Spielzeug _____ Kindes ist neu. (the child's)",
    options: ["das", "dem", "des", "den"],
    answer: "des",
    explanation: "Genitive neuter uses des: des Kindes.",
  },
  {
    kind: "unbestimmte",
    caseName: "Nominative",
    question: "_____ Frau singt. (a woman)",
    options: ["Ein", "Eine", "Einen", "Einer"],
    answer: "Eine",
    explanation: "Frau is feminine and is the subject: eine Frau.",
  },
  {
    kind: "unbestimmte",
    caseName: "Accusative",
    question: "Er kauft _____ Apfel. (an apple)",
    options: ["ein", "einem", "einen", "eines"],
    answer: "einen",
    explanation: "Apfel is masculine. In the accusative, ein becomes einen.",
  },
  {
    kind: "unbestimmte",
    caseName: "Dative",
    question: "Sie spricht mit _____ Kind. (a child)",
    options: ["ein", "einen", "einem", "eines"],
    answer: "einem",
    explanation: "Mit always takes the dative. Neuter ein becomes einem.",
  },
  {
    kind: "unbestimmte",
    caseName: "Genitive",
    question: "Das Fahrrad _____ Mannes ist rot. (a man's)",
    options: ["ein", "einen", "einem", "eines"],
    answer: "eines",
    explanation: "Genitive masculine uses eines: eines Mannes.",
  },
  {
    kind: "kein",
    caseName: "Nominative",
    question: "_____ Kinder sind müde. (no children)",
    options: ["Kein", "Keine", "Keinen", "Keinem"],
    answer: "Keine",
    explanation: "Kinder is plural and nominative. The negative article is keine.",
  },
  {
    kind: "kein",
    caseName: "Accusative",
    question: "Ich habe _____ Bruder. (no brother)",
    options: ["kein", "keine", "keinen", "keinem"],
    answer: "keinen",
    explanation: "Bruder is masculine and the direct object, so use accusative keinen.",
  },
  {
    kind: "kein",
    caseName: "Dative",
    question: "Er fährt mit _____ Bus. (no bus)",
    options: ["kein", "keinen", "keinem", "keines"],
    answer: "keinem",
    explanation: "Mit always takes the dative. Masculine kein becomes keinem.",
  },
  {
    kind: "kein",
    caseName: "Genitive",
    question: "Die Farbe _____ Autos ist nicht schön. (of no car)",
    options: ["kein", "keinen", "keinem", "keines"],
    answer: "keines",
    explanation: "Auto is neuter. Genitive neuter uses keines.",
  },
];

const kindLabels: Record<ArticleKind, string> = {
  bestimmte: "Bestimmte",
  unbestimmte: "Unbestimmte",
  kein: "Kein",
};

function speakGerman(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

function ArticleTable({ kind }: { kind: ArticleKind }) {
  const section = articleSections[kind];

  return (
    <div className="ds-article-table-wrap">
      <table className="ds-article-table">
        <thead>
          <tr>
            <th>Case</th>
            <th>Masculine</th>
            <th>Feminine</th>
            <th>Neuter</th>
            <th>Plural</th>
          </tr>
        </thead>
        <tbody>
          {section.table.map((row) => (
            <tr key={row[0]}>
              <th scope="row">{row[0]}</th>
              {row.slice(1).map((form, index) => (
                <td key={`${row[0]}-${index}`} className={form === "—" ? "is-empty" : ""}>
                  {form}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArticleLearningPanel({ kind }: { kind: ArticleKind }) {
  const section = articleSections[kind];

  return (
    <div className="ds-article-panel">
      <div className="ds-article-intro">
        <div>
          <span className="ds-article-eyebrow">{kindLabels[kind].toUpperCase()} ARTIKEL</span>
          <h2>{section.title}</h2>
          <h3>{section.subtitle}</h3>
          <p>{section.description}</p>
        </div>
        <div className="ds-article-big-forms" aria-label={section.forms.join(", ")}>
          {section.forms.map((form, index) => (
            <span key={`${form}-${index}`}>{form}</span>
          ))}
        </div>
      </div>

      <div className="ds-article-section-heading">
        <div>
          <h3><Table size={19} /> Four-case declension table</h3>
          <p>Read across each row to compare the article endings.</p>
        </div>
      </div>

      <ArticleTable kind={kind} />

      <div className="ds-article-case-help">
        <h3>What do the four cases mean?</h3>
        <div className="ds-article-case-grid">
          <div><strong>Nominative</strong><span>Who or what is doing the action? Usually the subject.</span></div>
          <div><strong>Accusative</strong><span>Who or what receives the direct action?</span></div>
          <div><strong>Dative</strong><span>To whom or for whom? Often used after dative verbs and prepositions.</span></div>
          <div><strong>Genitive</strong><span>Whose? It often shows possession.</span></div>
        </div>
      </div>

      <div className="ds-article-examples">
        <h3>Examples for each case</h3>
        {section.examples.map((example) => (
          <div className="ds-article-example" key={example.sentence}>
            <div>
              <span className="ds-article-case-label">
                {example.note.split(":")[0]}
              </span>
              <strong>{example.sentence}</strong>
              <span>{example.translation}</span>
              <small>{example.note}</small>
            </div>
            <button
              type="button"
              onClick={() => speakGerman(example.sentence)}
              aria-label={`Listen to ${example.sentence}`}
              title="Listen in German"
            >
              <Volume2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="ds-article-tips">
        <Lightbulb size={21} />
        <div>
          <h3>Remember these points</h3>
          <ul>
            {section.tips.map((tip) => <li key={tip}>{tip}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ArticlesLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState<ArticleTab>("overview");
  const [practiceFilter, setPracticeFilter] = useState<"all" | ArticleKind>("all");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const filteredQuestions = useMemo(
    () =>
      practiceFilter === "all"
        ? practiceQuestions
        : practiceQuestions.filter((question) => question.kind === practiceFilter),
    [practiceFilter]
  );

  const question = filteredQuestions[currentQuestion];
  const score = filteredQuestions.reduce(
    (total, item, index) => total + (answers[index] === item.answer ? 1 : 0),
    0
  );
  const passed = score >= Math.ceil(filteredQuestions.length * 0.7);

  const changePracticeFilter = (filter: "all" | ArticleKind) => {
    setPracticeFilter(filter);
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
  };

  const selectAnswer = (answer: string) => {
    if (submitted) return;
    setAnswers((previous) => ({ ...previous, [currentQuestion]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    } else {
      setSubmitted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
  };

  const tabs: { id: ArticleTab; label: string }[] = [
    { id: "overview", label: "Learn" },
    { id: "bestimmte", label: "Bestimmte" },
    { id: "unbestimmte", label: "Unbestimmte" },
    { id: "kein", label: "Kein" },
    { id: "practice", label: "Practice" },
  ];

  return (
    <div className="articles-lesson ds-articles-updated">
      <div className="articles-hero">
        <div>
          <span className="articles-label">GERMAN A1 · LESSON 05</span>
          <h1>German Articles</h1>
          <p>Learn definite, indefinite and negative articles in all four cases.</p>
        </div>
        <div className="articles-hero-emoji">📚</div>
      </div>

      <nav className="ds-article-tabs" aria-label="Article lesson sections">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.id === "overview" && <BookOpen size={16} />}
            {tab.id === "practice" && <Trophy size={16} />}
            {tab.id !== "overview" && tab.id !== "practice" && <GraduationCap size={16} />}
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "overview" && (
        <div className="ds-article-overview">
          <div className="articles-explanation">
            <Lightbulb size={25} />
            <div>
              <h3>First, understand this!</h3>
              <p>
                German articles change depending on the noun's gender (masculine,
                feminine or neuter), number (singular or plural) and grammatical
                case (nominative, accusative, dative or genitive).
              </p>
              <p>
                Learn the article together with every new noun. For example:
                <strong> der Tisch</strong>, <strong>die Lampe</strong>,
                <strong> das Buch</strong>.
              </p>
            </div>
          </div>

          <h2 className="articles-heading">Three types of articles</h2>
          <div className="ds-article-type-cards">
            <button type="button" onClick={() => setActiveTab("bestimmte")}>
              <span>1</span>
              <strong>Bestimmte Artikel</strong>
              <b>der · die · das</b>
              <small>The — a specific person or thing</small>
              <em>Open lesson <ArrowRight size={15} /></em>
            </button>
            <button type="button" onClick={() => setActiveTab("unbestimmte")}>
              <span>2</span>
              <strong>Unbestimmte Artikel</strong>
              <b>ein · eine</b>
              <small>A / an — a non-specific singular noun</small>
              <em>Open lesson <ArrowRight size={15} /></em>
            </button>
            <button type="button" onClick={() => setActiveTab("kein")}>
              <span>3</span>
              <strong>Kein-Artikel</strong>
              <b>kein · keine</b>
              <small>No / not a / not any — negative nouns</small>
              <em>Open lesson <ArrowRight size={15} /></em>
            </button>
          </div>

          <div className="ds-article-comparison">
            <h3>Compare the three types</h3>
            <p>Watch how the masculine noun <strong>der Mann</strong> changes.</p>
            <div className="ds-article-table-wrap">
              <table className="ds-article-table ds-article-compare-table">
                <thead>
                  <tr><th>Case</th><th>Definite</th><th>Indefinite</th><th>Negative</th></tr>
                </thead>
                <tbody>
                  <tr><th>Nominative</th><td>der Mann</td><td>ein Mann</td><td>kein Mann</td></tr>
                  <tr><th>Accusative</th><td>den Mann</td><td>einen Mann</td><td>keinen Mann</td></tr>
                  <tr><th>Dative</th><td>dem Mann</td><td>einem Mann</td><td>keinem Mann</td></tr>
                  <tr><th>Genitive</th><td>des Mannes</td><td>eines Mannes</td><td>keines Mannes</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="ds-article-note">
            <Lightbulb size={20} />
            <p>
              <strong>Important:</strong> ein/eine has no plural form. For example,
              use <strong>Bücher</strong> for “books” and <strong>keine Bücher</strong>
              for “no books”.
            </p>
          </div>
          <button type="button" className="articles-primary-button" onClick={() => setActiveTab("bestimmte")}>
            Start learning <ArrowRight size={18} />
          </button>
        </div>
      )}

      {(activeTab === "bestimmte" || activeTab === "unbestimmte" || activeTab === "kein") && (
        <>
          <ArticleLearningPanel kind={activeTab} />
          <div className="ds-article-panel-actions">
            <button
              type="button"
              className="articles-primary-button"
              onClick={() => setActiveTab(activeTab === "bestimmte" ? "unbestimmte" : activeTab === "unbestimmte" ? "kein" : "practice")}
            >
              {activeTab === "bestimmte" ? "Next: Unbestimmte" : activeTab === "unbestimmte" ? "Next: Kein-Artikel" : "Start practice"}
              <ArrowRight size={18} />
            </button>
          </div>
        </>
      )}

      {activeTab === "practice" && (
        <div className="articles-quiz ds-article-quiz">
          <div className="ds-practice-heading">
            <div>
              <span className="articles-label">PRACTICE TIME</span>
              <h2>Test your article knowledge</h2>
              <p>Choose a practice set or mix all three article types.</p>
            </div>
            <Trophy size={30} />
          </div>

          <div className="ds-practice-filters">
            <button type="button" className={practiceFilter === "all" ? "active" : ""} onClick={() => changePracticeFilter("all")}>All types</button>
            <button type="button" className={practiceFilter === "bestimmte" ? "active" : ""} onClick={() => changePracticeFilter("bestimmte")}>Bestimmte</button>
            <button type="button" className={practiceFilter === "unbestimmte" ? "active" : ""} onClick={() => changePracticeFilter("unbestimmte")}>Unbestimmte</button>
            <button type="button" className={practiceFilter === "kein" ? "active" : ""} onClick={() => changePracticeFilter("kein")}>Kein</button>
          </div>

          {!submitted ? (
            <>
              <div className="articles-quiz-header">
                <div>
                  <span className="articles-label">{question ? kindLabels[question.kind].toUpperCase() : "PRACTICE"}</span>
                  <h2>{question?.caseName} case</h2>
                </div>
                <span>{currentQuestion + 1} / {filteredQuestions.length}</span>
              </div>
              <div className="articles-progress">
                <div style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }} />
              </div>

              {question && (
                <div className="articles-question">
                  <span>QUESTION {currentQuestion + 1}</span>
                  <h2>{question.question}</h2>
                  <div className="articles-options">
                    {question.options.map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={answers[currentQuestion] === option ? "article-option selected" : "article-option"}
                        onClick={() => selectAnswer(option)}
                      >
                        {option}
                        {answers[currentQuestion] === option && <CheckCircle size={18} />}
                      </button>
                    ))}
                  </div>
                  {answers[currentQuestion] && (
                    <p className="articles-selected-message">Answer selected! You can move to the next question.</p>
                  )}
                  <button
                    type="button"
                    className="articles-primary-button"
                    disabled={answers[currentQuestion] === undefined}
                    onClick={nextQuestion}
                  >
                    {currentQuestion === filteredQuestions.length - 1 ? "Finish practice" : "Next question"}
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="articles-result">
              <div className="articles-result-emoji">{passed ? "🎉" : "💪"}</div>
              <span className="articles-label">PRACTICE COMPLETED</span>
              <h2>{passed ? "Well done!" : "Keep practising!"}</h2>
              <div className="articles-score">{score} / {filteredQuestions.length}</div>
              <p>
                {passed
                  ? "You passed this practice set. Great work!"
                  : `You need ${Math.ceil(filteredQuestions.length * 0.7)} correct answers to pass. Review the explanations and try again.`}
              </p>
              <div className="articles-review">
                {filteredQuestions.map((item, index) => {
                  const correct = answers[index] === item.answer;
                  return (
                    <div className="articles-review-item" key={`${item.question}-${index}`}>
                      {correct ? <CheckCircle className="articles-correct" size={19} /> : <XCircle className="articles-wrong" size={19} />}
                      <div>
                        <strong>{item.question}</strong>
                        <p>Your answer: {answers[index] || "Not answered"}</p>
                        {!correct && <p>Correct answer: {item.answer}</p>}
                        <small>{item.explanation}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="articles-result-buttons">
                <button type="button" className="articles-primary-button" onClick={restartQuiz}>
                  <RotateCcw size={17} /> Try again
                </button>
                {passed && (
                  <button type="button" className="articles-complete-button" onClick={onComplete}>
                    <CheckCircle size={17} /> Complete lesson
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
