
import { useState } from "react";
import {
  Headphones,
  BookOpen,
  PenLine,
  Volume2,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Lightbulb,
  Award
} from "lucide-react";
import "./A1ListeningReadingWritingLesson.css";

type Props = {
  onComplete: () => void;
};

const listeningQuestions = [
  {
    title: "Anna's Morning",
    german: "Hallo! Ich heiße Anna. Ich stehe jeden Morgen um sieben Uhr auf. Danach frühstücke ich und trinke einen Kaffee. Um acht Uhr fahre ich mit dem Bus zur Universität.",
    question: "Wann steht Anna auf?",
    options: ["Um sechs Uhr", "Um sieben Uhr", "Um acht Uhr"],
    answer: "Um sieben Uhr",
    explanation: "Anna says: Ich stehe jeden Morgen um sieben Uhr auf."
  },
  {
    title: "At the Supermarket",
    german: "Guten Tag! Ich möchte ein Brot, zwei Äpfel und eine Flasche Wasser kaufen. Wie viel kostet das? Das macht fünf Euro.",
    question: "Wie viel kostet alles?",
    options: ["Drei Euro", "Vier Euro", "Fünf Euro"],
    answer: "Fünf Euro",
    explanation: "The shopkeeper says: Das macht fünf Euro."
  },
  {
    title: "Weekend Plans",
    german: "Am Samstag besuche ich meine Freundin. Wir gehen ins Kino und danach essen wir zusammen Pizza. Am Sonntag bleibe ich zu Hause.",
    question: "Was macht die Person am Samstag?",
    options: [
      "Sie besucht ihre Freundin.",
      "Sie arbeitet.",
      "Sie bleibt zu Hause."
    ],
    answer: "Sie besucht ihre Freundin.",
    explanation: "Am Samstag besucht die Person ihre Freundin."
  },
  {
    title: "Weather",
    german: "Heute ist das Wetter schön. Die Sonne scheint und es ist warm. Ich gehe in den Park und spiele Fußball mit meinen Freunden.",
    question: "Wie ist das Wetter heute?",
    options: ["Kalt und regnerisch", "Warm und sonnig", "Schnee und Wind"],
    answer: "Warm und sonnig",
    explanation: "Die Sonne scheint und es ist warm."
  },
  {
    title: "A Train Journey",
    german: "Der Zug nach Berlin fährt um zehn Uhr dreißig ab. Wir müssen Gleis drei nehmen. Die Fahrt dauert ungefähr zwei Stunden.",
    question: "Wann fährt der Zug ab?",
    options: ["Um zehn Uhr", "Um zehn Uhr dreißig", "Um zwölf Uhr dreißig"],
    answer: "Um zehn Uhr dreißig",
    explanation: "Der Zug fährt um zehn Uhr dreißig ab."
  }
];

const readingPassages = [
  {
    title: "Mein Alltag",
    text: "Ich heiße Lukas und bin 20 Jahre alt. Ich wohne in München. Jeden Morgen stehe ich um sechs Uhr dreißig auf. Um sieben Uhr frühstücke ich. Danach fahre ich mit dem Fahrrad zur Universität. Am Nachmittag lerne ich Deutsch. Abends lese ich ein Buch oder sehe fern.",
    translation: "My name is Lukas and I am 20 years old. I live in Munich. Every morning I get up at 6:30. At 7:00 I have breakfast. After that I ride my bicycle to the university. In the afternoon I study German. In the evening I read a book or watch television.",
    questions: [
      {
        question: "Wie alt ist Lukas?",
        options: ["18 Jahre", "20 Jahre", "22 Jahre"],
        answer: "20 Jahre"
      },
      {
        question: "Wo wohnt Lukas?",
        options: ["In Berlin", "In Hamburg", "In München"],
        answer: "In München"
      },
      {
        question: "Wie fährt Lukas zur Universität?",
        options: ["Mit dem Bus", "Mit dem Fahrrad", "Mit dem Zug"],
        answer: "Mit dem Fahrrad"
      }
    ]
  },
  {
    title: "Ein Wochenende in Berlin",
    text: "Maria fährt am Freitag nach Berlin. Sie besucht ihre Schwester. Am Samstag gehen sie zusammen ins Museum. Danach essen sie in einem italienischen Restaurant. Am Sonntag machen sie einen Spaziergang im Park. Am Abend fährt Maria wieder nach Hause.",
    translation: "Maria travels to Berlin on Friday. She visits her sister. On Saturday they go to a museum together. After that they eat at an Italian restaurant. On Sunday they take a walk in the park. In the evening Maria travels home again.",
    questions: [
      {
        question: "Wann fährt Maria nach Berlin?",
        options: ["Am Donnerstag", "Am Freitag", "Am Sonntag"],
        answer: "Am Freitag"
      },
      {
        question: "Wohin gehen Maria und ihre Schwester am Samstag?",
        options: ["Ins Museum", "Ins Kino", "In die Schule"],
        answer: "Ins Museum"
      },
      {
        question: "Was machen sie am Sonntag?",
        options: ["Sie gehen einkaufen.", "Sie lernen Deutsch.", "Sie machen einen Spaziergang."],
        answer: "Sie machen einen Spaziergang."
      }
    ]
  }
];

const writingTasks = [
  {
    title: "Introduce Yourself",
    instruction: "Write your name and where you come from.",
    prompt: "My name is Meghana. I come from India.",
    expected: ["Ich heiße Meghana. Ich komme aus Indien."],
    hint: "Ich heiße ... / Ich komme aus ..."
  },
  {
    title: "Describe Your Daily Routine",
    instruction: "Write that you get up at 7 o'clock and have breakfast.",
    prompt: "I get up at 7 o'clock. I have breakfast.",
    expected: [
      "Ich stehe um 7 Uhr auf. Ich frühstücke.",
      "Ich stehe um sieben Uhr auf. Ich frühstücke."
    ],
    hint: "aufstehen is a separable verb: Ich stehe ... auf."
  },
  {
    title: "Talk About Your Family",
    instruction: "Write that you have one brother and one sister.",
    prompt: "I have one brother and one sister.",
    expected: [
      "Ich habe einen Bruder und eine Schwester."
    ],
    hint: "einen Bruder (masculine accusative), eine Schwester (feminine accusative)."
  },
  {
    title: "Describe Your Weekend",
    instruction: "Write that you visit your friend on Saturday.",
    prompt: "I visit my friend on Saturday.",
    expected: [
      "Ich besuche am Samstag meinen Freund.",
      "Ich besuche am Samstag meine Freundin."
    ],
    hint: "besuchen takes the accusative case. Use meinen Freund or meine Freundin."
  },
  {
    title: "Talk About Food",
    instruction: "Write that you like eating bread and drinking milk.",
    prompt: "I like eating bread and drinking milk.",
    expected: [
      "Ich esse gern Brot und trinke gern Milch."
    ],
    hint: "gern means gladly / like doing something."
  }
];

const finalQuestions = [
  {
    question: "What does 'Ich stehe um sieben Uhr auf' mean?",
    options: ["I go to bed at seven.", "I get up at seven.", "I eat at seven."],
    answer: "I get up at seven.",
    explanation: "aufstehen means to get up."
  },
  {
    question: "Listen to the sentence: 'Der Zug fährt um neun Uhr ab.' What time does the train leave?",
    audio: "Der Zug fährt um neun Uhr ab.",
    options: ["At 8 o'clock", "At 9 o'clock", "At 10 o'clock"],
    answer: "At 9 o'clock",
    explanation: "Neun Uhr means nine o'clock."
  },
  {
    question: "Choose the correct sentence.",
    options: ["Ich komme aus Indien.", "Ich kommen aus Indien.", "Ich kommt aus Indien."],
    answer: "Ich komme aus Indien.",
    explanation: "With ich, the verb kommen becomes komme."
  },
  {
    question: "What does 'Am Samstag besuche ich meine Mutter' mean?",
    options: ["I work on Saturday.", "I visit my mother on Saturday.", "I call my mother on Saturday."],
    answer: "I visit my mother on Saturday.",
    explanation: "besuchen means to visit."
  },
  {
    question: "Which word means 'because'?",
    options: ["Aber", "Und", "Weil"],
    answer: "Weil",
    explanation: "Weil means because."
  },
  {
    question: "Choose the correct article: Ich kaufe ___ Apfel.",
    options: ["eine", "einen", "einem"],
    answer: "einen",
    explanation: "Apfel is masculine. It takes einen in the accusative."
  },
  {
    question: "What does 'Es regnet' mean?",
    options: ["It is raining.", "It is snowing.", "It is sunny."],
    answer: "It is raining.",
    explanation: "regnen means to rain."
  },
  {
    question: "Choose the correct word order.",
    options: [
      "Morgen ich gehe zur Schule.",
      "Morgen gehe ich zur Schule.",
      "Gehe morgen ich zur Schule."
    ],
    answer: "Morgen gehe ich zur Schule.",
    explanation: "When Morgen is first, the conjugated verb stays in position two."
  },
  {
    question: "What does 'Ich möchte Wasser trinken' mean?",
    options: ["I can drink water.", "I would like to drink water.", "I drank water."],
    answer: "I would like to drink water.",
    explanation: "möchte expresses a polite wish."
  },
  {
    question: "Which sentence is correct?",
    options: [
      "Ich habe gestern Deutsch gelernt.",
      "Ich bin gestern Deutsch gelernt.",
      "Ich hat gestern Deutsch lernen."
    ],
    answer: "Ich habe gestern Deutsch gelernt.",
    explanation: "The perfect tense of lernen is haben + gelernt."
  }
];

function speakGerman(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("de-DE")
    .replace(/[.!?]/g, "")
    .replace(/\s+/g, " ");
}

export default function A1ListeningReadingWritingLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("listening");
  const [listeningIndex, setListeningIndex] = useState(0);
  const [listeningAnswer, setListeningAnswer] = useState("");
  const [listeningChecked, setListeningChecked] = useState(false);
  const [showListeningText, setShowListeningText] = useState(false);

  const [readingIndex, setReadingIndex] = useState(0);
  const [readingAnswers, setReadingAnswers] = useState<string[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [readingSubmitted, setReadingSubmitted] = useState(false);

  const [writingIndex, setWritingIndex] = useState(0);
  const [writingAnswer, setWritingAnswer] = useState("");
  const [writingChecked, setWritingChecked] = useState(false);

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentListening = listeningQuestions[listeningIndex];
  const currentReading = readingPassages[readingIndex];
  const currentWriting = writingTasks[writingIndex];
  const currentQuiz = finalQuestions[quizIndex];

  const quizScore = quizAnswers.reduce(
    (total, answer, index) => total + (answer === finalQuestions[index].answer ? 1 : 0),
    0
  );

  const readingScore = currentReading.questions.reduce(
    (total, question, index) => total + (readingAnswers[index] === question.answer ? 1 : 0),
    0
  );

  const writingIsCorrect = currentWriting.expected.some(
    (answer) => normalizeAnswer(answer) === normalizeAnswer(writingAnswer)
  );

  const nextListening = () => {
    setListeningIndex((index) => (index + 1) % listeningQuestions.length);
    setListeningAnswer("");
    setListeningChecked(false);
    setShowListeningText(false);
  };

  const submitReading = () => {
    setReadingSubmitted(true);
  };

  const nextReading = () => {
    setReadingIndex((index) => (index + 1) % readingPassages.length);
    setReadingAnswers([]);
    setReadingSubmitted(false);
    setShowTranslation(false);
  };

  const nextWriting = () => {
    setWritingIndex((index) => (index + 1) % writingTasks.length);
    setWritingAnswer("");
    setWritingChecked(false);
  };

  const setQuizAnswer = (answer: string) => {
    setQuizAnswers((previous) => {
      const updated = [...previous];
      updated[quizIndex] = answer;
      return updated;
    });
  };

  const nextQuiz = () => {
    if (quizIndex < finalQuestions.length - 1) {
      setQuizIndex((index) => index + 1);
    } else {
      setQuizSubmitted(true);
    }
  };

  const retryQuiz = () => {
    setQuizIndex(0);
    setQuizAnswers([]);
    setQuizSubmitted(false);
  };

  const tabs = [
    { id: "listening", label: "Listening", icon: Headphones },
    { id: "reading", label: "Reading", icon: BookOpen },
    { id: "writing", label: "Writing", icon: PenLine },
    { id: "quiz", label: "Final Quiz", icon: CheckCircle2 }
  ];

  return (
    <div className="a1-skills-lesson">
      <header className="a1-skills-header">
        <div className="a1-skills-header-icon">
          <BookOpen size={30} />
        </div>
        <div>
          <span className="a1-skills-eyebrow">A1 GERMAN · MODULE 21</span>
          <h1>Listening, Reading & Writing</h1>
          <p>Build your German skills with practical A1 exercises.</p>
        </div>
      </header>

      <nav className="a1-skills-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "a1-skills-tab active" : "a1-skills-tab"}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {activeTab === "listening" && (
        <section className="a1-skills-section">
          <div className="a1-skills-section-heading">
            <div>
              <h2>Hören · Listening Practice</h2>
              <p>Listen to the German passage and choose the correct answer.</p>
            </div>
            <span className="a1-skills-counter">{listeningIndex + 1} / {listeningQuestions.length}</span>
          </div>

          <div className="a1-listening-card">
            <span className="a1-skills-eyebrow">LISTEN CAREFULLY</span>
            <h3>{currentListening.title}</h3>
            <p className="a1-listening-instruction">Press play and listen to the German passage.</p>
            <button className="a1-audio-main" onClick={() => speakGerman(currentListening.german)}>
              <Volume2 size={21} /> Play German Audio
            </button>

            <button
              className="a1-text-reveal"
              onClick={() => setShowListeningText((value) => !value)}
            >
              {showListeningText ? "Hide transcript" : "Show German transcript"}
            </button>

            {showListeningText && (
              <div className="a1-transcript">
                <p>{currentListening.german}</p>
              </div>
            )}

            <div className="a1-exercise-divider" />
            <h3 className="a1-question">{currentListening.question}</h3>
            <div className="a1-answer-options">
              {currentListening.options.map((option) => (
                <button
                  key={option}
                  disabled={listeningChecked}
                  className={[
                    "a1-answer-option",
                    listeningAnswer === option ? "selected" : "",
                    listeningChecked && option === currentListening.answer ? "correct" : "",
                    listeningChecked && listeningAnswer === option && option !== currentListening.answer ? "incorrect" : ""
                  ].join(" ")}
                  onClick={() => setListeningAnswer(option)}
                >
                  {option}
                  {listeningChecked && option === currentListening.answer && <CheckCircle2 size={18} />}
                </button>
              ))}
            </div>

            {listeningChecked && (
              <div className={listeningAnswer === currentListening.answer ? "a1-feedback correct" : "a1-feedback incorrect"}>
                <strong>{listeningAnswer === currentListening.answer ? "Correct!" : "Try to remember the audio."}</strong>
                <p>{currentListening.explanation}</p>
              </div>
            )}

            <div className="a1-skills-actions">
              {!listeningChecked ? (
                <button
                  className="a1-primary-button"
                  disabled={!listeningAnswer}
                  onClick={() => setListeningChecked(true)}
                >
                  Check Answer
                </button>
              ) : (
                <button className="a1-primary-button" onClick={nextListening}>
                  Next Listening <ArrowRight size={17} />
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {activeTab === "reading" && (
        <section className="a1-skills-section">
          <div className="a1-skills-section-heading">
            <div>
              <h2>Lesen · Reading Practice</h2>
              <p>Read the German passage and answer the comprehension questions.</p>
            </div>
            <span className="a1-skills-counter">{readingIndex + 1} / {readingPassages.length}</span>
          </div>

          <div className="a1-reading-card">
            <span className="a1-skills-eyebrow">READ THE PASSAGE</span>
            <h3>{currentReading.title}</h3>
            <p className="a1-reading-text">{currentReading.text}</p>
            <button
              className="a1-text-reveal"
              onClick={() => setShowTranslation((value) => !value)}
            >
              {showTranslation ? "Hide English translation" : "Show English translation"}
            </button>

            {showTranslation && (
              <div className="a1-translation-box">
                <strong>English translation</strong>
                <p>{currentReading.translation}</p>
              </div>
            )}

            <div className="a1-exercise-divider" />
            <h3 className="a1-question">Answer these questions</h3>

            {currentReading.questions.map((question, index) => (
              <div className="a1-reading-question" key={question.question}>
                <strong>{index + 1}. {question.question}</strong>
                <div className="a1-answer-options">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      disabled={readingSubmitted}
                      className={[
                        "a1-answer-option",
                        readingAnswers[index] === option ? "selected" : "",
                        readingSubmitted && option === question.answer ? "correct" : "",
                        readingSubmitted && readingAnswers[index] === option && option !== question.answer ? "incorrect" : ""
                      ].join(" ")}
                      onClick={() => {
                        setReadingAnswers((previous) => {
                          const updated = [...previous];
                          updated[index] = option;
                          return updated;
                        });
                      }}
                    >
                      {option}
                      {readingSubmitted && option === question.answer && <CheckCircle2 size={18} />}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {readingSubmitted && (
              <div className="a1-feedback correct">
                <strong>Your reading score: {readingScore} / {currentReading.questions.length}</strong>
                <p>Read the passage again and notice the words that helped you find the answers.</p>
              </div>
            )}

            <div className="a1-skills-actions">
              {!readingSubmitted ? (
                <button
                  className="a1-primary-button"
                  disabled={readingAnswers.filter(Boolean).length !== currentReading.questions.length}
                  onClick={submitReading}
                >
                  Check Reading Answers
                </button>
              ) : (
                <button className="a1-primary-button" onClick={nextReading}>
                  Next Reading <ArrowRight size={17} />
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {activeTab === "writing" && (
        <section className="a1-skills-section">
          <div className="a1-skills-section-heading">
            <div>
              <h2>Schreiben · Writing Practice</h2>
              <p>Translate the English idea into a correct German sentence.</p>
            </div>
            <span className="a1-skills-counter">{writingIndex + 1} / {writingTasks.length}</span>
          </div>

          <div className="a1-writing-card">
            <span className="a1-skills-eyebrow">WRITING TASK</span>
            <h3>{currentWriting.title}</h3>
            <p>{currentWriting.instruction}</p>

            <div className="a1-writing-prompt">
              <span>English meaning</span>
              <strong>{currentWriting.prompt}</strong>
            </div>

            <label className="a1-writing-label" htmlFor="a1-writing-answer">
              Your German sentence
            </label>
            <textarea
              id="a1-writing-answer"
              value={writingAnswer}
              onChange={(event) => {
                setWritingAnswer(event.target.value);
                setWritingChecked(false);
              }}
              placeholder="Schreibe deinen Satz auf Deutsch..."
              rows={4}
            />

            <button
              className="a1-text-reveal"
              onClick={() => speakGerman(currentWriting.expected[0])}
            >
              <Volume2 size={15} /> Listen to an example answer
            </button>

            <div className="a1-writing-hint">
              <Lightbulb size={18} />
              <span>{currentWriting.hint}</span>
            </div>

            {writingChecked && (
              <div className={writingIsCorrect ? "a1-feedback correct" : "a1-feedback incorrect"}>
                <strong>{writingIsCorrect ? "Excellent! Your sentence matches an accepted answer." : "Compare your sentence with this example."}</strong>
                <p>Example: {currentWriting.expected[0]}</p>
                {!writingIsCorrect && <p>Check the verb form, word order, spelling and articles.</p>}
              </div>
            )}

            <div className="a1-skills-actions">
              {!writingChecked ? (
                <button
                  className="a1-primary-button"
                  disabled={!writingAnswer.trim()}
                  onClick={() => setWritingChecked(true)}
                >
                  Check My Writing
                </button>
              ) : (
                <button className="a1-primary-button" onClick={nextWriting}>
                  Next Writing Task <ArrowRight size={17} />
                </button>
              )}
            </div>
            <p className="a1-writing-note">Note: This quick checker compares your sentence with sample answers. Other grammatically correct versions may also be possible.</p>
          </div>
        </section>
      )}

      {activeTab === "quiz" && (
        <section className="a1-skills-section">
          <div className="a1-skills-section-heading">
            <div>
              <h2>A1 Skills Final Quiz</h2>
              <p>Test your listening, reading and grammar knowledge.</p>
            </div>
          </div>

          {!quizSubmitted ? (
            <div className="a1-quiz-card">
              <div className="a1-quiz-topline">
                <span>Question {quizIndex + 1} of {finalQuestions.length}</span>
                <span>{quizAnswers.filter(Boolean).length} answered</span>
              </div>
              <div className="a1-quiz-progress">
                <div style={{ width: `${((quizIndex + 1) / finalQuestions.length) * 100}%` }} />
              </div>

              <h3>{currentQuiz.question}</h3>

              {currentQuiz.audio && (
                <button className="a1-audio-main small" onClick={() => speakGerman(currentQuiz.audio!)}>
                  <Volume2 size={18} /> Play sentence
                </button>
              )}

              <div className="a1-answer-options">
                {currentQuiz.options.map((option) => (
                  <button
                    key={option}
                    className={quizAnswers[quizIndex] === option ? "a1-answer-option selected" : "a1-answer-option"}
                    onClick={() => setQuizAnswer(option)}
                  >
                    {option}
                    {quizAnswers[quizIndex] === option && <CheckCircle2 size={18} />}
                  </button>
                ))}
              </div>

              <div className="a1-skills-actions between">
                <button
                  className="a1-secondary-button"
                  disabled={quizIndex === 0}
                  onClick={() => setQuizIndex((index) => index - 1)}
                >
                  Previous
                </button>
                <button
                  className="a1-primary-button"
                  disabled={!quizAnswers[quizIndex]}
                  onClick={nextQuiz}
                >
                  {quizIndex === finalQuestions.length - 1 ? "Submit Quiz" : "Next Question"}
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          ) : (
            <div className="a1-result-card">
              <div className="a1-result-icon">
                {quizScore >= 8 ? <Award size={36} /> : <RotateCcw size={34} />}
              </div>
              <span className="a1-skills-eyebrow">YOUR RESULT</span>
              <h2>{quizScore >= 8 ? "Well done!" : "Keep practising!"}</h2>
              <div className="a1-result-score">{quizScore} / 10</div>
              <p>
                {quizScore >= 8
                  ? "You passed this module. You are ready for the A1 speaking and final mock exam module."
                  : "You need at least 8 correct answers. Review the lessons and try again."}
              </p>

              <div className="a1-result-review">
                {finalQuestions.map((question, index) => (
                  <div className="a1-result-review-row" key={question.question}>
                    <span className={quizAnswers[index] === question.answer ? "a1-review-mark correct" : "a1-review-mark incorrect"}>
                      {quizAnswers[index] === question.answer ? "✓" : "×"}
                    </span>
                    <div>
                      <strong>{question.question}</strong>
                      <p>Your answer: {quizAnswers[index] || "Not answered"}</p>
                      {quizAnswers[index] !== question.answer && <p>Correct answer: {question.answer}</p>}
                      <small>{question.explanation}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="a1-skills-actions centered">
                <button className="a1-secondary-button" onClick={retryQuiz}>
                  <RotateCcw size={16} /> Try Again
                </button>
                {quizScore >= 8 && (
                  <button className="a1-primary-button" onClick={onComplete}>
                    Complete Module <CheckCircle2 size={17} />
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      <footer className="a1-skills-tip">
        <Lightbulb size={20} />
        <p><strong>Learning tip:</strong> Listen to each passage more than once, read German texts aloud, and write your own sentences every day. Small daily practice builds confidence.</p>
      </footer>
    </div>
  );
}
