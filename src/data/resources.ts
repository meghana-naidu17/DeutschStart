import type { BookResource, UpcomingLevel, YoutubeResource } from '../types';

export const youtubeResources: YoutubeResource[] = [
  {
    id: 'yt-1',
    channelName: 'Easy German',
    creator: 'Cari, Janusz & the Easy German Team',
    subscribers: '2.5M+ Subscribers',
    description: 'Real German conversations on the streets of Germany with synchronized German and English subtitles. Essential for natural speech rhythm and daily listening.',
    recommendedFor: 'Hören (Listening) & everyday casual dialogue',
    topics: ['Street interviews', 'Slow German for beginners', 'Culture & lifestyle in Berlin/Munich'],
    url: 'https://www.youtube.com/@EasyGerman',
    embedQuery: 'Easy German A1',
    featuredPlaylist: 'German for Beginners (A1)',
    badge: 'Best for Listening & Authentic Accents'
  },
  {
    id: 'yt-2',
    channelName: 'Learn German with Anja',
    creator: 'Anja',
    subscribers: '1.2M+ Subscribers',
    description: 'High-energy, super clear video tutorials breaking down German A1 grammar rules, verb conjugation, articles, and pronunciation with humor and real memory hooks.',
    recommendedFor: 'Grammar fundamentals & verb rules',
    topics: ['Der, Die, Das rules', 'Accusative vs Dative', 'Sentence order (V2 rule)'],
    url: 'https://www.youtube.com/@LearnGermanwithAnja',
    embedQuery: 'Learn German with Anja A1',
    featuredPlaylist: 'German A1 Course from Zero',
    badge: 'Best for Beginner Grammar'
  },
  {
    id: 'yt-3',
    channelName: 'Deutsche Welle: Nicos Weg (A1)',
    creator: 'Deutsche Welle (DW Deutsch Lernen)',
    subscribers: 'Official German Public Broadcaster',
    description: 'A full-length telenovela and interactive video course created by Germany’s public international broadcaster. Follow Nico’s story arriving in Germany.',
    recommendedFor: 'Complete storyline immersion & Goethe A1 exam format',
    topics: ['Arriving at the airport', 'Renting a room (WG)', 'Going to the doctor & train station'],
    url: 'https://www.youtube.com/watch?v=4-eDoThe6qo',
    embedQuery: 'Nicos Weg A1 DW',
    featuredPlaylist: 'Nicos Weg – A1 Full Movie & Episodes',
    badge: 'Official Goethe Curriculum Aligned'
  },
  {
    id: 'yt-4',
    channelName: 'Lingoni German',
    creator: 'Jenny',
    subscribers: '1.8M+ Subscribers',
    description: 'Structured, university-quality German lessons broken down by CEFR levels A1.1 to B2. Excellent pronunciation practice and clear whiteboard diagrams.',
    recommendedFor: 'Pronunciation, numbers, alphabet & formal drills',
    topics: ['German phonetics & umlauts (ä, ö, ü)', 'Modal verbs', 'Separable verbs'],
    url: 'https://www.youtube.com/@lingonigerman',
    embedQuery: 'Lingoni German A1',
    featuredPlaylist: 'A1 German Lessons Step by Step',
    badge: 'Best for Clean Structure & Phonetics'
  },
  {
    id: 'yt-5',
    channelName: 'Hallo Deutschschule',
    creator: 'Hallo Deutschschule Zürich',
    subscribers: '900K+ Subscribers',
    description: 'Animated short dialogues showing German everyday life situations: at the supermarket, at the train counter, visiting the doctor, and introducing family.',
    recommendedFor: 'Goethe A1 Sprechen (Speaking) & Dialogues',
    topics: ['Buying groceries', 'Asking for directions', 'Ordering at a restaurant'],
    url: 'https://www.youtube.com/@HalloDeutschschule',
    embedQuery: 'Hallo Deutschschule A1 Dialoge',
    featuredPlaylist: 'A1 Dialogues & Short Stories',
    badge: 'Best for Real-life Scenarios'
  }
];

export const bookResources: BookResource[] = [
  {
    id: 'book-1',
    title: 'Netzwerk neu A1 (Kurs- und Übungsbuch)',
    authorOrPublisher: 'Ernst Klett Sprachen',
    level: 'A1.1 & A1.2',
    type: 'Coursebook',
    description: 'The standard modern textbook used across Goethe-Instituts worldwide. Features authentic dialogues, audio tracks, and targeted preparation for the Start Deutsch 1 exam.',
    highlights: [
      'Comprehensive audio & video clips',
      'Step-by-step grammatical progression',
      'Workbook exercises directly aligned with Goethe A1'
    ],
    isbnOrStoreLink: 'https://www.klett-sprachen.de/netzwerk-neu-a1/r-1/640#reiter=titel',
    coverEmoji: '📘'
  },
  {
    id: 'book-2',
    title: 'Fit fürs Goethe-Zertifikat A1 (Start Deutsch 1)',
    authorOrPublisher: 'Hueber Verlag',
    level: 'A1',
    type: 'Exam Prep',
    description: 'The definitive exam training workbook for the official Goethe-Zertifikat A1 exam. Includes real mock test papers for Hören, Lesen, Schreiben, and Sprechen.',
    highlights: [
      'Authentic exam simulation with audio CD',
      'Scoring sheets & official assessment criteria',
      'Tips for the spoken oral partner test'
    ],
    isbnOrStoreLink: 'https://www.hueber.de/titel/fit-fuers-goethe-zertifikat-a1-start-deutsch-1-tipp-test-978-3-19-001872-7',
    coverEmoji: '🎯'
  },
  {
    id: 'book-3',
    title: 'Grammatik aktiv: A1–B1',
    authorOrPublisher: 'Cornelsen Verlag (Friederike Jin, Ute Voß)',
    level: 'A1 to B1',
    type: 'Grammar Practice',
    description: 'Widely recognized as the best German grammar exercise book. Every topic has a double-page spread: left page explains rules with illustrations, right page provides progressive drills.',
    highlights: [
      'Clear two-page spread format (theory + practice)',
      'Covers every A1 grammatical case and sentence structure',
      'Invaluable from your first day up to intermediate B1'
    ],
    isbnOrStoreLink: 'https://www.cornelsen.de/produkte/grammatik-aktiv-a1-b1-9783061229641',
    coverEmoji: '📙'
  },
  {
    id: 'book-4',
    title: 'Studio [21] A1: Das Deutschbuch',
    authorOrPublisher: 'Cornelsen Verlag (Hermann Funk, Christina Kuhn)',
    level: 'A1',
    type: 'Coursebook',
    description: 'A communicative, visually rich coursebook tailored for adult learners planning to study or work in Germany. Great focus on workplace situations and living in Germany.',
    highlights: [
      'Strong focus on everyday vocational communication',
      'Integrated pronunciation & intonation workouts',
      'Clear vocabulary glossaries per unit'
    ],
    isbnOrStoreLink: 'https://www.cornelsen.de/reihen/studio-21-360000490000',
    coverEmoji: '📗'
  }
];

export const upcomingLevels: UpcomingLevel[] = [
  {
    id: 'a2',
    level: 'German A2',
    title: 'Elementary German Proficiency (A2)',
    subtitle: 'From simple phrases to confident everyday conversations and past-tense storytelling.',
    cefrDescription: 'Can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g. basic personal and family information, shopping, local geography, employment). Can communicate in simple and routine tasks.',
    estimatedHours: '150 - 200 study hours',
    expectedRelease: 'Summer 2027 · In Development',
    status: 'In Development',
    topics: [
      {
        title: 'Past Tense: Das Perfekt (with haben & sein)',
        description: 'Learn how to describe past events, weekend activities, and past work experiences using regular and irregular participles (Partizip II).',
        icon: '⏳'
      },
      {
        title: 'Subordinate Clauses (Nebensätze with weil, dass, wenn)',
        description: 'Master the rule of kicking the conjugated verb to the very end of the sentence to give reasons and conditions.',
        icon: '🔀'
      },
      {
        title: 'Reflexive Verbs (sich freuen, sich interessieren)',
        description: 'Learn how to use reflexive pronouns in accusative and dative to express personal emotions, daily hygiene, and habits.',
        icon: '🔄'
      },
      {
        title: 'Two-Way Prepositions (Wechselpräpositionen)',
        description: 'Master in, an, auf, neben, hinter, über, unter, vor, zwischen with Accusative (motion/Wohin?) vs Dative (location/Wo?).',
        icon: '📍'
      },
      {
        title: 'Adjective Endings in Nominative & Accusative',
        description: 'Say goodbye to guesswork when putting endings (-e, -en, -es, -er) on adjectives after definite and indefinite articles.',
        icon: '✨'
      },
      {
        title: 'Workplace & Housing Vocabulary',
        description: 'Apartment hunting, reading German rental ads (Warmmiete, Kaltmiete), job interviews, writing emails, and doctor visits.',
        icon: '🏢'
      }
    ]
  },
  {
    id: 'b1',
    level: 'German B1',
    title: 'Intermediate Independent German (Goethe B1 / Telc B1)',
    subtitle: 'The golden milestone for German university study, skilled employment, and permanent residency (PR).',
    cefrDescription: 'Can understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc. Can deal with most situations likely to arise while travelling in an area where the language is spoken.',
    estimatedHours: '300 - 400 study hours',
    expectedRelease: 'Late 2027 · Curriculum Planning',
    status: 'Curriculum Planning',
    topics: [
      {
        title: 'Subjunctive II (Konjunktiv II: hätte, wäre, würde)',
        description: 'Polite requests, hypothetical situations, expressing wishes, and giving advice (Wenn ich mehr Zeit hätte, würde ich...).',
        icon: '💭'
      },
      {
        title: 'Passive Voice (Passiv with werden + Partizip II)',
        description: 'How processes, rules, and news are reported in Germany (Das Auto wird repariert).',
        icon: '⚙️'
      },
      {
        title: 'Relative Clauses with Prepositions',
        description: 'Der Mann, mit dem ich gesprochen habe... Constructing fluent, multi-clause descriptions of people, objects, and places.',
        icon: '🔗'
      },
      {
        title: 'Two-Part Connectors (Zweiteilige Konnektoren)',
        description: 'nicht nur ... sondern auch, sowohl ... als auch, weder ... noch, entweder ... oder, and zwar ... aber.',
        icon: '⚖️'
      },
      {
        title: 'Professional German & Formal Written Correspondence',
        description: 'Writing formal letters of complaint, cover letters (Anschreiben), CVs (Lebenslauf), and participating in debates.',
        icon: '💼'
      },
      {
        title: 'Goethe / Telc B1 Full Exam Preparation & Simulation',
        description: 'Intensive practice for the 4 exam modules with real timing, speaking pair presentations, and essay writing templates.',
        icon: '🎓'
      }
    ]
  }
];

export const dictCcInfo = {
  name: 'dict.cc',
  url: 'https://www.dict.cc',
  tagline: 'The Gold-Standard Multilingual German Dictionary',
  whyDictCc: [
    {
      title: 'Exact Grammatical Gender (der, die, das)',
      desc: 'Machine translators often hide or guess the article. dict.cc clearly displays [m] (maskulin / der), [f] (feminin / die), and [n] (neutral / das) for every single noun.'
    },
    {
      title: 'Plural Forms & Declensions',
      desc: 'German plurals are irregular. dict.cc gives you the exact plural suffix (e.g. -e, -er, -en, -s, or umlaut) so you never guess.'
    },
    {
      title: 'Crowd-Verified by Native German Speakers & Linguists',
      desc: 'With over 20 years of human verification, nuances, regional Austrian/Swiss usage, and idioms are documented accurately.'
    },
    {
      title: 'Separable Verb Prefix Markings',
      desc: 'Clearly indicates whether verbs are separable (trennbar) or inseparable with sample context sentences.'
    },
    {
      title: 'Free Audio Pronunciation for Every Word',
      desc: 'Listen to authentic native human recordings of every word and dialect variation.'
    }
  ]
};
