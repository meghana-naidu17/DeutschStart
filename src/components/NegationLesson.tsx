
import { useState } from "react";
import { Volume2, CheckCircle2, RotateCcw } from "lucide-react";

type Props = {
  onComplete: () => void;
};

const questions = [
  {
    question: "Ich bin _____ müde.",
    options: ["kein", "nicht", "keine"],
    answer: "nicht",
    explanation: "Nicht negates the adjective müde.",
  },
  {
    question: "Ich habe _____ Auto.",
    options: ["nicht", "kein", "keine"],
    answer: "kein",
    explanation: "Auto is neuter, so we use kein.",
  },
  {
    question: "Das ist _____ Frau.",
    options: ["kein", "keine", "nicht"],
    answer: "keine",
    explanation: "Frau is feminine, so we use keine.",
  },
  {
    question: "Ich sehe _____ Mann.",
    options: ["kein", "keinen", "nicht"],
    answer: "keinen",
    explanation: "Mann is masculine accusative, so we use keinen.",
  },
  {
    question: "Ich schlafe _____.",
    options: ["nicht", "kein", "keine"],
    answer: "nicht",
    explanation: "Nicht negates the verb or the whole statement.",
  },
  {
    question: "Ich habe _____ Bücher.",
    options: ["kein", "keine", "keinen"],
    answer: "keine",
    explanation: "Bücher is plural, so we use keine.",
  },
  {
    question: "Das ist _____ gut.",
    options: ["kein", "nicht", "keine"],
    answer: "nicht",
    explanation: "Nicht negates the adjective gut.",
  },
  {
    question: "Er hat _____ Hund.",
    options: ["keinen", "kein", "keine"],
    answer: "keinen",
    explanation: "Hund is masculine accusative, so we use keinen.",
  },
  {
    question: "Wir haben _____ Zeit.",
    options: ["nicht", "keine", "keinen"],
    answer: "keine",
    explanation: "Zeit is feminine, so we use keine.",
  },
  {
    question: "Ich trinke _____ Kaffee.",
    options: ["keinen", "kein", "nicht"],
    answer: "keinen",
    explanation: "Kaffee is masculine accusative, so we use keinen.",
  },
];

const examples = [
  {
    positive: "Ich bin müde.",
    negative: "Ich bin nicht müde.",
    meaning: "I am not tired.",
  },
  {
    positive: "Ich habe ein Buch.",
    negative: "Ich habe kein Buch.",
    meaning: "I do not have a book.",
  },
  {
    positive: "Das ist gut.",
    negative: "Das ist nicht gut.",
    meaning: "That is not good.",
  },
  {
    positive: "Sie hat eine Katze.",
    negative: "Sie hat keine Katze.",
    meaning: "She does not have a cat.",
  },
  {
    positive: "Er trinkt Kaffee.",
    negative: "Er trinkt keinen Kaffee.",
    meaning: "He does not drink coffee.",
  },
];

const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    window.speechSynthesis.speak(utterance);
  }
};

export default function NegationLesson({ onComplete }: Props) {
  const [tab, setTab] = useState("learn");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.filter(
    (question, index) => answers[index] === question.answer
  ).length;

  const tabs = [
    { id: "learn", label: "Learn" },
    { id: "nicht", label: "Nicht" },
    { id: "kein", label: "Kein" },
    { id: "examples", label: "Examples" },
    { id: "practice", label: "Practice" },
  ];

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="negation-lesson">
      <div className="negation-header">
        <span className="negation-label">A1 GRAMMAR · LESSON 09</span>
        <h1>Negation: Nicht und Kein</h1>
        <p>Learn how to make negative sentences in German.</p>
      </div>

      <div className="negation-tabs">
        {tabs.map((item) => (
          <button
            key={item.id}
            className={tab === item.id ? "active" : ""}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "learn" && (
        <div className="negation-content">
          <div className="negation-intro">
            <h2>Two words, two different uses!</h2>
            <p>
              German uses nicht and kein to make sentences negative.
              The important thing is knowing when to use each one.
            </p>
          </div>

          <div className="negation-comparison">
            <div className="negation-word-card">
              <span className="negation-big-word">NICHT</span>
              <h3>NOT</h3>
              <p>Negates adjectives, verbs and other parts of a sentence.</p>
              <strong>Ich bin nicht müde.</strong>
              <small>I am not tired.</small>
              <button onClick={() => speak("Ich bin nicht müde.")}>
                <Volume2 size={16} /> Listen
              </button>
            </div>

            <div className="negation-word-card">
              <span className="negation-big-word">KEIN</span>
              <h3>NO / NOT A</h3>
              <p>Negates nouns that use ein/eine or have no article.</p>
              <strong>Ich habe kein Auto.</strong>
              <small>I do not have a car.</small>
              <button onClick={() => speak("Ich habe kein Auto.")}>
                <Volume2 size={16} /> Listen
              </button>
            </div>
          </div>

          <div className="negation-tip">
            <strong>Easy memory trick</strong>
            <p>
              If you can use ein or eine in the positive sentence,
              you will often use kein or keine in the negative sentence.
            </p>
          </div>
        </div>
      )}

      {tab === "nicht" && (
        <div className="negation-content">
          <h2>When do we use NICHT?</h2>
          <p>Use nicht to say that something is not happening or is not true.</p>

          <div className="negation-example-list">
            {[
              ["Ich schlafe nicht.", "I do not sleep."],
              ["Ich bin nicht glücklich.", "I am not happy."],
              ["Das ist nicht schön.", "That is not beautiful."],
              ["Ich komme heute nicht.", "I am not coming today."],
              ["Ich fahre nicht mit dem Bus.", "I am not travelling by bus."],
            ].map(([german, english]) => (
              <div className="negation-example" key={german}>
                <div>
                  <strong>{german}</strong>
                  <p>{english}</p>
                </div>
                <button onClick={() => speak(german)}>
                  <Volume2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="negation-tip">
            Remember: the exact position of nicht depends on what you
            want to negate. These are common beginner patterns.
          </div>
        </div>
      )}

      {tab === "kein" && (
        <div className="negation-content">
          <h2>How does KEIN change?</h2>
          <p>
            Kein changes according to the gender, number and case of the noun.
          </p>

          <div className="negation-table-wrapper">
            <table className="negation-table">
              <thead>
                <tr>
                  <th>Gender</th>
                  <th>Nominative</th>
                  <th>Accusative</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Masculine</td>
                  <td>kein</td>
                  <td>keinen</td>
                </tr>
                <tr>
                  <td>Feminine</td>
                  <td>keine</td>
                  <td>keine</td>
                </tr>
                <tr>
                  <td>Neuter</td>
                  <td>kein</td>
                  <td>kein</td>
                </tr>
                <tr>
                  <td>Plural</td>
                  <td>keine</td>
                  <td>keine</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Look at these examples</h3>

          <div className="negation-example-list">
            {[
              ["Das ist kein Mann.", "That is not a man."],
              ["Ich sehe keinen Mann.", "I do not see a man."],
              ["Das ist keine Frau.", "That is not a woman."],
              ["Ich habe kein Kind.", "I do not have a child."],
              ["Wir haben keine Bücher.", "We do not have any books."],
            ].map(([german, english]) => (
              <div className="negation-example" key={german}>
                <div>
                  <strong>{german}</strong>
                  <p>{english}</p>
                </div>
                <button onClick={() => speak(german)}>
                  <Volume2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="negation-tip">
            <strong>Important:</strong> Kein is the negative form of
            ein/eine. It also negates plural nouns without an article.
            For plural nouns, use keine.
          </div>
        </div>
      )}

      {tab === "examples" && (
        <div className="negation-content">
          <h2>Change positive sentences into negative sentences</h2>
          <p>Read the examples and notice which word changes.</p>

          {examples.map((example) => (
            <div className="negation-transformation" key={example.positive}>
              <div>
                <span>POSITIVE</span>
                <p>{example.positive}</p>
              </div>

              <div className="negation-arrow">↓</div>

              <div>
                <span>NEGATIVE</span>
                <p>{example.negative}</p>
              </div>

              <small>{example.meaning}</small>

              <button onClick={() => speak(example.negative)}>
                <Volume2 size={17} /> Listen
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "practice" && (
        <div className="negation-content">
          <div className="negation-quiz-heading">
            <div>
              <h2>Test your understanding</h2>
              <p>Choose the correct negative word for each sentence.</p>
            </div>
            <span>{Object.keys(answers).length}/10 answered</span>
          </div>

          {questions.map((question, index) => (
            <div className="negation-question" key={index}>
              <h3>
                {index + 1}. {question.question}
              </h3>

              <div className="negation-options">
                {question.options.map((option) => {
                  const correct = option === question.answer;
                  const selected = answers[index] === option;

                  let className = "";

                  if (submitted && correct) className = "correct";
                  else if (submitted && selected) className = "incorrect";
                  else if (selected) className = "selected";

                  return (
                    <button
                      key={option}
                      className={className}
                      disabled={submitted}
                      onClick={() =>
                        setAnswers((previous) => ({
                          ...previous,
                          [index]: option,
                        }))
                      }
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <p className="negation-explanation">
                  {question.explanation}
                </p>
              )}
            </div>
          ))}

          {!submitted ? (
            <button
              className="negation-submit"
              disabled={Object.keys(answers).length !== questions.length}
              onClick={() => setSubmitted(true)}
            >
              Check my answers
            </button>
          ) : (
            <div className="negation-result">
              <div className="negation-result-icon">
                {score >= 8 ? (
                  <CheckCircle2 size={32} />
                ) : (
                  <RotateCcw size={32} />
                )}
              </div>

              <h2>Your score: {score}/10</h2>

              <p>
                {score >= 8
                  ? "Excellent! You have understood nicht and kein."
                  : "Good effort! Review the explanations and try again."}
              </p>

              {score >= 8 ? (
                <button
                  className="negation-submit"
                  onClick={onComplete}
                >
                  Complete lesson
                </button>
              ) : (
                <button
                  className="negation-submit"
                  onClick={resetQuiz}
                >
                  Try again
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
