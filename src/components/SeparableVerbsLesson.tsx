
import { useState } from "react";
import {
  BookOpen,
  Volume2,
  CheckCircle,
  RotateCcw,
  Lightbulb,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

type Props = {
  onComplete: () => void;
};

type Verb = {
  infinitive: string;
  meaning: string;
  prefix: string;
  example: string;
  translation: string;
  forms: string[];
};

const verbs: Verb[] = [
  {
    infinitive: "aufstehen",
    meaning: "to get up",
    prefix: "auf",
    example: "Ich stehe um 7 Uhr auf.",
    translation: "I get up at 7 o'clock.",
    forms: ["ich stehe auf", "du stehst auf", "er/sie/es steht auf", "wir stehen auf", "ihr steht auf", "sie/Sie stehen auf"],
  },
  {
    infinitive: "einkaufen",
    meaning: "to shop",
    prefix: "ein",
    example: "Wir kaufen am Samstag ein.",
    translation: "We go shopping on Saturday.",
    forms: ["ich kaufe ein", "du kaufst ein", "er/sie/es kauft ein", "wir kaufen ein", "ihr kauft ein", "sie/Sie kaufen ein"],
  },
  {
    infinitive: "anrufen",
    meaning: "to call",
    prefix: "an",
    example: "Ich rufe meine Mutter an.",
    translation: "I call my mother.",
    forms: ["ich rufe an", "du rufst an", "er/sie/es ruft an", "wir rufen an", "ihr ruft an", "sie/Sie rufen an"],
  },
  {
    infinitive: "fernsehen",
    meaning: "to watch television",
    prefix: "fern",
    example: "Er sieht am Abend fern.",
    translation: "He watches television in the evening.",
    forms: ["ich sehe fern", "du siehst fern", "er/sie/es sieht fern", "wir sehen fern", "ihr seht fern", "sie/Sie sehen fern"],
  },
  {
    infinitive: "aufräumen",
    meaning: "to tidy up",
    prefix: "auf",
    example: "Ich räume mein Zimmer auf.",
    translation: "I tidy up my room.",
    forms: ["ich räume auf", "du räumst auf", "er/sie/es räumt auf", "wir räumen auf", "ihr räumt auf", "sie/Sie räumen auf"],
  },
  {
    infinitive: "mitkommen",
    meaning: "to come along",
    prefix: "mit",
    example: "Kommst du heute mit?",
    translation: "Are you coming along today?",
    forms: ["ich komme mit", "du kommst mit", "er/sie/es kommt mit", "wir kommen mit", "ihr kommt mit", "sie/Sie kommen mit"],
  },
  {
    infinitive: "anfangen",
    meaning: "to begin",
    prefix: "an",
    example: "Der Unterricht fängt um 9 Uhr an.",
    translation: "The lesson starts at 9 o'clock.",
    forms: ["ich fange an", "du fängst an", "er/sie/es fängt an", "wir fangen an", "ihr fangt an", "sie/Sie fangen an"],
  },
  {
    infinitive: "zumachen",
    meaning: "to close",
    prefix: "zu",
    example: "Bitte mach die Tür zu.",
    translation: "Please close the door.",
    forms: ["ich mache zu", "du machst zu", "er/sie/es macht zu", "wir machen zu", "ihr macht zu", "sie/Sie machen zu"],
  },
  {
    infinitive: "aufmachen",
    meaning: "to open",
    prefix: "auf",
    example: "Ich mache das Fenster auf.",
    translation: "I open the window.",
    forms: ["ich mache auf", "du machst auf", "er/sie/es macht auf", "wir machen auf", "ihr macht auf", "sie/Sie machen auf"],
  },
  {
    infinitive: "abholen",
    meaning: "to pick up",
    prefix: "ab",
    example: "Mein Vater holt mich ab.",
    translation: "My father picks me up.",
    forms: ["ich hole ab", "du holst ab", "er/sie/es holt ab", "wir holen ab", "ihr holt ab", "sie/Sie holen ab"],
  },
];

const questions = [
  {
    question: "What does aufstehen mean?",
    options: ["to sit down", "to get up", "to go out", "to sleep"],
    answer: 1,
    explanation: "Aufstehen means to get up or to stand up.",
  },
  {
    question: "Choose the correct sentence: I get up at 7.",
    options: [
      "Ich aufstehe um 7 Uhr.",
      "Ich stehe um 7 Uhr auf.",
      "Ich stehe auf um 7 Uhr.",
      "Ich stehen um 7 Uhr auf.",
    ],
    answer: 1,
    explanation: "The conjugated verb stehe is in position 2. The prefix auf goes to the end.",
  },
  {
    question: "Complete: Wir kaufen heute ____.",
    options: ["auf", "an", "ein", "mit"],
    answer: 2,
    explanation: "Einkaufen means to shop. Its prefix ein goes to the end.",
  },
  {
    question: "What is the correct form for er with anrufen?",
    options: ["er anruft", "er rufen an", "er ruft an", "er ruft auf"],
    answer: 2,
    explanation: "Anrufen changes to er ruft ... an.",
  },
  {
    question: "Complete: Wann ____ du ____?",
    options: ["stehst / auf", "aufstehst / —", "steht / auf", "stehen / auf"],
    answer: 0,
    explanation: "In a W-question, the conjugated verb comes after the question word, and the prefix goes to the end.",
  },
  {
    question: "Which sentence is correct?",
    options: [
      "Er sieht fern am Abend.",
      "Er fern sieht am Abend.",
      "Er sieht am Abend fern.",
      "Er sehen am Abend fern.",
    ],
    answer: 2,
    explanation: "Fernsehen separates: sieht is conjugated and fern goes to the end.",
  },
  {
    question: "Complete: Ich muss früh ____.",
    options: ["stehe auf", "aufstehe", "aufstehen", "stehen auf"],
    answer: 2,
    explanation: "After a modal verb such as muss, the separable verb stays together in its infinitive form at the end.",
  },
  {
    question: "What happens to the prefix in a normal main sentence?",
    options: [
      "It disappears.",
      "It moves to the beginning.",
      "It goes to the end.",
      "It stays attached to the verb.",
    ],
    answer: 2,
    explanation: "In a normal main clause, the prefix separates and moves to the end.",
  },
  {
    question: "Choose the correct sentence: He starts at 9.",
    options: [
      "Der Unterricht anfangt um 9 Uhr.",
      "Der Unterricht fängt um 9 Uhr an.",
      "Der Unterricht fangt an um 9 Uhr.",
      "Der Unterricht anfangen um 9 Uhr.",
    ],
    answer: 1,
    explanation: "Anfangen has a vowel change: er fängt ... an.",
  },
  {
    question: "Choose the correct sentence with a modal verb.",
    options: [
      "Ich muss um 6 Uhr aufstehe.",
      "Ich muss stehe um 6 Uhr auf.",
      "Ich muss um 6 Uhr aufstehen.",
      "Ich aufstehen muss um 6 Uhr.",
    ],
    answer: 2,
    explanation: "With a modal verb, the separable verb stays together as an infinitive at the end.",
  },
];

const pronouns = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export default function SeparableVerbsLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("learn");
  const [selectedVerb, setSelectedVerb] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const tabs = [
    { id: "learn", label: "Learn", icon: BookOpen },
    { id: "verbs", label: "Verb List", icon: GraduationCap },
    { id: "sentences", label: "Sentence Rules", icon: Lightbulb },
    { id: "practice", label: "Practice", icon: CheckCircle },
  ];

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  const handleSubmit = () => {
    setSubmitted(true);
    if (score >= 8 && !completed) {
      setCompleted(true);
      onComplete();
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setCompleted(false);
  };

  const currentVerb = verbs[selectedVerb];

  return (
    <div className="separable-lesson">
      <div className="separable-hero">
        <div className="separable-hero-icon">
          <GraduationCap size={30} />
        </div>
        <div>
          <span className="separable-eyebrow">GERMAN A1 · MODULE 14</span>
          <h1>Separable Verbs</h1>
          <p>Trennbare Verben — Learn how German verbs split into two parts.</p>
        </div>
      </div>

      <div className="separable-progress-card">
        <div>
          <strong>Your lesson journey</strong>
          <p>Learn the rule, explore verbs, and test yourself.</p>
        </div>
        <span className="separable-level">A1 Beginner</span>
      </div>

      <div className="separable-tabs">
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
        <div className="separable-content">
          <section className="separable-section">
            <span className="separable-tag">THE BASIC IDEA</span>
            <h2>What are separable verbs?</h2>
            <p>
              Some German verbs are made of two parts: a <strong>prefix</strong>
              and a <strong>main verb</strong>. In a normal sentence, these two
              parts separate.
            </p>

            <div className="separable-breakdown">
              <div className="separable-word">
                <strong>auf</strong>
                <span>Prefix</span>
              </div>
              <span className="separable-plus">+</span>
              <div className="separable-word">
                <strong>stehen</strong>
                <span>Main verb</span>
              </div>
              <ArrowRight size={22} />
              <div className="separable-word separable-word-result">
                <strong>aufstehen</strong>
                <span>to get up</span>
              </div>
            </div>
          </section>

          <section className="separable-section">
            <h2>The most important rule</h2>
            <div className="separable-rule">
              <span>Subject</span>
              <span>Conjugated verb</span>
              <span>Other information</span>
              <span>Prefix</span>
            </div>
            <div className="separable-example">
              <div className="separable-sentence">
                <span>Ich</span>
                <span className="separable-highlight">stehe</span>
                <span>um 7 Uhr</span>
                <span className="separable-highlight">auf.</span>
                <button onClick={() => speak("Ich stehe um sieben Uhr auf.")}>
                  <Volume2 size={17} />
                </button>
              </div>
              <p>I get up at 7 o'clock.</p>
            </div>
            <div className="separable-note">
              <Lightbulb size={19} />
              <p>
                Remember: <strong>stehe</strong> is the conjugated verb and
                <strong> auf</strong> travels to the end of the sentence.
              </p>
            </div>
          </section>

          <section className="separable-section">
            <h2>Compare these two forms</h2>
            <div className="separable-comparison">
              <div>
                <span className="separable-tag">INFINITIVE</span>
                <h3>aufstehen</h3>
                <p>The verb stays together in the dictionary.</p>
              </div>
              <div>
                <span className="separable-tag">NORMAL SENTENCE</span>
                <h3>Ich stehe früh auf.</h3>
                <p>The prefix moves to the end.</p>
              </div>
            </div>
          </section>

          <section className="separable-section">
            <h2>What about questions?</h2>
            <div className="separable-example">
              <strong>Yes/No question</strong>
              <div className="separable-sentence">
                <span className="separable-highlight">Stehst</span>
                <span>du früh</span>
                <span className="separable-highlight">auf?</span>
                <button onClick={() => speak("Stehst du früh auf?")}>
                  <Volume2 size={17} />
                </button>
              </div>
              <p>Do you get up early?</p>
            </div>
            <div className="separable-example">
              <strong>W-question</strong>
              <div className="separable-sentence">
                <span>Wann</span>
                <span className="separable-highlight">stehst</span>
                <span>du</span>
                <span className="separable-highlight">auf?</span>
                <button onClick={() => speak("Wann stehst du auf?")}>
                  <Volume2 size={17} />
                </button>
              </div>
              <p>When do you get up?</p>
            </div>
          </section>

          <section className="separable-section">
            <h2>What if we use a modal verb?</h2>
            <p>
              This is an important exception to remember. With a modal verb
              like <strong>müssen</strong> or <strong>können</strong>, the
              separable verb stays together in its infinitive form at the end.
            </p>
            <div className="separable-example">
              <div className="separable-sentence">
                <span>Ich</span>
                <span className="separable-highlight">muss</span>
                <span>früh</span>
                <span className="separable-highlight">aufstehen.</span>
                <button onClick={() => speak("Ich muss früh aufstehen.")}>
                  <Volume2 size={17} />
                </button>
              </div>
              <p>I have to get up early.</p>
            </div>
          </section>
        </div>
      )}

      {activeTab === "verbs" && (
        <div className="separable-content">
          <section className="separable-section">
            <h2>Common A1 separable verbs</h2>
            <p>Select a verb to see its meaning, example, and conjugation.</p>
            <div className="separable-verb-grid">
              {verbs.map((verb, index) => (
                <button
                  key={verb.infinitive}
                  className={selectedVerb === index ? "selected" : ""}
                  onClick={() => setSelectedVerb(index)}
                >
                  <strong>{verb.infinitive}</strong>
                  <span>{verb.meaning}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="separable-section separable-verb-detail">
            <div className="separable-detail-heading">
              <div>
                <span className="separable-tag">SELECTED VERB</span>
                <h2>{currentVerb.infinitive}</h2>
                <p>{currentVerb.meaning}</p>
              </div>
              <button
                className="separable-audio-button"
                onClick={() => speak(currentVerb.example)}
              >
                <Volume2 size={18} /> Listen
              </button>
            </div>

            <div className="separable-prefix-info">
              <span>Prefix</span>
              <strong>{currentVerb.prefix}</strong>
            </div>

            <div className="separable-example">
              <strong>Example sentence</strong>
              <h3>{currentVerb.example}</h3>
              <p>{currentVerb.translation}</p>
            </div>

            <h3 className="separable-table-title">Conjugation</h3>
            <div className="separable-table-wrap">
              <table className="separable-table">
                <thead>
                  <tr>
                    <th>Pronoun</th>
                    <th>Verb form</th>
                  </tr>
                </thead>
                <tbody>
                  {pronouns.map((pronoun, index) => (
                    <tr key={pronoun}>
                      <td>{pronoun}</td>
                      <td>{currentVerb.forms[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="separable-note">
            <Lightbulb size={19} />
            <p>
              Some verbs also change their vowel. For example:
              <strong> sehen → du siehst</strong> and
              <strong> anfangen → du fängst an</strong>.
            </p>
          </div>
        </div>
      )}

      {activeTab === "sentences" && (
        <div className="separable-content">
          <section className="separable-section">
            <h2>Prefixes you should know</h2>
            <p>
              These prefixes often appear in separable A1 verbs. Learn them
              together with the complete verb.
            </p>
            <div className="separable-prefix-grid">
              {[
                ["ab", "abholen", "to pick up"],
                ["an", "anrufen", "to call"],
                ["auf", "aufstehen", "to get up"],
                ["aus", "ausgehen", "to go out"],
                ["ein", "einkaufen", "to shop"],
                ["mit", "mitkommen", "to come along"],
                ["nach", "nachfragen", "to ask again"],
                ["vor", "vorstellen", "to introduce"],
                ["zu", "zumachen", "to close"],
              ].map(([prefix, verb, meaning]) => (
                <div className="separable-prefix-card" key={prefix}>
                  <strong>{prefix}-</strong>
                  <span>{verb}</span>
                  <small>{meaning}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="separable-section">
            <h2>Four sentence patterns</h2>
            {[
              {
                title: "1. Normal statement",
                sentence: "Ich rufe dich heute an.",
                meaning: "I will call you today.",
                explanation: "The conjugated verb is in position 2. The prefix is at the end.",
              },
              {
                title: "2. Time at the beginning",
                sentence: "Heute rufe ich dich an.",
                meaning: "Today I will call you.",
                explanation: "Even when heute comes first, the conjugated verb stays in position 2.",
              },
              {
                title: "3. Yes/No question",
                sentence: "Rufst du mich heute an?",
                meaning: "Are you calling me today?",
                explanation: "The conjugated verb comes first. The prefix stays at the end.",
              },
              {
                title: "4. With a modal verb",
                sentence: "Ich möchte dich anrufen.",
                meaning: "I would like to call you.",
                explanation: "The separable verb stays together as an infinitive at the end.",
              },
            ].map((item) => (
              <div className="separable-pattern-card" key={item.title}>
                <strong>{item.title}</strong>
                <div className="separable-pattern-sentence">
                  {item.sentence}
                  <button onClick={() => speak(item.sentence)}>
                    <Volume2 size={17} />
                  </button>
                </div>
                <p>{item.meaning}</p>
                <small>{item.explanation}</small>
              </div>
            ))}
          </section>

          <section className="separable-section">
            <h2>Common mistakes</h2>
            <div className="separable-mistake">
              <span className="separable-wrong">Ich aufstehe um 7 Uhr.</span>
              <span className="separable-correct">Ich stehe um 7 Uhr auf.</span>
              <p>The conjugated verb belongs in position 2.</p>
            </div>
            <div className="separable-mistake">
              <span className="separable-wrong">Ich muss stehe früh auf.</span>
              <span className="separable-correct">Ich muss früh aufstehen.</span>
              <p>After a modal verb, use the complete infinitive at the end.</p>
            </div>
            <div className="separable-mistake">
              <span className="separable-wrong">Er anruft seine Mutter.</span>
              <span className="separable-correct">Er ruft seine Mutter an.</span>
              <p>Conjugate the main verb and move the prefix to the end.</p>
            </div>
          </section>
        </div>
      )}

      {activeTab === "practice" && (
        <div className="separable-content">
          <section className="separable-section">
            <div className="separable-quiz-heading">
              <div>
                <span className="separable-tag">TEST YOURSELF</span>
                <h2>A1 Separable Verbs Quiz</h2>
                <p>Answer all 10 questions. You need 8 correct answers to pass.</p>
              </div>
              <div className="separable-score">
                {Object.keys(answers).length}/{questions.length}
                <small>Answered</small>
              </div>
            </div>

            {questions.map((question, index) => {
              const chosen = answers[index];
              const isCorrect = chosen === question.answer;

              return (
                <div className="separable-question" key={index}>
                  <h3>
                    <span>{index + 1}</span>
                    {question.question}
                  </h3>
                  <div className="separable-options">
                    {question.options.map((option, optionIndex) => {
                      let className = "";
                      if (submitted && optionIndex === question.answer) {
                        className = "correct";
                      } else if (
                        submitted &&
                        chosen === optionIndex &&
                        !isCorrect
                      ) {
                        className = "incorrect";
                      } else if (!submitted && chosen === optionIndex) {
                        className = "selected";
                      }

                      return (
                        <button
                          key={option}
                          className={className}
                          disabled={submitted}
                          onClick={() =>
                            setAnswers((previous) => ({
                              ...previous,
                              [index]: optionIndex,
                            }))
                          }
                        >
                          <span className="separable-option-letter">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          {option}
                          {submitted && optionIndex === question.answer && (
                            <CheckCircle size={17} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {submitted && (
                    <div className="separable-explanation">
                      {isCorrect ? "Correct!" : "Not quite."}{" "}
                      {question.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {!submitted ? (
              <button
                className="separable-submit"
                disabled={Object.keys(answers).length !== questions.length}
                onClick={handleSubmit}
              >
                Submit answers
              </button>
            ) : (
              <div className="separable-result">
                <div className="separable-result-icon">
                  {score >= 8 ? (
                    <CheckCircle size={30} />
                  ) : (
                    <RotateCcw size={30} />
                  )}
                </div>
                <h2>{score >= 8 ? "Excellent work!" : "Keep practising!"}</h2>
                <p>
                  You scored <strong>{score} out of 10</strong>.
                </p>
                <p>
                  {score >= 8
                    ? "You passed this lesson. You can move on to the next module."
                    : "You need at least 8 correct answers. Review the lesson and try again."}
                </p>
                <button className="separable-submit" onClick={resetQuiz}>
                  <RotateCcw size={17} /> Try again
                </button>
                {score >= 8 && (
                  <div className="separable-passed">
                    <CheckCircle size={18} />
                    Lesson completed!
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
