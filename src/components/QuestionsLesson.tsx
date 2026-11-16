
import { useState } from "react";
import {
  Volume2,
  BookOpen,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
  Trophy
} from "lucide-react";

interface Props {
  onComplete: () => void;
}

const questions = [
  {
    word: "Wer",
    meaning: "Who",
    example: "Wer bist du?",
    translation: "Who are you?",
    answer: "Ich bin Anna."
  },
  {
    word: "Was",
    meaning: "What",
    example: "Was machst du?",
    translation: "What are you doing?",
    answer: "Ich lerne Deutsch."
  },
  {
    word: "Wo",
    meaning: "Where",
    example: "Wo wohnst du?",
    translation: "Where do you live?",
    answer: "Ich wohne in Indien."
  },
  {
    word: "Wann",
    meaning: "When",
    example: "Wann kommst du?",
    translation: "When are you coming?",
    answer: "Ich komme morgen."
  },
  {
    word: "Wie",
    meaning: "How",
    example: "Wie geht es dir?",
    translation: "How are you?",
    answer: "Mir geht es gut."
  },
  {
    word: "Warum",
    meaning: "Why",
    example: "Warum lernst du Deutsch?",
    translation: "Why are you learning German?",
    answer: "Weil Deutsch interessant ist."
  },
  {
    word: "Woher",
    meaning: "Where from",
    example: "Woher kommst du?",
    translation: "Where are you from?",
    answer: "Ich komme aus Indien."
  },
  {
    word: "Wohin",
    meaning: "Where to",
    example: "Wohin gehst du?",
    translation: "Where are you going?",
    answer: "Ich gehe zur Schule."
  }
];

const yesNoExamples = [
  {
    question: "Lernst du Deutsch?",
    translation: "Are you learning German?",
    yes: "Ja, ich lerne Deutsch.",
    no: "Nein, ich lerne kein Deutsch."
  },
  {
    question: "Wohnst du in Indien?",
    translation: "Do you live in India?",
    yes: "Ja, ich wohne in Indien.",
    no: "Nein, ich wohne nicht in Indien."
  },
  {
    question: "Hast du ein Auto?",
    translation: "Do you have a car?",
    yes: "Ja, ich habe ein Auto.",
    no: "Nein, ich habe kein Auto."
  },
  {
    question: "Spielst du Fußball?",
    translation: "Do you play football?",
    yes: "Ja, ich spiele Fußball.",
    no: "Nein, ich spiele keinen Fußball."
  }
];

const quiz = [
  {
    question: "_____ bist du?",
    translation: "Who are you?",
    options: ["Was", "Wer", "Wo", "Wann"],
    answer: "Wer",
    explanation: "Wer means who."
  },
  {
    question: "_____ wohnst du?",
    translation: "Where do you live?",
    options: ["Warum", "Wie", "Wo", "Wer"],
    answer: "Wo",
    explanation: "Wo asks about a location."
  },
  {
    question: "_____ kommst du?",
    translation: "Where are you from?",
    options: ["Woher", "Wohin", "Wann", "Was"],
    answer: "Woher",
    explanation: "Woher means where from."
  },
  {
    question: "_____ gehst du?",
    translation: "Where are you going?",
    options: ["Wer", "Wohin", "Warum", "Wie"],
    answer: "Wohin",
    explanation: "Wohin asks about direction or destination."
  },
  {
    question: "_____ lernst du Deutsch?",
    translation: "Why are you learning German?",
    options: ["Wo", "Was", "Warum", "Wann"],
    answer: "Warum",
    explanation: "Warum means why."
  },
  {
    question: "_____ beginnt der Unterricht?",
    translation: "When does the class begin?",
    options: ["Wann", "Wer", "Woher", "Wie"],
    answer: "Wann",
    explanation: "Wann asks about time."
  },
  {
    question: "_____ heißt du?",
    translation: "What is your name?",
    options: ["Wo", "Wie", "Warum", "Wer"],
    answer: "Wie",
    explanation: "Wie heißt du? means What is your name?"
  },
  {
    question: "Choose the correct Yes/No question.",
    translation: "Are you learning German?",
    options: [
      "Du lernst Deutsch?",
      "Lernst du Deutsch?",
      "Deutsch du lernst?",
      "Lernst Deutsch du?"
    ],
    answer: "Lernst du Deutsch?",
    explanation: "In a Yes/No question, the conjugated verb comes first."
  },
  {
    question: "Choose the correct question.",
    translation: "Where do you live?",
    options: [
      "Wo du wohnst?",
      "Du wo wohnst?",
      "Wo wohnst du?",
      "Wohnst wo du?"
    ],
    answer: "Wo wohnst du?",
    explanation: "W-word + conjugated verb + subject."
  },
  {
    question: "_____ du müde?",
    translation: "Are you tired?",
    options: ["Bist", "Bin", "Ist", "Sein"],
    answer: "Bist",
    explanation: "Du takes bist with the verb sein."
  }
];

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export default function QuestionsLesson({ onComplete }: Props) {
  const [tab, setTab] = useState("learn");
  const [selectedWord, setSelectedWord] = useState(questions[0]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = quiz.reduce(
    (total, question, index) =>
      total + (selectedAnswers[index] === question.answer ? 1 : 0),
    0
  );

  const tabs = [
    { id: "learn", label: "Learn", icon: BookOpen },
    { id: "wquestions", label: "W-Fragen", icon: HelpCircle },
    { id: "yesno", label: "Ja/Nein", icon: MessageCircle },
    { id: "practice", label: "Practice", icon: CheckCircle2 }
  ];

  const changeTab = (nextTab: string) => {
    setTab(nextTab);
    if (nextTab === "practice") {
      setSelectedAnswers({});
      setSubmitted(false);
    }
  };

  return (
    <div className="questions-lesson">
      <div className="questions-header">
        <div>
          <span className="questions-eyebrow">A1 GRAMMAR · LESSON 10</span>
          <h1>W-Fragen & Ja/Nein-Fragen</h1>
          <p>Learn how to ask questions and communicate in German.</p>
        </div>
        <div className="questions-header-icon">
          <HelpCircle size={34} />
        </div>
      </div>

      <div className="questions-tabs">
        {tabs.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={tab === item.id ? "questions-tab active" : "questions-tab"}
              onClick={() => changeTab(item.id)}
            >
              <Icon size={17} />
              {item.label}
            </button>
          );
        })}
      </div>

      {tab === "learn" && (
        <div className="questions-content">
          <div className="questions-card">
            <h2>What are German questions?</h2>
            <p>
              In German, we mainly use two types of questions:
            </p>
            <div className="questions-type-grid">
              <div className="questions-type">
                <span>W-Fragen</span>
                <h3>W-Questions</h3>
                <p>Questions that ask for information.</p>
                <strong>Wo wohnst du?</strong>
                <small>Where do you live?</small>
              </div>
              <div className="questions-type">
                <span>Ja/Nein-Fragen</span>
                <h3>Yes/No Questions</h3>
                <p>Questions answered with yes or no.</p>
                <strong>Wohnst du hier?</strong>
                <small>Do you live here?</small>
              </div>
            </div>
          </div>

          <div className="questions-card">
            <h2>1. W-Frage sentence structure</h2>
            <p>Remember this simple formula:</p>
            <div className="questions-formula">
              <span>W-word</span>
              <ChevronRight />
              <span>Verb</span>
              <ChevronRight />
              <span>Subject</span>
              <ChevronRight />
              <span>Other words</span>
            </div>
            <div className="questions-example">
              <h3>Wo wohnst du?</h3>
              <p>Where do you live?</p>
              <div className="questions-breakdown">
                <span><b>Wo</b> – W-word</span>
                <span><b>wohnst</b> – Verb</span>
                <span><b>du</b> – Subject</span>
              </div>
              <button onClick={() => speak("Wo wohnst du?")}>
                <Volume2 size={16} /> Listen
              </button>
            </div>
          </div>

          <div className="questions-card">
            <h2>2. Ja/Nein-Frage sentence structure</h2>
            <p>Here, the conjugated verb comes FIRST.</p>
            <div className="questions-formula">
              <span>Verb</span>
              <ChevronRight />
              <span>Subject</span>
              <ChevronRight />
              <span>Other words</span>
            </div>
            <div className="questions-example">
              <h3>Lernst du Deutsch?</h3>
              <p>Are you learning German?</p>
              <div className="questions-breakdown">
                <span><b>Lernst</b> – Verb</span>
                <span><b>du</b> – Subject</span>
                <span><b>Deutsch</b> – Other word</span>
              </div>
              <button onClick={() => speak("Lernst du Deutsch?")}>
                <Volume2 size={16} /> Listen
              </button>
            </div>
          </div>

          <div className="questions-tip">
            <strong>Remember!</strong>
            <p>
              W-question: W-word + verb + subject.
              <br />
              Yes/No question: verb + subject.
            </p>
          </div>
        </div>
      )}

      {tab === "wquestions" && (
        <div className="questions-content">
          <div className="questions-card">
            <h2>Learn the W-question words</h2>
            <p>Click each word to see its meaning and an example.</p>
            <div className="questions-word-grid">
              {questions.map((item) => (
                <button
                  key={item.word}
                  className={
                    selectedWord.word === item.word
                      ? "questions-word active"
                      : "questions-word"
                  }
                  onClick={() => setSelectedWord(item)}
                >
                  <strong>{item.word}</strong>
                  <span>{item.meaning}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="questions-card questions-word-detail">
            <span className="questions-eyebrow">QUESTION WORD</span>
            <h2>{selectedWord.word}</h2>
            <h3>{selectedWord.meaning}</h3>
            <div className="questions-example">
              <h3>{selectedWord.example}</h3>
              <p>{selectedWord.translation}</p>
              <button onClick={() => speak(selectedWord.example)}>
                <Volume2 size={16} /> Listen
              </button>
            </div>
            <div className="questions-answer">
              <span>Possible answer</span>
              <strong>{selectedWord.answer}</strong>
              <button onClick={() => speak(selectedWord.answer)}>
                <Volume2 size={16} /> Listen
              </button>
            </div>
          </div>

          <div className="questions-tip">
            <strong>Important difference</strong>
            <p>
              Wo = Where? (location)
              <br />
              Woher = Where from? (origin)
              <br />
              Wohin = Where to? (destination)
            </p>
          </div>
        </div>
      )}

      {tab === "yesno" && (
        <div className="questions-content">
          <div className="questions-card">
            <h2>Ja/Nein-Fragen</h2>
            <p>
              These questions usually begin with a conjugated verb.
              You can answer with Ja or Nein.
            </p>
            <div className="questions-formula">
              <span>Verb</span>
              <ChevronRight />
              <span>Subject</span>
              <ChevronRight />
              <span>Rest</span>
            </div>
          </div>

          {yesNoExamples.map((item, index) => (
            <div className="questions-card" key={index}>
              <div className="questions-example">
                <span className="questions-eyebrow">EXAMPLE {index + 1}</span>
                <h3>{item.question}</h3>
                <p>{item.translation}</p>
                <button onClick={() => speak(item.question)}>
                  <Volume2 size={16} /> Listen
                </button>
              </div>
              <div className="questions-answer">
                <span className="questions-yes">Ja – Yes</span>
                <strong>{item.yes}</strong>
                <button onClick={() => speak(item.yes)}>
                  <Volume2 size={16} /> Listen
                </button>
              </div>
              <div className="questions-answer">
                <span className="questions-no">Nein – No</span>
                <strong>{item.no}</strong>
                <button onClick={() => speak(item.no)}>
                  <Volume2 size={16} /> Listen
                </button>
              </div>
            </div>
          ))}

          <div className="questions-tip">
            <strong>Small grammar reminder</strong>
            <p>
              Remember that a question mark (?) comes at the end of a German
              question. The conjugated verb must be in the correct position.
            </p>
          </div>
        </div>
      )}

      {tab === "practice" && (
        <div className="questions-content">
          <div className="questions-card">
            <div className="questions-quiz-heading">
              <div>
                <span className="questions-eyebrow">MODULE 10 TEST</span>
                <h2>Test your knowledge</h2>
              </div>
              <span className="questions-score">
                {Object.keys(selectedAnswers).length}/{quiz.length}
              </span>
            </div>
            <p>Choose the correct answer for each question.</p>
          </div>

          {quiz.map((item, index) => (
            <div className="questions-card questions-quiz" key={index}>
              <span className="questions-eyebrow">QUESTION {index + 1}</span>
              <h3>{item.question}</h3>
              <p>{item.translation}</p>
              <div className="questions-options">
                {item.options.map((option) => {
                  const isSelected = selectedAnswers[index] === option;
                  const isCorrect = submitted && option === item.answer;
                  const isWrong = submitted && isSelected && option !== item.answer;

                  return (
                    <button
                      key={option}
                      disabled={submitted}
                      className={[
                        "questions-option",
                        isSelected ? "selected" : "",
                        isCorrect ? "correct" : "",
                        isWrong ? "wrong" : ""
                      ].join(" ")}
                      onClick={() =>
                        setSelectedAnswers((previous) => ({
                          ...previous,
                          [index]: option
                        }))
                      }
                    >
                      {option}
                      {isCorrect && <CheckCircle2 size={17} />}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className="questions-explanation">
                  <strong>
                    {selectedAnswers[index] === item.answer
                      ? "Correct!"
                      : `Correct answer: ${item.answer}`}
                  </strong>
                  <p>{item.explanation}</p>
                </div>
              )}
            </div>
          ))}

          {!submitted ? (
            <button
              className="questions-submit"
              disabled={Object.keys(selectedAnswers).length !== quiz.length}
              onClick={() => setSubmitted(true)}
            >
              Submit answers <ChevronRight size={18} />
            </button>
          ) : (
            <div className="questions-result">
              <Trophy size={36} />
              <h2>Your score: {score}/{quiz.length}</h2>
              <p>
                {score >= 8
                  ? "Excellent work! You have passed this module."
                  : "Keep practising! Review the lesson and try again."}
              </p>
              {score >= 8 && (
                <button className="questions-submit" onClick={onComplete}>
                  Complete Module <CheckCircle2 size={18} />
                </button>
              )}
              <button
                className="questions-retry"
                onClick={() => {
                  setSelectedAnswers({});
                  setSubmitted(false);
                }}
              >
                <RotateCcw size={16} /> Try again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
