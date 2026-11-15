
import { useState } from "react";
import {
  Volume2,
  CheckCircle,
  RotateCcw,
  BookOpen,
  Users,
  MessageCircle
} from "lucide-react";

type Pronoun = {
  german: string;
  english: string;
  pronunciation: string;
  example: string;
  translation: string;
  explanation: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

const pronouns: Pronoun[] = [
  {
    german: "ich",
    english: "I",
    pronunciation: "ikh",
    example: "Ich bin Anna.",
    translation: "I am Anna.",
    explanation: "Use ich when you talk about yourself."
  },
  {
    german: "du",
    english: "you (one person)",
    pronunciation: "doo",
    example: "Du bist nett.",
    translation: "You are nice.",
    explanation: "Use du when speaking informally to one person."
  },
  {
    german: "er",
    english: "he",
    pronunciation: "air",
    example: "Er ist mein Bruder.",
    translation: "He is my brother.",
    explanation: "Use er when talking about a male person."
  },
  {
    german: "sie",
    english: "she",
    pronunciation: "zee",
    example: "Sie ist meine Schwester.",
    translation: "She is my sister.",
    explanation: "Use sie when talking about a female person."
  },
  {
    german: "es",
    english: "it",
    pronunciation: "ess",
    example: "Es ist ein Buch.",
    translation: "It is a book.",
    explanation: "Use es for neuter nouns and in other appropriate contexts."
  },
  {
    german: "wir",
    english: "we",
    pronunciation: "veer",
    example: "Wir lernen Deutsch.",
    translation: "We are learning German.",
    explanation: "Use wir when talking about yourself and other people."
  },
  {
    german: "ihr",
    english: "you (plural)",
    pronunciation: "eer",
    example: "Ihr seid Freunde.",
    translation: "You are friends.",
    explanation: "Use ihr when speaking informally to two or more people."
  },
  {
    german: "sie",
    english: "they",
    pronunciation: "zee",
    example: "Sie spielen Fußball.",
    translation: "They play football.",
    explanation: "Use sie when talking about more than one person."
  },
  {
    german: "Sie",
    english: "you (formal)",
    pronunciation: "zee",
    example: "Sie sprechen Deutsch.",
    translation: "You speak German.",
    explanation: "Use capital Sie when speaking politely or formally to one or more people."
  }
];

const questions: QuizQuestion[] = [
  {
    question: "Which pronoun means 'I'?",
    options: ["du", "ich", "wir", "sie"],
    answer: "ich",
    explanation: "Ich means I."
  },
  {
    question: "You are talking informally to one friend. Which pronoun do you use?",
    options: ["Sie", "ihr", "du", "er"],
    answer: "du",
    explanation: "Du is used for one person in informal situations."
  },
  {
    question: "Which pronoun means 'we'?",
    options: ["wir", "ihr", "es", "er"],
    answer: "wir",
    explanation: "Wir means we."
  },
  {
    question: "Choose the correct pronoun: Anna ist nett. ___ ist nett.",
    options: ["Er", "Es", "Sie", "Wir"],
    answer: "Sie",
    explanation: "Anna is female, so we use sie. It starts with a capital letter here because it begins the sentence."
  },
  {
    question: "Which pronoun means 'they'?",
    options: ["du", "sie", "ich", "es"],
    answer: "sie",
    explanation: "Lowercase sie can mean they."
  },
  {
    question: "You are speaking politely to a teacher. Which pronoun do you use?",
    options: ["du", "ihr", "sie", "Sie"],
    answer: "Sie",
    explanation: "Capital Sie is the formal you."
  },
  {
    question: "Complete: Tom und Max lernen Deutsch. ___ lernen Deutsch.",
    options: ["Er", "Wir", "Sie", "Es"],
    answer: "Sie",
    explanation: "Tom and Max are two people, so sie means they. It is capitalized at the beginning of the sentence."
  },
  {
    question: "Which pronoun means 'you' when speaking informally to a group?",
    options: ["du", "ihr", "ich", "er"],
    answer: "ihr",
    explanation: "Ihr is informal you plural."
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
  const germanVoice = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith("de")
  );

  if (germanVoice) {
    utterance.voice = germanVoice;
  }

  window.speechSynthesis.speak(utterance);
}

type Props = {
  onComplete: () => void;
};

export default function PersonalPronounsLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("learn");
  const [selectedPronoun, setSelectedPronoun] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    if (option === question.answer) {
      setScore((previous) => previous + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      const finalScore =
        score + (selectedAnswer === question.answer ? 0 : 0);

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

  return (
    <div className="pronouns-page">
      <div className="pronouns-heading">
        <div>
          <span className="lesson-label">LESSON 04 · A1 GRAMMAR</span>
          <h1>Personal Pronouns</h1>
          <p>Personalpronomen</p>
        </div>

        <div className="pronouns-heading-icon">
          <Users size={35} />
        </div>
      </div>

      <div className="pronouns-tabs">
        <button
          className={activeTab === "learn" ? "active" : ""}
          onClick={() => setActiveTab("learn")}
        >
          <BookOpen size={17} /> Learn
        </button>

        <button
          className={activeTab === "examples" ? "active" : ""}
          onClick={() => setActiveTab("examples")}
        >
          <MessageCircle size={17} /> Examples
        </button>

        <button
          className={activeTab === "quiz" ? "active" : ""}
          onClick={() => setActiveTab("quiz")}
        >
          <CheckCircle size={17} /> Quiz
        </button>
      </div>

      {activeTab === "learn" && (
        <section className="pronouns-section">
          <h2>Meet the German pronouns</h2>

          <p>
            Select a pronoun to see its English meaning and an example.
          </p>

          <div className="pronouns-layout">
            <div className="pronouns-list">
              {pronouns.map((pronoun, index) => (
                <button
                  key={`${pronoun.german}-${index}`}
                  className={
                    selectedPronoun === index ? "selected" : ""
                  }
                  onClick={() => setSelectedPronoun(index)}
                >
                  <strong>{pronoun.german}</strong>
                  <span>{pronoun.english}</span>
                </button>
              ))}
            </div>

            <div className="pronoun-detail">
              <span className="pronoun-large">
                {pronouns[selectedPronoun].german}
              </span>

              <h3>{pronouns[selectedPronoun].english}</h3>

              <p>
                Pronunciation: {pronouns[selectedPronoun].pronunciation}
              </p>

              <div className="pronoun-example">
                <strong>{pronouns[selectedPronoun].example}</strong>
                <p>{pronouns[selectedPronoun].translation}</p>
              </div>

              <p>{pronouns[selectedPronoun].explanation}</p>

              <button
                className="pronoun-audio"
                onClick={() =>
                  speakGerman(pronouns[selectedPronoun].german)
                }
              >
                <Volume2 size={18} /> Listen
              </button>
            </div>
          </div>

          <div className="pronouns-note">
            <strong>Important: sie and Sie are different!</strong>
            <p>sie = she or they (lowercase)</p>
            <p>Sie = you (formal, always capitalized)</p>
            <p>
              At the beginning of a sentence, every pronoun is capitalized.
              Look at the rest of the sentence to understand its meaning.
            </p>
          </div>
        </section>
      )}

      {activeTab === "examples" && (
        <section className="pronouns-section">
          <h2>See pronouns in real sentences</h2>

          <p>Listen to each sentence and read its English meaning.</p>

          <div className="pronoun-examples-grid">
            {pronouns.map((pronoun, index) => (
              <div className="pronoun-example-card" key={`${pronoun.german}-${index}`}>
                <div>
                  <span>{index + 1}</span>
                  <strong>{pronoun.example}</strong>
                </div>

                <p>{pronoun.translation}</p>

                <button onClick={() => speakGerman(pronoun.example)}>
                  <Volume2 size={17} /> Listen
                </button>
              </div>
            ))}
          </div>

          <div className="pronouns-note">
            <strong>Remember</strong>
            <p>
              German pronouns are often connected to the verb. For example:
            </p>
            <p>Ich bin – I am</p>
            <p>Du bist – You are</p>
            <p>Wir sind – We are</p>
          </div>
        </section>
      )}

      {activeTab === "quiz" && (
        <section className="pronouns-quiz">
          <h2>Lesson 04 Quiz</h2>

          <p>
            Answer all 8 questions. You need at least 6 correct answers to pass.
          </p>

          {!finished ? (
            <>
              <div className="quiz-progress">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
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

              <div className="pronouns-options">
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
                <div className="pronouns-feedback">
                  <strong>
                    {selectedAnswer === question.answer
                      ? "Correct! Sehr gut!"
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
            <div className="pronouns-result">
              <CheckCircle size={40} />

              <h2>{passed ? "Lesson completed!" : "Keep practising!"}</h2>

              <p>
                Your score: <strong>{score} / {questions.length}</strong>
              </p>

              <p>
                {passed
                  ? "Super! You passed this lesson."
                  : "You need at least 6 correct answers. Try again!"}
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
