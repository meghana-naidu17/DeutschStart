
import { useState } from "react";
import {
  BookOpen,
  Volume2,
  CheckCircle,
  RotateCcw,
  Lightbulb,
  GraduationCap,
} from "lucide-react";

type Props = {
  onComplete: () => void;
};

const modalVerbs = [
  {
    verb: "können",
    meaning: "can / to be able to",
    forms: ["kann", "kannst", "kann", "können", "könnt", "können"],
    example: "Ich kann Deutsch sprechen.",
    translation: "I can speak German.",
    note: "Use können to talk about ability.",
  },
  {
    verb: "müssen",
    meaning: "must / have to",
    forms: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
    example: "Ich muss heute lernen.",
    translation: "I must study today.",
    note: "Use müssen to talk about necessity or obligation.",
  },
  {
    verb: "wollen",
    meaning: "want to",
    forms: ["will", "willst", "will", "wollen", "wollt", "wollen"],
    example: "Ich will Wasser trinken.",
    translation: "I want to drink water.",
    note: "Use wollen to express what you want.",
  },
  {
    verb: "dürfen",
    meaning: "may / to be allowed to",
    forms: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
    example: "Darf ich hereinkommen?",
    translation: "May I come in?",
    note: "Use dürfen to talk about permission.",
  },
  {
    verb: "sollen",
    meaning: "should / supposed to",
    forms: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
    example: "Du sollst mehr Wasser trinken.",
    translation: "You should drink more water.",
    note: "Use sollen for advice or something expected by another person.",
  },
  {
    verb: "mögen",
    meaning: "to like",
    forms: ["mag", "magst", "mag", "mögen", "mögt", "mögen"],
    example: "Ich mag Schokolade.",
    translation: "I like chocolate.",
    note: "Mögen is often used directly with a noun.",
  },
];

const pronouns = ["ich", "du", "er / sie / es", "wir", "ihr", "sie / Sie"];

const questions = [
  {
    question: "What does können mean?",
    options: ["must", "can", "want", "should"],
    answer: "can",
    explanation: "Können means can or to be able to.",
  },
  {
    question: "Complete: Ich ___ Deutsch sprechen.",
    options: ["kann", "kannst", "können", "könnt"],
    answer: "kann",
    explanation: "With ich, können becomes kann.",
  },
  {
    question: "What does müssen mean?",
    options: ["may", "like", "must", "want"],
    answer: "must",
    explanation: "Müssen expresses necessity or obligation.",
  },
  {
    question: "Complete: Du ___ heute lernen.",
    options: ["muss", "müssen", "musst", "müsst"],
    answer: "musst",
    explanation: "With du, müssen becomes musst.",
  },
  {
    question: "Which modal verb expresses permission?",
    options: ["wollen", "dürfen", "sollen", "mögen"],
    answer: "dürfen",
    explanation: "Dürfen means may or to be allowed to.",
  },
  {
    question: "Complete: Ich ___ Pizza essen.",
    options: ["will", "willst", "wollt", "wollen"],
    answer: "will",
    explanation: "With ich, wollen becomes will.",
  },
  {
    question: "Where does the second verb go in a modal sentence?",
    options: [
      "At the beginning",
      "Immediately after the subject",
      "At the end",
      "Before the modal verb",
    ],
    answer: "At the end",
    explanation: "The modal verb is conjugated and the second verb stays in the infinitive at the end.",
  },
  {
    question: "Complete: Er ___ Fußball spielen.",
    options: ["können", "kann", "kannst", "könnt"],
    answer: "kann",
    explanation: "With er, können becomes kann.",
  },
  {
    question: "What does sollen usually express?",
    options: ["Advice or expectation", "Ability", "Permission", "Liking"],
    answer: "Advice or expectation",
    explanation: "Sollen is used for advice, instructions or expectations.",
  },
  {
    question: "Choose the correct sentence.",
    options: [
      "Ich kann sprechen Deutsch.",
      "Ich sprechen kann Deutsch.",
      "Ich kann Deutsch sprechen.",
      "Ich Deutsch sprechen kann.",
    ],
    answer: "Ich kann Deutsch sprechen.",
    explanation: "The conjugated modal verb is in position 2. The infinitive goes at the end.",
  },
];

export default function ModalVerbsLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("learn");
  const [selectedVerb, setSelectedVerb] = useState("können");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const currentVerb =
    modalVerbs.find((item) => item.verb === selectedVerb) || modalVerbs[0];

  const score = answers.reduce(
    (total, answer, index) =>
      total + (answer === questions[index].answer ? 1 : 0),
    0
  );

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.85;

    window.speechSynthesis.speak(utterance);
  };

  const chooseAnswer = (option: string) => {
    if (!selectedAnswer) setSelectedAnswer(option);
  };

  const nextQuestion = () => {
    if (!selectedAnswer) return;

    const updatedAnswers = [...answers, selectedAnswer];
    setAnswers(updatedAnswers);
    setSelectedAnswer("");

    if (questionIndex === questions.length - 1) {
      setFinished(true);
    } else {
      setQuestionIndex((previous) => previous + 1);
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
    { id: "tables", label: "Conjugation", icon: GraduationCap },
    { id: "sentences", label: "Examples", icon: Lightbulb },
    { id: "practice", label: "Practice", icon: CheckCircle },
  ];

  return (
    <div className="modal-lesson">
      <div className="modal-header">
        <div>
          <span className="modal-label">A1 GRAMMAR</span>
          <h1>Modal Verbs</h1>
          <p>Learn how to express ability, necessity, wishes and permission.</p>
        </div>
        <div className="modal-header-icon">💬</div>
      </div>

      <div className="modal-intro">
        <h2>What are modal verbs?</h2>
        <p>
          Modal verbs help us explain what we can do, must do, want to do or
          are allowed to do.
        </p>

        <div className="modal-intro-examples">
          <div>
            <strong>Ich kann schwimmen.</strong>
            <span>I can swim.</span>
          </div>
          <div>
            <strong>Ich muss lernen.</strong>
            <span>I must study.</span>
          </div>
          <div>
            <strong>Ich will schlafen.</strong>
            <span>I want to sleep.</span>
          </div>
        </div>
      </div>

      <div className="modal-tabs">
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
        <section className="modal-section">
          <h2>Six useful modal verbs</h2>
          <p>Select a verb to understand its meaning and use.</p>

          <div className="modal-verb-grid">
            {modalVerbs.map((item) => (
              <button
                key={item.verb}
                className={
                  selectedVerb === item.verb ? "selected" : ""
                }
                onClick={() => setSelectedVerb(item.verb)}
              >
                <strong>{item.verb}</strong>
                <span>{item.meaning}</span>
              </button>
            ))}
          </div>

          <div className="modal-verb-detail">
            <div className="modal-verb-detail-heading">
              <div>
                <span>SELECTED VERB</span>
                <h2>{currentVerb.verb}</h2>
                <p>{currentVerb.meaning}</p>
              </div>
              <button onClick={() => speak(currentVerb.verb)}>
                <Volume2 size={20} />
              </button>
            </div>

            <div className="modal-example-box">
              <strong>{currentVerb.example}</strong>
              <button onClick={() => speak(currentVerb.example)}>
                <Volume2 size={18} />
              </button>
              <p>{currentVerb.translation}</p>
            </div>

            <div className="modal-tip">
              <Lightbulb size={20} />
              <p>{currentVerb.note}</p>
            </div>
          </div>
        </section>
      )}

      {activeTab === "tables" && (
        <section className="modal-section">
          <h2>Modal verb conjugation</h2>
          <p>
            The modal verb changes according to the subject. Pay special
            attention to ich, du and er/sie/es.
          </p>

          <div className="modal-select-grid">
            {modalVerbs.map((item) => (
              <button
                key={item.verb}
                className={selectedVerb === item.verb ? "active" : ""}
                onClick={() => setSelectedVerb(item.verb)}
              >
                {item.verb}
              </button>
            ))}
          </div>

          <h3>{currentVerb.verb} — {currentVerb.meaning}</h3>

          <div className="modal-table-wrap">
            <table className="modal-table">
              <thead>
                <tr>
                  <th>Pronoun</th>
                  <th>Conjugation</th>
                  <th>Audio</th>
                </tr>
              </thead>
              <tbody>
                {pronouns.map((pronoun, index) => (
                  <tr key={pronoun}>
                    <td>{pronoun}</td>
                    <td>
                      <strong>{currentVerb.forms[index]}</strong>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          speak(`${pronoun} ${currentVerb.forms[index]}`)
                        }
                      >
                        <Volume2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-warning">
            <strong>Important irregular forms</strong>
            <p>
              Ich kann, ich muss, ich will, ich darf, ich soll and ich mag.
              Notice how the vowel or form changes in the singular.
            </p>
          </div>
        </section>
      )}

      {activeTab === "sentences" && (
        <section className="modal-section">
          <h2>The most important sentence rule</h2>
          <div className="modal-word-order">
            <div>
              <span>POSITION 1</span>
              <strong>Subject</strong>
              <small>Ich</small>
            </div>
            <div>
              <span>POSITION 2</span>
              <strong>Modal verb</strong>
              <small>kann</small>
            </div>
            <div>
              <span>MIDDLE</span>
              <strong>Other words</strong>
              <small>Deutsch</small>
            </div>
            <div>
              <span>LAST</span>
              <strong>Infinitive</strong>
              <small>sprechen</small>
            </div>
          </div>

          <div className="modal-rule">
            <strong>Subject + conjugated modal verb + other information + infinitive</strong>
            <p>
              The modal verb is conjugated. The second verb stays in its
              original infinitive form and goes to the end.
            </p>
          </div>

          <h3>Everyday examples</h3>

          {[
            ["Ich kann Deutsch sprechen.", "I can speak German."],
            ["Du musst Hausaufgaben machen.", "You must do homework."],
            ["Wir wollen Pizza essen.", "We want to eat pizza."],
            ["Darf ich hier sitzen?", "May I sit here?"],
            ["Ihr sollt mehr üben.", "You should practise more."],
            ["Sie möchte Kaffee trinken.", "She would like to drink coffee."],
          ].map(([german, english]) => (
            <div className="modal-sentence-card" key={german}>
              <div>
                <strong>{german}</strong>
                <span>{english}</span>
              </div>
              <button onClick={() => speak(german)}>
                <Volume2 size={18} />
              </button>
            </div>
          ))}

          <div className="modal-tip">
            <Lightbulb size={20} />
            <p>
              Special note: möchten is the polite form meaning “would like”.
              It is commonly taught alongside modal verbs. For example:
              Ich möchte einen Tee trinken.
            </p>
          </div>
        </section>
      )}

      {activeTab === "practice" && (
        <section className="modal-section">
          <h2>Test your knowledge</h2>

          {!finished ? (
            <>
              <div className="modal-quiz-progress">
                <span>
                  Question {questionIndex + 1} of {questions.length}
                </span>
                <span>
                  {Math.round((questionIndex / questions.length) * 100)}%
                </span>
              </div>

              <div className="modal-progress-track">
                <div
                  style={{
                    width: `${(questionIndex / questions.length) * 100}%`,
                  }}
                />
              </div>

              <div className="modal-question-card">
                <span>QUESTION {questionIndex + 1}</span>
                <h3>{questions[questionIndex].question}</h3>

                <div className="modal-options">
                  {questions[questionIndex].options.map((option) => {
                    const correct =
                      option === questions[questionIndex].answer;
                    const chosen = option === selectedAnswer;

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
                  <div className="modal-explanation">
                    <strong>
                      {selectedAnswer === questions[questionIndex].answer
                        ? "Correct! 🎉"
                        : "Not quite. Keep learning!"}
                    </strong>
                    <p>{questions[questionIndex].explanation}</p>
                  </div>
                )}

                <button
                  className="modal-next-button"
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
            <div className="modal-result">
              <div className="modal-result-icon">
                {score >= 8 ? "🏆" : "📚"}
              </div>
              <h2>{score >= 8 ? "Excellent work!" : "Keep practising!"}</h2>
              <p>
                Your score: <strong>{score} / {questions.length}</strong>
              </p>
              <p>
                {score >= 8
                  ? "You passed this lesson. Well done!"
                  : "You need at least 8 correct answers to complete this lesson. Review and try again."}
              </p>

              {score >= 8 && (
                <button
                  className="modal-next-button"
                  onClick={onComplete}
                >
                  <CheckCircle size={18} />
                  Complete Lesson
                </button>
              )}

              <button
                className="modal-retry-button"
                onClick={restartQuiz}
              >
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
