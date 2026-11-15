
import { useState } from "react";
import { Volume2, CheckCircle, RotateCcw, BookOpen, CalendarDays, Hash } from "lucide-react";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

const numbers = [
  ["0", "null", "nool"],
  ["1", "eins", "ines"],
  ["2", "zwei", "tsvai"],
  ["3", "drei", "dry"],
  ["4", "vier", "feer"],
  ["5", "fünf", "fewnf"],
  ["6", "sechs", "zeks"],
  ["7", "sieben", "zee-ben"],
  ["8", "acht", "akht"],
  ["9", "neun", "noyn"],
  ["10", "zehn", "tsayn"],
  ["11", "elf", "elf"],
  ["12", "zwölf", "tsverlf"],
  ["13", "dreizehn", "dry-tsayn"],
  ["14", "vierzehn", "feer-tsayn"],
  ["15", "fünfzehn", "fewnf-tsayn"],
  ["16", "sechzehn", "zekh-tsayn"],
  ["17", "siebzehn", "zeep-tsayn"],
  ["18", "achtzehn", "akht-tsayn"],
  ["19", "neunzehn", "noyn-tsayn"],
  ["20", "zwanzig", "tsvan-tsikh"],
  ["30", "dreißig", "dry-sikh"],
  ["40", "vierzig", "feer-tsikh"],
  ["50", "fünfzig", "fewnf-tsikh"],
  ["60", "sechzig", "zekh-tsikh"],
  ["70", "siebzig", "zeep-tsikh"],
  ["80", "achtzig", "akht-tsikh"],
  ["90", "neunzig", "noyn-tsikh"],
  ["100", "einhundert", "айн-hoon-dert"]
];

const weekdays = [
  ["Montag", "Monday"],
  ["Dienstag", "Tuesday"],
  ["Mittwoch", "Wednesday"],
  ["Donnerstag", "Thursday"],
  ["Freitag", "Friday"],
  ["Samstag", "Saturday"],
  ["Sonntag", "Sunday"]
];

const months = [
  ["Januar", "January"],
  ["Februar", "February"],
  ["März", "March"],
  ["April", "April"],
  ["Mai", "May"],
  ["Juni", "June"],
  ["Juli", "July"],
  ["August", "August"],
  ["September", "September"],
  ["Oktober", "October"],
  ["November", "November"],
  ["Dezember", "December"]
];

const questions: QuizQuestion[] = [
  {
    question: "What is the German word for 7?",
    options: ["sechs", "sieben", "acht", "neun"],
    answer: "sieben",
    explanation: "7 = sieben."
  },
  {
    question: "What does Mittwoch mean?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    answer: "Wednesday",
    explanation: "Mittwoch means Wednesday."
  },
  {
    question: "Which German word means January?",
    options: ["Januar", "Juni", "Juli", "April"],
    answer: "Januar",
    explanation: "January is Januar in German."
  },
  {
    question: "What is the German word for 12?",
    options: ["zwölf", "zwanzig", "zehn", "zwei"],
    answer: "zwölf",
    explanation: "12 = zwölf."
  },
  {
    question: "How do you say Sunday in German?",
    options: ["Samstag", "Sonntag", "Montag", "Freitag"],
    answer: "Sonntag",
    explanation: "Sonntag means Sunday."
  },
  {
    question: "Complete: Heute ist ___. (Today is Friday.)",
    options: ["Montag", "Dienstag", "Freitag", "Sonntag"],
    answer: "Freitag",
    explanation: "Freitag means Friday."
  },
  {
    question: "What does Wie alt bist du? mean?",
    options: [
      "Where do you live?",
      "How old are you?",
      "What is your name?",
      "What day is it?"
    ],
    answer: "How old are you?",
    explanation: "Wie alt bist du? asks someone's age."
  },
  {
    question: "How do you say 20 in German?",
    options: ["zwölf", "zwei", "zwanzig", "zehn"],
    answer: "zwanzig",
    explanation: "20 = zwanzig."
  }
];

function speakGerman(text: string) {
  if (!("speechSynthesis" in window)) {
    alert("Speech is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.8;

  const voices = window.speechSynthesis.getVoices();
  const germanVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("de"));

  if (germanVoice) {
    utterance.voice = germanVoice;
  }

  window.speechSynthesis.speak(utterance);
}

type Props = {
  onComplete: () => void;
};

export default function NumbersDatesLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("numbers");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    if (option === questions[currentQuestion].answer) {
      setScore((previous) => previous + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      const finalScore =
        score +
        (selectedAnswer === questions[currentQuestion].answer ? 0 : 0);

      setFinished(true);

      if (finalScore >= 6) {
        setPassed(true);
        onComplete();
      }

      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer("");
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
    setPassed(false);
  };

  const question = questions[currentQuestion];

  return (
    <div className="numbers-page">
      <div className="numbers-heading">
        <div>
          <span className="lesson-label">LESSON 03 · A1 BEGINNER</span>
          <h1>Numbers, Days and Dates</h1>
          <p>Zahlen, Wochentage und Datum</p>
        </div>
        <div className="numbers-heading-icon">
          <CalendarDays size={34} />
        </div>
      </div>

      <div className="numbers-tabs">
        <button
          className={activeTab === "numbers" ? "active" : ""}
          onClick={() => setActiveTab("numbers")}
        >
          <Hash size={17} /> Numbers
        </button>
        <button
          className={activeTab === "weekdays" ? "active" : ""}
          onClick={() => setActiveTab("weekdays")}
        >
          <CalendarDays size={17} /> Weekdays
        </button>
        <button
          className={activeTab === "months" ? "active" : ""}
          onClick={() => setActiveTab("months")}
        >
          <BookOpen size={17} /> Months & Dates
        </button>
        <button
          className={activeTab === "quiz" ? "active" : ""}
          onClick={() => setActiveTab("quiz")}
        >
          <CheckCircle size={17} /> Quiz
        </button>
      </div>

      {activeTab === "numbers" && (
        <section className="numbers-section">
          <h2>Learn German numbers</h2>
          <p>Click the speaker to hear each German number.</p>

          <div className="number-grid">
            {numbers.map(([number, german, pronunciation]) => (
              <div className="number-card" key={number}>
                <span className="number-digit">{number}</span>
                <strong>{german}</strong>
                <small>{pronunciation}</small>
                <button
                  onClick={() => speakGerman(german)}
                  aria-label={`Listen to ${german}`}
                >
                  <Volume2 size={17} />
                </button>
              </div>
            ))}
          </div>

          <div className="numbers-note">
            <strong>Remember:</strong> German numbers from 21 onwards often
            say the ones digit first, followed by und, then the tens.
            <p>21 = einundzwanzig (one and twenty)</p>
            <p>35 = fünfunddreißig (five and thirty)</p>
          </div>
        </section>
      )}

      {activeTab === "weekdays" && (
        <section className="numbers-section">
          <h2>Days of the week – Wochentage</h2>
          <p>In German, the days of the week are masculine: der Montag, der Dienstag, and so on.</p>

          <div className="weekday-grid">
            {weekdays.map(([german, english], index) => (
              <div className="weekday-card" key={german}>
                <span>{index + 1}</span>
                <div>
                  <strong>{german}</strong>
                  <small>{english}</small>
                </div>
                <button onClick={() => speakGerman(german)}>
                  <Volume2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="numbers-note">
            <strong>Useful sentences</strong>
            <p>Heute ist Montag. – Today is Monday.</p>
            <p>Morgen ist Dienstag. – Tomorrow is Tuesday.</p>
            <p>Gestern war Sonntag. – Yesterday was Sunday.</p>
          </div>
        </section>
      )}

      {activeTab === "months" && (
        <section className="numbers-section">
          <h2>Months – Monate</h2>
          <p>Learn all twelve months in German.</p>

          <div className="month-grid">
            {months.map(([german, english], index) => (
              <div className="month-card" key={german}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{german}</strong>
                  <small>{english}</small>
                </div>
                <button onClick={() => speakGerman(german)}>
                  <Volume2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="numbers-note">
            <strong>Talking about dates</strong>
            <p>Welches Datum ist heute? – What is today's date?</p>
            <p>Heute ist der 15. November. – Today is the 15th of November.</p>
            <p>Wann hast du Geburtstag? – When is your birthday?</p>
            <p>Mein Geburtstag ist im Mai. – My birthday is in May.</p>
            <p>Wie alt bist du? – How old are you?</p>
            <p>Ich bin ___ Jahre alt. – I am ___ years old.</p>
          </div>
        </section>
      )}

      {activeTab === "quiz" && (
        <section className="numbers-quiz">
          <h2>Lesson 03 Quiz</h2>
          <p>Answer all 8 questions. You need at least 6 correct answers to pass.</p>

          {!finished ? (
            <>
              <div className="quiz-progress">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>

              <div className="quiz-progress-track">
                <div
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`
                  }}
                />
              </div>

              <h3>{question.question}</h3>

              <div className="numbers-options">
                {question.options.map((option) => {
                  const isCorrect = option === question.answer;
                  const isSelected = option === selectedAnswer;

                  return (
                    <button
                      key={option}
                      className={
                        selectedAnswer
                          ? isCorrect
                            ? "correct"
                            : isSelected
                              ? "incorrect"
                              : ""
                          : ""
                      }
                      onClick={() => handleAnswer(option)}
                      disabled={Boolean(selectedAnswer)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer && (
                <div className="numbers-feedback">
                  <strong>
                    {selectedAnswer === question.answer
                      ? "Correct! Gut gemacht!"
                      : "Not quite. Keep practising!"}
                  </strong>
                  <p>{question.explanation}</p>
                  <button onClick={nextQuestion}>
                    {currentQuestion === questions.length - 1
                      ? "See my result"
                      : "Next question"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="numbers-result">
              <div className="result-icon">
                <CheckCircle size={38} />
              </div>
              <h2>{passed ? "Lesson completed!" : "Keep practising!"}</h2>
              <p>
                Your score: <strong>{score} / {questions.length}</strong>
              </p>
              <p>
                {passed
                  ? "Super! You passed this lesson."
                  : "You need 6 correct answers to pass. Try the quiz again."}
              </p>
              <button onClick={restartQuiz}>
                <RotateCcw size={17} /> Try again
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
