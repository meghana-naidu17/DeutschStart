
import { useState } from "react";
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  GraduationCap,
  ArrowRight,
  Star
} from "lucide-react";
import "./AdjectivesDescriptionsLesson.css";

type Props = {
  onComplete?: () => void;
};

type Tab =
  | "learn"
  | "vocabulary"
  | "adjective"
  | "examples"
  | "practice"
  | "quiz";

const vocabulary = [
  { german: "groß", english: "big / tall", opposite: "klein", sentence: "Das Haus ist groß." },
  { german: "klein", english: "small", opposite: "groß", sentence: "Der Hund ist klein." },
  { german: "schön", english: "beautiful", opposite: "hässlich", sentence: "Die Stadt ist schön." },
  { german: "hässlich", english: "ugly", opposite: "schön", sentence: "Das Bild ist hässlich." },
  { german: "alt", english: "old", opposite: "jung / neu", sentence: "Mein Opa ist alt." },
  { german: "jung", english: "young", opposite: "alt", sentence: "Das Mädchen ist jung." },
  { german: "neu", english: "new", opposite: "alt", sentence: "Mein Handy ist neu." },
  { german: "gut", english: "good", opposite: "schlecht", sentence: "Das Essen ist gut." },
  { german: "schlecht", english: "bad", opposite: "gut", sentence: "Das Wetter ist schlecht." },
  { german: "schnell", english: "fast", opposite: "langsam", sentence: "Das Auto ist schnell." },
  { german: "langsam", english: "slow", opposite: "schnell", sentence: "Der Bus ist langsam." },
  { german: "teuer", english: "expensive", opposite: "billig", sentence: "Die Tasche ist teuer." },
  { german: "billig", english: "cheap", opposite: "teuer", sentence: "Das Buch ist billig." },
  { german: "freundlich", english: "friendly", opposite: "unfreundlich", sentence: "Der Lehrer ist freundlich." },
  { german: "müde", english: "tired", opposite: "wach", sentence: "Ich bin müde." },
  { german: "glücklich", english: "happy", opposite: "traurig", sentence: "Sie ist glücklich." },
  { german: "traurig", english: "sad", opposite: "glücklich", sentence: "Das Kind ist traurig." },
  { german: "interessant", english: "interesting", opposite: "langweilig", sentence: "Das Buch ist interessant." },
  { german: "langweilig", english: "boring", opposite: "interessant", sentence: "Der Film ist langweilig." },
  { german: "warm", english: "warm", opposite: "kalt", sentence: "Der Tee ist warm." },
  { german: "kalt", english: "cold", opposite: "warm", sentence: "Das Wasser ist kalt." },
  { german: "stark", english: "strong", opposite: "schwach", sentence: "Der Mann ist stark." },
  { german: "schwach", english: "weak", opposite: "stark", sentence: "Ich bin heute schwach." },
  { german: "sauber", english: "clean", opposite: "schmutzig", sentence: "Das Zimmer ist sauber." },
  { german: "schmutzig", english: "dirty", opposite: "sauber", sentence: "Die Schuhe sind schmutzig." }
];

const examples = [
  {
    german: "Der Mann ist groß.",
    english: "The man is tall.",
    explanation: "After ist (is), groß stays unchanged."
  },
  {
    german: "Die Frau ist freundlich.",
    english: "The woman is friendly.",
    explanation: "The adjective freundlich describes the woman."
  },
  {
    german: "Das Auto ist schnell.",
    english: "The car is fast.",
    explanation: "The adjective comes after ist."
  },
  {
    german: "Ich bin glücklich.",
    english: "I am happy.",
    explanation: "Bin is a form of sein. Glücklich stays unchanged."
  },
  {
    german: "Das ist ein schönes Haus.",
    english: "That is a beautiful house.",
    explanation: "Before the noun Haus, the adjective takes an ending: schönes."
  },
  {
    german: "Er hat einen kleinen Hund.",
    english: "He has a small dog.",
    explanation: "Hund is masculine accusative. The adjective takes -en."
  },
  {
    german: "Sie trägt eine rote Tasche.",
    english: "She carries a red bag.",
    explanation: "Tasche is feminine. With eine, the adjective takes -e."
  },
  {
    german: "Wir wohnen in einer großen Wohnung.",
    english: "We live in a big apartment.",
    explanation: "Wohnung is feminine dative after in (location). The adjective takes -en."
  }
];

const practiceQuestions = [
  {
    question: "Das Haus ist ____.",
    options: ["groß", "große", "großen"],
    answer: "groß",
    explanation: "After ist, the adjective does not need an ending."
  },
  {
    question: "Das ist ein ____ Auto.",
    options: ["schnell", "schnelles", "schnellen"],
    answer: "schnelles",
    explanation: "Auto is neuter. With ein, the adjective takes -es."
  },
  {
    question: "Sie hat eine ____ Tasche.",
    options: ["rote", "roter", "rotes"],
    answer: "rote",
    explanation: "Tasche is feminine. With eine, the adjective takes -e."
  },
  {
    question: "Er hat einen ____ Hund.",
    options: ["klein", "kleine", "kleinen"],
    answer: "kleinen",
    explanation: "Hund is masculine accusative. The adjective takes -en."
  },
  {
    question: "Die Kinder sind ____.",
    options: ["glücklich", "glückliche", "glücklichen"],
    answer: "glücklich",
    explanation: "After sind, the adjective stays unchanged."
  },
  {
    question: "Ich kaufe ein ____ Buch.",
    options: ["interessant", "interessantes", "interessanten"],
    answer: "interessantes",
    explanation: "Buch is neuter accusative. With ein, the adjective takes -es."
  },
  {
    question: "Das ist der ____ Mann.",
    options: ["freundlich", "freundliche", "freundlichen"],
    answer: "freundliche",
    explanation: "With the masculine nominative article der, the adjective takes -e."
  },
  {
    question: "Wir haben eine ____ Wohnung.",
    options: ["schön", "schöne", "schönen"],
    answer: "schöne",
    explanation: "Wohnung is feminine accusative. With eine, the adjective takes -e."
  }
];

const quizQuestions = [
  {
    question: "Choose the correct sentence.",
    options: [
      "Das Mädchen ist kleine.",
      "Das Mädchen ist klein.",
      "Das Mädchen ist kleinen."
    ],
    answer: "Das Mädchen ist klein.",
    explanation: "After ist, adjectives stay unchanged."
  },
  {
    question: "Das ist ein ____ Tisch.",
    options: ["schöne", "schöner", "schönes"],
    answer: "schöner",
    explanation: "Tisch is masculine nominative. With ein, the adjective takes -er."
  },
  {
    question: "Ich sehe einen ____ Vogel.",
    options: ["schwarz", "schwarzen", "schwarze"],
    answer: "schwarzen",
    explanation: "Vogel is masculine accusative. The adjective takes -en."
  },
  {
    question: "Sie hat eine ____ Katze.",
    options: ["kleine", "kleiner", "kleines"],
    answer: "kleine",
    explanation: "Katze is feminine accusative. The adjective takes -e."
  },
  {
    question: "Choose the opposite of teuer.",
    options: ["billig", "schnell", "alt"],
    answer: "billig",
    explanation: "Teuer means expensive; billig means cheap."
  },
  {
    question: "Choose the opposite of traurig.",
    options: ["müde", "glücklich", "langsam"],
    answer: "glücklich",
    explanation: "Traurig means sad; glücklich means happy."
  },
  {
    question: "Das ist ein ____ Kind.",
    options: ["freundliche", "freundliches", "freundlicher"],
    answer: "freundliches",
    explanation: "Kind is neuter nominative. With ein, the adjective takes -es."
  },
  {
    question: "Der Film ist ____.",
    options: ["interessant", "interessante", "interessanten"],
    answer: "interessant",
    explanation: "After ist, the adjective has no ending."
  },
  {
    question: "Er kauft einen ____ Mantel.",
    options: ["neue", "neuen", "neues"],
    answer: "neuen",
    explanation: "Mantel is masculine accusative. The adjective takes -en."
  },
  {
    question: "Choose the correct meaning of freundlich.",
    options: ["Friendly", "Expensive", "Dirty"],
    answer: "Friendly",
    explanation: "Freundlich means friendly or kind."
  }
];

function speakGerman(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export default function AdjectivesDescriptionsLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("learn");
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string>>({});
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: "learn", label: "Learn" },
    { id: "vocabulary", label: "Vocabulary" },
    { id: "adjective", label: "Adjective Endings" },
    { id: "examples", label: "Examples" },
    { id: "practice", label: "Practice" },
    { id: "quiz", label: "Final Quiz" }
  ];

  const practiceScore = practiceQuestions.filter(
    (q, i) => practiceAnswers[i] === q.answer
  ).length;

  const quizScore = quizQuestions.filter(
    (q, i) => quizAnswers[i] === q.answer
  ).length;

  const selectPractice = (index: number, answer: string) => {
    setPracticeAnswers((prev) => ({ ...prev, [index]: answer }));
    setPracticeChecked(false);
  };

  const selectQuiz = (index: number, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  return (
    <div className="adjectives-lesson">
      <div className="adjectives-hero">
        <div className="adjectives-hero-icon">
          <Star size={30} />
        </div>
        <div>
          <span className="adjectives-module-label">A1 GRAMMAR · MODULE 18</span>
          <h1>Adjectives & Descriptions</h1>
          <p>Learn how to describe people, objects, places and feelings.</p>
        </div>
      </div>

      <div className="adjectives-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "learn" && (
        <section className="adjectives-section">
          <h2><BookOpen size={21} /> What are adjectives?</h2>
          <p>
            Adjectives are words that describe people, animals, objects,
            places or feelings.
          </p>

          <div className="adjectives-info-grid">
            <div className="adjectives-info-card">
              <span>Person</span>
              <strong>Der Mann ist groß.</strong>
              <p>The man is tall.</p>
            </div>
            <div className="adjectives-info-card">
              <span>Object</span>
              <strong>Das Auto ist schnell.</strong>
              <p>The car is fast.</p>
            </div>
            <div className="adjectives-info-card">
              <span>Feeling</span>
              <strong>Ich bin glücklich.</strong>
              <p>I am happy.</p>
            </div>
            <div className="adjectives-info-card">
              <span>Place</span>
              <strong>Die Stadt ist schön.</strong>
              <p>The city is beautiful.</p>
            </div>
          </div>

          <div className="adjectives-tip">
            <Lightbulb size={22} />
            <div>
              <strong>Important rule</strong>
              <p>
                When an adjective comes after sein (bin, bist, ist, sind),
                it usually does not change its ending.
              </p>
              <p>Example: Das Haus ist schön. Not: Das Haus ist schöne.</p>
            </div>
          </div>

          <button className="adjectives-next" onClick={() => setActiveTab("vocabulary")}>
            Learn Vocabulary <ArrowRight size={18} />
          </button>
        </section>
      )}

      {activeTab === "vocabulary" && (
        <section className="adjectives-section">
          <h2>Common German Adjectives</h2>
          <p>Learn these useful A1 adjectives and their opposites.</p>

          <div className="adjectives-vocabulary-list">
            {vocabulary.map((word) => (
              <div className="adjectives-word-card" key={word.german}>
                <div>
                  <strong>{word.german}</strong>
                  <span>{word.english}</span>
                  <small>Opposite: {word.opposite}</small>
                  <p>{word.sentence}</p>
                </div>
                <button
                  aria-label={`Listen to ${word.german}`}
                  onClick={() => speakGerman(word.sentence)}
                >
                  <Volume2 size={19} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "adjective" && (
        <section className="adjectives-section">
          <h2>Adjective Endings</h2>
          <p>
            German adjectives can change their endings when they come directly
            before a noun. The ending depends on the article, gender and case.
          </p>

          <div className="adjectives-rule-card">
            <h3>1. After sein — no adjective ending</h3>
            <p>Der Mann ist alt.</p>
            <p>Die Frau ist freundlich.</p>
            <p>Das Kind ist glücklich.</p>
            <p className="adjectives-translation">The man is old. The woman is friendly. The child is happy.</p>
          </div>

          <div className="adjectives-rule-card">
            <h3>2. Before a noun — adjective ending</h3>
            <div className="adjectives-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Gender</th>
                    <th>Example</th>
                    <th>Translation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>der</td>
                    <td>Masculine</td>
                    <td>der kleine Hund</td>
                    <td>the small dog</td>
                  </tr>
                  <tr>
                    <td>die</td>
                    <td>Feminine</td>
                    <td>die kleine Katze</td>
                    <td>the small cat</td>
                  </tr>
                  <tr>
                    <td>das</td>
                    <td>Neuter</td>
                    <td>das kleine Kind</td>
                    <td>the small child</td>
                  </tr>
                  <tr>
                    <td>die</td>
                    <td>Plural</td>
                    <td>die kleinen Kinder</td>
                    <td>the small children</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="adjectives-rule-card">
            <h3>3. With ein / eine</h3>
            <div className="adjectives-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Gender</th>
                    <th>Example</th>
                    <th>Translation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Masculine</td>
                    <td>ein kleiner Hund</td>
                    <td>a small dog</td>
                  </tr>
                  <tr>
                    <td>Feminine</td>
                    <td>eine kleine Katze</td>
                    <td>a small cat</td>
                  </tr>
                  <tr>
                    <td>Neuter</td>
                    <td>ein kleines Kind</td>
                    <td>a small child</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="adjectives-tip">
            <Lightbulb size={22} />
            <div>
              <strong>Remember</strong>
              <p>
                These are beginner examples in nominative. Adjective endings
                also change in accusative and dative. Learn the case and article
                together.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeTab === "examples" && (
        <section className="adjectives-section">
          <h2>German Example Sentences</h2>
          <p>Listen to each sentence and understand how the adjective is used.</p>

          {examples.map((example, index) => (
            <div className="adjectives-example-card" key={index}>
              <div className="adjectives-example-number">{index + 1}</div>
              <div>
                <strong>{example.german}</strong>
                <p>{example.english}</p>
                <small>{example.explanation}</small>
              </div>
              <button onClick={() => speakGerman(example.german)} aria-label="Listen">
                <Volume2 size={19} />
              </button>
            </div>
          ))}
        </section>
      )}

      {activeTab === "practice" && (
        <section className="adjectives-section">
          <h2>Practice Exercises</h2>
          <p>Choose the correct adjective or adjective ending.</p>

          {practiceQuestions.map((question, index) => (
            <div className="adjectives-question-card" key={index}>
              <h3>{index + 1}. {question.question}</h3>
              <div className="adjectives-options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    className={practiceAnswers[index] === option ? "selected" : ""}
                    onClick={() => selectPractice(index, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {practiceChecked && (
                <div className={`adjectives-feedback ${practiceAnswers[index] === question.answer ? "correct" : "incorrect"}`}>
                  <strong>
                    {practiceAnswers[index] === question.answer ? "Correct!" : `Correct answer: ${question.answer}`}
                  </strong>
                  <p>{question.explanation}</p>
                </div>
              )}
            </div>
          ))}

          <button
            className="adjectives-primary-button"
            onClick={() => setPracticeChecked(true)}
            disabled={Object.keys(practiceAnswers).length !== practiceQuestions.length}
          >
            Check Answers
          </button>

          {practiceChecked && (
            <div className="adjectives-score">
              Your score: {practiceScore} / {practiceQuestions.length}
            </div>
          )}

          <button
            className="adjectives-reset-button"
            onClick={() => {
              setPracticeAnswers({});
              setPracticeChecked(false);
            }}
          >
            <RotateCcw size={16} /> Try Again
          </button>
        </section>
      )}

      {activeTab === "quiz" && (
        <section className="adjectives-section">
          <h2><GraduationCap size={23} /> Module 18 Final Quiz</h2>
          <p>Answer all 10 questions. You need at least 8 correct answers to pass.</p>

          {quizQuestions.map((question, index) => (
            <div className="adjectives-question-card" key={index}>
              <h3>{index + 1}. {question.question}</h3>
              <div className="adjectives-options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    className={quizAnswers[index] === option ? "selected" : ""}
                    onClick={() => {
                      if (!quizSubmitted) selectQuiz(index, option);
                    }}
                    disabled={quizSubmitted}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {quizSubmitted && (
                <div className={`adjectives-feedback ${quizAnswers[index] === question.answer ? "correct" : "incorrect"}`}>
                  <strong>
                    {quizAnswers[index] === question.answer ? "Correct!" : `Correct answer: ${question.answer}`}
                  </strong>
                  <p>{question.explanation}</p>
                </div>
              )}
            </div>
          ))}

          {!quizSubmitted ? (
            <button
              className="adjectives-primary-button"
              onClick={() => setQuizSubmitted(true)}
              disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
            >
              Submit Final Quiz
            </button>
          ) : (
            <div className="adjectives-quiz-result">
              <CheckCircle2 size={28} />
              <h3>{quizScore >= 8 ? "Congratulations! You passed." : "Keep practising!"}</h3>
              <p>Your score: {quizScore} / {quizQuestions.length}</p>
              <p>{quizScore >= 8 ? "You have completed Module 18." : "You need at least 8 correct answers to pass."}</p>
              {quizScore >= 8 && (
                <button className="adjectives-primary-button" onClick={onComplete}>
                  Complete Module
                </button>
              )}
              <button
                className="adjectives-reset-button"
                onClick={() => {
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                }}
              >
                <RotateCcw size={16} /> Retry Quiz
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
