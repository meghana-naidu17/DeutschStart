
import { useState } from "react";
import {
  Mic,
  Volume2,
  MessageCircle,
  UserRound,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Lightbulb,
  Award,
  ClipboardCheck
} from "lucide-react";
import "./A1SpeakingFinalMockLesson.css";

type Props = {
  onComplete: () => void;
};

const introductionSections = [
  {
    title: "Name and age",
    german: "Hallo! Ich heiße Meghana. Ich bin 20 Jahre alt.",
    english: "Hello! My name is Meghana. I am 20 years old.",
    question: "Wie heißt du? Wie alt bist du?"
  },
  {
    title: "Country and hometown",
    german: "Ich komme aus Indien. Ich wohne in Andhra Pradesh.",
    english: "I come from India. I live in Andhra Pradesh.",
    question: "Woher kommst du? Wo wohnst du?"
  },
  {
    title: "Studies and work",
    german: "Ich bin Studentin. Ich studiere an einer Universität.",
    english: "I am a student. I study at a university.",
    question: "Was machst du beruflich? Wo studierst du?"
  },
  {
    title: "Languages",
    german: "Ich spreche Telugu, Englisch und ein bisschen Deutsch.",
    english: "I speak Telugu, English and a little German.",
    question: "Welche Sprachen sprichst du?"
  },
  {
    title: "Family",
    german: "Meine Familie ist sehr nett. Ich verbringe gern Zeit mit meiner Familie.",
    english: "My family is very nice. I like spending time with my family.",
    question: "Erzähl etwas über deine Familie."
  },
  {
    title: "Hobbies",
    german: "In meiner Freizeit lese ich gern Bücher und höre Musik.",
    english: "In my free time I like reading books and listening to music.",
    question: "Was machst du gern in deiner Freizeit?"
  },
  {
    title: "Daily routine",
    german: "Ich stehe um sieben Uhr auf. Danach frühstücke ich und gehe zur Universität.",
    english: "I get up at seven. After that I have breakfast and go to university.",
    question: "Wie sieht dein Alltag aus?"
  }
];

const speakingSituations = [
  {
    title: "At a café",
    role: "You are the customer.",
    task: "Order a drink and something to eat.",
    sample: [
      ["Kellner", "Guten Tag! Was möchten Sie?", "Good day! What would you like?"],
      ["Du", "Ich möchte einen Tee und ein Sandwich, bitte.", "I would like a tea and a sandwich, please."],
      ["Kellner", "Möchten Sie noch etwas?", "Would you like anything else?"],
      ["Du", "Nein, danke. Das ist alles.", "No, thank you. That's all."]
    ]
  },
  {
    title: "At the railway station",
    role: "You need information about a train.",
    task: "Ask for a ticket and the departure time.",
    sample: [
      ["Du", "Guten Tag. Ich möchte eine Fahrkarte nach Berlin.", "Good day. I would like a ticket to Berlin."],
      ["Mitarbeiter", "Wann möchten Sie fahren?", "When would you like to travel?"],
      ["Du", "Heute Nachmittag, bitte.", "This afternoon, please."],
      ["Mitarbeiter", "Der Zug fährt um drei Uhr ab.", "The train leaves at three o'clock."]
    ]
  },
  {
    title: "Meeting a new friend",
    role: "You are meeting someone for the first time.",
    task: "Ask their name, hometown and languages.",
    sample: [
      ["Du", "Hallo! Wie heißt du?", "Hello! What is your name?"],
      ["Person", "Ich heiße Lisa. Und du?", "My name is Lisa. And you?"],
      ["Du", "Ich heiße Meghana. Woher kommst du?", "My name is Meghana. Where are you from?"],
      ["Person", "Ich komme aus Deutschland.", "I come from Germany."]
    ]
  },
  {
    title: "At the supermarket",
    role: "You want to buy some food.",
    task: "Ask for the price and pay.",
    sample: [
      ["Du", "Entschuldigung, wie viel kostet das Brot?", "Excuse me, how much does the bread cost?"],
      ["Verkäufer", "Das kostet drei Euro.", "That costs three euros."],
      ["Du", "Gut. Ich nehme ein Brot.", "Good. I'll take one loaf of bread."],
      ["Verkäufer", "Das macht drei Euro.", "That will be three euros."]
    ]
  },
  {
    title: "Making an appointment",
    role: "You want to meet your friend.",
    task: "Suggest a day and time.",
    sample: [
      ["Du", "Hast du am Samstag Zeit?", "Do you have time on Saturday?"],
      ["Freund", "Ja, am Nachmittag.", "Yes, in the afternoon."],
      ["Du", "Möchtest du ins Kino gehen?", "Would you like to go to the cinema?"],
      ["Freund", "Ja, sehr gern!", "Yes, gladly!"]
    ]
  }
];

const questionCards = [
  {
    question: "Wie heißt du?",
    meaning: "What is your name?",
    answer: "Ich heiße Meghana."
  },
  {
    question: "Woher kommst du?",
    meaning: "Where are you from?",
    answer: "Ich komme aus Indien."
  },
  {
    question: "Wo wohnst du?",
    meaning: "Where do you live?",
    answer: "Ich wohne in Indien."
  },
  {
    question: "Wie alt bist du?",
    meaning: "How old are you?",
    answer: "Ich bin zwanzig Jahre alt."
  },
  {
    question: "Was machst du gern?",
    meaning: "What do you like doing?",
    answer: "Ich lese gern Bücher und höre Musik."
  },
  {
    question: "Was isst du gern?",
    meaning: "What do you like eating?",
    answer: "Ich esse gern Reis und Gemüse."
  },
  {
    question: "Wann stehst du auf?",
    meaning: "When do you get up?",
    answer: "Ich stehe um sieben Uhr auf."
  },
  {
    question: "Welche Sprachen sprichst du?",
    meaning: "Which languages do you speak?",
    answer: "Ich spreche Telugu, Englisch und ein bisschen Deutsch."
  },
  {
    question: "Hast du Geschwister?",
    meaning: "Do you have siblings?",
    answer: "Ja, ich habe einen Bruder und eine Schwester."
  },
  {
    question: "Was machst du am Wochenende?",
    meaning: "What do you do at the weekend?",
    answer: "Am Wochenende treffe ich meine Freunde."
  }
];

const mockQuestions = [
  {
    section: "Vocabulary",
    question: "What does 'die Wohnung' mean?",
    options: ["The apartment", "The school", "The station", "The garden"],
    answer: "The apartment",
    explanation: "Die Wohnung means apartment or flat."
  },
  {
    section: "Vocabulary",
    question: "What is the German word for 'yesterday'?",
    options: ["Heute", "Morgen", "Gestern", "Jetzt"],
    answer: "Gestern",
    explanation: "Gestern means yesterday. Heute means today and morgen means tomorrow."
  },
  {
    section: "Articles",
    question: "Choose the correct article: ___ Tisch",
    options: ["Die", "Der", "Das", "Eine"],
    answer: "Der",
    explanation: "Tisch is masculine: der Tisch."
  },
  {
    section: "Articles",
    question: "Choose the correct article: ___ Mädchen",
    options: ["Der", "Die", "Das", "Den"],
    answer: "Das",
    explanation: "Mädchen is neuter: das Mädchen."
  },
  {
    section: "Pronouns",
    question: "Maria ist Studentin. ___ lernt Deutsch.",
    options: ["Er", "Sie", "Es", "Wir"],
    answer: "Sie",
    explanation: "Maria is feminine, so we use sie."
  },
  {
    section: "Verbs",
    question: "Ich ___ jeden Tag Deutsch.",
    options: ["lernst", "lernt", "lerne", "lernen"],
    answer: "lerne",
    explanation: "The verb lernen becomes lerne with ich."
  },
  {
    section: "Verbs",
    question: "Du ___ sehr gut Deutsch.",
    options: ["spreche", "sprichst", "sprechen", "spricht"],
    answer: "sprichst",
    explanation: "The irregular verb sprechen becomes sprichst with du."
  },
  {
    section: "Sentence Structure",
    question: "Choose the correct sentence.",
    options: [
      "Ich jeden Tag lerne Deutsch.",
      "Ich lerne jeden Tag Deutsch.",
      "Ich Deutsch jeden Tag lerne.",
      "Lerne ich jeden Tag Deutsch."
    ],
    answer: "Ich lerne jeden Tag Deutsch.",
    explanation: "In a normal German main clause, the conjugated verb is in position two."
  },
  {
    section: "Questions",
    question: "Which question means 'Where do you live?'",
    options: ["Wie heißt du?", "Wo wohnst du?", "Woher kommst du?", "Was machst du?"],
    answer: "Wo wohnst du?",
    explanation: "Wo wohnst du? asks where someone lives."
  },
  {
    section: "Negation",
    question: "Choose the correct sentence: I don't have a car.",
    options: [
      "Ich habe nicht Auto.",
      "Ich habe kein Auto.",
      "Ich habe keine Auto.",
      "Ich nicht habe Auto."
    ],
    answer: "Ich habe kein Auto.",
    explanation: "Use kein with the neuter noun Auto."
  },
  {
    section: "Accusative",
    question: "Ich kaufe ___ Apfel.",
    options: ["ein", "einen", "einem", "eine"],
    answer: "einen",
    explanation: "Apfel is masculine. The masculine indefinite article changes from ein to einen in the accusative."
  },
  {
    section: "Dative",
    question: "Ich helfe ___ Mann.",
    options: ["der", "den", "dem", "die"],
    answer: "dem",
    explanation: "Helfen takes the dative. Der Mann becomes dem Mann."
  },
  {
    section: "Possessives",
    question: "Das ist ___ Mutter. (my mother)",
    options: ["mein", "meine", "meinen", "meinem"],
    answer: "meine",
    explanation: "Mutter is feminine, so we use meine."
  },
  {
    section: "Modal Verbs",
    question: "Ich ___ heute Deutsch lernen. (must)",
    options: ["kann", "muss", "möchte", "darf"],
    answer: "muss",
    explanation: "Müssen means must. The infinitive lernen goes to the end."
  },
  {
    section: "Separable Verbs",
    question: "Ich ___ um sieben Uhr ___. (aufstehen)",
    options: [
      "stehe / auf",
      "aufstehe / um",
      "steht / auf",
      "stehen / auf"
    ],
    answer: "stehe / auf",
    explanation: "Aufstehen separates: Ich stehe um sieben Uhr auf."
  },
  {
    section: "Prepositions",
    question: "Ich fahre ___ dem Bus.",
    options: ["mit", "für", "ohne", "gegen"],
    answer: "mit",
    explanation: "Mit means with/by and takes the dative: mit dem Bus."
  },
  {
    section: "Time",
    question: "How do you say 8:00?",
    options: ["Acht Uhr", "Sieben Uhr", "Neun Uhr", "Zehn Uhr"],
    answer: "Acht Uhr",
    explanation: "Acht Uhr means eight o'clock."
  },
  {
    section: "Adjectives",
    question: "Choose the correct sentence: The house is big.",
    options: [
      "Das Haus ist groß.",
      "Das Haus ist große.",
      "Das Haus groß ist.",
      "Der Haus ist groß."
    ],
    answer: "Das Haus ist groß.",
    explanation: "After sein, the adjective stays in its base form: groß."
  },
  {
    section: "Perfect Tense",
    question: "Choose the correct sentence: I learned German yesterday.",
    options: [
      "Ich habe gestern Deutsch gelernt.",
      "Ich bin gestern Deutsch gelernt.",
      "Ich hat gestern Deutsch lernen.",
      "Ich habe gestern Deutsch lernen."
    ],
    answer: "Ich habe gestern Deutsch gelernt.",
    explanation: "The Perfekt of lernen is haben + gelernt."
  },
  {
    section: "Everyday Conversation",
    question: "How do you politely ask someone to repeat?",
    options: [
      "Wie viel kostet das?",
      "Können Sie das bitte wiederholen?",
      "Wo ist der Bahnhof?",
      "Wie spät ist es?"
    ],
    answer: "Können Sie das bitte wiederholen?",
    explanation: "Wiederholen means to repeat. This is a polite request."
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

export default function A1SpeakingFinalMockLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("introduction");
  const [selectedSituation, setSelectedSituation] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [showIntroductionEnglish, setShowIntroductionEnglish] = useState(true);
  const [showSituationEnglish, setShowSituationEnglish] = useState(true);
  const [showQuestionAnswer, setShowQuestionAnswer] = useState(false);
  const [mockIndex, setMockIndex] = useState(0);
  const [mockAnswers, setMockAnswers] = useState<string[]>([]);
  const [mockSubmitted, setMockSubmitted] = useState(false);

  const currentSituation = speakingSituations[selectedSituation];
  const currentQuestion = questionCards[selectedQuestion];
  const currentMockQuestion = mockQuestions[mockIndex];

  const mockScore = mockAnswers.reduce(
    (total, answer, index) => total + (answer === mockQuestions[index].answer ? 1 : 0),
    0
  );

  const tabs = [
    { id: "introduction", label: "Self Introduction", icon: UserRound },
    { id: "situations", label: "Speaking Situations", icon: MessageCircle },
    { id: "questions", label: "Question Cards", icon: Mic },
    { id: "mock", label: "A1 Mock Exam", icon: ClipboardCheck }
  ];

  const setMockAnswer = (answer: string) => {
    setMockAnswers((previous) => {
      const updated = [...previous];
      updated[mockIndex] = answer;
      return updated;
    });
  };

  const nextMockQuestion = () => {
    if (mockIndex < mockQuestions.length - 1) {
      setMockIndex((index) => index + 1);
    } else {
      setMockSubmitted(true);
    }
  };

  const retryMock = () => {
    setMockIndex(0);
    setMockAnswers([]);
    setMockSubmitted(false);
  };

  const changeQuestion = (direction: number) => {
    setSelectedQuestion((index) => (index + direction + questionCards.length) % questionCards.length);
    setShowQuestionAnswer(false);
  };

  return (
    <div className="a1-speaking-lesson">
      <header className="a1-speaking-header">
        <div className="a1-speaking-header-icon">
          <Mic size={30} />
        </div>
        <div>
          <span className="a1-speaking-eyebrow">A1 GERMAN · MODULE 22 · FINAL MODULE</span>
          <h1>Speaking & Final Mock Exam</h1>
          <p>Practise speaking confidently and test your A1 German knowledge.</p>
        </div>
      </header>

      <nav className="a1-speaking-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "a1-speaking-tab active" : "a1-speaking-tab"}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {activeTab === "introduction" && (
        <section className="a1-speaking-section">
          <div className="a1-speaking-section-heading">
            <div>
              <h2>Stell dich vor · Introduce Yourself</h2>
              <p>Use these examples to prepare a short introduction about yourself.</p>
            </div>
            <button
              className="a1-speaking-toggle"
              onClick={() => setShowIntroductionEnglish((value) => !value)}
            >
              {showIntroductionEnglish ? "Hide English" : "Show English"}
            </button>
          </div>

          <div className="a1-intro-guide">
            <div className="a1-intro-guide-icon">
              <Lightbulb size={22} />
            </div>
            <div>
              <strong>Speaking exam tip</strong>
              <p>Speak in short, clear sentences. You do not need complicated grammar. Give simple answers and speak slowly.</p>
            </div>
          </div>

          <div className="a1-intro-list">
            {introductionSections.map((item, index) => (
              <article className="a1-intro-card" key={item.title}>
                <div className="a1-intro-number">{index + 1}</div>
                <div className="a1-intro-body">
                  <h3>{item.title}</h3>
                  <p className="a1-intro-question">Possible question: {item.question}</p>
                  <div className="a1-intro-german">{item.german}</div>
                  {showIntroductionEnglish && <p className="a1-intro-english">{item.english}</p>}
                  <button onClick={() => speakGerman(item.german)}>
                    <Volume2 size={16} /> Listen and repeat
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="a1-speaking-practice-note">
            <Mic size={19} />
            <p><strong>Your turn:</strong> Say all seven sections aloud, but replace the sample details with your own information.</p>
          </div>
        </section>
      )}

      {activeTab === "situations" && (
        <section className="a1-speaking-section">
          <div className="a1-speaking-section-heading">
            <div>
              <h2>Everyday Speaking Situations</h2>
              <p>Practise common A1 role-play conversations.</p>
            </div>
            <button
              className="a1-speaking-toggle"
              onClick={() => setShowSituationEnglish((value) => !value)}
            >
              {showSituationEnglish ? "Hide English" : "Show English"}
            </button>
          </div>

          <div className="a1-situation-layout">
            <div className="a1-situation-list">
              {speakingSituations.map((situation, index) => (
                <button
                  key={situation.title}
                  className={selectedSituation === index ? "a1-situation-choice selected" : "a1-situation-choice"}
                  onClick={() => setSelectedSituation(index)}
                >
                  <span>{index + 1}</span>
                  <strong>{situation.title}</strong>
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>

            <div className="a1-situation-panel">
              <span className="a1-speaking-eyebrow">ROLE PLAY {selectedSituation + 1}</span>
              <h3>{currentSituation.title}</h3>
              <p><strong>Your role:</strong> {currentSituation.role}</p>
              <p><strong>Your task:</strong> {currentSituation.task}</p>

              <div className="a1-situation-dialogue">
                {currentSituation.sample.map((line, index) => (
                  <div className="a1-situation-line" key={`${line[0]}-${index}`}>
                    <span>{line[0]}</span>
                    <div>
                      <strong>{line[1]}</strong>
                      {showSituationEnglish && <p>{line[2]}</p>}
                      <button onClick={() => speakGerman(line[1])} aria-label="Listen to sentence">
                        <Volume2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="a1-speaking-practice-note">
                <Lightbulb size={18} />
                <p>Read both roles first. Then cover the sample and try to speak as your role without reading.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "questions" && (
        <section className="a1-speaking-section">
          <div className="a1-speaking-section-heading">
            <div>
              <h2>Speaking Question Cards</h2>
              <p>Answer each question aloud in a complete German sentence.</p>
            </div>
            <span className="a1-speaking-counter">{selectedQuestion + 1} / {questionCards.length}</span>
          </div>

          <div className="a1-question-card">
            <span className="a1-speaking-eyebrow">QUESTION {selectedQuestion + 1}</span>
            <h2>{currentQuestion.question}</h2>
            <p className="a1-question-meaning">{currentQuestion.meaning}</p>
            <button className="a1-speaking-audio" onClick={() => speakGerman(currentQuestion.question)}>
              <Volume2 size={18} /> Listen to the question
            </button>

            <div className="a1-question-answer-area">
              <p>Try to answer aloud before revealing the sample answer.</p>
              <button
                className="a1-speaking-toggle"
                onClick={() => setShowQuestionAnswer((value) => !value)}
              >
                {showQuestionAnswer ? "Hide sample answer" : "Show sample answer"}
              </button>
              {showQuestionAnswer && (
                <div className="a1-question-sample">
                  <strong>{currentQuestion.answer}</strong>
                  <button onClick={() => speakGerman(currentQuestion.answer)}>
                    <Volume2 size={16} /> Listen
                  </button>
                </div>
              )}
            </div>

            <div className="a1-question-navigation">
              <button className="a1-speaking-secondary" onClick={() => changeQuestion(-1)}>
                Previous
              </button>
              <button className="a1-speaking-primary" onClick={() => changeQuestion(1)}>
                Next Question <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      )}

      {activeTab === "mock" && (
        <section className="a1-speaking-section">
          <div className="a1-speaking-section-heading">
            <div>
              <h2>A1 German Final Mock Exam</h2>
              <p>20 multiple-choice questions covering the A1 course.</p>
            </div>
            <span className="a1-speaking-counter">20 Questions</span>
          </div>

          {!mockSubmitted ? (
            <div className="a1-mock-card">
              <div className="a1-mock-topline">
                <span>Question {mockIndex + 1} of {mockQuestions.length}</span>
                <span>{currentMockQuestion.section}</span>
              </div>
              <div className="a1-mock-progress">
                <div style={{ width: `${((mockIndex + 1) / mockQuestions.length) * 100}%` }} />
              </div>

              <h3>{currentMockQuestion.question}</h3>

              <div className="a1-mock-options">
                {currentMockQuestion.options.map((option) => (
                  <button
                    key={option}
                    className={mockAnswers[mockIndex] === option ? "a1-mock-option selected" : "a1-mock-option"}
                    onClick={() => setMockAnswer(option)}
                  >
                    <span>{option}</span>
                    {mockAnswers[mockIndex] === option && <CheckCircle2 size={18} />}
                  </button>
                ))}
              </div>

              <div className="a1-mock-navigation">
                <button
                  className="a1-speaking-secondary"
                  disabled={mockIndex === 0}
                  onClick={() => setMockIndex((index) => index - 1)}
                >
                  Previous
                </button>
                <button
                  className="a1-speaking-primary"
                  disabled={!mockAnswers[mockIndex]}
                  onClick={nextMockQuestion}
                >
                  {mockIndex === mockQuestions.length - 1 ? "Submit Exam" : "Next Question"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="a1-mock-result">
              <div className="a1-mock-result-icon">
                {mockScore >= 16 ? <Award size={36} /> : <RotateCcw size={34} />}
              </div>
              <span className="a1-speaking-eyebrow">FINAL EXAM RESULT</span>
              <h2>{mockScore >= 16 ? "Congratulations!" : "Keep practising!"}</h2>
              <div className="a1-mock-score">{mockScore} / 20</div>
              <p>
                {mockScore >= 16
                  ? "You passed the A1 mock exam with at least 80%. Review your speaking practice and keep improving."
                  : "You need at least 16 correct answers to pass this practice exam. Review your mistakes and try again."}
              </p>

              <div className="a1-mock-review">
                {mockQuestions.map((question, index) => (
                  <div className="a1-mock-review-row" key={question.question}>
                    <span className={mockAnswers[index] === question.answer ? "a1-mock-mark correct" : "a1-mock-mark incorrect"}>
                      {mockAnswers[index] === question.answer ? "✓" : "×"}
                    </span>
                    <div>
                      <span className="a1-mock-review-section">{question.section}</span>
                      <strong>{question.question}</strong>
                      <p>Your answer: {mockAnswers[index] || "Not answered"}</p>
                      {mockAnswers[index] !== question.answer && <p>Correct answer: {question.answer}</p>}
                      <small>{question.explanation}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="a1-mock-result-actions">
                <button className="a1-speaking-secondary" onClick={retryMock}>
                  <RotateCcw size={16} /> Retry Exam
                </button>
                {mockScore >= 16 && (
                  <button className="a1-speaking-primary" onClick={onComplete}>
                    Complete A1 Course <CheckCircle2 size={17} />
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      <footer className="a1-speaking-footer">
        <Lightbulb size={20} />
        <p><strong>Final advice:</strong> Speak every day, even if you make mistakes. At A1 level, clear and simple sentences are more important than complicated grammar.</p>
      </footer>
    </div>
  );
}
