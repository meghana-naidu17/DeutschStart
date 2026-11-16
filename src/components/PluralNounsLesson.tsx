
import { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Volume2,
  RotateCcw,
  Lightbulb,
  GraduationCap,
} from "lucide-react";

type Props = {
  onComplete: () => void;
};

const pluralRules = [
  {
    name: "Add -e",
    rule: "Many masculine and neuter nouns form their plural by adding -e.",
    examples: [
      ["der Tisch", "die Tische", "table"],
      ["der Hund", "die Hunde", "dog"],
      ["das Jahr", "die Jahre", "year"],
    ],
  },
  {
    name: "Add -er",
    rule: "Some masculine and neuter nouns add -er. Sometimes the vowel changes to an umlaut.",
    examples: [
      ["das Kind", "die Kinder", "child"],
      ["das Buch", "die Bücher", "book"],
      ["das Bild", "die Bilder", "picture"],
    ],
  },
  {
    name: "Add -n or -en",
    rule: "Many feminine nouns form their plural with -n or -en.",
    examples: [
      ["die Frau", "die Frauen", "woman"],
      ["die Lampe", "die Lampen", "lamp"],
      ["die Blume", "die Blumen", "flower"],
    ],
  },
  {
    name: "Add -s",
    rule: "Some nouns, especially words borrowed from other languages, add -s.",
    examples: [
      ["das Auto", "die Autos", "car"],
      ["das Hotel", "die Hotels", "hotel"],
      ["das Handy", "die Handys", "mobile phone"],
    ],
  },
  {
    name: "No change",
    rule: "Some nouns have the same form in singular and plural.",
    examples: [
      ["der Lehrer", "die Lehrer", "teacher"],
      ["das Mädchen", "die Mädchen", "girl"],
      ["der Computer", "die Computer", "computer"],
    ],
  },
];

const vocabulary = [
  ["der Apfel", "die Äpfel", "apple"],
  ["die Katze", "die Katzen", "cat"],
  ["der Stuhl", "die Stühle", "chair"],
  ["das Haus", "die Häuser", "house"],
  ["die Tasche", "die Taschen", "bag"],
  ["das Fenster", "die Fenster", "window"],
  ["der Freund", "die Freunde", "friend"],
  ["die Schule", "die Schulen", "school"],
  ["das Kind", "die Kinder", "child"],
  ["die Mutter", "die Mütter", "mother"],
];

const questions = [
  {
    question: "What is the plural of der Tisch?",
    options: ["die Tischs", "die Tische", "die Tischen", "die Tisch"],
    answer: "die Tische",
    explanation: "Der Tisch becomes die Tische. We add -e.",
  },
  {
    question: "What is the plural of das Kind?",
    options: ["die Kinde", "die Kindes", "die Kinder", "die Kindern"],
    answer: "die Kinder",
    explanation: "Das Kind becomes die Kinder. We add -er.",
  },
  {
    question: "What is the plural of die Frau?",
    options: ["die Fraue", "die Frauen", "die Fraus", "die Frauer"],
    answer: "die Frauen",
    explanation: "Die Frau becomes die Frauen. We add -en.",
  },
  {
    question: "What is the plural of das Auto?",
    options: ["die Autoen", "die Auter", "die Autos", "die Auto"],
    answer: "die Autos",
    explanation: "Das Auto becomes die Autos. We add -s.",
  },
  {
    question: "What is the plural of das Buch?",
    options: ["die Buche", "die Bücher", "die Bucher", "die Buchs"],
    answer: "die Bücher",
    explanation: "Das Buch becomes die Bücher. The vowel u changes to ü and -er is added.",
  },
  {
    question: "What is the plural of die Lampe?",
    options: ["die Lampen", "die Lampe", "die Lampes", "die Lamper"],
    answer: "die Lampen",
    explanation: "Die Lampe becomes die Lampen. We add -n.",
  },
  {
    question: "What is the plural of der Apfel?",
    options: ["die Apfels", "die Apfeln", "die Äpfel", "die Apfele"],
    answer: "die Äpfel",
    explanation: "Der Apfel becomes die Äpfel. The vowel a changes to ä.",
  },
  {
    question: "What is the plural of das Fenster?",
    options: ["die Fensters", "die Fenster", "die Fenstern", "die Fensterer"],
    answer: "die Fenster",
    explanation: "Das Fenster has the same form in singular and plural.",
  },
  {
    question: "Which article do we use with plural nouns?",
    options: ["der", "das", "die", "ein"],
    answer: "die",
    explanation: "In the nominative plural, the definite article is always die.",
  },
  {
    question: "What is the plural of die Katze?",
    options: ["die Katzen", "die Katze", "die Katzes", "die Katzer"],
    answer: "die Katzen",
    explanation: "Die Katze becomes die Katzen. We add -n.",
  },
];

export default function PluralNounsLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("learn");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.85;

    window.speechSynthesis.speak(utterance);
  };

  const score = answers.reduce(
    (total, answer, index) =>
      total + (answer === questions[index].answer ? 1 : 0),
    0
  );

  const chooseAnswer = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
  };

  const nextQuestion = () => {
    if (!selectedAnswer) return;

    const updatedAnswers = [...answers, selectedAnswer];
    setAnswers(updatedAnswers);
    setSelectedAnswer("");

    if (questionIndex === questions.length - 1) {
      setFinished(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const restartQuiz = () => {
    setQuestionIndex(0);
    setSelectedAnswer("");
    setAnswers([]);
    setFinished(false);
  };

  const tabs = [
    { id: "learn", label: "Learn", icon: BookOpen },
    { id: "rules", label: "Plural Rules", icon: Lightbulb },
    { id: "vocabulary", label: "Vocabulary", icon: GraduationCap },
    { id: "practice", label: "Practice", icon: CheckCircle },
  ];

  return (
    <div className="plural-lesson">
      <div className="plural-header">
        <div>
          <span className="plural-label">A1 GRAMMAR</span>
          <h1>Plural Nouns</h1>
          <p>Learn how to talk about more than one person or thing.</p>
        </div>
        <div className="plural-header-icon">📚</div>
      </div>

      <div className="plural-intro">
        <h2>What is a plural?</h2>
        <p>
          Singular means ONE. Plural means MORE THAN ONE.
        </p>
        <div className="plural-comparison">
          <div>
            <span>ONE</span>
            <strong>der Apfel</strong>
            <small>one apple</small>
          </div>
          <div className="plural-arrow">→</div>
          <div>
            <span>MORE THAN ONE</span>
            <strong>die Äpfel</strong>
            <small>many apples</small>
          </div>
        </div>
        <p className="plural-note">
          Important: German plural nouns use the article <strong>die</strong> in
          the nominative case, regardless of their singular gender.
        </p>
      </div>

      <div className="plural-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "learn" && (
        <section className="plural-section">
          <h2>How do German plurals work?</h2>
          <p>
            German does not have just one plural rule. The ending depends on
            the noun. You should learn the plural form together with every new
            noun.
          </p>

          <div className="plural-tip">
            <Lightbulb size={21} />
            <div>
              <strong>Learning tip</strong>
              <p>
                Learn nouns like this: der Tisch – die Tische, not just der
                Tisch.
              </p>
            </div>
          </div>

          <h3>Singular and plural examples</h3>
          <div className="plural-word-list">
            {vocabulary.slice(0, 6).map(([singular, plural, meaning]) => (
              <div className="plural-word-card" key={singular}>
                <div>
                  <strong>{singular}</strong>
                  <span>{meaning}</span>
                </div>
                <span className="plural-arrow">→</span>
                <div>
                  <strong>{plural}</strong>
                  <span>plural</span>
                </div>
                <button
                  onClick={() => speak(`${singular}. ${plural}`)}
                  aria-label={`Listen to ${singular} and ${plural}`}
                >
                  <Volume2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "rules" && (
        <section className="plural-section">
          <h2>Five common plural patterns</h2>
          <p>
            These are common patterns, not rules that work for every noun.
          </p>

          {pluralRules.map((rule, index) => (
            <div className="plural-rule-card" key={rule.name}>
              <div className="plural-rule-heading">
                <span>{index + 1}</span>
                <h3>{rule.name}</h3>
              </div>
              <p>{rule.rule}</p>
              <div className="plural-rule-examples">
                {rule.examples.map(([singular, plural, meaning]) => (
                  <div key={singular}>
                    <div>
                      <strong>{singular}</strong>
                      <span>{meaning}</span>
                    </div>
                    <span className="plural-arrow">→</span>
                    <strong>{plural}</strong>
                    <button
                      onClick={() => speak(`${singular}. ${plural}`)}
                      aria-label={`Listen to ${plural}`}
                    >
                      <Volume2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="plural-warning">
            <strong>Remember!</strong>
            <p>
              Not every noun follows these patterns. Some nouns also change
              their vowels, for example Apfel → Äpfel and Buch → Bücher.
            </p>
          </div>
        </section>
      )}

      {activeTab === "vocabulary" && (
        <section className="plural-section">
          <h2>Learn these A1 nouns</h2>
          <p>Listen, read, and practise the singular and plural forms.</p>

          <div className="plural-vocabulary-table">
            <div className="plural-table-row plural-table-heading">
              <span>Singular</span>
              <span>Plural</span>
              <span>English</span>
              <span>Audio</span>
            </div>
            {vocabulary.map(([singular, plural, meaning]) => (
              <div className="plural-table-row" key={singular}>
                <strong>{singular}</strong>
                <strong>{plural}</strong>
                <span>{meaning}</span>
                <button
                  onClick={() => speak(`${singular}. ${plural}`)}
                  aria-label={`Listen to ${singular} and ${plural}`}
                >
                  <Volume2 size={17} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "practice" && (
        <section className="plural-section">
          <h2>Test your knowledge</h2>
          {!finished ? (
            <>
              <div className="plural-quiz-progress">
                <span>
                  Question {questionIndex + 1} of {questions.length}
                </span>
                <span>{Math.round((questionIndex / questions.length) * 100)}%</span>
              </div>
              <div className="plural-progress-track">
                <div
                  style={{
                    width: `${(questionIndex / questions.length) * 100}%`,
                  }}
                />
              </div>

              <div className="plural-question-card">
                <span>QUESTION {questionIndex + 1}</span>
                <h3>{questions[questionIndex].question}</h3>
                <div className="plural-options">
                  {questions[questionIndex].options.map((option) => {
                    const correct = questions[questionIndex].answer === option;
                    const chosen = selectedAnswer === option;

                    return (
                      <button
                        key={option}
                        className={
                          selectedAnswer
                            ? correct
                              ? "correct"
                              : chosen
                                ? "incorrect"
                                : ""
                            : ""
                        }
                        onClick={() => chooseAnswer(option)}
                      >
                        {option}
                        {selectedAnswer && correct && (
                          <CheckCircle size={18} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer && (
                  <div className="plural-explanation">
                    <strong>
                      {selectedAnswer === questions[questionIndex].answer
                        ? "Correct! 🎉"
                        : "Not quite. Keep learning!"}
                    </strong>
                    <p>{questions[questionIndex].explanation}</p>
                  </div>
                )}

                <button
                  className="plural-next-button"
                  disabled={!selectedAnswer}
                  onClick={nextQuestion}
                >
                  {questionIndex === questions.length - 1
                    ? "See Results"
                    : "Next Question"}
                </button>
              </div>
            </>
          ) : (
            <div className="plural-result">
              <div className="plural-result-icon">
                {score >= 8 ? "🏆" : "📖"}
              </div>
              <h2>{score >= 8 ? "Excellent work!" : "Good effort!"}</h2>
              <p>
                You scored <strong>{score} / {questions.length}</strong>.
              </p>
              <p>
                {score >= 8
                  ? "You passed this lesson. You can now continue to the next topic."
                  : "You need at least 8 correct answers to complete this lesson. Review the rules and try again."}
              </p>
              {score >= 8 && (
                <button
                  className="plural-next-button"
                  onClick={onComplete}
                >
                  <CheckCircle size={18} />
                  Complete Lesson
                </button>
              )}
              <button className="plural-retry-button" onClick={restartQuiz}>
                <RotateCcw size={17} />
                Try Again
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
