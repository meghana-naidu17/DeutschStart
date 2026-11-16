import { useState } from "react";
import {
  BookOpen,
  Clock,
  CheckCircle,
  RotateCcw,
  Lightbulb,
  GraduationCap,
  Volume2,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";
import "./TimeDailyRoutineLesson.css";

type Props = {
  onComplete: () => void;
};

type Question = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

const timeExamples = [
  { time: "07:00", german: "sieben Uhr", english: "seven o'clock", note: "Use Uhr for the full hour." },
  { time: "07:05", german: "fünf nach sieben", english: "five past seven", note: "nach = past / after." },
  { time: "07:10", german: "zehn nach sieben", english: "ten past seven", note: "Minutes after the hour use nach." },
  { time: "07:15", german: "Viertel nach sieben", english: "quarter past seven", note: "Viertel = a quarter (15 minutes)." },
  { time: "07:20", german: "zwanzig nach sieben", english: "twenty past seven", note: "This is a clear, widely understood form." },
  { time: "07:30", german: "halb acht", english: "7:30; halfway to eight", note: "halb names the coming hour, not the hour just passed." },
  { time: "07:40", german: "zwanzig vor acht", english: "twenty to eight", note: "vor = to / before." },
  { time: "07:45", german: "Viertel vor acht", english: "quarter to eight", note: "15 minutes before the next hour." },
  { time: "07:50", german: "zehn vor acht", english: "ten to eight", note: "Minutes before the next hour use vor." },
  { time: "07:55", german: "fünf vor acht", english: "five to eight", note: "Five minutes before eight." },
];

const routineItems = [
  { german: "aufstehen", english: "to get up", example: "Ich stehe um sieben Uhr auf.", detail: "Separable verb: stehe is in position 2; auf goes to the end." },
  { german: "sich duschen", english: "to take a shower", example: "Ich dusche mich am Morgen.", detail: "In everyday German, Ich dusche. is also common." },
  { german: "sich anziehen", english: "to get dressed", example: "Ich ziehe mich um halb acht an.", detail: "Separable and reflexive: ziehe ... mich ... an." },
  { german: "frühstücken", english: "to have breakfast", example: "Ich frühstücke um acht Uhr.", detail: "The verb itself means to have breakfast." },
  { german: "zur Universität fahren", english: "to travel to university", example: "Ich fahre um neun Uhr zur Universität.", detail: "fahren changes its vowel: du fährst, er/sie fährt." },
  { german: "lernen", english: "to study / learn", example: "Am Nachmittag lerne ich Deutsch.", detail: "When a time phrase comes first, the verb remains second." },
  { german: "zu Mittag essen", english: "to have lunch", example: "Ich esse um ein Uhr zu Mittag.", detail: "The expression is zu Mittag essen." },
  { german: "einkaufen", english: "to go shopping", example: "Ich kaufe am Samstag ein.", detail: "Separable verb: kaufe ... ein." },
  { german: "fernsehen", english: "to watch television", example: "Ich sehe am Abend fern.", detail: "Separable verb: sehe ... fern." },
  { german: "zu Abend essen", english: "to have dinner", example: "Wir essen um sieben Uhr zu Abend.", detail: "Say zu Abend essen, not Abendessen essen." },
  { german: "ins Bett gehen", english: "to go to bed", example: "Ich gehe um zehn Uhr ins Bett.", detail: "ins = in das." },
  { german: "schlafen", english: "to sleep", example: "Ich schlafe normalerweise acht Stunden.", detail: "du schläfst; er/sie schläft." },
];

const questions: Question[] = [
  { question: "What time is 'halb acht'?", options: ["7:30", "8:30", "7:15"], answer: "7:30", explanation: "halb acht means halfway to eight: 7:30." },
  { question: "What does 'Viertel nach neun' mean?", options: ["9:15", "9:45", "8:45"], answer: "9:15", explanation: "nach means past; Viertel is 15 minutes." },
  { question: "What does 'zehn vor sechs' mean?", options: ["5:50", "6:10", "6:50"], answer: "5:50", explanation: "vor means before/to the next hour: ten minutes before six." },
  { question: "Which question means 'What time is it?'", options: ["Wie spät ist es?", "Wo spät ist es?", "Wann Uhr ist es?"], answer: "Wie spät ist es?", explanation: "Wie spät ist es? and Wie viel Uhr ist es? both ask for the current time." },
  { question: "Complete: Es ist ___ Uhr.", options: ["sieben", "um sieben", "am sieben"], answer: "sieben", explanation: "For the current time: Es ist sieben Uhr. Do not add um." },
  { question: "Which phrase means 'at seven o'clock' when saying when an action happens?", options: ["um sieben Uhr", "am sieben Uhr", "in sieben Uhr"], answer: "um sieben Uhr", explanation: "Use um + clock time: Ich stehe um sieben Uhr auf." },
  { question: "Complete: Ich stehe um sechs Uhr ___.", options: ["auf", "an", "ein"], answer: "auf", explanation: "aufstehen is separable: Ich stehe ... auf." },
  { question: "Which sentence means 'I study German in the evening'?", options: ["Am Abend lerne ich Deutsch.", "Am Abend ich lerne Deutsch.", "Um Abend lerne ich Deutsch."], answer: "Am Abend lerne ich Deutsch.", explanation: "Am Abend is in position 1, so the conjugated verb lerne is in position 2." },
  { question: "Which phrase means 'at night' as a repeated time expression?", options: ["nachts", "mittags", "vormittags"], answer: "nachts", explanation: "nachts means at night; mittags means around midday." },
  { question: "Choose the natural German expression for 'to have dinner'.", options: ["zu Abend essen", "Abendessen essen", "essen Abend"], answer: "zu Abend essen", explanation: "The usual expression is zu Abend essen." },
  { question: "What is the formal 24-hour way to say 18:30?", options: ["achtzehn Uhr dreißig", "sechs Uhr halb", "halb achtzehn"], answer: "achtzehn Uhr dreißig", explanation: "For timetables and official contexts, read the hour and minutes: achtzehn Uhr dreißig." },
  { question: "Which sentence correctly says 'I get dressed at 7:30'?", options: ["Ich ziehe mich um halb acht an.", "Ich mich ziehe um halb acht an.", "Ich ziehe um halb acht mich an."], answer: "Ich ziehe mich um halb acht an.", explanation: "The reflexive pronoun mich follows the conjugated verb; the separable prefix an goes to the end." },
];

const speak = (text: string) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
};

export default function TimeDailyRoutineLesson({ onComplete }: Props) {
  const [activeTab, setActiveTab] = useState("learn");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce(
    (total, question, index) => total + (selectedAnswers[index] === question.answer ? 1 : 0),
    0
  );
  const allAnswered = questions.every((_, index) => Boolean(selectedAnswers[index]));
  const passed = submitted && score >= 10;

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const tabs = [
    { id: "learn", label: "Learn", icon: BookOpen },
    { id: "clock", label: "Telling the Time", icon: Clock },
    { id: "routine", label: "Daily Routine", icon: Sun },
    { id: "practice", label: "Practice", icon: GraduationCap },
  ];

  return (
    <div className="time-lesson">
      <div className="time-hero">
        <div className="time-hero-icon"><Clock size={30} /></div>
        <div>
          <span className="time-eyebrow">A1 GERMAN · MODULE 15</span>
          <h1>Time & Daily Routine</h1>
          <p>Learn to ask for the time, say when things happen, and describe your day with correct German word order.</p>
        </div>
      </div>

      <div className="time-tabs">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} className={`time-tab ${activeTab === id ? "active" : ""}`} onClick={() => setActiveTab(id)}>
            <Icon size={17} /> {label}
          </button>
        ))}
      </div>

      {activeTab === "learn" && (
        <div className="time-content">
          <section className="time-panel">
            <div className="time-section-title"><BookOpen size={20} /><h2>1. Ask and answer the time</h2></div>
            <div className="time-example-row"><div><strong>Wie spät ist es?</strong><span>What time is it?</span></div><button onClick={() => speak("Wie spät ist es?")} aria-label="Listen"><Volume2 size={18} /></button></div>
            <div className="time-example-row"><div><strong>Wie viel Uhr ist es?</strong><span>What time is it?</span></div><button onClick={() => speak("Wie viel Uhr ist es?")} aria-label="Listen"><Volume2 size={18} /></button></div>
            <div className="time-example-row"><div><strong>Es ist sieben Uhr.</strong><span>It is seven o'clock.</span></div><button onClick={() => speak("Es ist sieben Uhr.")} aria-label="Listen"><Volume2 size={18} /></button></div>
            <div className="time-example-row"><div><strong>Um wie viel Uhr beginnt der Unterricht?</strong><span>At what time does the class start?</span></div><button onClick={() => speak("Um wie viel Uhr beginnt der Unterricht?")} aria-label="Listen"><Volume2 size={18} /></button></div>
          </section>

          <section className="time-panel">
            <div className="time-section-title"><Lightbulb size={20} /><h2>2. Do not mix up these three expressions</h2></div>
            <div className="time-rule-grid">
              <div><strong>Es ist ...</strong><p>Use this to say what the time is now.</p><b>Es ist acht Uhr.</b><span>It is eight o'clock.</span></div>
              <div><strong>um + time</strong><p>Use this to say when an action happens.</p><b>Ich lerne um acht Uhr.</b><span>I study at eight o'clock.</span></div>
              <div><strong>am + part of day</strong><p>Use this with most parts of the day.</p><b>Am Morgen lerne ich.</b><span>I study in the morning.</span></div>
            </div>
          </section>

          <section className="time-panel">
            <div className="time-section-title"><ArrowRight size={20} /><h2>3. Word order with time phrases</h2></div>
            <p>In a normal German statement, the conjugated verb is in position 2. If a time phrase comes first, the subject usually comes after the verb.</p>
            <div className="time-order-example"><span>Ich</span><span>lerne</span><span>am Abend</span><span>Deutsch.</span></div>
            <div className="time-order-example"><span>Am Abend</span><span>lerne</span><span>ich</span><span>Deutsch.</span></div>
            <p className="time-note">Both sentences mean “I study German in the evening.” The verb lerne stays in position 2.</p>
          </section>
          <section className="time-tip"><Lightbulb size={20} /><div><strong>Key rule</strong><p><b>Es ist sieben Uhr.</b> = It is seven o'clock. <b>Ich stehe um sieben Uhr auf.</b> = I get up at seven o'clock.</p></div></section>
        </div>
      )}

      {activeTab === "clock" && (
        <div className="time-content">
          <section className="time-panel">
            <div className="time-section-title"><Clock size={20} /><h2>1. Common spoken German time</h2></div>
            <p>In everyday conversation, German often uses nach (past), vor (to/before), Viertel (quarter) and halb (halfway to the next hour).</p>
            <div className="time-table-wrap">
              <table className="time-table">
                <thead><tr><th>Digital time</th><th>German</th><th>Meaning</th><th>Listen</th></tr></thead>
                <tbody>{timeExamples.map((item) => (
                  <tr key={item.time}><td><strong>{item.time}</strong></td><td><strong>{item.german}</strong><small className="time-table-note">{item.note}</small></td><td>{item.english}</td><td><button className="time-audio" onClick={() => speak(item.german)} aria-label={`Listen to ${item.german}`}><Volume2 size={17} /></button></td></tr>
                ))}</tbody>
              </table>
            </div>
          </section>

          <section className="time-panel">
            <div className="time-section-title"><Lightbulb size={20} /><h2>2. The important rule: HALB</h2></div>
            <div className="halb-card"><div className="halb-clock">7:30</div><div><strong>halb acht</strong><p>Literally, “halfway to eight”. It means 7:30. German names the coming hour. So halb neun = 8:30 and halb zehn = 9:30.</p></div></div>
            <div className="time-rule-grid compact">
              <div><strong>halb sieben</strong><b>6:30</b></div>
              <div><strong>halb acht</strong><b>7:30</b></div>
              <div><strong>halb neun</strong><b>8:30</b></div>
            </div>
          </section>

          <section className="time-panel">
            <div className="time-section-title"><Clock size={20} /><h2>3. Digital and 24-hour time</h2></div>
            <p>For train times, appointments, announcements and written schedules, the 24-hour format is common. Read the hour, then Uhr, then the minutes.</p>
            <div className="time-example-row"><div><strong>08:20 → acht Uhr zwanzig</strong><span>8:20 in the morning</span></div><button onClick={() => speak("acht Uhr zwanzig")} aria-label="Listen"><Volume2 size={18} /></button></div>
            <div className="time-example-row"><div><strong>13:15 → dreizehn Uhr fünfzehn</strong><span>1:15 in the afternoon</span></div><button onClick={() => speak("dreizehn Uhr fünfzehn")} aria-label="Listen"><Volume2 size={18} /></button></div>
            <div className="time-example-row"><div><strong>18:30 → achtzehn Uhr dreißig</strong><span>6:30 in the evening</span></div><button onClick={() => speak("achtzehn Uhr dreißig")} aria-label="Listen"><Volume2 size={18} /></button></div>
            <div className="time-example-row"><div><strong>21:05 → einundzwanzig Uhr fünf</strong><span>9:05 at night</span></div><button onClick={() => speak("einundzwanzig Uhr fünf")} aria-label="Listen"><Volume2 size={18} /></button></div>
            <p className="time-note">In everyday speech, 18:30 may also be said as halb sieben when the context makes the hour clear.</p>
          </section>
        </div>
      )}

      {activeTab === "routine" && (
        <div className="time-content">
          <section className="time-panel">
            <div className="time-section-title"><Sun size={20} /><h2>1. Daily routine verbs</h2></div>
            <p>Learn the infinitive, meaning and a complete A1 sentence. Pay attention to the separable verbs and sentence endings.</p>
            <div className="routine-list">{routineItems.map((item) => (
              <div className="routine-item" key={item.german}>
                <div className="routine-main"><strong>{item.german}</strong><span>{item.english}</span><small>{item.example}</small><em>{item.detail}</em></div>
                <button onClick={() => speak(item.example)} aria-label={`Listen to ${item.example}`}><Volume2 size={18} /></button>
              </div>
            ))}</div>
          </section>

          <section className="time-panel">
            <div className="time-section-title"><Moon size={20} /><h2>2. Parts of the day</h2></div>
            <div className="daytime-grid">
              <div><Sun size={22} /><strong>am Morgen</strong><span>in the morning</span></div>
              <div><Sun size={22} /><strong>am Vormittag</strong><span>in the late morning / before noon</span></div>
              <div><Clock size={22} /><strong>am Mittag</strong><span>at midday</span></div>
              <div><Clock size={22} /><strong>am Nachmittag</strong><span>in the afternoon</span></div>
              <div><Moon size={22} /><strong>am Abend</strong><span>in the evening</span></div>
              <div><Moon size={22} /><strong>in der Nacht</strong><span>during the night</span></div>
            </div>
            <div className="time-rule-grid">
              <div><strong>morgens / abends</strong><p>Often means “in the morning / evening” as a regular or repeated habit.</p><b>Morgens trinke ich Tee.</b><span>I drink tea in the mornings.</span></div>
              <div><strong>am Morgen / am Abend</strong><p>Often points to a particular morning or evening.</p><b>Am Morgen bin ich müde.</b><span>In the morning, I am tired.</span></div>
              <div><strong>nachts</strong><p>Means at night, often as a general or repeated time.</p><b>Nachts schlafe ich.</b><span>I sleep at night.</span></div>
            </div>
          </section>

          <section className="time-panel">
            <div className="time-section-title"><ArrowRight size={20} /><h2>3. A complete example: Mein Tagesablauf</h2></div>
            <div className="routine-story">
              <p><b>Um sieben Uhr stehe ich auf.</b><span>At seven o'clock, I get up.</span></p>
              <p><b>Dann dusche ich mich und ziehe mich an.</b><span>Then I shower and get dressed.</span></p>
              <p><b>Um halb acht frühstücke ich.</b><span>At 7:30, I have breakfast.</span></p>
              <p><b>Um neun Uhr fahre ich zur Universität.</b><span>At nine o'clock, I travel to university.</span></p>
              <p><b>Am Nachmittag lerne ich Deutsch.</b><span>In the afternoon, I study German.</span></p>
              <p><b>Am Abend sehe ich fern oder lese ein Buch.</b><span>In the evening, I watch television or read a book.</span></p>
              <p><b>Um zehn Uhr gehe ich ins Bett.</b><span>At ten o'clock, I go to bed.</span></p>
            </div>
          </section>
          <section className="time-tip"><Lightbulb size={20} /><div><strong>Remember separable verbs</strong><p><b>aufstehen:</b> Ich stehe um sieben Uhr auf. <b>fernsehen:</b> Ich sehe am Abend fern. The prefix moves to the end in a main clause.</p></div></section>
        </div>
      )}

      {activeTab === "practice" && (
        <div className="time-content">
          <section className="time-panel">
            <div className="time-section-title"><GraduationCap size={20} /><h2>Test your understanding</h2></div>
            <p>Answer all 12 questions. You need at least 10 correct answers to complete this lesson. Explanations appear after submission.</p>
            {questions.map((question, index) => {
              const chosen = selectedAnswers[index];
              const correct = chosen === question.answer;
              return (
                <div className={`time-question ${submitted ? (correct ? "correct" : "incorrect") : ""}`} key={question.question}>
                  <strong>{index + 1}. {question.question}</strong>
                  <div className="time-options">{question.options.map((option) => (
                    <button key={option} disabled={submitted} className={chosen === option ? "selected" : ""} onClick={() => setSelectedAnswers((previous) => ({ ...previous, [index]: option }))}>{option}</button>
                  ))}</div>
                  {submitted && <p className="time-explanation">{correct ? "Correct! " : `Correct answer: ${question.answer}. `}{question.explanation}</p>}
                </div>
              );
            })}
            {!submitted ? (
              <button className="time-primary-button" disabled={!allAnswered} onClick={() => setSubmitted(true)}>Submit answers</button>
            ) : (
              <div className="time-result">
                <div className="time-result-score">{score}/12</div>
                <div><strong>{passed ? "Well done! Lesson completed." : "Keep practising!"}</strong><p>{passed ? "You have demonstrated a good understanding of this A1 topic." : "Review the explanations and try again. You need at least 10 out of 12."}</p></div>
                {passed ? <button className="time-primary-button" onClick={onComplete}><CheckCircle size={17} /> Complete lesson</button> : <button className="time-secondary-button" onClick={resetQuiz}><RotateCcw size={17} /> Try again</button>}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
