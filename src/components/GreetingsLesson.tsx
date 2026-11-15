
import { useState } from "react";
import {
  Volume2,
  CheckCircle,
  RotateCcw,
  MessageCircle,
  BookOpen
} from "lucide-react";

interface Greeting {
  german: string;
  english: string;
  pronunciation: string;
  situation: string;
}

const greetings: Greeting[] = [
  {
    german: "Hallo!",
    english: "Hello!",
    pronunciation: "HAH-loh",
    situation: "Friendly greeting"
  },
  {
    german: "Guten Morgen!",
    english: "Good morning!",
    pronunciation: "GOO-ten MOR-gen",
    situation: "In the morning"
  },
  {
    german: "Guten Tag!",
    english: "Good day! / Hello!",
    pronunciation: "GOO-ten TAHK",
    situation: "During the day"
  },
  {
    german: "Guten Abend!",
    english: "Good evening!",
    pronunciation: "GOO-ten AH-bent",
    situation: "In the evening"
  },
  {
    german: "Gute Nacht!",
    english: "Good night!",
    pronunciation: "GOO-teh NAHKT",
    situation: "Before going to sleep"
  },
  {
    german: "Tschüss!",
    english: "Bye!",
    pronunciation: "CHOOSS",
    situation: "Informal goodbye"
  },
  {
    german: "Auf Wiedersehen!",
    english: "Goodbye!",
    pronunciation: "owf VEE-der-zay-en",
    situation: "Formal goodbye"
  },
  {
    german: "Wie geht es dir?",
    english: "How are you?",
    pronunciation: "vee gayt es deer",
    situation: "Asking a friend"
  },
  {
    german: "Mir geht es gut.",
    english: "I am doing well.",
    pronunciation: "meer gayt es goot",
    situation: "Answering how you are"
  },
  {
    german: "Danke!",
    english: "Thank you!",
    pronunciation: "DAHN-keh",
    situation: "Showing gratitude"
  },
  {
    german: "Bitte!",
    english: "Please! / You're welcome!",
    pronunciation: "BIT-teh",
    situation: "Polite expression"
  },
  {
    german: "Entschuldigung!",
    english: "Excuse me! / Sorry!",
    pronunciation: "ent-SHOOL-dee-goong",
    situation: "Apologising or getting attention"
  }
];

const introductionPhrases = [
  {
    german: "Wie heißt du?",
    english: "What is your name?",
    answer: "Ich heiße Meghana.",
    explanation: "My name is Meghana."
  },
  {
    german: "Woher kommst du?",
    english: "Where are you from?",
    answer: "Ich komme aus Indien.",
    explanation: "I come from India."
  },
  {
    german: "Wo wohnst du?",
    english: "Where do you live?",
    answer: "Ich wohne in Indien.",
    explanation: "I live in India."
  },
  {
    german: "Welche Sprachen sprichst du?",
    english: "Which languages do you speak?",
    answer: "Ich spreche Telugu und Englisch.",
    explanation: "I speak Telugu and English."
  },
  {
    german: "Wie alt bist du?",
    english: "How old are you?",
    answer: "Ich bin zwanzig Jahre alt.",
    explanation: "I am twenty years old."
  }
];

const questions = [
  {
    question: 'What does "Guten Morgen" mean?',
    options: ["Good night", "Good morning", "Good evening"],
    answer: "Good morning"
  },
  {
    question: 'How do you say "My name is Anna"?',
    options: [
      "Ich heiße Anna.",
      "Ich komme Anna.",
      "Ich wohne Anna."
    ],
    answer: "Ich heiße Anna."
  },
  {
    question: 'What does "Woher kommst du?" mean?',
    options: [
      "Where do you live?",
      "How old are you?",
      "Where are you from?"
    ],
    answer: "Where are you from?"
  },
  {
    question: 'How do you say "I come from India"?',
    options: [
      "Ich wohne in Indien.",
      "Ich komme aus Indien.",
      "Ich heiße Indien."
    ],
    answer: "Ich komme aus Indien."
  },
  {
    question: 'What does "Tschüss" mean?',
    options: ["Hello", "Thank you", "Bye"],
    answer: "Bye"
  },
  {
    question: 'How do you ask a friend "How are you?"',
    options: [
      "Wie geht es dir?",
      "Wie heißt du?",
      "Wo wohnst du?"
    ],
    answer: "Wie geht es dir?"
  },
  {
    question: 'What does "Danke" mean?',
    options: ["Please", "Thank you", "Sorry"],
    answer: "Thank you"
  },
  {
    question: 'How do you say "I speak English"?',
    options: [
      "Ich spreche Englisch.",
      "Ich komme Englisch.",
      "Ich heiße Englisch."
    ],
    answer: "Ich spreche Englisch."
  }
];

interface Props {
  onComplete: () => void;
}

function speakGerman(text: string) {
  if (!("speechSynthesis" in window)) {
    alert("Speech is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "de-DE";
  speech.rate = 0.8;

  const voices = window.speechSynthesis.getVoices();
  const germanVoice = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith("de")
  );

  if (germanVoice) {
    speech.voice = germanVoice;
  }

  window.speechSynthesis.speak(speech);
}

function GreetingsLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("greetings");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = () => {
    if (!selectedAnswer || answered) return;

    const correct =
      selectedAnswer === questions[currentQuestion].answer;

    if (correct) {
      setScore((previous) => previous + 1);
    }

    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setFinished(true);

      if (
        score +
          (selectedAnswer === questions[currentQuestion].answer ? 1 : 0) >=
        6
      ) {
        onComplete();
      }

      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer("");
    setAnswered(false);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
    setAnswered(false);
  };

  return (
    <div className="greetings-page">

      <section className="page-heading">
        <span className="eyebrow">DEUTSCHSTART • A1 • LESSON 02</span>
        <h1>Greetings and Introductions 🌷</h1>
        <p>
          Begrüßungen und Vorstellungen – Learn how to greet people
          and introduce yourself in German.
        </p>
      </section>

      <div className="greetings-tabs">
        <button
          className={activeTab === "greetings" ? "active" : ""}
          onClick={() => setActiveTab("greetings")}
        >
          <BookOpen size={17} />
          Greetings
        </button>

        <button
          className={activeTab === "introductions" ? "active" : ""}
          onClick={() => setActiveTab("introductions")}
        >
          <MessageCircle size={17} />
          Introductions
        </button>

        <button
          className={activeTab === "conversation" ? "active" : ""}
          onClick={() => setActiveTab("conversation")}
        >
          Conversation
        </button>

        <button
          className={activeTab === "quiz" ? "active" : ""}
          onClick={() => setActiveTab("quiz")}
        >
          Quiz
        </button>
      </div>

      {activeTab === "greetings" && (
        <section className="greetings-section">
          <div className="greetings-intro">
            <h2>1. German greetings</h2>
            <p>
              In German, we use different greetings depending on the
              time of the day and the person we are talking to.
            </p>
          </div>

          <div className="greetings-grid">
            {greetings.map((item) => (
              <article className="greeting-card" key={item.german}>
                <div>
                  <span className="greeting-situation">
                    {item.situation}
                  </span>

                  <h3>{item.german}</h3>
                  <p>{item.english}</p>

                  <span className="greeting-pronunciation">
                    Pronunciation: {item.pronunciation}
                  </span>
                </div>

                <button
                  className="greeting-audio"
                  onClick={() => speakGerman(item.german)}
                  aria-label={`Listen to ${item.german}`}
                >
                  <Volume2 size={19} />
                </button>
              </article>
            ))}
          </div>

          <div className="greeting-note">
            <h3>Remember this!</h3>
            <p>
              <strong>du</strong> is informal. Use it with friends,
              family and people you know well.
            </p>
            <p>
              <strong>Sie</strong> is formal. Use it when speaking
              politely to strangers or in formal situations.
            </p>
            <p>
              For example: <strong>Wie heißen Sie?</strong> means
              "What is your name?" in a formal situation.
            </p>
          </div>
        </section>
      )}

      {activeTab === "introductions" && (
        <section className="greetings-section">
          <div className="greetings-intro">
            <h2>2. Introduce yourself</h2>
            <p>
              These are useful questions and answers when meeting
              someone for the first time.
            </p>
          </div>

          <div className="introduction-list">
            {introductionPhrases.map((item, index) => (
              <article className="introduction-card" key={item.german}>
                <span className="phrase-number">
                  0{index + 1}
                </span>

                <div className="introduction-content">
                  <h3>{item.german}</h3>
                  <p>{item.english}</p>

                  <div className="introduction-answer">
                    <strong>{item.answer}</strong>
                    <span>{item.explanation}</span>
                  </div>
                </div>

                <button
                  className="greeting-audio"
                  onClick={() =>
                    speakGerman(`${item.german} ${item.answer}`)
                  }
                  aria-label="Listen to question and answer"
                >
                  <Volume2 size={19} />
                </button>
              </article>
            ))}
          </div>

          <div className="greeting-note">
            <h3>Small grammar lesson</h3>
            <p>
              <strong>Ich</strong> means "I".
            </p>
            <p>
              <strong>heiße</strong> means "am called".
            </p>
            <p>
              <strong>komme aus</strong> means "come from".
            </p>
            <p>
              <strong>wohne in</strong> means "live in".
            </p>
            <p>
              <strong>spreche</strong> means "speak".
            </p>
          </div>
        </section>
      )}

      {activeTab === "conversation" && (
        <section className="greetings-section">
          <div className="greetings-intro">
            <h2>3. Let's have a conversation!</h2>
            <p>
              Read this small conversation between Anna and Ben.
              Listen to each sentence and try to repeat it.
            </p>
          </div>

          <div className="conversation-box">
            <div className="conversation-message anna">
              <span>Anna</span>
              <p>Hallo! Guten Morgen!</p>
              <button onClick={() => speakGerman("Hallo! Guten Morgen!")}>
                <Volume2 size={17} />
              </button>
            </div>

            <div className="conversation-message ben">
              <span>Ben</span>
              <p>Hallo! Wie heißt du?</p>
              <button onClick={() => speakGerman("Hallo! Wie heißt du?")}>
                <Volume2 size={17} />
              </button>
            </div>

            <div className="conversation-message anna">
              <span>Anna</span>
              <p>Ich heiße Anna. Und du?</p>
              <button onClick={() => speakGerman("Ich heiße Anna. Und du?")}>
                <Volume2 size={17} />
              </button>
            </div>

            <div className="conversation-message ben">
              <span>Ben</span>
              <p>Ich heiße Ben. Woher kommst du?</p>
              <button onClick={() => speakGerman("Ich heiße Ben. Woher kommst du?")}>
                <Volume2 size={17} />
              </button>
            </div>

            <div className="conversation-message anna">
              <span>Anna</span>
              <p>Ich komme aus Deutschland. Und du?</p>
              <button onClick={() => speakGerman("Ich komme aus Deutschland. Und du?")}>
                <Volume2 size={17} />
              </button>
            </div>

            <div className="conversation-message ben">
              <span>Ben</span>
              <p>Ich komme aus Indien.</p>
              <button onClick={() => speakGerman("Ich komme aus Indien.")}>
                <Volume2 size={17} />
              </button>
            </div>

            <div className="conversation-message anna">
              <span>Anna</span>
              <p>Freut mich!</p>
              <button onClick={() => speakGerman("Freut mich!")}>
                <Volume2 size={17} />
              </button>
            </div>

            <div className="conversation-message ben">
              <span>Ben</span>
              <p>Mich auch!</p>
              <button onClick={() => speakGerman("Mich auch!")}>
                <Volume2 size={17} />
              </button>
            </div>
          </div>

          <div className="greeting-note">
            <h3>Useful expressions</h3>
            <p>
              <strong>Und du?</strong> – And you?
            </p>
            <p>
              <strong>Freut mich!</strong> – Nice to meet you!
            </p>
            <p>
              <strong>Mich auch!</strong> – Nice to meet you too!
            </p>
          </div>
        </section>
      )}

      {activeTab === "quiz" && (
        <section className="greetings-section">
          {!finished ? (
            <div className="greeting-quiz">

              <div className="quiz-progress">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>

                <span>
                  Score: {score}
                </span>
              </div>

              <div className="quiz-progress-track">
                <div
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`
                  }}
                />
              </div>

              <h2>{questions[currentQuestion].question}</h2>

              <div className="greeting-options">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option}
                    className={
                      selectedAnswer === option
                        ? "greeting-option selected"
                        : "greeting-option"
                    }
                    onClick={() => {
                      if (!answered) {
                        setSelectedAnswer(option);
                      }
                    }}
                    disabled={answered}
                  >
                    {option}

                    {answered &&
                      option === questions[currentQuestion].answer && (
                        <CheckCircle size={18} />
                      )}
                  </button>
                ))}
              </div>

              {answered && (
                <p className="quiz-feedback">
                  {selectedAnswer === questions[currentQuestion].answer
                    ? "Correct! Sehr gut! 🎉"
                    : `Not quite! The correct answer is: ${questions[currentQuestion].answer}`}
                </p>
              )}

              {!answered ? (
                <button
                  className="primary-button"
                  onClick={handleAnswer}
                  disabled={!selectedAnswer}
                >
                  Check answer
                </button>
              ) : (
                <button
                  className="primary-button"
                  onClick={nextQuestion}
                >
                  {currentQuestion === questions.length - 1
                    ? "See my result"
                    : "Next question"}
                </button>
              )}

            </div>
          ) : (
            <div className="greeting-result">

              <div className="result-icon">
                {score >= 6 ? "🏆" : "📚"}
              </div>

              <h2>
                {score >= 6 ? "Sehr gut!" : "Keep practising!"}
              </h2>

              <p>
                You scored {score} out of {questions.length}.
              </p>

              <h3>
                {Math.round((score / questions.length) * 100)}%
              </h3>

              {score >= 6 ? (
                <p>
                  Congratulations! You completed this lesson.
                </p>
              ) : (
                <p>
                  You need at least 6 correct answers to complete
                  this lesson. Review the lesson and try again.
                </p>
              )}

              <button
                className="primary-button"
                onClick={restartQuiz}
              >
                <RotateCcw size={17} />
                Try again
              </button>

            </div>
          )}
        </section>
      )}

    </div>
  );
}

export default GreetingsLesson;
