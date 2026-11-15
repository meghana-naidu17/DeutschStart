
export interface AlphabetLetter {
  letter: string;
  name: string;
  pronunciation: string;
  example: string;
  meaning: string;
  special?: boolean;
}

export const alphabet: AlphabetLetter[] = [
  { letter: "A", name: "ah", pronunciation: "Ah", example: "Apfel", meaning: "Apple" },
  { letter: "B", name: "beh", pronunciation: "Bay", example: "Ball", meaning: "Ball" },
  { letter: "C", name: "tse", pronunciation: "Tseh", example: "Café", meaning: "Cafe" },
  { letter: "D", name: "deh", pronunciation: "Day", example: "Dach", meaning: "Roof" },
  { letter: "E", name: "eh", pronunciation: "Ay", example: "Ente", meaning: "Duck" },
  { letter: "F", name: "eff", pronunciation: "Eff", example: "Fisch", meaning: "Fish" },
  { letter: "G", name: "geh", pronunciation: "Gay", example: "Garten", meaning: "Garden" },
  { letter: "H", name: "hah", pronunciation: "Hah", example: "Haus", meaning: "House" },
  { letter: "I", name: "ih", pronunciation: "Ee", example: "Igel", meaning: "Hedgehog" },
  { letter: "J", name: "jot", pronunciation: "Yot", example: "Jacke", meaning: "Jacket" },
  { letter: "K", name: "kah", pronunciation: "Kah", example: "Katze", meaning: "Cat" },
  { letter: "L", name: "ell", pronunciation: "Ell", example: "Lampe", meaning: "Lamp" },
  { letter: "M", name: "emm", pronunciation: "Emm", example: "Mutter", meaning: "Mother" },
  { letter: "N", name: "enn", pronunciation: "Enn", example: "Nase", meaning: "Nose" },
  { letter: "O", name: "oh", pronunciation: "Oh", example: "Obst", meaning: "Fruit" },
  { letter: "P", name: "peh", pronunciation: "Pay", example: "Papier", meaning: "Paper" },
  { letter: "Q", name: "kuh", pronunciation: "Koo", example: "Qualle", meaning: "Jellyfish" },
  { letter: "R", name: "err", pronunciation: "Air", example: "Radio", meaning: "Radio" },
  { letter: "S", name: "ess", pronunciation: "Ess", example: "Sonne", meaning: "Sun" },
  { letter: "T", name: "teh", pronunciation: "Tay", example: "Tisch", meaning: "Table" },
  { letter: "U", name: "uh", pronunciation: "Oo", example: "Uhr", meaning: "Clock" },
  { letter: "V", name: "fau", pronunciation: "Fow", example: "Vater", meaning: "Father" },
  { letter: "W", name: "weh", pronunciation: "Vay", example: "Wasser", meaning: "Water" },
  { letter: "X", name: "iks", pronunciation: "Iks", example: "Xylophon", meaning: "Xylophone" },
  { letter: "Y", name: "ypsilon", pronunciation: "Üpsilon", example: "Yoga", meaning: "Yoga" },
  { letter: "Z", name: "zett", pronunciation: "Tsett", example: "Zebra", meaning: "Zebra" },
  { letter: "Ä", name: "äh", pronunciation: "Eh with open mouth", example: "Äpfel", meaning: "Apples", special: true },
  { letter: "Ö", name: "öh", pronunciation: "Rounded lips, say eh", example: "Öl", meaning: "Oil", special: true },
  { letter: "Ü", name: "üh", pronunciation: "Rounded lips, say ee", example: "Über", meaning: "Over", special: true },
  { letter: "ß", name: "Eszett", pronunciation: "Ess-tsett", example: "Straße", meaning: "Street", special: true }
];

export const alphabetQuiz = [
  {
    question: "Which letter is pronounced 'beh'?",
    options: ["D", "B", "P", "V"],
    answer: "B"
  },
  {
    question: "Which letter is pronounced 'tse'?",
    options: ["Z", "C", "S", "K"],
    answer: "C"
  },
  {
    question: "Which letter is pronounced 'fau'?",
    options: ["W", "F", "V", "J"],
    answer: "V"
  },
  {
    question: "Which letter is pronounced 'jot'?",
    options: ["Y", "G", "J", "I"],
    answer: "J"
  },
  {
    question: "Which letter is pronounced 'zett'?",
    options: ["S", "Z", "C", "T"],
    answer: "Z"
  },
  {
    question: "Which character is called Eszett?",
    options: ["Ä", "Ö", "Ü", "ß"],
    answer: "ß"
  },
  {
    question: "Which letter is pronounced 'weh'?",
    options: ["V", "W", "U", "Y"],
    answer: "W"
  },
  {
    question: "Which character is used in the word Äpfel?",
    options: ["A", "Ä", "Ö", "Ü"],
    answer: "Ä"
  }
];
