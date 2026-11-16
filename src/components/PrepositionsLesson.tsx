import { useState } from "react";
import "./PrepositionsLesson.css";

type Props = {
  onComplete: () => void;
};

type PrepExample = {
  prep: string;
  meaning: string;
  rule: string;
  examples: { german: string; english: string }[];
};

const prepositions: PrepExample[] = [
  {
    prep: "in",
    meaning: "in / into",
    rule: "Use in for being inside a place or moving into it. For location, use dative; for direction into something, use accusative.",
    examples: [
      { german: "Ich bin in der Schule.", english: "I am at/in the school. (location)" },
      { german: "Ich gehe in die Schule.", english: "I am going into the school. (direction)" },
      { german: "Das Buch ist in der Tasche.", english: "The book is in the bag." }
    ]
  },
  {
    prep: "an",
    meaning: "at / on / to",
    rule: "Use an for contact with a side, edge, wall, or certain places. Location takes dative; movement towards it takes accusative.",
    examples: [
      { german: "Das Bild hängt an der Wand.", english: "The picture is hanging on the wall." },
      { german: "Ich hänge das Bild an die Wand.", english: "I hang the picture on the wall." },
      { german: "Wir sind am Bahnhof.", english: "We are at the station." }
    ]
  },
  {
    prep: "auf",
    meaning: "on / onto",
    rule: "Use auf for a surface and some open places. Location takes dative; movement onto it takes accusative.",
    examples: [
      { german: "Das Handy liegt auf dem Tisch.", english: "The phone is on the table." },
      { german: "Ich lege das Handy auf den Tisch.", english: "I put the phone onto the table." },
      { german: "Die Kinder spielen auf dem Spielplatz.", english: "The children are playing in the playground." }
    ]
  },
  {
    prep: "mit",
    meaning: "with / by",
    rule: "Mit is always followed by the dative case.",
    examples: [
      { german: "Ich fahre mit dem Bus.", english: "I travel by bus." },
      { german: "Sie lernt mit ihrer Freundin.", english: "She studies with her friend." },
      { german: "Er schreibt mit einem Stift.", english: "He writes with a pen." }
    ]
  },
  {
    prep: "nach",
    meaning: "to / after",
    rule: "Nach is commonly used with cities, most countries without an article, and the word Hause in nach Hause. It is also used for 'after'.",
    examples: [
      { german: "Ich fahre nach Berlin.", english: "I am travelling to Berlin." },
      { german: "Wir fliegen nach Deutschland.", english: "We are flying to Germany." },
      { german: "Nach dem Unterricht lerne ich.", english: "After the lesson, I study." }
    ]
  },
  {
    prep: "zu",
    meaning: "to",
    rule: "Zu is followed by the dative case. Use it for going to a person, an appointment, or many destinations such as the doctor.",
    examples: [
      { german: "Ich gehe zum Arzt.", english: "I am going to the doctor." },
      { german: "Wir gehen zur Schule.", english: "We are going to school." },
      { german: "Ich gehe zu meiner Freundin.", english: "I am going to my friend's place." }
    ]
  },
  {
    prep: "aus",
    meaning: "from / out of",
    rule: "Aus is followed by the dative case. It often tells where someone comes from or that something comes out of a place.",
    examples: [
      { german: "Ich komme aus Indien.", english: "I come from India." },
      { german: "Sie kommt aus dem Haus.", english: "She comes out of the house." },
      { german: "Der Tisch ist aus Holz.", english: "The table is made of wood." }
    ]
  }
];

const questions = [
  { q: "Ich fahre ___ dem Bus.", options: ["mit", "nach", "in"], answer: "mit", why: "Mit means by/with and is followed by dative." },
  { q: "Ich komme ___ Indien.", options: ["zu", "aus", "auf"], answer: "aus", why: "Aus means from when saying where you come from." },
  { q: "Wir fahren ___ Berlin.", options: ["nach", "mit", "an"], answer: "nach", why: "Use nach with most city names." },
  { q: "Ich gehe ___ Arzt.", options: ["zum", "nach", "aus"], answer: "zum", why: "Zu dem contracts to zum. Arzt is masculine." },
  { q: "Das Buch liegt ___ dem Tisch.", options: ["auf", "in", "zu"], answer: "auf", why: "Auf dem Tisch means on the table; it describes a location." },
  { q: "Ich lege das Buch ___ den Tisch.", options: ["auf", "mit", "aus"], answer: "auf", why: "Auf den Tisch describes movement onto the surface." },
  { q: "Das Bild hängt ___ der Wand.", options: ["an", "nach", "mit"], answer: "an", why: "An der Wand means on the wall; it describes a location." },
  { q: "Ich gehe ___ die Küche.", options: ["in", "aus", "mit"], answer: "in", why: "In die Küche describes movement into the kitchen." },
  { q: "___ dem Unterricht esse ich.", options: ["Nach", "Zu", "Aus"], answer: "Nach", why: "Nach can mean after." },
  { q: "Ich gehe ___ meiner Mutter.", options: ["zu", "nach", "auf"], answer: "zu", why: "Zu is used when going to a person and takes dative." }
];

const tabs = ["Learn", "Preposition Guide", "Examples", "Practice"] as const;
type Tab = (typeof tabs)[number];

export default function PrepositionsLesson({ onComplete }: Props) {
  const [tab, setTab] = useState<Tab>("Learn");
  const [selectedPrep, setSelectedPrep] = useState("in");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce(
    (total, question, index) => total + (answers[index] === question.answer ? 1 : 0),
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

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="prepositions-lesson">
      <header className="prepositions-hero">
        <div className="prepositions-hero-icon">🧭</div>
        <div>
          <p className="prepositions-eyebrow">GERMAN A1 · MODULE 16</p>
          <h1>Prepositions</h1>
          <p>Learn how to say where you are, where you are going, and where you come from.</p>
        </div>
      </header>

      <nav className="prepositions-tabs" aria-label="Lesson sections">
        {tabs.map((item) => (
          <button
            key={item}
            className={tab === item ? "active" : ""}
            onClick={() => setTab(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>

      {tab === "Learn" && (
        <section className="prepositions-panel">
          <h2>What is a preposition?</h2>
          <p>
            A preposition is a small word that shows a relationship, such as <strong>in</strong>,
            <strong> on</strong>, <strong>with</strong>, or <strong>to</strong>.
          </p>
          <div className="prepositions-callout">
            <strong>Think of it this way:</strong>
            <p>Where am I? Where am I going? Who am I going with? Where do I come from?</p>
          </div>

          <h3>First, learn these seven prepositions</h3>
          <div className="prepositions-card-grid">
            {prepositions.map((item) => (
              <button
                type="button"
                className="prepositions-word-card"
                key={item.prep}
                onClick={() => {
                  setSelectedPrep(item.prep);
                  setTab("Preposition Guide");
                }}
              >
                <strong>{item.prep}</strong>
                <span>{item.meaning}</span>
                <small>Open explanation →</small>
              </button>
            ))}
          </div>

          <h3>Two important groups</h3>
          <div className="prepositions-two-columns">
            <article>
              <h4>Always dative in this lesson</h4>
              <p className="prepositions-big-words">mit · nach · zu · aus</p>
              <p>These prepositions are followed by dative forms.</p>
            </article>
            <article>
              <h4>Can use dative or accusative</h4>
              <p className="prepositions-big-words">in · an · auf</p>
              <p>
                For these, ask: is it a location (dative) or movement towards a destination
                (accusative)?
              </p>
            </article>
          </div>
          <p className="prepositions-note">
            You will study the cases more carefully in Module 17. For now, learn the common
            patterns and example sentences.
          </p>
        </section>
      )}

      {tab === "Preposition Guide" && (
        <section className="prepositions-panel">
          <h2>Explore each preposition</h2>
          <div className="prepositions-guide-layout">
            <div className="prepositions-selector">
              {prepositions.map((item) => (
                <button
                  type="button"
                  key={item.prep}
                  className={selectedPrep === item.prep ? "selected" : ""}
                  onClick={() => setSelectedPrep(item.prep)}
                >
                  <strong>{item.prep}</strong>
                  <span>{item.meaning}</span>
                </button>
              ))}
            </div>
            {prepositions
              .filter((item) => item.prep === selectedPrep)
              .map((item) => (
                <article className="prepositions-detail" key={item.prep}>
                  <div className="prepositions-detail-heading">
                    <div>
                      <span>PREPOSITION</span>
                      <h3>{item.prep}</h3>
                    </div>
                    <button type="button" onClick={() => speak(item.prep)} aria-label={`Listen to ${item.prep}`}>
                      🔊 Listen
                    </button>
                  </div>
                  <p className="prepositions-meaning">{item.meaning}</p>
                  <p>{item.rule}</p>
                  <h4>Examples</h4>
                  {item.examples.map((example) => (
                    <div className="prepositions-example" key={example.german}>
                      <div>
                        <strong>{example.german}</strong>
                        <span>{example.english}</span>
                      </div>
                      <button type="button" onClick={() => speak(example.german)} aria-label={`Listen to ${example.german}`}>
                        🔊
                      </button>
                    </div>
                  ))}
                </article>
              ))}
          </div>
        </section>
      )}

      {tab === "Examples" && (
        <section className="prepositions-panel">
          <h2>Understand the difference</h2>
          <p>Look at how the article changes when the sentence describes a place or a direction.</p>
          <div className="prepositions-compare">
            <article>
              <span className="prepositions-tag location">LOCATION · DATIVE</span>
              <h3>Wo? — Where?</h3>
              <p className="prepositions-german">Das Buch liegt auf <u>dem</u> Tisch.</p>
              <p>The book is on the table.</p>
              <small>The book is already there. No movement to the table.</small>
              <button type="button" onClick={() => speak("Das Buch liegt auf dem Tisch.")}>🔊 Listen</button>
            </article>
            <article>
              <span className="prepositions-tag direction">DIRECTION · ACCUSATIVE</span>
              <h3>Wohin? — Where to?</h3>
              <p className="prepositions-german">Ich lege das Buch auf <u>den</u> Tisch.</p>
              <p>I put the book onto the table.</p>
              <small>The book moves to the table.</small>
              <button type="button" onClick={() => speak("Ich lege das Buch auf den Tisch.")}>🔊 Listen</button>
            </article>
          </div>

          <h3>Useful contractions</h3>
          <div className="prepositions-table-wrap">
            <table className="prepositions-table">
              <thead><tr><th>Long form</th><th>Short form</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td>an dem</td><td><strong>am</strong></td><td>am Bahnhof</td></tr>
                <tr><td>in dem</td><td><strong>im</strong></td><td>im Haus</td></tr>
                <tr><td>zu dem</td><td><strong>zum</strong></td><td>zum Arzt</td></tr>
                <tr><td>zu der</td><td><strong>zur</strong></td><td>zur Schule</td></tr>
              </tbody>
            </table>
          </div>
          <div className="prepositions-callout">
            <strong>Remember:</strong>
            <p><strong>Wo?</strong> usually asks about a location. <strong>Wohin?</strong> asks about a destination or direction.</p>
          </div>
        </section>
      )}

      {tab === "Practice" && (
        <section className="prepositions-panel">
          <div className="prepositions-practice-heading">
            <div>
              <h2>Check your understanding</h2>
              <p>Choose the correct preposition or form for each sentence.</p>
            </div>
            <span>{Object.keys(answers).length}/10 answered</span>
          </div>
          {questions.map((question, index) => (
            <article className="prepositions-question" key={question.q}>
              <h3>{index + 1}. {question.q}</h3>
              <div className="prepositions-options">
                {question.options.map((option) => {
                  const isCorrect = submitted && option === question.answer;
                  const isWrong = submitted && answers[index] === option && option !== question.answer;
                  return (
                    <button
                      type="button"
                      key={option}
                      disabled={submitted}
                      className={`${answers[index] === option ? "chosen" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                      onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className="prepositions-feedback">
                  {answers[index] === question.answer ? "✓ Correct. " : `Correct answer: ${question.answer}. `}
                  {question.why}
                </p>
              )}
            </article>
          ))}
          {!submitted ? (
            <button
              type="button"
              className="prepositions-primary-button"
              disabled={Object.keys(answers).length !== questions.length}
              onClick={() => setSubmitted(true)}
            >
              Check my answers
            </button>
          ) : (
            <div className="prepositions-result">
              <h3>Your score: {score}/10</h3>
              <p>{score >= 8 ? "Excellent work! You have passed this lesson." : "Good effort. Review the explanations and try again. You need 8/10 to pass."}</p>
              {score >= 8 ? (
                <button type="button" className="prepositions-primary-button" onClick={onComplete}>
                  Complete Module 16
                </button>
              ) : (
                <button type="button" className="prepositions-primary-button" onClick={resetQuiz}>
                  Try again
                </button>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
