import { useState } from "react";
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  GraduationCap,
  ArrowRight,
  Brain,
  BookMarked,
} from "lucide-react";
import "./CasesArticleRevisionLesson.css";
type Props = {
  onComplete: () => void;
};

type CaseName = "Nominative" | "Accusative" | "Dative";

const tabs = [
  "Learn",
  "Case Tables",
  "How to Choose",
  "Common Verbs",
  "Examples",
  "Practice",
  "Final Quiz",
];

const caseTables = [
  {
    name: "Nominative" as const,
    question: "Wer? / Was? — Who? / What?",
    meaning: "The subject: the person or thing doing the action.",
    definite: ["der", "die", "das", "die"],
    indefinite: ["ein", "eine", "ein", "—"],
    negative: ["kein", "keine", "kein", "keine"],
    example: "Der Mann lernt Deutsch.",
    translation: "The man is learning German.",
    focus: "Der Mann is the subject. He is doing the action.",
  },
  {
    name: "Accusative" as const,
    question: "Wen? / Was? — Whom? / What?",
    meaning:
      "The direct object: the person or thing directly affected by the action.",
    definite: ["den", "die", "das", "die"],
    indefinite: ["einen", "eine", "ein", "—"],
    negative: ["keinen", "keine", "kein", "keine"],
    example: "Ich sehe den Mann.",
    translation: "I see the man.",
    focus: "Ich is the subject. Den Mann is the person I see.",
  },
  {
    name: "Dative" as const,
    question: "Wem? — To whom? / For whom?",
    meaning:
      "Often the receiver of something, or the object of a dative verb or preposition.",
    definite: ["dem", "der", "dem", "den"],
    indefinite: ["einem", "einer", "einem", "—"],
    negative: ["keinem", "keiner", "keinem", "keinen"],
    example: "Ich helfe dem Mann.",
    translation: "I help the man.",
    focus: "Helfen takes the dative, so we say dem Mann.",
  },
];

const verbGroups = [
  {
    name: "Nominative",
    subtitle: "The subject of the sentence",
    color: "nom",
    description:
      "Every normal sentence has a subject in the nominative. These verbs can also have a nominative description after them.",
    verbs: [
      ["sein", "to be", "Ich bin Student.", "I am a student."],
      ["werden", "to become", "Sie wird Ärztin.", "She becomes a doctor."],
      ["bleiben", "to remain", "Er bleibt mein Freund.", "He remains my friend."],
      ["heißen", "to be called", "Ich heiße Anna.", "My name is Anna."],
    ],
    note:
      "Important: These are not the only nominative verbs. The person or thing doing the action is normally nominative with every verb.",
  },
  {
    name: "Accusative",
    subtitle: "Common verbs that take a direct object",
    color: "acc",
    description:
      "These verbs commonly need an accusative object. Ask Wen? or Was? after the verb.",
    verbs: [
      ["haben", "to have", "Ich habe einen Bruder.", "I have a brother."],
      ["brauchen", "to need", "Ich brauche einen Stift.", "I need a pen."],
      ["kaufen", "to buy", "Sie kauft ein Buch.", "She buys a book."],
      ["sehen", "to see", "Wir sehen den Hund.", "We see the dog."],
      ["hören", "to hear", "Ich höre die Musik.", "I hear the music."],
      ["essen", "to eat", "Er isst einen Apfel.", "He eats an apple."],
      ["trinken", "to drink", "Sie trinkt einen Kaffee.", "She drinks a coffee."],
      ["lesen", "to read", "Ich lese die Zeitung.", "I read the newspaper."],
      ["suchen", "to search for", "Er sucht seinen Schlüssel.", "He is looking for his key."],
      ["besuchen", "to visit", "Wir besuchen den Lehrer.", "We visit the teacher."],
      ["fragen", "to ask", "Ich frage den Mann.", "I ask the man."],
      ["lieben", "to love", "Sie liebt ihren Hund.", "She loves her dog."],
    ],
    note:
      "Masculine articles change in the accusative: der → den, ein → einen, kein → keinen. Feminine and neuter articles do not change here.",
  },
  {
    name: "Dative",
    subtitle: "Common verbs that take a dative object",
    color: "dat",
    description:
      "These verbs take a dative object. Ask Wem? — To whom? or For whom?",
    verbs: [
      ["helfen", "to help", "Ich helfe dem Kind.", "I help the child."],
      ["danken", "to thank", "Wir danken der Lehrerin.", "We thank the teacher."],
      ["gefallen", "to please / to like", "Das gefällt mir.", "I like that."],
      ["gehören", "to belong to", "Das Buch gehört dem Mann.", "The book belongs to the man."],
      ["antworten", "to answer", "Er antwortet der Frau.", "He answers the woman."],
      ["schmecken", "to taste good to", "Die Suppe schmeckt mir.", "I like the taste of the soup."],
      ["folgen", "to follow", "Der Hund folgt dem Kind.", "The dog follows the child."],
      ["gratulieren", "to congratulate", "Ich gratuliere meinem Bruder.", "I congratulate my brother."],
      ["vertrauen", "to trust", "Sie vertraut ihrem Freund.", "She trusts her friend."],
      ["zuhören", "to listen to", "Wir hören dem Lehrer zu.", "We listen to the teacher."],
    ],
    note:
      "Learn these verbs together with their dative form. For example: helfen + Dativ → Ich helfe dir.",
  },
];

const examples = [
  {
    tag: "Nominative",
    sentence: "Die Frau liest ein Buch.",
    translation: "The woman reads a book.",
    explanation: "Die Frau is the subject: Who reads? The woman.",
  },
  {
    tag: "Accusative",
    sentence: "Ich kenne die Frau.",
    translation: "I know the woman.",
    explanation: "Die Frau is the direct object: Whom do I know?",
  },
  {
    tag: "Dative",
    sentence: "Ich gebe der Frau ein Buch.",
    translation: "I give the woman a book.",
    explanation: "Der Frau receives the book: To whom do I give it?",
  },
  {
    tag: "Dative",
    sentence: "Wir fahren mit dem Bus.",
    translation: "We travel by bus.",
    explanation: "Mit always takes the dative.",
  },
  {
    tag: "Accusative",
    sentence: "Er hat einen Bruder.",
    translation: "He has a brother.",
    explanation: "Einen Bruder is the direct object of haben.",
  },
  {
    tag: "Nominative",
    sentence: "Das Kind spielt.",
    translation: "The child is playing.",
    explanation: "Das Kind is the subject: Who is playing?",
  },
  {
    tag: "Dative",
    sentence: "Ich danke meinem Vater.",
    translation: "I thank my father.",
    explanation: "Danken takes the dative: meinem Vater.",
  },
  {
    tag: "Accusative",
    sentence: "Sie kauft einen Computer.",
    translation: "She buys a computer.",
    explanation: "Einen Computer is the direct object.",
  },
];

const identificationQuestions = [
  {
    sentence: "Der Junge spielt Fußball.",
    target: "Der Junge",
    answer: "Nominative",
    explanation: "Der Junge is doing the action. Ask: Who is playing?",
  },
  {
    sentence: "Ich kaufe einen Apfel.",
    target: "einen Apfel",
    answer: "Accusative",
    explanation: "The apple is what I buy. It is the direct object.",
  },
  {
    sentence: "Sie hilft dem Lehrer.",
    target: "dem Lehrer",
    answer: "Dative",
    explanation: "Helfen takes the dative. Ask: Whom does she help?",
  },
  {
    sentence: "Das Mädchen liest ein Buch.",
    target: "Das Mädchen",
    answer: "Nominative",
    explanation: "The girl is doing the action of reading.",
  },
  {
    sentence: "Wir besuchen den Arzt.",
    target: "den Arzt",
    answer: "Accusative",
    explanation: "The doctor is the person we visit. Besuchen takes the accusative.",
  },
  {
    sentence: "Ich danke meiner Mutter.",
    target: "meiner Mutter",
    answer: "Dative",
    explanation: "Danken always takes the dative.",
  },
  {
    sentence: "Der Hund sieht die Katze.",
    target: "die Katze",
    answer: "Accusative",
    explanation: "The cat is what the dog sees.",
  },
  {
    sentence: "Das Buch gehört dem Schüler.",
    target: "dem Schüler",
    answer: "Dative",
    explanation: "Gehören takes the dative: the book belongs to the student.",
  },
];

const quiz = [
  {
    question: "___ Frau trinkt Wasser. (The woman drinks water.)",
    options: ["Der", "Die", "Den"],
    answer: "Die",
    explanation: "Die Frau is the subject, so use nominative feminine: die.",
  },
  {
    question: "Ich sehe ___ Hund. (I see the dog.)",
    options: ["der", "den", "dem"],
    answer: "den",
    explanation: "The dog is the direct object. Masculine accusative changes der to den.",
  },
  {
    question: "Er kauft ___ Apfel. (He buys an apple.)",
    options: ["ein", "einen", "einem"],
    answer: "einen",
    explanation: "Apfel is masculine and is the direct object: einen Apfel.",
  },
  {
    question: "Ich spiele mit ___ Kind. (I play with the child.)",
    options: ["das", "dem", "den"],
    answer: "dem",
    explanation: "Mit always takes the dative in this use. Das becomes dem.",
  },
  {
    question: "___ Buch ist interessant. (The book is interesting.)",
    options: ["Der", "Die", "Das"],
    answer: "Das",
    explanation: "Buch is neuter and is the subject: das Buch.",
  },
  {
    question: "Sie hilft ___ Mutter. (She helps the mother.)",
    options: ["die", "der", "den"],
    answer: "der",
    explanation: "Helfen takes the dative. Die becomes der in dative feminine.",
  },
  {
    question: "Wir haben ___ Katze. (We have a cat.)",
    options: ["eine", "einer", "einen"],
    answer: "eine",
    explanation: "Katze is feminine and is the direct object. Feminine accusative stays eine.",
  },
  {
    question: "Die Kinder spielen in ___ Garten. (The children are playing in the garden.)",
    options: ["der", "den", "dem"],
    answer: "dem",
    explanation: "They are located in the garden, answering Wo? Use dative: in dem Garten (im Garten).",
  },
  {
    question: "Ich gebe ___ Mann das Buch. (I give the man the book.)",
    options: ["der", "den", "dem"],
    answer: "dem",
    explanation: "The man receives the book, so he is the dative indirect object: dem Mann.",
  },
  {
    question: "Er besucht ___ Lehrer. (He visits the teacher.)",
    options: ["der", "den", "dem"],
    answer: "den",
    explanation: "The teacher is the direct object. Masculine accusative: den Lehrer.",
  },
];

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.85;

  window.speechSynthesis.speak(utterance);
}

export default function CasesArticleRevisionLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("Learn");
  const [selectedCase, setSelectedCase] =
    useState<CaseName>("Nominative");

  const [identificationAnswers, setIdentificationAnswers] = useState<
    Record<number, string>
  >({});
  const [identificationSubmitted, setIdentificationSubmitted] =
    useState(false);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentCase = caseTables.find(
    (item) => item.name === selectedCase
  )!;

  const quizScore = quiz.reduce(
    (total, item, index) =>
      total + (answers[index] === item.answer ? 1 : 0),
    0
  );

  const identificationScore = identificationQuestions.reduce(
    (total, item, index) =>
      total +
      (identificationAnswers[index] === item.answer ? 1 : 0),
    0
  );

  const passed = submitted && quizScore >= 8;

  function chooseAnswer(index: number, answer: string) {
    if (submitted) return;
    setAnswers((previous) => ({ ...previous, [index]: answer }));
  }

  function submitQuiz() {
    if (Object.keys(answers).length !== quiz.length) return;
    setSubmitted(true);
  }

  function retryQuiz() {
    setAnswers({});
    setSubmitted(false);
  }

  function chooseIdentification(index: number, answer: string) {
    if (identificationSubmitted) return;

    setIdentificationAnswers((previous) => ({
      ...previous,
      [index]: answer,
    }));
  }

  function submitIdentification() {
    if (
      Object.keys(identificationAnswers).length !==
      identificationQuestions.length
    ) {
      return;
    }

    setIdentificationSubmitted(true);
  }

  function retryIdentification() {
    setIdentificationAnswers({});
    setIdentificationSubmitted(false);
  }

  return (
    <div className="cases-lesson">
      <header className="cases-hero">
        <div className="cases-hero-icon">
          <GraduationCap size={25} />
        </div>
        <div>
          <span className="cases-eyebrow">A1 GRAMMAR · MODULE 17</span>
          <h1>Cases & Article Revision</h1>
          <p>
            Understand why German articles change: der, den, dem,
            die and das.
          </p>
        </div>
      </header>

      <nav className="cases-tabs" aria-label="Lesson sections">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === "Learn" && (
        <section className="cases-panel">
          <div className="cases-section-heading">
            <BookOpen />
            <div>
              <h2>What is a case?</h2>
              <p>
                A case tells us the job a noun has in a sentence.
              </p>
            </div>
          </div>

          <div className="cases-explain-grid">
            <article>
              <span className="cases-number">01</span>
              <h3>Nominative</h3>
              <strong>Who is doing it?</strong>
              <p>The subject of the sentence.</p>
              <button
                className="cases-audio"
                onClick={() => speak("Der Mann lernt Deutsch.")}
              >
                <Volume2 size={16} /> Der Mann lernt Deutsch.
              </button>
              <small>The man is learning German.</small>
            </article>

            <article>
              <span className="cases-number">02</span>
              <h3>Accusative</h3>
              <strong>Who or what is affected?</strong>
              <p>The direct object of the sentence.</p>
              <button
                className="cases-audio"
                onClick={() => speak("Ich sehe den Mann.")}
              >
                <Volume2 size={16} /> Ich sehe den Mann.
              </button>
              <small>I see the man.</small>
            </article>

            <article>
              <span className="cases-number">03</span>
              <h3>Dative</h3>
              <strong>To whom? / For whom?</strong>
              <p>
                Often the receiver of something or the object of a
                dative verb or preposition.
              </p>
              <button
                className="cases-audio"
                onClick={() => speak("Ich helfe dem Mann.")}
              >
                <Volume2 size={16} /> Ich helfe dem Mann.
              </button>
              <small>I help the man.</small>
            </article>
          </div>

          <div className="cases-tip">
            <Lightbulb size={20} />
            <div>
              <strong>Remember:</strong> First identify the noun's
              job. Then choose its gender and case. Do not choose an
              article by gender alone.
            </div>
          </div>
        </section>
      )}

      {activeTab === "Case Tables" && (
        <section className="cases-panel">
          <div className="cases-section-heading">
            <BookOpen />
            <div>
              <h2>Compare the three cases</h2>
              <p>
                Select a case to see its article forms and an example.
              </p>
            </div>
          </div>

          <div className="cases-case-switch">
            {caseTables.map((item) => (
              <button
                key={item.name}
                className={
                  selectedCase === item.name ? "selected" : ""
                }
                onClick={() => setSelectedCase(item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="cases-case-description">
            <h3>{currentCase.name}</h3>
            <strong>{currentCase.question}</strong>
            <p>{currentCase.meaning}</p>
          </div>

          <div className="cases-table-wrap">
            <table className="cases-table">
              <thead>
                <tr>
                  <th>Article type</th>
                  <th>Masculine</th>
                  <th>Feminine</th>
                  <th>Neuter</th>
                  <th>Plural</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Definite</th>
                  {currentCase.definite.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
                <tr>
                  <th>Indefinite</th>
                  {currentCase.indefinite.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
                <tr>
                  <th>Negative</th>
                  {currentCase.negative.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cases-example">
            <button
              onClick={() => speak(currentCase.example)}
              aria-label="Listen to example"
            >
              <Volume2 />
            </button>
            <div>
              <strong>{currentCase.example}</strong>
              <p>{currentCase.translation}</p>
              <small>{currentCase.focus}</small>
            </div>
          </div>

          <p className="cases-note">
            Plural note: <b>ein/eine</b> has no plural form. For
            negative plural nouns, use <b>keine</b>, <b>keinen</b>,
            <b> keinen</b> as appropriate to the case. In the dative
            plural, the noun usually also gets an -n if possible:
            <b> mit den Kindern</b>.
          </p>
        </section>
      )}

      {activeTab === "How to Choose" && (
        <section className="cases-panel">
          <div className="cases-section-heading">
            <Lightbulb />
            <div>
              <h2>How do I choose the correct article?</h2>
              <p>Use this simple three-step method.</p>
            </div>
          </div>

          <ol className="cases-steps">
            <li>
              <span>1</span>
              <div>
                <h3>Find the noun</h3>
                <p>
                  Example: Ich sehe <b>___ Hund</b>. The noun is
                  <b> Hund</b>. Hund is masculine.
                </p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h3>Find its job</h3>
                <p>
                  Ask: Who sees? <b>Ich</b>. What do I see?
                  <b> den Hund</b>. Hund is the direct object, so it
                  is accusative.
                </p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h3>Choose the article</h3>
                <p>
                  Masculine + accusative + definite article =
                  <b> den</b>. So the sentence is
                  <b> Ich sehe den Hund.</b>
                </p>
              </div>
            </li>
          </ol>

          <div className="cases-warning">
            <strong>Important A1 patterns</strong>
            <ul>
              <li>
                Masculine definite article: <b>der → den</b> in
                accusative.
              </li>
              <li>
                Masculine indefinite article: <b>ein → einen</b> in
                accusative.
              </li>
              <li>
                Dative definite articles: <b>dem / der / dem / den</b>.
              </li>
              <li>
                After <b>mit</b>, use dative: mit dem Bus, mit der
                Mutter.
              </li>
              <li>
                <b>Helfen</b> takes dative: Ich helfe dem Kind.
              </li>
              <li>
                <b>Sehen</b> takes accusative: Ich sehe den Hund.
              </li>
            </ul>
          </div>
        </section>
      )}

      {activeTab === "Common Verbs" && (
        <section className="cases-panel">
          <div className="cases-section-heading">
            <BookMarked />
            <div>
              <h2>Common verbs and their cases</h2>
              <p>
                Learn these verbs with their example sentences. Press
                the speaker button to hear each sentence.
              </p>
            </div>
          </div>

          <div className="cases-verb-groups">
            {verbGroups.map((group) => (
              <article
                className={`cases-verb-group ${group.color}`}
                key={group.name}
              >
                <div className="cases-verb-heading">
                  <div>
                    <span>{group.name}</span>
                    <h3>{group.subtitle}</h3>
                  </div>
                  <span className="cases-verb-count">
                    {group.verbs.length} verbs
                  </span>
                </div>

                <p className="cases-verb-description">
                  {group.description}
                </p>

                <div className="cases-verb-list">
                  {group.verbs.map(
                    ([verb, meaning, sentence, translation]) => (
                      <article key={verb}>
                        <div className="cases-verb-word">
                          <strong>{verb}</strong>
                          <small>{meaning}</small>
                        </div>
                        <div className="cases-verb-example">
                          <strong>{sentence}</strong>
                          <small>{translation}</small>
                        </div>
                        <button
                          onClick={() => speak(sentence)}
                          aria-label={`Listen to ${sentence}`}
                        >
                          <Volume2 size={18} />
                        </button>
                      </article>
                    )
                  )}
                </div>

                <div className="cases-verb-note">
                  <Lightbulb size={17} />
                  <span>{group.note}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="cases-tip">
            <Lightbulb size={20} />
            <div>
              <strong>Extra tip:</strong> Some verbs can take more
              than one object. For example, <b>geben</b> commonly
              takes a dative receiver and an accusative thing:
              <b> Ich gebe dem Kind einen Ball.</b>
              <br />
              <small>
                Dem Kind = dative (receiver); einen Ball = accusative
                (thing given).
              </small>
            </div>
          </div>
        </section>
      )}

      {activeTab === "Examples" && (
        <section className="cases-panel">
          <div className="cases-section-heading">
            <BookOpen />
            <div>
              <h2>See the difference in sentences</h2>
              <p>
                The same noun can have different articles when its
                job changes.
              </p>
            </div>
          </div>

          <div className="cases-comparison">
            <article>
              <span>NOMINATIVE</span>
              <h3>Der Mann</h3>
              <p>
                <b>Der Mann</b> kauft Brot.
              </p>
              <small>
                The man buys bread. The man is doing the action.
              </small>
            </article>

            <ArrowRight className="cases-arrow" />

            <article>
              <span>ACCUSATIVE</span>
              <h3>den Mann</h3>
              <p>
                Ich sehe <b>den Mann</b>.
              </p>
              <small>
                I see the man. The man is the direct object.
              </small>
            </article>
          </div>

          <div className="cases-example-list">
            {examples.map((item) => (
              <article key={item.sentence}>
                <span>{item.tag}</span>
                <div>
                  <strong>{item.sentence}</strong>
                  <small>{item.translation}</small>
                  <small className="cases-example-explanation">
                    {item.explanation}
                  </small>
                </div>
                <button
                  onClick={() => speak(item.sentence)}
                  aria-label={`Listen to ${item.sentence}`}
                >
                  <Volume2 size={18} />
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "Practice" && (
        <section className="cases-panel">
          <div className="cases-section-heading">
            <Brain />
            <div>
              <h2>Identify the case</h2>
              <p>
                Look at the highlighted words and decide whether they
                are nominative, accusative or dative.
              </p>
            </div>
          </div>

          <div className="cases-progress">
            <span>
              {Object.keys(identificationAnswers).length} /{" "}
              {identificationQuestions.length} answered
            </span>
            <div>
              <i
                style={{
                  width: `${
                    (Object.keys(identificationAnswers).length /
                      identificationQuestions.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="cases-identification-list">
            {identificationQuestions.map((item, index) => {
              const isCorrect =
                identificationSubmitted &&
                identificationAnswers[index] === item.answer;

              const isWrong =
                identificationSubmitted &&
                identificationAnswers[index] !== item.answer;

              return (
                <article className="cases-identification" key={index}>
                  <div className="cases-identification-sentence">
                    <span>Question {index + 1}</span>
                    <h3>{item.sentence}</h3>
                    <p>
                      Identify the case of: <b>{item.target}</b>
                    </p>
                  </div>

                  <div className="cases-options">
                    {(["Nominative", "Accusative", "Dative"] as const).map(
                      (option) => (
                        <button
                          key={option}
                          disabled={identificationSubmitted}
                          className={
                            identificationAnswers[index] === option
                              ? "chosen"
                              : ""
                          }
                          onClick={() =>
                            chooseIdentification(index, option)
                          }
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>

                  {identificationSubmitted && (
                    <p
                      className={`cases-feedback ${
                        isCorrect ? "correct-text" : "wrong-text"
                      }`}
                    >
                      {isCorrect ? "Correct! " : `Correct answer: ${item.answer}. `}
                      {item.explanation}
                    </p>
                  )}

                  {isWrong && (
                    <span className="cases-correction">
                      Your answer: {identificationAnswers[index]}
                    </span>
                  )}
                </article>
              );
            })}
          </div>

          {!identificationSubmitted ? (
            <button
              className="cases-submit"
              disabled={
                Object.keys(identificationAnswers).length !==
                identificationQuestions.length
              }
              onClick={submitIdentification}
            >
              Check my answers
            </button>
          ) : (
            <div className="cases-result">
              <div className="cases-result-icon">
                {identificationScore >= 6 ? (
                  <CheckCircle2 />
                ) : (
                  <RotateCcw />
                )}
              </div>
              <h3>
                {identificationScore >= 6
                  ? "Good work!"
                  : "Keep practising!"}
              </h3>
              <p>
                Your score: <b>{identificationScore} / 8</b>
              </p>
              <button
                className="cases-retry"
                onClick={retryIdentification}
              >
                <RotateCcw size={16} /> Try again
              </button>
            </div>
          )}
        </section>
      )}

      {activeTab === "Final Quiz" && (
        <section className="cases-panel">
          <div className="cases-section-heading">
            <GraduationCap />
            <div>
              <h2>Final article quiz</h2>
              <p>
                Choose the correct article for all 10 questions. You
                need 8 correct answers to pass.
              </p>
            </div>
          </div>

          <div className="cases-progress">
            <span>
              {Object.keys(answers).length} / {quiz.length} answered
            </span>
            <div>
              <i
                style={{
                  width: `${
                    (Object.keys(answers).length / quiz.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="cases-questions">
            {quiz.map((item, index) => (
              <article className="cases-question" key={item.question}>
                <h3>
                  {index + 1}. {item.question}
                </h3>

                <div className="cases-options">
                  {item.options.map((option) => {
                    const isCorrect =
                      submitted && option === item.answer;
                    const isWrong =
                      submitted &&
                      answers[index] === option &&
                      option !== item.answer;

                    return (
                      <button
                        key={option}
                        disabled={submitted}
                        className={[
                          answers[index] === option ? "chosen" : "",
                          isCorrect ? "correct" : "",
                          isWrong ? "wrong" : "",
                        ].join(" ")}
                        onClick={() => chooseAnswer(index, option)}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <p className="cases-feedback">
                    {item.explanation}
                  </p>
                )}
              </article>
            ))}
          </div>

          {!submitted ? (
            <button
              className="cases-submit"
              disabled={Object.keys(answers).length !== quiz.length}
              onClick={submitQuiz}
            >
              Submit answers
            </button>
          ) : (
            <div className="cases-result">
              <div className="cases-result-icon">
                {passed ? <CheckCircle2 /> : <RotateCcw />}
              </div>
              <h3>
                {passed ? "Great work! You passed." : "Keep practising!"}
              </h3>
              <p>
                Your score: <b>{quizScore} / {quiz.length}</b>.{" "}
                {passed
                  ? "You can now continue to the next module."
                  : "Review the case tables and try again. You need at least 8/10."}
              </p>

              <div className="cases-result-actions">
                <button className="cases-retry" onClick={retryQuiz}>
                  <RotateCcw size={16} /> Try again
                </button>

                {passed && (
                  <button
                    className="cases-submit"
                    onClick={onComplete}
                  >
                    Complete lesson <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}