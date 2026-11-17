
import { useState } from "react";
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  Home,
  GraduationCap,
  ShoppingBag,
  Utensils,
  Bus,
  Clock,
  ArrowRight,
  Trophy,
} from "lucide-react";
import "./EverydayLifeVocabularyLesson.css";
import { useLanguage } from "../context/LanguageContext";

type Props = {
  onComplete: () => void;
};

type Word = {
  german: string;
  article?: string;
  plural?: string;
  english: string;
  example: string;
  translation: string;
};

type Category = {
  name: string;
  icon: typeof Home;
  words: Word[];
};

const categories: Category[] = [
  {
    name: "At Home",
    icon: Home,
    words: [
      { german: "Haus", article: "das", plural: "Häuser", english: "house", example: "Das Haus ist groß.", translation: "The house is big." },
      { german: "Zimmer", article: "das", plural: "Zimmer", english: "room", example: "Mein Zimmer ist sauber.", translation: "My room is clean." },
      { german: "Küche", article: "die", plural: "Küchen", english: "kitchen", example: "Ich bin in der Küche.", translation: "I am in the kitchen." },
      { german: "Badezimmer", article: "das", plural: "Badezimmer", english: "bathroom", example: "Das Badezimmer ist klein.", translation: "The bathroom is small." },
      { german: "Bett", article: "das", plural: "Betten", english: "bed", example: "Das Bett ist bequem.", translation: "The bed is comfortable." },
      { german: "Tisch", article: "der", plural: "Tische", english: "table", example: "Das Buch liegt auf dem Tisch.", translation: "The book is on the table." },
      { german: "Stuhl", article: "der", plural: "Stühle", english: "chair", example: "Der Stuhl ist neu.", translation: "The chair is new." },
      { german: "Fenster", article: "das", plural: "Fenster", english: "window", example: "Das Fenster ist offen.", translation: "The window is open." },
    ],
  },
  {
    name: "College & Study",
    icon: GraduationCap,
    words: [
      { german: "Universität", article: "die", plural: "Universitäten", english: "university", example: "Ich gehe zur Universität.", translation: "I go to the university." },
      { german: "Schule", article: "die", plural: "Schulen", english: "school", example: "Die Schule beginnt um acht Uhr.", translation: "School starts at eight o'clock." },
      { german: "Buch", article: "das", plural: "Bücher", english: "book", example: "Ich lese ein Buch.", translation: "I am reading a book." },
      { german: "Heft", article: "das", plural: "Hefte", english: "notebook", example: "Mein Heft ist in der Tasche.", translation: "My notebook is in the bag." },
      { german: "Stift", article: "der", plural: "Stifte", english: "pen", example: "Ich brauche einen Stift.", translation: "I need a pen." },
      { german: "Lehrer", article: "der", plural: "Lehrer", english: "male teacher", example: "Der Lehrer erklärt die Aufgabe.", translation: "The teacher explains the exercise." },
      { german: "Studentin", article: "die", plural: "Studentinnen", english: "female student", example: "Die Studentin lernt Deutsch.", translation: "The student is learning German." },
      { german: "Prüfung", article: "die", plural: "Prüfungen", english: "exam", example: "Ich habe morgen eine Prüfung.", translation: "I have an exam tomorrow." },
    ],
  },
  {
    name: "Food & Eating",
    icon: Utensils,
    words: [
      { german: "Brot", article: "das", plural: "Brote", english: "bread", example: "Ich esse Brot zum Frühstück.", translation: "I eat bread for breakfast." },
      { german: "Wasser", article: "das", english: "water", example: "Ich trinke Wasser.", translation: "I drink water." },
      { german: "Milch", article: "die", english: "milk", example: "Die Milch ist kalt.", translation: "The milk is cold." },
      { german: "Apfel", article: "der", plural: "Äpfel", english: "apple", example: "Ich esse einen Apfel.", translation: "I eat an apple." },
      { german: "Banane", article: "die", plural: "Bananen", english: "banana", example: "Die Banane ist gelb.", translation: "The banana is yellow." },
      { german: "Reis", article: "der", english: "rice", example: "Wir essen Reis.", translation: "We eat rice." },
      { german: "Frühstück", article: "das", plural: "Frühstücke", english: "breakfast", example: "Das Frühstück ist fertig.", translation: "Breakfast is ready." },
      { german: "Mittagessen", article: "das", english: "lunch", example: "Das Mittagessen ist um ein Uhr.", translation: "Lunch is at one o'clock." },
    ],
  },
  {
    name: "Shopping",
    icon: ShoppingBag,
    words: [
      { german: "Geschäft", article: "das", plural: "Geschäfte", english: "shop / store", example: "Das Geschäft ist geöffnet.", translation: "The shop is open." },
      { german: "Supermarkt", article: "der", plural: "Supermärkte", english: "supermarket", example: "Ich gehe zum Supermarkt.", translation: "I am going to the supermarket." },
      { german: "Preis", article: "der", plural: "Preise", english: "price", example: "Der Preis ist hoch.", translation: "The price is high." },
      { german: "Geld", article: "das", english: "money", example: "Ich habe nicht viel Geld.", translation: "I don't have much money." },
      { german: "Tasche", article: "die", plural: "Taschen", english: "bag", example: "Die Tasche ist schön.", translation: "The bag is beautiful." },
      { german: "Kleidung", article: "die", english: "clothing", example: "Die Kleidung ist teuer.", translation: "The clothing is expensive." },
      { german: "Rechnung", article: "die", plural: "Rechnungen", english: "bill", example: "Kann ich bitte die Rechnung haben?", translation: "Can I have the bill, please?" },
      { german: "Kasse", article: "die", plural: "Kassen", english: "checkout / cash desk", example: "Ich bezahle an der Kasse.", translation: "I pay at the checkout." },
    ],
  },
  {
    name: "Travel & Transport",
    icon: Bus,
    words: [
      { german: "Bus", article: "der", plural: "Busse", english: "bus", example: "Ich fahre mit dem Bus.", translation: "I travel by bus." },
      { german: "Zug", article: "der", plural: "Züge", english: "train", example: "Der Zug kommt um neun Uhr.", translation: "The train arrives at nine o'clock." },
      { german: "Bahnhof", article: "der", plural: "Bahnhöfe", english: "train station", example: "Der Bahnhof ist hier.", translation: "The train station is here." },
      { german: "Fahrrad", article: "das", plural: "Fahrräder", english: "bicycle", example: "Ich fahre mit dem Fahrrad.", translation: "I ride a bicycle." },
      { german: "Auto", article: "das", plural: "Autos", english: "car", example: "Das Auto ist schnell.", translation: "The car is fast." },
      { german: "Fahrkarte", article: "die", plural: "Fahrkarten", english: "ticket", example: "Ich kaufe eine Fahrkarte.", translation: "I buy a ticket." },
      { german: "Straße", article: "die", plural: "Straßen", english: "street", example: "Die Straße ist lang.", translation: "The street is long." },
      { german: "Flughafen", article: "der", plural: "Flughäfen", english: "airport", example: "Wir sind am Flughafen.", translation: "We are at the airport." },
    ],
  },
  {
    name: "Time & Daily Activities",
    icon: Clock,
    words: [
      { german: "Morgen", article: "der", plural: "Morgen", english: "morning", example: "Am Morgen trinke ich Tee.", translation: "In the morning I drink tea." },
      { german: "Abend", article: "der", plural: "Abende", english: "evening", example: "Am Abend lerne ich Deutsch.", translation: "In the evening I study German." },
      { german: "Tag", article: "der", plural: "Tage", english: "day", example: "Heute ist ein schöner Tag.", translation: "Today is a beautiful day." },
      { german: "Woche", article: "die", plural: "Wochen", english: "week", example: "Eine Woche hat sieben Tage.", translation: "A week has seven days." },
      { german: "Arbeit", article: "die", plural: "Arbeiten", english: "work", example: "Ich gehe zur Arbeit.", translation: "I go to work." },
      { german: "Pause", article: "die", plural: "Pausen", english: "break", example: "Wir machen eine Pause.", translation: "We are taking a break." },
      { german: "Schlaf", article: "der", english: "sleep", example: "Ich brauche mehr Schlaf.", translation: "I need more sleep." },
      { german: "Freizeit", article: "die", english: "free time", example: "In meiner Freizeit lese ich.", translation: "In my free time I read." },
    ],
  },
];

const dailyVerbs = [
  { infinitive: "aufstehen", meaning: "to get up", example: "Ich stehe um sieben Uhr auf.", translation: "I get up at seven o'clock." },
  { infinitive: "frühstücken", meaning: "to have breakfast", example: "Ich frühstücke um acht Uhr.", translation: "I have breakfast at eight o'clock." },
  { infinitive: "lernen", meaning: "to study / learn", example: "Ich lerne Deutsch.", translation: "I learn German." },
  { infinitive: "arbeiten", meaning: "to work", example: "Mein Vater arbeitet im Büro.", translation: "My father works in an office." },
  { infinitive: "einkaufen", meaning: "to shop", example: "Wir kaufen am Samstag ein.", translation: "We shop on Saturday." },
  { infinitive: "kochen", meaning: "to cook", example: "Meine Mutter kocht das Essen.", translation: "My mother cooks the food." },
  { infinitive: "putzen", meaning: "to clean", example: "Ich putze mein Zimmer.", translation: "I clean my room." },
  { infinitive: "schlafen", meaning: "to sleep", example: "Das Kind schläft früh.", translation: "The child sleeps early." },
  { infinitive: "fernsehen", meaning: "to watch television", example: "Wir sehen am Abend fern.", translation: "We watch television in the evening." },
  { infinitive: "spazieren gehen", meaning: "to go for a walk", example: "Ich gehe im Park spazieren.", translation: "I go for a walk in the park." },
];

const quizQuestions = [
  { question: "What does „das Badezimmer“ mean?", options: ["Bedroom", "Bathroom", "Kitchen", "Garden"], answer: "Bathroom", explanation: "Das Badezimmer means bathroom." },
  { question: "Which article belongs to „Tisch“?", options: ["die", "das", "der", "ein"], answer: "der", explanation: "It is der Tisch." },
  { question: "What is „the train“ in German?", options: ["der Bus", "der Zug", "das Auto", "das Fahrrad"], answer: "der Zug", explanation: "Der Zug means the train." },
  { question: "What does „einkaufen“ mean?", options: ["To sleep", "To cook", "To shop", "To read"], answer: "To shop", explanation: "Einkaufen means to shop." },
  { question: "Complete: Ich trinke ____.", options: ["Wasser", "Stuhl", "Fenster", "Bahnhof"], answer: "Wasser", explanation: "Ich trinke Wasser means I drink water." },
  { question: "What does „die Prüfung“ mean?", options: ["Break", "Exam", "Ticket", "Street"], answer: "Exam", explanation: "Die Prüfung means exam." },
  { question: "Which sentence means 'I travel by bus'?", options: ["Ich esse Brot.", "Ich fahre mit dem Bus.", "Ich lerne Deutsch.", "Ich schlafe früh."], answer: "Ich fahre mit dem Bus.", explanation: "Ich fahre mit dem Bus means I travel by bus." },
  { question: "What does „aufstehen“ mean?", options: ["To get up", "To sit down", "To go shopping", "To cook"], answer: "To get up", explanation: "Aufstehen means to get up." },
  { question: "What is the plural of „das Buch“?", options: ["Buchs", "Bücher", "Buchen", "Buches"], answer: "Bücher", explanation: "Das Buch becomes die Bücher." },
  { question: "Complete: Am Abend ____ ich Deutsch.", options: ["lerne", "lernst", "lernt", "lernen"], answer: "lerne", explanation: "With ich, lernen becomes lerne: Ich lerne." },
];

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export default function EverydayLifeVocabularyLesson({ onComplete }: Props) {
  const { targetLanguage, currentLanguage, lookupWord } = useLanguage();
  const [activeTab, setActiveTab] = useState("Vocabulary");
  const [activeCategory, setActiveCategory] = useState("At Home");
  const [revealedWords, setRevealedWords] = useState<string[]>([]);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const selectedCategory = categories.find((category) => category.name === activeCategory) ?? categories[0];
  const practiceWords = categories.flatMap((category) => category.words);
  const currentPractice = practiceWords[practiceIndex % practiceWords.length];
  const currentQuiz = quizQuestions[quizIndex];
  const score = quizAnswers.reduce((total, answer, index) => total + (answer === quizQuestions[index].answer ? 1 : 0), 0);

  const toggleReveal = (word: string) => {
    setRevealedWords((previous) =>
      previous.includes(word) ? previous.filter((item) => item !== word) : [...previous, word]
    );
  };

  const nextPractice = () => {
    setPracticeIndex((previous) => (previous + 1) % practiceWords.length);
    setPracticeAnswer("");
    setPracticeChecked(false);
  };

  const chooseQuizAnswer = (answer: string) => {
    if (quizSubmitted) return;
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

  const restartQuiz = () => {
    setQuizIndex(0);
    setQuizAnswers([]);
    setQuizSubmitted(false);
  };

  const tabs = ["Vocabulary", "Daily Verbs", "Practice", "Final Quiz"];

  return (
    <div className="everyday-lesson">
      <div className="everyday-hero">
        <div>
          <span className="everyday-eyebrow">A1 GERMAN · MODULE 19</span>
          <h1>Everyday Life Vocabulary</h1>
          <p>Learn useful German words for your home, college, food, shopping, travel, and daily routine.</p>
          <div className="everyday-hero-tags">
            <span>6 topics</span>
            <span>48+ words</span>
            <span>10 daily verbs</span>
          </div>
        </div>
        <div className="everyday-hero-icon">
          <BookOpen size={54} />
        </div>
      </div>

      <div className="everyday-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "everyday-tab active" : "everyday-tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Vocabulary" && (
        <section className="everyday-section">
          <div className="everyday-section-heading">
            <div>
              <h2>Learn vocabulary by topic</h2>
              <p>Choose a topic and learn the words with their articles, plurals, and examples.</p>
            </div>
          </div>

          <div className="everyday-category-grid">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  className={activeCategory === category.name ? "everyday-category active" : "everyday-category"}
                  onClick={() => setActiveCategory(category.name)}
                >
                  <Icon size={21} />
                  <span>{category.name}</span>
                  <small>{category.words.length} words</small>
                </button>
              );
            })}
          </div>

          <div className="everyday-word-list">
            <div className="everyday-list-heading">
              <h3>{selectedCategory.name}</h3>
              <span>{selectedCategory.words.length} words</span>
            </div>
            {selectedCategory.words.map((word) => {
              const fullWord = `${word.article ? `${word.article} ` : ""}${word.german}`;
              const revealed = revealedWords.includes(fullWord);
              return (
                <div className="everyday-word-card" key={fullWord}>
                  <div className="everyday-word-main">
                    <div>
                      <span className="everyday-german-word">{fullWord}</span>
                      {word.plural && <span className="everyday-plural">Plural: {word.article === "die" && word.german.endsWith("in") ? "die " : "die "}{word.plural}</span>}
                    </div>
                    <button className="everyday-audio" onClick={() => speak(fullWord)} aria-label={`Listen to ${fullWord}`}>
                      <Volume2 size={19} />
                    </button>
                  </div>
                  <button className="everyday-reveal" onClick={() => toggleReveal(fullWord)}>
                    {revealed ? "Hide meaning" : "Show meaning"}
                  </button>
                  {revealed && (
                    <div className="everyday-word-detail">
                      <strong>{word.english}</strong>
                      {targetLanguage !== "en" && lookupWord(word.german)?.translations[targetLanguage] && (
                        <div style={{ color: "var(--primary)", fontWeight: 700, fontSize: "13.5px", marginTop: "2px" }}>
                          {currentLanguage.flag} {lookupWord(word.german)?.translations[targetLanguage]}
                        </div>
                      )}
                      <p className="everyday-example">{word.example}</p>
                      <p>{word.translation}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                        <button className="everyday-small-audio" onClick={() => speak(word.example)}>
                          <Volume2 size={15} /> Listen to example
                        </button>
                        <a
                          href={`https://www.dict.cc/?s=${encodeURIComponent(word.german)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: "11px", color: "#2563eb", textDecoration: "none", fontWeight: 700 }}
                          title="Verify word on dict.cc"
                        >
                          Verify on dict.cc ↗
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="everyday-tip">
            <Lightbulb size={20} />
            <div>
              <strong>Remember the article & verify on dict.cc!</strong>
              <p>
                Learn every German noun together with its article: <strong>der</strong>, <strong>die</strong>, or <strong>das</strong>. For 100% verified noun genders, plurals, and accurate translation, always refer to <a href="https://www.dict.cc" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: 700 }}>dict.cc ↗</a>.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeTab === "Daily Verbs" && (
        <section className="everyday-section">
          <h2>Common verbs in everyday life</h2>
          <p className="everyday-muted">These verbs help you describe your daily routine. Read the example and listen to the pronunciation.</p>
          <div className="everyday-verbs-grid">
            {dailyVerbs.map((verb) => (
              <article className="everyday-verb-card" key={verb.infinitive}>
                <div className="everyday-verb-top">
                  <strong>{verb.infinitive}</strong>
                  <button className="everyday-audio" onClick={() => speak(verb.infinitive)} aria-label={`Listen to ${verb.infinitive}`}>
                    <Volume2 size={18} />
                  </button>
                </div>
                <span>{verb.meaning}</span>
                <p>{verb.example}</p>
                <small>{verb.translation}</small>
                <button className="everyday-small-audio" onClick={() => speak(verb.example)}>
                  <Volume2 size={15} /> Listen to sentence
                </button>
              </article>
            ))}
          </div>
          <div className="everyday-tip">
            <Lightbulb size={20} />
            <div>
              <strong>Important: Separable verbs</strong>
              <p>Some verbs, such as aufstehen and einkaufen, are separable. In a normal present-tense sentence, the prefix moves to the end: „Ich stehe um sieben Uhr auf.“</p>
            </div>
          </div>
        </section>
      )}

      {activeTab === "Practice" && (
        <section className="everyday-section">
          <div className="everyday-section-heading">
            <div>
              <h2>Vocabulary practice</h2>
              <p>Look at the German word and choose its correct English meaning.</p>
            </div>
            <span className="everyday-counter">{practiceIndex + 1} / {practiceWords.length}</span>
          </div>
          <div className="everyday-practice-card">
            <span className="everyday-eyebrow">WHAT DOES THIS MEAN?</span>
            <h2>{currentPractice.article ? `${currentPractice.article} ` : ""}{currentPractice.german}</h2>
            <button className="everyday-audio" onClick={() => speak(`${currentPractice.article ?? ""} ${currentPractice.german}`)}>
              <Volume2 size={19} /> Listen
            </button>
            <input
              className="everyday-answer-input"
              value={practiceAnswer}
              onChange={(event) => {
                setPracticeAnswer(event.target.value);
                setPracticeChecked(false);
              }}
              placeholder="Type the English meaning..."
              onKeyDown={(event) => {
                if (event.key === "Enter") setPracticeChecked(true);
              }}
            />
            {practiceChecked && (
              <div className={practiceAnswer.trim().toLowerCase() === currentPractice.english.toLowerCase() ? "everyday-feedback correct" : "everyday-feedback incorrect"}>
                {practiceAnswer.trim().toLowerCase() === currentPractice.english.toLowerCase()
                  ? "Correct! Well done."
                  : `Correct meaning: ${currentPractice.english}`}
              </div>
            )}
            <div className="everyday-practice-actions">
              <button className="everyday-secondary-button" onClick={() => setPracticeChecked(true)} disabled={!practiceAnswer.trim()}>
                Check answer
              </button>
              <button className="everyday-primary-button" onClick={nextPractice}>
                Next word <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>
      )}

      {activeTab === "Final Quiz" && (
        <section className="everyday-section">
          {!quizSubmitted ? (
            <>
              <div className="everyday-section-heading">
                <div>
                  <h2>Final vocabulary quiz</h2>
                  <p>Answer all 10 questions. You need 8 correct answers to pass.</p>
                </div>
                <span className="everyday-counter">{quizIndex + 1} / {quizQuestions.length}</span>
              </div>
              <div className="everyday-quiz-card">
                <div className="everyday-progress-track">
                  <div style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }} />
                </div>
                <span className="everyday-eyebrow">QUESTION {quizIndex + 1}</span>
                <h2>{currentQuiz.question}</h2>
                <div className="everyday-options">
                  {currentQuiz.options.map((option) => (
                    <button
                      key={option}
                      className={quizAnswers[quizIndex] === option ? "everyday-option selected" : "everyday-option"}
                      onClick={() => chooseQuizAnswer(option)}
                    >
                      <span>{option}</span>
                      {quizAnswers[quizIndex] === option && <CheckCircle2 size={18} />}
                    </button>
                  ))}
                </div>
                <button className="everyday-primary-button everyday-next-button" onClick={nextQuiz} disabled={!quizAnswers[quizIndex]}>
                  {quizIndex === quizQuestions.length - 1 ? "Submit quiz" : "Next question"}
                  <ArrowRight size={17} />
                </button>
              </div>
            </>
          ) : (
            <div className="everyday-result-card">
              <Trophy size={48} />
              <h2>{score >= 8 ? "Excellent work!" : "Keep practising!"}</h2>
              <p className="everyday-score">{score} / {quizQuestions.length}</p>
              <p>{score >= 8 ? "You passed this lesson. You can now use more everyday German vocabulary." : "You need at least 8 correct answers. Review the vocabulary and try again."}</p>
              <div className="everyday-result-review">
                {quizQuestions.map((question, index) => (
                  <div className="everyday-review-item" key={question.question}>
                    <span className={quizAnswers[index] === question.answer ? "review-correct" : "review-wrong"}>
                      {quizAnswers[index] === question.answer ? "✓" : "✗"}
                    </span>
                    <div>
                      <strong>{question.question}</strong>
                      <p>Your answer: {quizAnswers[index] ?? "Not answered"} · Correct: {question.answer}</p>
                      <small>{question.explanation}</small>
                    </div>
                  </div>
                ))}
              </div>
              <div className="everyday-practice-actions">
                <button className="everyday-secondary-button" onClick={restartQuiz}>
                  <RotateCcw size={16} /> Try again
                </button>
                {score >= 8 && (
                  <button className="everyday-primary-button" onClick={onComplete}>
                    Complete lesson <CheckCircle2 size={17} />
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
