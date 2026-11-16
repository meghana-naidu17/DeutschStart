
import { useState } from "react";

type Props = {
  onComplete: () => void;
};

type Verb = {
  infinitive: string;
  meaning: string;
  change: string;
  forms: string[];
  examples: { german: string; english: string }[];
};

const pronouns = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];

const verbGroups = [
  {
    title: "A → Ä",
    description: "The letter A changes to Ä in the du and er/sie/es forms.",
    verbs: [
      {
        infinitive: "fahren",
        meaning: "to drive / travel",
        change: "a → ä",
        forms: ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"],
        examples: [
          { german: "Ich fahre mit dem Bus.", english: "I travel by bus." },
          { german: "Du fährst nach Berlin.", english: "You travel to Berlin." },
          { german: "Er fährt ein Auto.", english: "He drives a car." },
        ],
      },
      {
        infinitive: "schlafen",
        meaning: "to sleep",
        change: "a → ä",
        forms: ["schlafe", "schläfst", "schläft", "schlafen", "schlaft", "schlafen"],
        examples: [
          { german: "Ich schlafe acht Stunden.", english: "I sleep for eight hours." },
          { german: "Du schläfst lange.", english: "You sleep for a long time." },
          { german: "Das Kind schläft.", english: "The child sleeps." },
        ],
      },
      {
        infinitive: "tragen",
        meaning: "to carry / wear",
        change: "a → ä",
        forms: ["trage", "trägst", "trägt", "tragen", "tragt", "tragen"],
        examples: [
          { german: "Ich trage eine Tasche.", english: "I carry a bag." },
          { german: "Du trägst eine Jacke.", english: "You are wearing a jacket." },
          { german: "Sie trägt ein Kleid.", english: "She is wearing a dress." },
        ],
      },
      {
        infinitive: "waschen",
        meaning: "to wash",
        change: "a → ä",
        forms: ["wasche", "wäschst", "wäscht", "waschen", "wascht", "waschen"],
        examples: [
          { german: "Ich wasche meine Hände.", english: "I wash my hands." },
          { german: "Du wäschst das Auto.", english: "You wash the car." },
          { german: "Er wäscht seine Kleidung.", english: "He washes his clothes." },
        ],
      },
      {
        infinitive: "laufen",
        meaning: "to run / walk",
        change: "au → äu",
        forms: ["laufe", "läufst", "läuft", "laufen", "lauft", "laufen"],
        examples: [
          { german: "Ich laufe jeden Morgen.", english: "I run every morning." },
          { german: "Du läufst sehr schnell.", english: "You run very fast." },
          { german: "Sie läuft im Park.", english: "She runs in the park." },
        ],
      },
      {
        infinitive: "fallen",
        meaning: "to fall",
        change: "a → ä",
        forms: ["falle", "fällst", "fällt", "fallen", "fallt", "fallen"],
        examples: [
          { german: "Ich falle nicht.", english: "I do not fall." },
          { german: "Du fällst auf den Boden.", english: "You fall to the ground." },
          { german: "Das Blatt fällt.", english: "The leaf falls." },
        ],
      },
    ],
  },
  {
    title: "E → I",
    description: "The letter E changes to I in the du and er/sie/es forms.",
    verbs: [
      {
        infinitive: "sprechen",
        meaning: "to speak",
        change: "e → i",
        forms: ["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"],
        examples: [
          { german: "Ich spreche Englisch.", english: "I speak English." },
          { german: "Du sprichst Deutsch.", english: "You speak German." },
          { german: "Er spricht langsam.", english: "He speaks slowly." },
        ],
      },
      {
        infinitive: "helfen",
        meaning: "to help",
        change: "e → i",
        forms: ["helfe", "hilfst", "hilft", "helfen", "helft", "helfen"],
        examples: [
          { german: "Ich helfe meiner Mutter.", english: "I help my mother." },
          { german: "Du hilfst deinem Freund.", english: "You help your friend." },
          { german: "Sie hilft dem Kind.", english: "She helps the child." },
        ],
      },
      {
        infinitive: "nehmen",
        meaning: "to take",
        change: "e → i",
        forms: ["nehme", "nimmst", "nimmt", "nehmen", "nehmt", "nehmen"],
        examples: [
          { german: "Ich nehme einen Apfel.", english: "I take an apple." },
          { german: "Du nimmst den Bus.", english: "You take the bus." },
          { german: "Er nimmt das Buch.", english: "He takes the book." },
        ],
      },
      {
        infinitive: "essen",
        meaning: "to eat",
        change: "e → i",
        forms: ["esse", "isst", "isst", "essen", "esst", "essen"],
        examples: [
          { german: "Ich esse Brot.", english: "I eat bread." },
          { german: "Du isst einen Apfel.", english: "You eat an apple." },
          { german: "Sie isst eine Banane.", english: "She eats a banana." },
        ],
      },
      {
        infinitive: "geben",
        meaning: "to give",
        change: "e → i",
        forms: ["gebe", "gibst", "gibt", "geben", "gebt", "geben"],
        examples: [
          { german: "Ich gebe dir ein Buch.", english: "I give you a book." },
          { german: "Du gibst mir Wasser.", english: "You give me water." },
          { german: "Er gibt dem Kind einen Ball.", english: "He gives the child a ball." },
        ],
      },
      {
        infinitive: "treffen",
        meaning: "to meet",
        change: "e → i",
        forms: ["treffe", "triffst", "trifft", "treffen", "trefft", "treffen"],
        examples: [
          { german: "Ich treffe meine Freundin.", english: "I meet my friend." },
          { german: "Du triffst Anna.", english: "You meet Anna." },
          { german: "Er trifft seinen Lehrer.", english: "He meets his teacher." },
        ],
      },
      {
        infinitive: "vergessen",
        meaning: "to forget",
        change: "e → i",
        forms: ["vergesse", "vergisst", "vergisst", "vergessen", "vergesst", "vergessen"],
        examples: [
          { german: "Ich vergesse den Namen.", english: "I forget the name." },
          { german: "Du vergisst deine Tasche.", english: "You forget your bag." },
          { german: "Sie vergisst den Termin.", english: "She forgets the appointment." },
        ],
      },
    ],
  },
  {
    title: "E → IE",
    description: "The letter E changes to IE in the du and er/sie/es forms.",
    verbs: [
      {
        infinitive: "sehen",
        meaning: "to see",
        change: "e → ie",
        forms: ["sehe", "siehst", "sieht", "sehen", "seht", "sehen"],
        examples: [
          { german: "Ich sehe einen Hund.", english: "I see a dog." },
          { german: "Du siehst einen Film.", english: "You watch a film." },
          { german: "Er sieht seine Mutter.", english: "He sees his mother." },
        ],
      },
      {
        infinitive: "lesen",
        meaning: "to read",
        change: "e → ie",
        forms: ["lese", "liest", "liest", "lesen", "lest", "lesen"],
        examples: [
          { german: "Ich lese ein Buch.", english: "I read a book." },
          { german: "Du liest eine Zeitung.", english: "You read a newspaper." },
          { german: "Sie liest eine Geschichte.", english: "She reads a story." },
        ],
      },
    ],
  },
];

const otherVerbs: Verb[] = [
  {
    infinitive: "sein",
    meaning: "to be",
    change: "completely irregular",
    forms: ["bin", "bist", "ist", "sind", "seid", "sind"],
    examples: [
      { german: "Ich bin Studentin.", english: "I am a student." },
      { german: "Du bist nett.", english: "You are nice." },
      { german: "Er ist müde.", english: "He is tired." },
    ],
  },
  {
    infinitive: "haben",
    meaning: "to have",
    change: "irregular form",
    forms: ["habe", "hast", "hat", "haben", "habt", "haben"],
    examples: [
      { german: "Ich habe ein Buch.", english: "I have a book." },
      { german: "Du hast einen Bruder.", english: "You have a brother." },
      { german: "Sie hat eine Katze.", english: "She has a cat." },
    ],
  },
  {
    infinitive: "wissen",
    meaning: "to know a fact",
    change: "irregular forms",
    forms: ["weiß", "weißt", "weiß", "wissen", "wisst", "wissen"],
    examples: [
      { german: "Ich weiß die Antwort.", english: "I know the answer." },
      { german: "Du weißt es.", english: "You know it." },
      { german: "Er weiß viel.", english: "He knows a lot." },
    ],
  },
  {
    infinitive: "werden",
    meaning: "to become",
    change: "e → i in du and er/sie/es",
    forms: ["werde", "wirst", "wird", "werden", "werdet", "werden"],
    examples: [
      { german: "Ich werde müde.", english: "I am becoming tired." },
      { german: "Du wirst Arzt.", english: "You become a doctor." },
      { german: "Es wird kalt.", english: "It is getting cold." },
    ],
  },
  {
    infinitive: "denken",
    meaning: "to think",
    change: "irregular stem",
    forms: ["denke", "denkst", "denkt", "denken", "denkt", "denken"],
    examples: [
      { german: "Ich denke an dich.", english: "I think of you." },
      { german: "Du denkst viel.", english: "You think a lot." },
      { german: "Er denkt an seine Familie.", english: "He thinks about his family." },
    ],
  },
  {
    infinitive: "bringen",
    meaning: "to bring",
    change: "irregular stem",
    forms: ["bringe", "bringst", "bringt", "bringen", "bringt", "bringen"],
    examples: [
      { german: "Ich bringe Wasser.", english: "I bring water." },
      { german: "Du bringst das Essen.", english: "You bring the food." },
      { german: "Sie bringt ein Geschenk.", english: "She brings a gift." },
    ],
  },
];

const quiz = [
  { question: "Du _____ Deutsch.", options: ["spreche", "sprichst", "spricht"], answer: "sprichst", explanation: "sprechen → du sprichst (e → i)." },
  { question: "Er _____ nach Hause.", options: ["fahre", "fährst", "fährt"], answer: "fährt", explanation: "fahren → er fährt (a → ä)." },
  { question: "Ich _____ ein Buch.", options: ["lese", "liest", "lest"], answer: "lese", explanation: "The ich form is lese." },
  { question: "Sie (she) _____ einen Apfel.", options: ["esse", "isst", "esst"], answer: "isst", explanation: "essen → sie isst." },
  { question: "Wir _____ den Film.", options: ["sieht", "seht", "sehen"], answer: "sehen", explanation: "The wir form is sehen." },
  { question: "Du _____ mir.", options: ["hilfst", "helfe", "helft"], answer: "hilfst", explanation: "helfen → du hilfst." },
  { question: "Er _____ ein Auto.", options: ["nehme", "nimmst", "nimmt"], answer: "nimmt", explanation: "nehmen → er nimmt." },
  { question: "Du _____ sehr schnell.", options: ["läufst", "lauft", "laufen"], answer: "läufst", explanation: "laufen → du läufst (au → äu)." },
  { question: "Ich _____ die Antwort.", options: ["weißt", "weiß", "wissen"], answer: "weiß", explanation: "The ich form of wissen is weiß." },
  { question: "Sie (formal) _____ aus Indien.", options: ["kommt", "kommen", "kommst"], answer: "kommen", explanation: "Formal Sie uses the same verb form as sie (they): kommen." },
];

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export default function IrregularVerbsLesson({ onComplete }: Props) {
  const [tab, setTab] = useState("learn");
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedVerb, setSelectedVerb] = useState(0);
  const [showOther, setShowOther] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentGroup = verbGroups[selectedGroup];
  const currentVerb = currentGroup.verbs[selectedVerb];
  const score = quiz.filter((q, i) => answers[i] === q.answer).length;

  function changeGroup(index: number) {
    setSelectedGroup(index);
    setSelectedVerb(0);
    setShowOther(false);
  }

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="irregular-lesson">
      <div className="irregular-hero">
        <span className="irregular-eyebrow">GERMAN A1 GRAMMAR · LESSON 07</span>
        <h1>Irregular Verbs</h1>
        <p>Unregelmäßige Verben</p>
        <p>Learn verbs that change their spelling when you conjugate them.</p>
        <div className="irregular-hero-tags">
          <span>15+ important verbs</span>
          <span>Examples & pronunciation</span>
          <span>10 questions</span>
        </div>
      </div>

      <div className="irregular-tabs">
        {[
          ["learn", "Learn"],
          ["tables", "Conjugation Tables"],
          ["examples", "Example Sentences"],
          ["practice", "Practice"],
        ].map(([id, label]) => (
          <button
            key={id}
            className={tab === id ? "active" : ""}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "learn" && (
        <div className="irregular-section">
          <div className="irregular-intro-card">
            <h2>What are irregular verbs?</h2>
            <p>
              Regular verbs follow a predictable pattern. Irregular verbs do
              not always follow that pattern. Sometimes their vowel changes
              when we use <strong>du</strong> or <strong>er/sie/es</strong>.
            </p>
            <div className="irregular-comparison">
              <div>
                <span>Regular verb</span>
                <strong>lernen</strong>
                <p>du lernst</p>
              </div>
              <div>
                <span>Irregular verb</span>
                <strong>sprechen</strong>
                <p>du sprichst</p>
              </div>
            </div>
          </div>

          <h2>Learn the vowel-change groups</h2>
          <div className="irregular-group-buttons">
            {verbGroups.map((group, index) => (
              <button
                key={group.title}
                className={selectedGroup === index && !showOther ? "selected" : ""}
                onClick={() => changeGroup(index)}
              >
                {group.title}
              </button>
            ))}
            <button
              className={showOther ? "selected" : ""}
              onClick={() => setShowOther(true)}
            >
              Other verbs
            </button>
          </div>

          {!showOther ? (
            <>
              <div className="irregular-group-description">
                <h3>{currentGroup.title}</h3>
                <p>{currentGroup.description}</p>
              </div>
              <div className="irregular-verb-layout">
                <div className="irregular-verb-list">
                  {currentGroup.verbs.map((verb, index) => (
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
                <div className="irregular-verb-detail">
                  <div className="irregular-verb-heading">
                    <div>
                      <h2>{currentVerb.infinitive}</h2>
                      <p>{currentVerb.meaning}</p>
                    </div>
                    <button
                      className="irregular-speak"
                      onClick={() => speak(currentVerb.infinitive)}
                      aria-label="Listen to verb pronunciation"
                    >
                      🔊 Listen
                    </button>
                  </div>
                  <p className="irregular-change">
                    Vowel change: <strong>{currentVerb.change}</strong>
                  </p>
                  <div className="irregular-conjugation-grid">
                    {pronouns.map((pronoun, index) => (
                      <div key={pronoun}>
                        <span>{pronoun}</span>
                        <strong>{currentVerb.forms[index]}</strong>
                        <button
                          onClick={() => speak(`${pronoun} ${currentVerb.forms[index]}`)}
                          aria-label={`Listen to ${pronoun} ${currentVerb.forms[index]}`}
                        >
                          🔊
                        </button>
                      </div>
                    ))}
                  </div>
                  <h3>Example sentences</h3>
                  {currentVerb.examples.map((example) => (
                    <div className="irregular-example" key={example.german}>
                      <div>
                        <strong>{example.german}</strong>
                        <span>{example.english}</span>
                      </div>
                      <button
                        onClick={() => speak(example.german)}
                        aria-label="Listen to sentence"
                      >
                        🔊
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="irregular-other-grid">
              {otherVerbs.map((verb) => (
                <div className="irregular-other-card" key={verb.infinitive}>
                  <div className="irregular-verb-heading">
                    <div>
                      <h3>{verb.infinitive}</h3>
                      <p>{verb.meaning}</p>
                    </div>
                    <button
                      className="irregular-speak"
                      onClick={() => speak(verb.infinitive)}
                    >
                      🔊
                    </button>
                  </div>
                  <p className="irregular-change">{verb.change}</p>
                  {pronouns.map((pronoun, index) => (
                    <div className="irregular-other-form" key={pronoun}>
                      <span>{pronoun}</span>
                      <strong>{verb.forms[index]}</strong>
                    </div>
                  ))}
                  {verb.examples.map((example) => (
                    <div className="irregular-example" key={example.german}>
                      <div>
                        <strong>{example.german}</strong>
                        <span>{example.english}</span>
                      </div>
                      <button onClick={() => speak(example.german)}>🔊</button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "tables" && (
        <div className="irregular-section">
          <h2>All conjugation tables</h2>
          <p className="irregular-muted">
            Compare all the forms. Pay special attention to du and er/sie/es.
          </p>
          {verbGroups.map((group) => (
            <div className="irregular-table-card" key={group.title}>
              <h3>{group.title} vowel change</h3>
              {group.verbs.map((verb) => (
                <div className="irregular-table-wrap" key={verb.infinitive}>
                  <h4>
                    {verb.infinitive} – {verb.meaning}
                  </h4>
                  <table>
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
                          <td>
                            <strong>{verb.forms[index]}</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}
          <div className="irregular-table-card">
            <h3>Other important irregular verbs</h3>
            {otherVerbs.map((verb) => (
              <div className="irregular-table-wrap" key={verb.infinitive}>
                <h4>
                  {verb.infinitive} – {verb.meaning}
                </h4>
                <table>
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
                        <td><strong>{verb.forms[index]}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "examples" && (
        <div className="irregular-section">
          <h2>Learn through sentences</h2>
          <p className="irregular-muted">
            Read each German sentence, understand its meaning and listen to it.
          </p>
          {[...verbGroups.flatMap((group) => group.verbs), ...otherVerbs].map((verb) => (
            <div className="irregular-example-group" key={verb.infinitive}>
              <h3>
                {verb.infinitive} <span>– {verb.meaning}</span>
              </h3>
              {verb.examples.map((example) => (
                <div className="irregular-example" key={example.german}>
                  <div>
                    <strong>{example.german}</strong>
                    <span>{example.english}</span>
                  </div>
                  <button onClick={() => speak(example.german)}>🔊 Listen</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === "practice" && (
        <div className="irregular-section">
          <div className="irregular-quiz-heading">
            <div>
              <h2>Test your knowledge</h2>
              <p>Choose the correct conjugated verb.</p>
            </div>
            <span>10 questions</span>
          </div>
          {quiz.map((question, index) => (
            <div className="irregular-question" key={question.question}>
              <h3>{index + 1}. {question.question}</h3>
              <div className="irregular-options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    disabled={submitted}
                    className={
                      submitted && option === question.answer
                        ? "correct"
                        : submitted && answers[index] === option
                        ? "incorrect"
                        : answers[index] === option
                        ? "chosen"
                        : ""
                    }
                    onClick={() =>
                      setAnswers((previous) => ({ ...previous, [index]: option }))
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
              {submitted && (
                <p className="irregular-explanation">
                  {question.explanation}
                </p>
              )}
            </div>
          ))}
          {!submitted ? (
            <button
              className="irregular-primary-button"
              disabled={Object.keys(answers).length !== quiz.length}
              onClick={() => setSubmitted(true)}
            >
              Check my answers
            </button>
          ) : (
            <div className="irregular-result">
              <h2>Your score: {score}/10</h2>
              <p>
                {score >= 8
                  ? "Excellent! You have passed this lesson."
                  : "Good attempt! Review the explanations and try again. You need 8 correct answers to complete the lesson."}
              </p>
              {score >= 8 && (
                <button
                  className="irregular-primary-button"
                  onClick={onComplete}
                >
                  Mark lesson as complete
                </button>
              )}
              <button className="irregular-retry-button" onClick={resetQuiz}>
                Try again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
