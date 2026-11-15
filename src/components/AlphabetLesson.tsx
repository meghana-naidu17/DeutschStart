
import { useState } from "react";
import {
  Volume2,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Trophy,
  BookOpen,
  Headphones
} from "lucide-react";

import { alphabet, alphabetQuiz } from "../data/alphabet";

interface Props {
  onComplete: () => void;
}

function AlphabetLesson({ onComplete }: Props) {
  const [selected, setSelected] = useState("A");
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [checked, setChecked] = useState(false);

  const currentLetter =
    alphabet.find((item) => item.letter === selected) || alphabet[0];

  const currentQuestion = alphabetQuiz[questionIndex];

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Speech is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.75;

    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find((voice) =>
      voice.lang.toLowerCase().startsWith("de")
    );

    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setQuestionIndex(0);
    setAnswer("");
    setScore(0);
    setFinished(false);
    setChecked(false);
  };

  const checkAnswer = () => {
    if (!answer || checked) return;

    if (answer === currentQuestion.answer) {
      setScore((previous) => previous + 1);
    }

    setChecked(true);
  };

  const nextQuestion = () => {
    if (questionIndex < alphabetQuiz.length - 1) {
      setQuestionIndex((previous) => previous + 1);
      setAnswer("");
      setChecked(false);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setFinished(false);
    setQuestionIndex(0);
    setAnswer("");
    setScore(0);
    setChecked(false);
  };

  return (
    <div className="alphabet-page">
      <div className="alphabet-header">
        <span className="alphabet-label">A1 • LESSON 01 • BASICS</span>
        <h1>Das deutsche Alphabet 🇩🇪</h1>
        <p>
          Let's learn the German alphabet, one letter at a time!
        </p>
      </div>

      {!quizStarted ? (
        <>
          <div className="alphabet-intro">
            <div className="intro-icon">
              <BookOpen size={29} />
            </div>
            <div>
              <h2>Willkommen! (Welcome!)</h2>
              <p>
                German has 26 basic letters and 4 additional characters
                that you should learn.
              </p>
            </div>
          </div>

          <div className="alphabet-section-title">
            <div>
              <h2>Learn your letters</h2>
              <p>Click any letter to explore it.</p>
            </div>
            <span>26 + 4 characters</span>
          </div>

          <div className="alphabet-grid">
            {alphabet.map((item) => (
              <button
                key={item.letter}
                className={`alphabet-card ${
                  selected === item.letter ? "selected" : ""
                } ${item.special ? "special-letter" : ""}`}
                onClick={() => {
                  setSelected(item.letter);
                  window.speechSynthesis?.cancel();
                }}
              >
                <strong>{item.letter}</strong>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <div className="letter-detail">
            <div className="letter-big">
              {currentLetter.letter}
            </div>

            <div className="letter-description">
              <span className="alphabet-label">
                {currentLetter.special
                  ? "SPECIAL CHARACTER"
                  : "GERMAN LETTER"}
              </span>

              <h2>
                {currentLetter.letter} is called{" "}
                {currentLetter.name}
              </h2>

              <p>
                Beginner pronunciation guide:{" "}
                <strong>{currentLetter.pronunciation}</strong>
              </p>

              <div className="example-word">
                <div>
                  <span>GERMAN EXAMPLE</span>
                  <h3>{currentLetter.example}</h3>
                  <p>{currentLetter.meaning}</p>
                </div>

                <button
                  className="audio-button"
                  onClick={() =>
                    speak(currentLetter.example)
                  }
                  aria-label="Listen to example word"
                >
                  <Volume2 size={21} />
                </button>
              </div>

              <button
                className="listen-button"
                onClick={() => speak(currentLetter.name)}
              >
                <Headphones size={18} />
                Listen to letter name
              </button>
            </div>
          </div>

          <div className="umlaut-note">
            <h3>🌷 Remember these special characters!</h3>
            <p>
              Ä, Ö and Ü are called Umlauts. ß is called Eszett.
              They are important parts of German spelling.
            </p>
            <p>
              The ß character is not used at the beginning of
              standard German words.
            </p>
          </div>

          <div className="alphabet-quiz-start">
            <div>
              <h2>Ready to test yourself?</h2>
              <p>Try 8 questions and check what you've learned.</p>
            </div>
            <button
              className="alphabet-primary-button"
              onClick={startQuiz}
            >
              Start Quiz <ArrowRight size={17} />
            </button>
          </div>
        </>
      ) : (
        <div className="quiz-container">
          {!finished ? (
            <>
              <div className="quiz-top">
                <span>ALPHABET QUIZ</span>
                <strong>
                  {questionIndex + 1}/{alphabetQuiz.length}
                </strong>
              </div>

              <div className="quiz-progress">
                <div
                  style={{
                    width: `${
                      ((questionIndex + 1) /
                        alphabetQuiz.length) *
                      100
                    }%`
                  }}
                />
              </div>

              <div className="quiz-question">
                <span>QUESTION {questionIndex + 1}</span>
                <h2>{currentQuestion.question}</h2>
              </div>

              <div className="quiz-options">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    className={`quiz-option ${
                      answer === option ? "chosen" : ""
                    } ${
                      checked && option === currentQuestion.answer
                        ? "correct"
                        : ""
                    } ${
                      checked &&
                      answer === option &&
                      answer !== currentQuestion.answer
                        ? "incorrect"
                        : ""
                    }`}
                    onClick={() => {
                      if (!checked) setAnswer(option);
                    }}
                  >
                    <span>{option}</span>
                    {checked &&
                      option === currentQuestion.answer && (
                        <CheckCircle2 size={19} />
                      )}
                  </button>
                ))}
              </div>

              {checked && (
                <p className={
                  answer === currentQuestion.answer
                    ? "quiz-feedback correct-text"
                    : "quiz-feedback incorrect-text"
                }>
                  {answer === currentQuestion.answer
                    ? "Sehr gut! Correct answer! 🎉"
                    : `Not quite! The correct answer is ${currentQuestion.answer}.`}
                </p>
              )}

              {!checked ? (
                <button
                  className="alphabet-primary-button quiz-action"
                  disabled={!answer}
                  onClick={checkAnswer}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  className="alphabet-primary-button quiz-action"
                  onClick={nextQuestion}
                >
                  {questionIndex === alphabetQuiz.length - 1
                    ? "See My Results"
                    : "Next Question"}
                  <ArrowRight size={17} />
                </button>
              )}
            </>
          ) : (
            <div className="quiz-result">
              <Trophy size={52} />
              <h2>Quiz completed! 🎉</h2>
              <div className="quiz-score">
                {score}/{alphabetQuiz.length}
              </div>
              <p>
                {score >= 6
                  ? "Excellent work! You've learned the basics."
                  : "Good effort! Revise the letters and try again."}
              </p>

              {score >= 6 && (
                <button
                  className="alphabet-primary-button"
                  onClick={onComplete}
                >
                  Complete Lesson <CheckCircle2 size={18} />
                </button>
              )}

              <button
                className="retry-button"
                onClick={resetQuiz}
              >
                <RotateCcw size={16} /> Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AlphabetLesson;
