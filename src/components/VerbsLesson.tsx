
import { useState } from "react";

type Props = {
  onComplete: () => void;
};

const regularVerbs = [
  {
    verb: "lernen",
    meaning: "to learn",
    stem: "lern",
    examples: [
      "Ich lerne Deutsch.",
      "Du lernst Deutsch.",
      "Er lernt Deutsch.",
      "Wir lernen Deutsch.",
    ],
  },
  {
    verb: "machen",
    meaning: "to do / make",
    stem: "mach",
    examples: [
      "Ich mache Hausaufgaben.",
      "Du machst Hausaufgaben.",
      "Sie macht Hausaufgaben.",
      "Wir machen Hausaufgaben.",
    ],
  },
  {
    verb: "spielen",
    meaning: "to play",
    stem: "spiel",
    examples: [
      "Ich spiele Fußball.",
      "Du spielst Fußball.",
      "Er spielt Fußball.",
      "Wir spielen Fußball.",
    ],
  },
];

const endings = [
  { pronoun: "ich", ending: "-e", example: "lerne" },
  { pronoun: "du", ending: "-st", example: "lernst" },
  { pronoun: "er / sie / es", ending: "-t", example: "lernt" },
  { pronoun: "wir", ending: "-en", example: "lernen" },
  { pronoun: "ihr", ending: "-t", example: "lernt" },
  { pronoun: "sie / Sie", ending: "-en", example: "lernen" },
];

const sein = [
  ["ich", "bin"],
  ["du", "bist"],
  ["er / sie / es", "ist"],
  ["wir", "sind"],
  ["ihr", "seid"],
  ["sie / Sie", "sind"],
];

const haben = [
  ["ich", "habe"],
  ["du", "hast"],
  ["er / sie / es", "hat"],
  ["wir", "haben"],
  ["ihr", "habt"],
  ["sie / Sie", "haben"],
];

const questions = [
  {
    question: "Ich _____ Deutsch.",
    options: ["lerne", "lernst", "lernt"],
    answer: "lerne",
    explanation: "Ich takes the verb ending -e: lernen → lerne.",
  },
  {
    question: "Du _____ Fußball.",
    options: ["spiele", "spielst", "spielen"],
    answer: "spielst",
    explanation: "Du takes the ending -st: spielen → spielst.",
  },
  {
    question: "Er _____ Musik.",
    options: ["höre", "hören", "hört"],
    answer: "hört",
    explanation: "Er takes the ending -t: hören → hört.",
  },
  {
    question: "Wir _____ Deutsch.",
    options: ["lernt", "lernen", "lernst"],
    answer: "lernen",
    explanation: "Wir uses the infinitive ending -en.",
  },
  {
    question: "Ich _____ müde.",
    options: ["bin", "bist", "ist"],
    answer: "bin",
    explanation: "The correct form of sein with ich is bin.",
  },
  {
    question: "Du _____ ein Buch.",
    options: ["habe", "hat", "hast"],
    answer: "hast",
    explanation: "The correct form of haben with du is hast.",
  },
  {
    question: "Ihr _____ sehr gut.",
    options: ["spielt", "spielen", "spielst"],
    answer: "spielt",
    explanation: "Ihr takes the ending -t: spielen → spielt.",
  },
  {
    question: "Sie (formal) _____ aus Indien.",
    options: ["kommst", "kommt", "kommen"],
    answer: "kommen",
    explanation: "Formal Sie uses the same verb form as sie (they): kommen.",
  },
  {
    question: "Choose the correct sentence.",
    options: [
      "Ich Deutsch lerne.",
      "Ich lerne Deutsch.",
      "Lerne ich Deutsch.",
    ],
    answer: "Ich lerne Deutsch.",
    explanation: "In a normal German statement, the conjugated verb is in position two.",
  },
  {
    question: "Meine Mutter _____ Lehrerin.",
    options: ["bin", "bist", "ist"],
    answer: "ist",
    explanation: "Meine Mutter means she, so use ist.",
  },
];

export default function VerbsLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("learn");
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.85;

    window.speechSynthesis.speak(utterance);
  };

  const score = questions.reduce(
    (total, question, index) =>
      total + (selected[index] === question.answer ? 1 : 0),
    0
  );

  const allAnswered = questions.every(
    (_, index) => selected[index] !== undefined
  );

  const tabs = [
    ["learn", "Learn"],
    ["regular", "Regular verbs"],
    ["irregular", "Sein & Haben"],
    ["practice", "Practice"],
  ];

  const changeTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === "practice") {
      setSelected({});
      setSubmitted(false);
    }
  };

  return (
    <div className="verbs-lesson">
      <header className="verbs-hero">
        <span className="verbs-label">GERMAN A1 · GRAMMAR</span>
        <h1>Verben im Präsens</h1>
        <p>Learn how to use German verbs in the present tense.</p>
        <button onClick={() => speak("Verben im Präsens")}>
          🔊 Listen to pronunciation
        </button>
      </header>

      <nav className="verbs-tabs">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            className={activeTab === id ? "active" : ""}
            onClick={() => changeTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {activeTab === "learn" && (
        <section className="verbs-content">
          <h2>1. What is a verb?</h2>
          <p>
            A verb is an action word. It tells us what someone does or what
            someone is.
          </p>

          <div className="verbs-example-grid">
            <div>
              <strong>lernen</strong>
              <span>to learn</span>
            </div>
            <div>
              <strong>spielen</strong>
              <span>to play</span>
            </div>
            <div>
              <strong>machen</strong>
              <span>to do</span>
            </div>
            <div>
              <strong>wohnen</strong>
              <span>to live</span>
            </div>
          </div>

          <h2>2. What is an infinitive?</h2>
          <p>
            The original form of a German verb is called the infinitive.
            Most regular German verbs end in <strong>-en</strong>.
          </p>

          <div className="verbs-highlight">
            <strong>lernen = lern + en</strong>
            <p>lern is the verb stem. en is the infinitive ending.</p>
          </div>

          <h2>3. How does conjugation work?</h2>
          <p>
            We remove -en from the verb and add a new ending depending on
            the subject.
          </p>

          <div className="verbs-highlight">
            <strong>lernen → lern → lerne</strong>
            <p>Ich lerne Deutsch. = I learn German.</p>
            <button onClick={() => speak("Ich lerne Deutsch.")}>
              🔊 Listen
            </button>
          </div>

          <h2>4. German sentence structure</h2>
          <p>
            In a normal German statement, the conjugated verb usually comes
            in the second position.
          </p>

          <div className="verbs-highlight">
            <strong>Ich | lerne | Deutsch.</strong>
            <p>Subject | Verb | Other information</p>
          </div>

          <button
            className="verbs-primary"
            onClick={() => setActiveTab("regular")}
          >
            Learn verb conjugation →
          </button>
        </section>
      )}

      {activeTab === "regular" && (
        <section className="verbs-content">
          <h2>Regular verb endings</h2>
          <p>
            These endings are used for most regular verbs in the present
            tense.
          </p>

          <div className="verbs-table-wrap">
            <table className="verbs-table">
              <thead>
                <tr>
                  <th>Pronoun</th>
                  <th>Ending</th>
                  <th>lernen</th>
                </tr>
              </thead>
              <tbody>
                {endings.map((item) => (
                  <tr key={item.pronoun}>
                    <td>{item.pronoun}</td>
                    <td>{item.ending}</td>
                    <td>
                      <strong>{item.example}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Examples with regular verbs</h2>

          {regularVerbs.map((verb) => (
            <div className="verbs-card" key={verb.verb}>
              <div className="verbs-card-heading">
                <div>
                  <h3>{verb.verb}</h3>
                  <span>{verb.meaning}</span>
                </div>
                <button onClick={() => speak(verb.verb)}>🔊</button>
              </div>

              {verb.examples.map((example) => (
                <div className="verbs-example-row" key={example}>
                  <span>{example}</span>
                  <button onClick={() => speak(example)}>🔊</button>
                </div>
              ))}
            </div>
          ))}

          <div className="verbs-tip">
            <strong>Remember!</strong>
            <p>
              ich = -e, du = -st, er/sie/es = -t, wir = -en,
              ihr = -t, sie/Sie = -en.
            </p>
          </div>

          <button
            className="verbs-primary"
            onClick={() => setActiveTab("irregular")}
          >
            Learn sein and haben →
          </button>
        </section>
      )}

      {activeTab === "irregular" && (
        <section className="verbs-content">
          <h2>Two very important verbs</h2>
          <p>
            Sein and haben are irregular verbs. Their forms do not follow
            the normal regular verb pattern. Learn them separately.
          </p>

          <h3>SEIN – to be</h3>
          <div className="verbs-table-wrap">
            <table className="verbs-table">
              <thead>
                <tr>
                  <th>Pronoun</th>
                  <th>Verb form</th>
                </tr>
              </thead>
              <tbody>
                {sein.map(([pronoun, form]) => (
                  <tr key={pronoun}>
                    <td>{pronoun}</td>
                    <td>
                      <strong>{form}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="verbs-card">
            <h4>Examples with sein</h4>
            <p>Ich bin Student. – I am a student.</p>
            <p>Du bist nett. – You are kind.</p>
            <p>Wir sind glücklich. – We are happy.</p>
            <button onClick={() => speak("Ich bin Student. Du bist nett. Wir sind glücklich.")}>
              🔊 Listen to examples
            </button>
          </div>

          <h3>HABEN – to have</h3>
          <div className="verbs-table-wrap">
            <table className="verbs-table">
              <thead>
                <tr>
                  <th>Pronoun</th>
                  <th>Verb form</th>
                </tr>
              </thead>
              <tbody>
                {haben.map(([pronoun, form]) => (
                  <tr key={pronoun}>
                    <td>{pronoun}</td>
                    <td>
                      <strong>{form}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="verbs-card">
            <h4>Examples with haben</h4>
            <p>Ich habe ein Buch. – I have a book.</p>
            <p>Du hast einen Bruder. – You have a brother.</p>
            <p>Wir haben Zeit. – We have time.</p>
            <button onClick={() => speak("Ich habe ein Buch. Du hast einen Bruder. Wir haben Zeit.")}>
              🔊 Listen to examples
            </button>
          </div>

          <div className="verbs-tip">
            <strong>Important difference</strong>
            <p>
              Ich bin = I am. Ich habe = I have. Do not mix up these two
              verbs.
            </p>
          </div>

          <button
            className="verbs-primary"
            onClick={() => setActiveTab("practice")}
          >
            Start practice →
          </button>
        </section>
      )}

      {activeTab === "practice" && (
        <section className="verbs-content">
          <h2>Practice your German verbs</h2>
          <p>
            Choose the correct answer for each question. You need to answer
            all questions before checking your score.
          </p>

          <div className="verbs-progress">
            {Object.keys(selected).length} / {questions.length} answered
          </div>

          {questions.map((question, index) => {
            const isCorrect = selected[index] === question.answer;

            return (
              <div className="verbs-question" key={index}>
                <h3>
                  {index + 1}. {question.question}
                </h3>

                <div className="verbs-options">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      disabled={submitted}
                      className={
                        selected[index] === option ? "selected" : ""
                      }
                      onClick={() =>
                        setSelected((previous) => ({
                          ...previous,
                          [index]: option,
                        }))
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {submitted && (
                  <div className={isCorrect ? "verbs-correct" : "verbs-wrong"}>
                    <strong>
                      {isCorrect ? "Correct!" : `Correct answer: ${question.answer}`}
                    </strong>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          {!submitted ? (
            <button
              className="verbs-primary"
              disabled={!allAnswered}
              onClick={() => setSubmitted(true)}
            >
              Check my answers
            </button>
          ) : (
            <div className="verbs-result">
              <h2>Your score: {score} / {questions.length}</h2>
              <p>
                {score >= 8
                  ? "Excellent! You understand German present tense verbs."
                  : score >= 6
                    ? "Good work! Review the explanations and try again."
                    : "Keep practising. Read the lesson again and try once more."}
              </p>

              {score >= 8 && (
                <button
                  className="verbs-primary"
                  onClick={onComplete}
                >
                  Complete lesson
                </button>
              )}

              <button
                className="verbs-secondary"
                onClick={() => {
                  setSelected({});
                  setSubmitted(false);
                }}
              >
                Try again
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
