
import { useState } from "react";
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
  Trophy,
  Lightbulb,
} from "lucide-react";

type Props = {
  onComplete: () => void;
};

const possessives = [
  { owner: "ich", word: "mein", meaning: "my", example: "mein Buch" },
  { owner: "du", word: "dein", meaning: "your", example: "dein Buch" },
  { owner: "er", word: "sein", meaning: "his", example: "sein Buch" },
  { owner: "sie", word: "ihr", meaning: "her", example: "ihr Buch" },
  { owner: "es", word: "sein", meaning: "its", example: "sein Buch" },
  { owner: "wir", word: "unser", meaning: "our", example: "unser Buch" },
  { owner: "ihr", word: "euer", meaning: "your (plural)", example: "euer Buch" },
  { owner: "sie", word: "ihr", meaning: "their", example: "ihr Buch" },
  { owner: "Sie", word: "Ihr", meaning: "your (formal)", example: "Ihr Buch" },
];

const endings = [
  {
    case: "Nominative",
    explanation: "The noun is the subject.",
    masculine: "mein Vater",
    feminine: "meine Mutter",
    neuter: "mein Kind",
    plural: "meine Freunde",
  },
  {
    case: "Accusative",
    explanation: "The noun is the direct object.",
    masculine: "meinen Vater",
    feminine: "meine Mutter",
    neuter: "mein Kind",
    plural: "meine Freunde",
  },
];

const examples = [
  {
    german: "Das ist mein Bruder.",
    english: "That is my brother.",
    note: "Bruder is masculine.",
  },
  {
    german: "Das ist meine Schwester.",
    english: "That is my sister.",
    note: "Schwester is feminine.",
  },
  {
    german: "Ich liebe meinen Hund.",
    english: "I love my dog.",
    note: "Hund is masculine and is the direct object.",
  },
  {
    german: "Wir besuchen unsere Großeltern.",
    english: "We are visiting our grandparents.",
    note: "Großeltern is plural.",
  },
  {
    german: "Wo ist dein Handy?",
    english: "Where is your mobile phone?",
    note: "Handy is neuter.",
  },
  {
    german: "Er sucht seine Schlüssel.",
    english: "He is looking for his keys.",
    note: "Schlüssel is plural.",
  },
];

const questions = [
  {
    question: "Ich habe ___ Bruder.",
    options: ["mein", "meinen", "meine"],
    answer: "meinen",
    explanation: "Bruder is masculine and is the direct object. Use meinen.",
  },
  {
    question: "Das ist ___ Mutter.",
    options: ["mein", "meine", "meinen"],
    answer: "meine",
    explanation: "Mutter is feminine. Use meine in the nominative.",
  },
  {
    question: "Du hast ___ Buch.",
    options: ["dein", "deine", "deinen"],
    answer: "dein",
    explanation: "Buch is neuter. Use dein.",
  },
  {
    question: "Er besucht ___ Vater.",
    options: ["sein", "seine", "seinen"],
    answer: "seinen",
    explanation: "Vater is masculine accusative. Use seinen.",
  },
  {
    question: "Wir lieben ___ Familie.",
    options: ["unser", "unsere", "unseren"],
    answer: "unsere",
    explanation: "Familie is feminine. Use unsere.",
  },
  {
    question: "Das ist ___ Kind.",
    options: ["euer", "eure", "euren"],
    answer: "euer",
    explanation: "Kind is neuter. Use euer.",
  },
  {
    question: "Sie sucht ___ Tasche.",
    options: ["ihr", "ihre", "ihren"],
    answer: "ihre",
    explanation: "Tasche is feminine. Use ihre.",
  },
  {
    question: "Ich sehe ___ Hund.",
    options: ["mein", "meine", "meinen"],
    answer: "meinen",
    explanation: "Hund is masculine accusative. Use meinen.",
  },
  {
    question: "Ihr besucht ___ Freunde.",
    options: ["euer", "eure", "euren"],
    answer: "eure",
    explanation: "Freunde is plural. Use eure.",
  },
  {
    question: "Ist das ___ Auto, Frau Müller?",
    options: ["Ihr", "Ihre", "Ihren"],
    answer: "Ihr",
    explanation: "Auto is neuter. Formal Ihr takes the neuter form Ihr.",
  },
];

function speakGerman(text: string) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.85;

  window.speechSynthesis.speak(utterance);
}

function PossessiveArticlesLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("Learn");
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const score = questions.reduce(
    (total, question, index) =>
      total +
      (selectedAnswers[index] === question.answer ? 1 : 0),
    0
  );

  const tabs = ["Learn", "Possessive Words", "Forms", "Examples", "Practice"];

  const changeTab = (tab: string) => {
    setActiveTab(tab);

    if (tab === "Practice") {
      setSelectedAnswers({});
      setSubmitted(false);
      setCompleted(false);
    }
  };

  const chooseAnswer = (index: number, answer: string) => {
    if (submitted) return;

    setSelectedAnswers((previous) => ({
      ...previous,
      [index]: answer,
    }));
  };

  const submitQuiz = () => {
    if (Object.keys(selectedAnswers).length !== questions.length) return;
    setSubmitted(true);
  };

  const finishLesson = () => {
    setCompleted(true);
    onComplete();
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCompleted(false);
  };

  return (
    <div className="possessive-lesson">
      <div className="possessive-header">
        <div>
          <span className="possessive-label">A1 GRAMMAR · LESSON 11</span>
          <h1>Possessive Articles</h1>
          <p>
            Learn how to say my, your, his, her, our and their in German.
          </p>
        </div>

        <div className="possessive-header-icon">👨‍👩‍👧‍👦</div>
      </div>

      <div className="possessive-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => changeTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Learn" && (
        <div className="possessive-content">
          <div className="possessive-intro-card">
            <div className="possessive-card-icon">
              <BookOpen size={23} />
            </div>
            <div>
              <h2>What are possessive articles?</h2>
              <p>
                Possessive articles tell us who owns something.
                They answer the question: <strong>Whose?</strong>
              </p>
            </div>
          </div>

          <h2 className="possessive-section-title">
            Understand with simple examples
          </h2>

          <div className="possessive-example-grid">
            <div className="possessive-example-card">
              <span>👩</span>
              <h3>Ich</h3>
              <strong>mein Buch</strong>
              <p>My book</p>
              <button onClick={() => speakGerman("Das ist mein Buch.")}>
                <Volume2 size={16} /> Listen
              </button>
            </div>

            <div className="possessive-example-card">
              <span>👨</span>
              <h3>Du</h3>
              <strong>dein Buch</strong>
              <p>Your book</p>
              <button onClick={() => speakGerman("Das ist dein Buch.")}>
                <Volume2 size={16} /> Listen
              </button>
            </div>

            <div className="possessive-example-card">
              <span>👦</span>
              <h3>Er</h3>
              <strong>sein Buch</strong>
              <p>His book</p>
              <button onClick={() => speakGerman("Das ist sein Buch.")}>
                <Volume2 size={16} /> Listen
              </button>
            </div>

            <div className="possessive-example-card">
              <span>👧</span>
              <h3>Sie</h3>
              <strong>ihr Buch</strong>
              <p>Her book</p>
              <button onClick={() => speakGerman("Das ist ihr Buch.")}>
                <Volume2 size={16} /> Listen
              </button>
            </div>
          </div>

          <div className="possessive-tip">
            <Lightbulb size={22} />
            <div>
              <strong>Remember this important rule!</strong>
              <p>
                The ending depends on the noun that comes after the
                possessive article, not on the person who owns it.
              </p>
              <p>
                Example: <strong>mein Vater</strong> but{" "}
                <strong>meine Mutter</strong>.
              </p>
            </div>
          </div>

          <button
            className="possessive-next-button"
            onClick={() => setActiveTab("Possessive Words")}
          >
            Learn the possessive words <ChevronRight size={18} />
          </button>
        </div>
      )}

      {activeTab === "Possessive Words" && (
        <div className="possessive-content">
          <h2 className="possessive-section-title">
            German possessive words
          </h2>
          <p className="possessive-description">
            First learn which possessive word belongs to each personal
            pronoun.
          </p>

          <div className="possessive-word-list">
            {possessives.map((item, index) => (
              <div className="possessive-word-row" key={index}>
                <strong>{item.owner}</strong>
                <ChevronRight size={17} />
                <strong className="possessive-word">{item.word}</strong>
                <span>{item.meaning}</span>
                <button
                  onClick={() =>
                    speakGerman(`Das ist ${item.example}.`)
                  }
                  aria-label={`Listen to ${item.example}`}
                >
                  <Volume2 size={17} />
                </button>
              </div>
            ))}
          </div>

          <div className="possessive-tip">
            <Lightbulb size={22} />
            <div>
              <strong>Be careful with ihr and Ihr!</strong>
              <p>
                <strong>ihr</strong> can mean her or their.{" "}
                <strong>Ihr</strong> with a capital I means your in
                formal situations.
              </p>
              <p>
                <strong>euer</strong> means your when speaking to
                multiple people informally.
              </p>
            </div>
          </div>

          <button
            className="possessive-next-button"
            onClick={() => setActiveTab("Forms")}
          >
            Learn the endings <ChevronRight size={18} />
          </button>
        </div>
      )}

      {activeTab === "Forms" && (
        <div className="possessive-content">
          <h2 className="possessive-section-title">
            How do possessive articles change?
          </h2>

          <p className="possessive-description">
            In this lesson, focus on the nominative and accusative.
            The endings change according to the gender and number of
            the noun.
          </p>

          <div className="possessive-rule-card">
            <h3>Nominative</h3>
            <p>Used when the noun is the subject of the sentence.</p>
            <div className="possessive-table-wrap">
              <table className="possessive-table">
                <thead>
                  <tr>
                    <th>Gender</th>
                    <th>Example</th>
                    <th>Ending</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Masculine</td>
                    <td>mein Vater</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Feminine</td>
                    <td>meine Mutter</td>
                    <td>-e</td>
                  </tr>
                  <tr>
                    <td>Neuter</td>
                    <td>mein Kind</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Plural</td>
                    <td>meine Freunde</td>
                    <td>-e</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="possessive-rule-card">
            <h3>Accusative</h3>
            <p>Used when the noun is the direct object.</p>
            <div className="possessive-table-wrap">
              <table className="possessive-table">
                <thead>
                  <tr>
                    <th>Gender</th>
                    <th>Example</th>
                    <th>Ending</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Masculine</td>
                    <td>meinen Vater</td>
                    <td>-en</td>
                  </tr>
                  <tr>
                    <td>Feminine</td>
                    <td>meine Mutter</td>
                    <td>-e</td>
                  </tr>
                  <tr>
                    <td>Neuter</td>
                    <td>mein Kind</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Plural</td>
                    <td>meine Freunde</td>
                    <td>-e</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="possessive-tip">
            <Lightbulb size={22} />
            <div>
              <strong>Easy trick</strong>
              <p>
                In the accusative, the masculine form gets an{" "}
                <strong>-en</strong> ending: mein becomes meinen,
                dein becomes deinen, and sein becomes seinen.
              </p>
            </div>
          </div>

          <button
            className="possessive-next-button"
            onClick={() => setActiveTab("Examples")}
          >
            See sentence examples <ChevronRight size={18} />
          </button>
        </div>
      )}

      {activeTab === "Examples" && (
        <div className="possessive-content">
          <h2 className="possessive-section-title">
            Possessive articles in sentences
          </h2>

          <div className="possessive-sentence-list">
            {examples.map((example, index) => (
              <div className="possessive-sentence-card" key={index}>
                <div>
                  <h3>{example.german}</h3>
                  <p>{example.english}</p>
                  <small>{example.note}</small>
                </div>
                <button
                  onClick={() => speakGerman(example.german)}
                  aria-label="Listen to sentence"
                >
                  <Volume2 size={19} />
                </button>
              </div>
            ))}
          </div>

          <button
            className="possessive-next-button"
            onClick={() => setActiveTab("Practice")}
          >
            Start practice <ChevronRight size={18} />
          </button>
        </div>
      )}

      {activeTab === "Practice" && (
        <div className="possessive-content">
          <div className="possessive-quiz-heading">
            <div>
              <span className="possessive-label">TEST YOURSELF</span>
              <h2>Possessive Articles Quiz</h2>
              <p>Choose the correct possessive article.</p>
            </div>
            <div className="possessive-quiz-count">
              {Object.keys(selectedAnswers).length}/{questions.length}
            </div>
          </div>

          <div className="possessive-quiz-list">
            {questions.map((question, index) => (
              <div className="possessive-question-card" key={index}>
                <h3>
                  {index + 1}. {question.question}
                </h3>

                <div className="possessive-options">
                  {question.options.map((option) => {
                    const isSelected = selectedAnswers[index] === option;
                    const isCorrect = question.answer === option;

                    let className = "";

                    if (submitted && isCorrect) {
                      className = "correct";
                    } else if (submitted && isSelected && !isCorrect) {
                      className = "incorrect";
                    } else if (isSelected) {
                      className = "selected";
                    }

                    return (
                      <button
                        key={option}
                        className={className}
                        onClick={() => chooseAnswer(index, option)}
                        disabled={submitted}
                      >
                        {option}
                        {submitted && isCorrect && (
                          <CheckCircle2 size={17} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <p className="possessive-explanation">
                    {question.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          {!submitted ? (
            <button
              className="possessive-submit-button"
              onClick={submitQuiz}
              disabled={Object.keys(selectedAnswers).length !== questions.length}
            >
              Submit answers
            </button>
          ) : (
            <div className="possessive-result">
              <div className="possessive-result-icon">
                {score >= 8 ? <Trophy size={30} /> : <BookOpen size={30} />}
              </div>

              <h2>
                {score >= 8 ? "Excellent work!" : "Keep practising!"}
              </h2>

              <p>
                You scored <strong>{score}/{questions.length}</strong>.
              </p>

              <p>
                {score >= 8
                  ? "You passed this lesson. Well done!"
                  : "You need at least 8 correct answers to complete this lesson."}
              </p>

              {score >= 8 && !completed && (
                <button
                  className="possessive-submit-button"
                  onClick={finishLesson}
                >
                  <CheckCircle2 size={18} /> Complete lesson
                </button>
              )}

              {completed && (
                <div className="possessive-completed">
                  <CheckCircle2 size={19} />
                  Lesson completed!
                </div>
              )}

              <button
                className="possessive-retry-button"
                onClick={resetQuiz}
              >
                <RotateCcw size={17} /> Try again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PossessiveArticlesLesson;
