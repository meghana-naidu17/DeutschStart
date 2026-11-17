
import { useState } from "react";
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  RotateCcw,
  MessageCircle,
  GraduationCap,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import "./EverydayConversationsLesson.css";

type Props = {
  onComplete: () => void;
};

type DialogueLine = {
  speaker: string;
  german: string;
  english: string;
};

type Conversation = {
  title: string;
  situation: string;
  lines: DialogueLine[];
};

const conversations: Conversation[] = [
  {
    title: "Meeting Someone",
    situation: "Greeting and introducing yourself",
    lines: [
      { speaker: "Anna", german: "Hallo! Wie heißt du?", english: "Hello! What is your name?" },
      { speaker: "Me", german: "Hallo! Ich heiße Meghana. Und du?", english: "Hello! My name is Meghana. And you?" },
      { speaker: "Anna", german: "Ich heiße Anna. Freut mich!", english: "My name is Anna. Nice to meet you!" },
      { speaker: "Me", german: "Freut mich auch!", english: "Nice to meet you too!" },
      { speaker: "Anna", german: "Woher kommst du?", english: "Where are you from?" },
      { speaker: "Me", german: "Ich komme aus Indien.", english: "I come from India." }
    ]
  },
  {
    title: "At a Café",
    situation: "Ordering food and drinks",
    lines: [
      { speaker: "Waiter", german: "Guten Tag! Was möchten Sie?", english: "Good day! What would you like?" },
      { speaker: "Customer", german: "Ich möchte einen Kaffee, bitte.", english: "I would like a coffee, please." },
      { speaker: "Waiter", german: "Möchten Sie auch etwas essen?", english: "Would you also like something to eat?" },
      { speaker: "Customer", german: "Ja, ich nehme ein Sandwich.", english: "Yes, I'll have a sandwich." },
      { speaker: "Waiter", german: "Sonst noch etwas?", english: "Anything else?" },
      { speaker: "Customer", german: "Nein, danke. Das ist alles.", english: "No, thank you. That's all." },
      { speaker: "Waiter", german: "Das macht acht Euro.", english: "That will be eight euros." }
    ]
  },
  {
    title: "At College",
    situation: "Talking to a classmate",
    lines: [
      { speaker: "Student A", german: "Hallo! Hast du die Hausaufgaben gemacht?", english: "Hello! Did you do the homework?" },
      { speaker: "Student B", german: "Ja, aber die letzte Aufgabe ist schwierig.", english: "Yes, but the last exercise is difficult." },
      { speaker: "Student A", german: "Kannst du mir bitte helfen?", english: "Can you please help me?" },
      { speaker: "Student B", german: "Natürlich! Was verstehst du nicht?", english: "Of course! What don't you understand?" },
      { speaker: "Student A", german: "Ich verstehe diese Grammatik nicht.", english: "I don't understand this grammar." },
      { speaker: "Student B", german: "Kein Problem. Ich erkläre es dir.", english: "No problem. I'll explain it to you." }
    ]
  },
  {
    title: "Shopping",
    situation: "Asking about prices",
    lines: [
      { speaker: "Customer", german: "Entschuldigung, wie viel kostet das?", english: "Excuse me, how much does this cost?" },
      { speaker: "Shopkeeper", german: "Das kostet zwanzig Euro.", english: "That costs twenty euros." },
      { speaker: "Customer", german: "Haben Sie eine andere Größe?", english: "Do you have another size?" },
      { speaker: "Shopkeeper", german: "Ja, einen Moment bitte.", english: "Yes, one moment please." },
      { speaker: "Customer", german: "Kann ich mit Karte bezahlen?", english: "Can I pay by card?" },
      { speaker: "Shopkeeper", german: "Ja, natürlich.", english: "Yes, of course." }
    ]
  },
  {
    title: "Asking for Directions",
    situation: "Finding a railway station",
    lines: [
      { speaker: "Person A", german: "Entschuldigung, wo ist der Bahnhof?", english: "Excuse me, where is the railway station?" },
      { speaker: "Person B", german: "Gehen Sie geradeaus.", english: "Go straight ahead." },
      { speaker: "Person A", german: "Ist es weit von hier?", english: "Is it far from here?" },
      { speaker: "Person B", german: "Nein, es ist ganz in der Nähe.", english: "No, it is very close." },
      { speaker: "Person A", german: "Vielen Dank für Ihre Hilfe!", english: "Thank you very much for your help!" },
      { speaker: "Person B", german: "Gern geschehen!", english: "You're welcome!" }
    ]
  },
  {
    title: "Phone Conversation",
    situation: "Making and answering a phone call",
    lines: [
      { speaker: "Anna", german: "Hallo, hier ist Anna. Kann ich mit Meghana sprechen?", english: "Hello, this is Anna. May I speak with Meghana?" },
      { speaker: "Me", german: "Hallo Anna! Ja, hier ist Meghana.", english: "Hello Anna! Yes, this is Meghana." },
      { speaker: "Anna", german: "Hast du heute Zeit?", english: "Do you have time today?" },
      { speaker: "Me", german: "Ja, ich habe am Nachmittag Zeit.", english: "Yes, I have time in the afternoon." },
      { speaker: "Anna", german: "Super! Wir sprechen später.", english: "Great! We'll talk later." },
      { speaker: "Me", german: "Bis später! Tschüss!", english: "See you later! Bye!" }
    ]
  }
];

const usefulExpressions = [
  { german: "Entschuldigung!", english: "Excuse me! / Sorry!", group: "Polite expressions" },
  { german: "Vielen Dank!", english: "Thank you very much!", group: "Polite expressions" },
  { german: "Bitte schön!", english: "You're welcome! / Here you are!", group: "Polite expressions" },
  { german: "Kein Problem!", english: "No problem!", group: "Polite expressions" },
  { german: "Ich verstehe nicht.", english: "I don't understand.", group: "When learning" },
  { german: "Können Sie das bitte wiederholen?", english: "Can you please repeat that?", group: "When learning" },
  { german: "Bitte sprechen Sie langsamer.", english: "Please speak more slowly.", group: "When learning" },
  { german: "Was bedeutet das?", english: "What does that mean?", group: "When learning" },
  { german: "Einen Moment bitte.", english: "One moment, please.", group: "Daily expressions" },
  { german: "Das weiß ich nicht.", english: "I don't know that.", group: "Daily expressions" },
  { german: "Vielleicht morgen.", english: "Maybe tomorrow.", group: "Daily expressions" },
  { german: "Bis bald!", english: "See you soon!", group: "Daily expressions" }
];

const formalityExamples = [
  {
    informal: "Wie heißt du?",
    formal: "Wie heißen Sie?",
    english: "What is your name?"
  },
  {
    informal: "Wo wohnst du?",
    formal: "Wo wohnen Sie?",
    english: "Where do you live?"
  },
  {
    informal: "Wie geht es dir?",
    formal: "Wie geht es Ihnen?",
    english: "How are you?"
  },
  {
    informal: "Kannst du mir helfen?",
    formal: "Können Sie mir helfen?",
    english: "Can you help me?"
  },
  {
    informal: "Woher kommst du?",
    formal: "Woher kommen Sie?",
    english: "Where are you from?"
  }
];

const quizQuestions = [
  {
    question: "How do you say 'Excuse me' in German?",
    options: ["Danke schön", "Entschuldigung", "Guten Morgen", "Auf Wiedersehen"],
    answer: "Entschuldigung",
    explanation: "Entschuldigung means excuse me or sorry."
  },
  {
    question: "What does 'Wie heißt du?' mean?",
    options: ["Where do you live?", "How are you?", "What is your name?", "Where are you from?"],
    answer: "What is your name?",
    explanation: "Wie heißt du? is an informal way to ask someone's name."
  },
  {
    question: "Choose the correct café order.",
    options: [
      "Ich bin einen Kaffee.",
      "Ich möchte einen Kaffee.",
      "Ich heiße einen Kaffee.",
      "Ich komme einen Kaffee."
    ],
    answer: "Ich möchte einen Kaffee.",
    explanation: "Ich möchte means I would like."
  },
  {
    question: "How do you ask 'How much does this cost?'",
    options: [
      "Wo ist das?",
      "Was ist das?",
      "Wie viel kostet das?",
      "Wie heißt das?"
    ],
    answer: "Wie viel kostet das?",
    explanation: "Wie viel kostet das? is used to ask the price."
  },
  {
    question: "Which is the formal version of 'Wie geht es dir?'",
    options: [
      "Wie geht es Ihnen?",
      "Wie geht es du?",
      "Wie gehen Sie?",
      "Wie bist du?"
    ],
    answer: "Wie geht es Ihnen?",
    explanation: "Ihnen is the formal dative pronoun used in this expression."
  },
  {
    question: "What does 'Gehen Sie geradeaus' mean?",
    options: [
      "Turn left.",
      "Go straight ahead.",
      "Stop here.",
      "Turn right."
    ],
    answer: "Go straight ahead.",
    explanation: "Geradeaus means straight ahead."
  },
  {
    question: "How do you say 'I don't understand'?",
    options: [
      "Ich verstehe nicht.",
      "Ich weiß nicht.",
      "Ich spreche Deutsch.",
      "Ich habe Zeit."
    ],
    answer: "Ich verstehe nicht.",
    explanation: "Verstehen means to understand."
  },
  {
    question: "What does 'Bis später!' mean?",
    options: [
      "Good morning!",
      "See you later!",
      "Good night!",
      "Thank you!"
    ],
    answer: "See you later!",
    explanation: "Bis später is a casual way to say see you later."
  },
  {
    question: "Which sentence politely asks someone to repeat?",
    options: [
      "Was kostet das?",
      "Können Sie das bitte wiederholen?",
      "Wo wohnen Sie?",
      "Ich möchte bezahlen."
    ],
    answer: "Können Sie das bitte wiederholen?",
    explanation: "Wiederholen means to repeat."
  },
  {
    question: "What does 'Gern geschehen!' mean?",
    options: [
      "Please come in.",
      "I am sorry.",
      "You're welcome!",
      "Goodbye!"
    ],
    answer: "You're welcome!",
    explanation: "Gern geschehen is a common response to Danke."
  }
];

function speakGerman(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export default function EverydayConversationsLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("dialogues");
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [showTranslations, setShowTranslations] = useState(true);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const practiceQuestions = [
    {
      german: "Wie heißt du?",
      answer: "What is your name?",
      options: ["Where are you from?", "What is your name?", "How are you?"]
    },
    {
      german: "Wie viel kostet das?",
      answer: "How much does this cost?",
      options: ["Where is the station?", "How much does this cost?", "What do you want?"]
    },
    {
      german: "Ich verstehe nicht.",
      answer: "I don't understand.",
      options: ["I don't understand.", "I don't know.", "I am not hungry."]
    },
    {
      german: "Bitte sprechen Sie langsamer.",
      answer: "Please speak more slowly.",
      options: ["Please wait here.", "Please speak more slowly.", "Please come tomorrow."]
    },
    {
      german: "Wo ist der Bahnhof?",
      answer: "Where is the railway station?",
      options: ["Where is the railway station?", "Where is the restaurant?", "Where do you live?"]
    }
  ];

  const currentPractice = practiceQuestions[practiceIndex];
  const currentQuiz = quizQuestions[quizIndex];
  const quizScore = quizAnswers.reduce(
    (score, answer, index) => score + (answer === quizQuestions[index].answer ? 1 : 0),
    0
  );

  const checkPractice = () => {
    if (practiceAnswer) setPracticeChecked(true);
  };

  const nextPractice = () => {
    setPracticeIndex((previous) => (previous + 1) % practiceQuestions.length);
    setPracticeAnswer("");
    setPracticeChecked(false);
  };

  const selectQuizAnswer = (answer: string) => {
    setQuizAnswers((previous) => {
      const updated = [...previous];
      updated[quizIndex] = answer;
      return updated;
    });
  };

  const nextQuiz = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((previous) => previous + 1);
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
    { id: "dialogues", label: "Dialogues", icon: MessageCircle },
    { id: "expressions", label: "Expressions", icon: BookOpen },
    { id: "formality", label: "Formal vs Informal", icon: GraduationCap },
    { id: "practice", label: "Practice", icon: TargetIcon },
    { id: "quiz", label: "Final Quiz", icon: CheckCircle2 }
  ];

  return (
    <div className="everyday-conversations">
      <div className="conversation-header">
        <div className="conversation-header-icon">
          <MessageCircle size={30} />
        </div>
        <div>
          <span className="conversation-module-label">A1 GERMAN · MODULE 20</span>
          <h1>Everyday Conversations</h1>
          <p>Learn to speak German in everyday situations with confidence.</p>
        </div>
      </div>

      <div className="conversation-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "conversation-tab active" : "conversation-tab"}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "dialogues" && (
        <div className="conversation-content">
          <div className="conversation-section-heading">
            <div>
              <h2>Real-life German Dialogues</h2>
              <p>Choose a situation and read the conversation aloud.</p>
            </div>
            <button
              className="translation-toggle"
              onClick={() => setShowTranslations((previous) => !previous)}
            >
              {showTranslations ? "Hide translations" : "Show translations"}
            </button>
          </div>

          <div className="conversation-layout">
            <div className="conversation-list">
              {conversations.map((conversation, index) => (
                <button
                  key={conversation.title}
                  className={selectedConversation === index ? "conversation-choice selected" : "conversation-choice"}
                  onClick={() => setSelectedConversation(index)}
                >
                  <span className="conversation-choice-number">{index + 1}</span>
                  <span>
                    <strong>{conversation.title}</strong>
                    <small>{conversation.situation}</small>
                  </span>
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>

            <div className="dialogue-panel">
              <div className="dialogue-panel-heading">
                <div>
                  <span className="conversation-module-label">SITUATION {selectedConversation + 1}</span>
                  <h3>{conversations[selectedConversation].title}</h3>
                  <p>{conversations[selectedConversation].situation}</p>
                </div>
                <MessageCircle size={27} />
              </div>

              <div className="dialogue-lines">
                {conversations[selectedConversation].lines.map((line, index) => (
                  <div className="dialogue-line" key={`${line.speaker}-${index}`}>
                    <div className="dialogue-speaker">{line.speaker}</div>
                    <div className="dialogue-bubble">
                      <div className="dialogue-german">
                        <span>{line.german}</span>
                        <button
                          className="audio-button"
                          onClick={() => speakGerman(line.german)}
                          aria-label="Listen to German sentence"
                        >
                          <Volume2 size={17} />
                        </button>
                      </div>
                      {showTranslations && <p className="dialogue-english">{line.english}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "expressions" && (
        <div className="conversation-content">
          <div className="conversation-section-heading">
            <div>
              <h2>Useful Everyday Expressions</h2>
              <p>Memorize these sentences to communicate more naturally.</p>
            </div>
          </div>

          <div className="expression-grid">
            {usefulExpressions.map((expression, index) => (
              <div className="expression-card" key={expression.german}>
                <span className="expression-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="expression-group">{expression.group}</span>
                <h3>{expression.german}</h3>
                <p>{expression.english}</p>
                <button onClick={() => speakGerman(expression.german)}>
                  <Volume2 size={16} /> Listen
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "formality" && (
        <div className="conversation-content">
          <div className="conversation-section-heading">
            <div>
              <h2>Formal vs Informal German</h2>
              <p>Use du with friends and Sie when speaking politely to strangers or in formal situations.</p>
            </div>
          </div>

          <div className="formality-note">
            <Lightbulb size={21} />
            <div>
              <strong>Remember this rule</strong>
              <p><b>du</b> = informal, <b>Sie</b> = formal. The verb changes too. Always capitalize formal Sie and Ihnen.</p>
            </div>
          </div>

          <div className="formality-table">
            <div className="formality-table-header">
              <span>Informal · du</span>
              <span>Formal · Sie</span>
              <span>English meaning</span>
            </div>
            {formalityExamples.map((item) => (
              <div className="formality-row" key={item.english}>
                <div>
                  <span>{item.informal}</span>
                  <button onClick={() => speakGerman(item.informal)} aria-label="Listen to informal sentence">
                    <Volume2 size={15} />
                  </button>
                </div>
                <div>
                  <span>{item.formal}</span>
                  <button onClick={() => speakGerman(item.formal)} aria-label="Listen to formal sentence">
                    <Volume2 size={15} />
                  </button>
                </div>
                <p>{item.english}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "practice" && (
        <div className="conversation-content">
          <div className="conversation-section-heading">
            <div>
              <h2>Translation Practice</h2>
              <p>Choose the correct English meaning of the German sentence.</p>
            </div>
            <span className="practice-progress">
              {practiceIndex + 1} / {practiceQuestions.length}
            </span>
          </div>

          <div className="conversation-practice-card">
            <span className="conversation-module-label">WHAT DOES THIS MEAN?</span>
            <h2>{currentPractice.german}</h2>
            <button className="practice-audio" onClick={() => speakGerman(currentPractice.german)}>
              <Volume2 size={18} /> Listen to pronunciation
            </button>

            <div className="practice-options">
              {currentPractice.options.map((option) => (
                <button
                  key={option}
                  className={[
                    "practice-option",
                    practiceAnswer === option ? "selected" : "",
                    practiceChecked && option === currentPractice.answer ? "correct" : "",
                    practiceChecked && practiceAnswer === option && option !== currentPractice.answer ? "incorrect" : ""
                  ].join(" ")}
                  disabled={practiceChecked}
                  onClick={() => setPracticeAnswer(option)}
                >
                  {option}
                  {practiceChecked && option === currentPractice.answer && <CheckCircle2 size={18} />}
                </button>
              ))}
            </div>

            {practiceChecked && (
              <div className={practiceAnswer === currentPractice.answer ? "practice-feedback correct" : "practice-feedback incorrect"}>
                {practiceAnswer === currentPractice.answer
                  ? "Correct! Well done."
                  : `Not quite. The correct answer is: ${currentPractice.answer}`}
              </div>
            )}

            <div className="practice-actions">
              {!practiceChecked ? (
                <button className="conversation-primary-button" onClick={checkPractice} disabled={!practiceAnswer}>
                  Check Answer
                </button>
              ) : (
                <button className="conversation-primary-button" onClick={nextPractice}>
                  Next Question <ArrowRight size={17} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "quiz" && (
        <div className="conversation-content">
          <div className="conversation-section-heading">
            <div>
              <h2>Module 20 Final Quiz</h2>
              <p>Answer all 10 questions. You need at least 8 correct answers to pass.</p>
            </div>
          </div>

          {!quizSubmitted ? (
            <div className="conversation-quiz-card">
              <div className="quiz-progress-heading">
                <span>Question {quizIndex + 1} of {quizQuestions.length}</span>
                <span>{quizAnswers.filter(Boolean).length} answered</span>
              </div>
              <div className="quiz-progress-track">
                <div style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }} />
              </div>

              <h2>{currentQuiz.question}</h2>

              <div className="conversation-quiz-options">
                {currentQuiz.options.map((option) => (
                  <button
                    key={option}
                    className={quizAnswers[quizIndex] === option ? "conversation-quiz-option selected" : "conversation-quiz-option"}
                    onClick={() => selectQuizAnswer(option)}
                  >
                    <span>{option}</span>
                    {quizAnswers[quizIndex] === option && <CheckCircle2 size={18} />}
                  </button>
                ))}
              </div>

              <div className="quiz-navigation">
                <button
                  className="conversation-secondary-button"
                  disabled={quizIndex === 0}
                  onClick={() => setQuizIndex((previous) => previous - 1)}
                >
                  Previous
                </button>
                <button
                  className="conversation-primary-button"
                  disabled={!quizAnswers[quizIndex]}
                  onClick={nextQuiz}
                >
                  {quizIndex === quizQuestions.length - 1 ? "Submit Quiz" : "Next Question"}
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          ) : (
            <div className="conversation-result-card">
              <div className="conversation-result-icon">
                {quizScore >= 8 ? <AwardIcon /> : <RotateCcw size={34} />}
              </div>
              <span className="conversation-module-label">YOUR RESULT</span>
              <h2>{quizScore >= 8 ? "Excellent work!" : "Keep practising!"}</h2>
              <div className="conversation-result-score">{quizScore} / 10</div>
              <p>
                {quizScore >= 8
                  ? "You passed Module 20. You are ready to use these expressions in everyday conversations."
                  : "You need 8 correct answers to pass. Review the dialogues and try again."}
              </p>

              <div className="conversation-answer-review">
                {quizQuestions.map((question, index) => (
                  <div className="conversation-review-row" key={question.question}>
                    <span className={quizAnswers[index] === question.answer ? "review-status correct" : "review-status incorrect"}>
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

              <div className="conversation-result-actions">
                <button className="conversation-secondary-button" onClick={retryQuiz}>
                  <RotateCcw size={16} /> Try Again
                </button>
                {quizScore >= 8 && (
                  <button className="conversation-primary-button" onClick={onComplete}>
                    Complete Module <CheckCircle2 size={17} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="conversation-footer-tip">
        <Lightbulb size={20} />
        <p><strong>Speaking tip:</strong> Read each German dialogue aloud twice. First, read slowly. Then try again without looking at the English translation.</p>
      </div>
    </div>
  );
}

function TargetIcon({ size = 18 }: { size?: number }) {
  return <span style={{ display: "inline-flex", alignItems: "center" }}><BookOpen size={size} /></span>;
}

function AwardIcon() {
  return <GraduationCap size={36} />;
}
