
import { useState } from "react";

type Props = {
  onComplete: () => void;
};

const questions = [
  {
    question: "Choose the correct sentence.",
    options: ["Ich Deutsch lerne.", "Ich lerne Deutsch.", "Lerne Deutsch ich."],
    answer: "Ich lerne Deutsch.",
    explanation: "In a normal statement, the conjugated verb comes second.",
  },
  {
    question: "Arrange the sentence: Heute / ich / lerne / Deutsch.",
    options: ["Heute ich lerne Deutsch.", "Heute lerne ich Deutsch.", "Lerne heute ich Deutsch."],
    answer: "Heute lerne ich Deutsch.",
    explanation: "Heute is first, lerne is second, and ich comes after the verb.",
  },
  {
    question: "Choose the correct yes/no question.",
    options: ["Du lernst Deutsch?", "Lernst du Deutsch?", "Deutsch lernst du?"],
    answer: "Lernst du Deutsch?",
    explanation: "In a yes/no question, the verb comes first.",
  },
  {
    question: "Complete: Wo _____ du?",
    options: ["wohnst", "du wohnst", "wohne"],
    answer: "wohnst",
    explanation: "A W-question follows W-word + verb + subject.",
  },
  {
    question: "Choose the correct sentence.",
    options: ["Morgen ich spiele Tennis.", "Morgen spiele ich Tennis.", "Spiele morgen ich Tennis."],
    answer: "Morgen spiele ich Tennis.",
    explanation: "Morgen is first and spiele is second.",
  },
  {
    question: "Complete: _____ heißt du?",
    options: ["Wann", "Wie", "Wo"],
    answer: "Wie",
    explanation: "Wie heißt du? means What is your name?",
  },
  {
    question: "Choose the correct question.",
    options: ["Warum du lernst Deutsch?", "Warum lernst du Deutsch?", "Lernst warum du Deutsch?"],
    answer: "Warum lernst du Deutsch?",
    explanation: "W-word + verb + subject + rest.",
  },
  {
    question: "Choose the correct sentence with nicht.",
    options: ["Ich nicht spiele.", "Ich spiele nicht.", "Nicht ich spiele."],
    answer: "Ich spiele nicht.",
    explanation: "In this simple example, nicht comes after the verb and its basic complement.",
  },
  {
    question: "Complete: _____ du heute?",
    options: ["Arbeitest", "Arbeitet", "Arbeiten"],
    answer: "Arbeitest",
    explanation: "A question begins with the verb. Du takes arbeitest.",
  },
  {
    question: "Choose the correct sentence.",
    options: ["Am Montag ich lerne Deutsch.", "Am Montag lerne ich Deutsch.", "Lerne ich am Montag Deutsch."],
    answer: "Am Montag lerne ich Deutsch.",
    explanation: "Am Montag is first, lerne is second.",
  },
];

const sentenceExamples = [
  {
    category: "Normal statements",
    formula: "Subject + Verb + Rest",
    examples: [
      ["Ich lerne Deutsch.", "I learn German."],
      ["Anna trinkt Wasser.", "Anna drinks water."],
      ["Wir spielen Fußball.", "We play football."],
      ["Er liest ein Buch.", "He reads a book."],
      ["Sie kocht Essen.", "She cooks food."],
      ["Du sprichst Englisch.", "You speak English."],
    ],
  },
  {
    category: "Time at the beginning",
    formula: "Time + Verb + Subject + Rest",
    examples: [
      ["Heute lerne ich Deutsch.", "Today I learn German."],
      ["Morgen arbeitet Anna.", "Anna works tomorrow."],
      ["Am Montag spiele ich Tennis.", "I play tennis on Monday."],
      ["Jeden Tag trinke ich Kaffee.", "I drink coffee every day."],
      ["Am Abend lese ich ein Buch.", "I read a book in the evening."],
    ],
  },
  {
    category: "Yes/No questions",
    formula: "Verb + Subject + Rest?",
    examples: [
      ["Lernst du Deutsch?", "Do you learn German?"],
      ["Spielst du Tennis?", "Do you play tennis?"],
      ["Trinkt er Kaffee?", "Does he drink coffee?"],
      ["Arbeitet sie heute?", "Does she work today?"],
      ["Kommt ihr morgen?", "Are you coming tomorrow?"],
    ],
  },
  {
    category: "W-questions",
    formula: "W-word + Verb + Subject + Rest?",
    examples: [
      ["Wie heißt du?", "What is your name?"],
      ["Wo wohnst du?", "Where do you live?"],
      ["Wann lernst du Deutsch?", "When do you learn German?"],
      ["Warum arbeitest du?", "Why do you work?"],
      ["Woher kommst du?", "Where do you come from?"],
      ["Wohin gehst du?", "Where are you going?"],
    ],
  },
];

const practiceSentences = [
  {
    words: ["Deutsch", "Ich", "lerne"],
    answer: "Ich lerne Deutsch.",
  },
  {
    words: ["heute", "Anna", "arbeitet"],
    answer: "Anna arbeitet heute.",
  },
  {
    words: ["du", "Wo", "wohnst"],
    answer: "Wo wohnst du?",
  },
  {
    words: ["morgen", "spiele", "ich", "Tennis"],
    answer: "Morgen spiele ich Tennis.",
  },
  {
    words: ["heißt", "Wie", "du"],
    answer: "Wie heißt du?",
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

export default function SentenceStructureLesson({ onComplete }: Props) {
  const [tab, setTab] = useState("learn");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [arranged, setArranged] = useState<string[]>([]);
  const [showPracticeAnswer, setShowPracticeAnswer] = useState(false);

  const score = questions.filter(
    (question, index) => answers[index] === question.answer
  ).length;

  const currentPractice = practiceSentences[practiceIndex];

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
  }

  function addWord(word: string) {
    setArranged((previous) => [...previous, word]);
  }

  function removeWord(index: number) {
    setArranged((previous) => previous.filter((_, i) => i !== index));
  }

  function nextPractice() {
    setPracticeIndex((previous) => (previous + 1) % practiceSentences.length);
    setArranged([]);
    setShowPracticeAnswer(false);
  }

  return (
    <div className="sentence-lesson">
      <div className="sentence-hero">
        <span>GERMAN A1 GRAMMAR · LESSON 08</span>
        <h1>Sentence Structure</h1>
        <h2>Satzbau</h2>
        <p>Learn how to put German words in the correct order.</p>
        <div className="sentence-hero-tags">
          <span>Verb position</span>
          <span>Questions</span>
          <span>Word order practice</span>
        </div>
      </div>

      <div className="sentence-tabs">
        {[
          ["learn", "Learn"],
          ["examples", "Examples"],
          ["arrange", "Arrange words"],
          ["practice", "Quiz"],
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
        <div className="sentence-section">
          <div className="sentence-rule-card">
            <h2>Rule 1: The verb is in position 2</h2>
            <p>In a normal German statement, the conjugated verb usually comes second.</p>
            <div className="sentence-formula">
              <span>Subject</span>
              <span>Verb</span>
              <span>Rest</span>
            </div>
            <div className="sentence-word-row">
              <strong>Ich</strong>
              <strong className="highlight">lerne</strong>
              <strong>Deutsch.</strong>
            </div>
            <p className="sentence-translation">I learn German.</p>
            <button onClick={() => speak("Ich lerne Deutsch.")}>🔊 Listen</button>
          </div>

          <div className="sentence-rule-card">
            <h2>Rule 2: Start with time</h2>
            <p>You can start with a time expression. The verb must still be in position 2.</p>
            <div className="sentence-formula">
              <span>Time</span>
              <span>Verb</span>
              <span>Subject</span>
              <span>Rest</span>
            </div>
            <div className="sentence-word-row">
              <strong>Heute</strong>
              <strong className="highlight">lerne</strong>
              <strong>ich</strong>
              <strong>Deutsch.</strong>
            </div>
            <p className="sentence-translation">Today I learn German.</p>
            <button onClick={() => speak("Heute lerne ich Deutsch.")}>🔊 Listen</button>
          </div>

          <div className="sentence-rule-card">
            <h2>Rule 3: Yes/No questions</h2>
            <p>For a question that can be answered with yes or no, put the verb first.</p>
            <div className="sentence-formula">
              <span>Verb</span>
              <span>Subject</span>
              <span>Rest</span>
            </div>
            <div className="sentence-word-row">
              <strong className="highlight">Lernst</strong>
              <strong>du</strong>
              <strong>Deutsch?</strong>
            </div>
            <p className="sentence-translation">Do you learn German?</p>
            <button onClick={() => speak("Lernst du Deutsch?")}>🔊 Listen</button>
          </div>

          <div className="sentence-rule-card">
            <h2>Rule 4: W-questions</h2>
            <p>Start with a question word, then the verb, then the subject.</p>
            <div className="sentence-formula">
              <span>W-word</span>
              <span>Verb</span>
              <span>Subject</span>
              <span>Rest</span>
            </div>
            <div className="sentence-word-row">
              <strong>Wo</strong>
              <strong className="highlight">wohnst</strong>
              <strong>du?</strong>
            </div>
            <p className="sentence-translation">Where do you live?</p>
            <button onClick={() => speak("Wo wohnst du?")}>🔊 Listen</button>
          </div>

          <div className="sentence-rule-card">
            <h2>Rule 5: Using nicht</h2>
            <p>Nicht means not. Its position depends on what you are negating.</p>
            <div className="sentence-word-row">
              <strong>Ich</strong>
              <strong>spiele</strong>
              <strong className="highlight">nicht.</strong>
            </div>
            <p className="sentence-translation">I do not play.</p>
            <button onClick={() => speak("Ich spiele nicht.")}>🔊 Listen</button>
          </div>

          <div className="sentence-tip">
            <strong>Remember this!</strong>
            <p>Statement: verb in position 2.</p>
            <p>Yes/No question: verb in position 1.</p>
            <p>W-question: question word first, verb second.</p>
          </div>
        </div>
      )}

      {tab === "examples" && (
        <div className="sentence-section">
          <h2>German sentence examples</h2>
          {sentenceExamples.map((group) => (
            <div className="sentence-example-group" key={group.category}>
              <h3>{group.category}</h3>
              <p className="sentence-formula-text">{group.formula}</p>
              {group.examples.map(([german, english]) => (
                <div className="sentence-example" key={german}>
                  <div>
                    <strong>{german}</strong>
                    <span>{english}</span>
                  </div>
                  <button onClick={() => speak(german)}>🔊</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === "arrange" && (
        <div className="sentence-section">
          <div className="sentence-arrange-card">
            <span>WORD ORDER EXERCISE</span>
            <h2>Build the correct sentence</h2>
            <p>Tap the words in the correct order.</p>
            <div className="sentence-answer-area">
              {arranged.length === 0 ? (
                <span className="sentence-placeholder">Your sentence appears here...</span>
              ) : (
                arranged.map((word, index) => (
                  <button key={`${word}-${index}`} onClick={() => removeWord(index)}>
                    {word} ×
                  </button>
                ))
              )}
            </div>
            <h3>Available words</h3>
            <div className="sentence-word-options">
              {currentPractice.words.map((word, index) => {
                const used = arranged.filter((item) => item === word).length;
                const available = currentPractice.words
                  .slice(0, index + 1)
                  .filter((item) => item === word).length;
                const alreadyUsed = used >= available;

                return (
                  <button
                    key={`${word}-${index}`}
                    disabled={alreadyUsed}
                    onClick={() => addWord(word)}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
            <div className="sentence-arrange-actions">
              <button onClick={() => setArranged([])}>Clear</button>
              <button onClick={() => setShowPracticeAnswer(true)}>Check answer</button>
              <button onClick={nextPractice}>Next sentence →</button>
            </div>
            {showPracticeAnswer && (
              <div className="sentence-feedback">
                <strong>
                  {arranged.join(" ") === currentPractice.answer.replace(/[?.!]/g, "")
                    ? "Correct! Well done."
                    : "Correct sentence:"}
                </strong>
                <p>{currentPractice.answer}</p>
                <button onClick={() => speak(currentPractice.answer)}>🔊 Listen</button>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "practice" && (
        <div className="sentence-section">
          <h2>Test your knowledge</h2>
          <p>Choose the correct answer for each question.</p>
          {questions.map((question, index) => (
            <div className="sentence-question" key={index}>
              <h3>{index + 1}. {question.question}</h3>
              <div className="sentence-options">
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
                    onClick={() => setAnswers((previous) => ({
                      ...previous,
                      [index]: option,
                    }))}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {submitted && (
                <p className="sentence-explanation">{question.explanation}</p>
              )}
            </div>
          ))}

          {!submitted ? (
            <button
              className="sentence-primary-button"
              disabled={Object.keys(answers).length !== questions.length}
              onClick={() => setSubmitted(true)}
            >
              Check my answers
            </button>
          ) : (
            <div className="sentence-result">
              <h2>Your score: {score}/10</h2>
              <p>
                {score >= 8
                  ? "Excellent! You have passed this lesson."
                  : "Good attempt! Review the rules and try again. You need 8 correct answers to complete the lesson."}
              </p>
              {score >= 8 && (
                <button className="sentence-primary-button" onClick={onComplete}>
                  Mark lesson as complete
                </button>
              )}
              <button className="sentence-reset-button" onClick={resetQuiz}>
                Try again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
