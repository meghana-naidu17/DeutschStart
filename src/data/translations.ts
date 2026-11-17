import type { LanguageOption, TargetLanguage } from '../types';

export const availableLanguages: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳'
  }
];

export interface WordTranslation {
  german: string;
  article?: 'der' | 'die' | 'das' | '';
  plural?: string;
  category: string;
  pronunciation: string;
  exampleSentenceDe: string;
  translations: Record<TargetLanguage, string>;
  exampleTranslation: Record<TargetLanguage, string>;
}

export const germanDictionary: WordTranslation[] = [
  {
    german: 'Hallo',
    article: '',
    category: 'Greetings',
    pronunciation: 'HAH-loh',
    exampleSentenceDe: 'Hallo, wie geht es dir?',
    translations: {
      en: 'Hello / Hi',
      te: 'హలో / నమస్కారం',
      hi: 'नमस्ते / हैलो',
      es: 'Hola',
      fr: 'Bonjour / Salut',
      ta: 'வணக்கம்'
    },
    exampleTranslation: {
      en: 'Hello, how are you?',
      te: 'హలో, నువ్వు ఎలా ఉన్నావు?',
      hi: 'नमस्ते, आप कैसे हैं?',
      es: 'Hola, ¿cómo estás?',
      fr: 'Bonjour, comment vas-tu ?',
      ta: 'வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?'
    }
  },
  {
    german: 'Guten Morgen',
    article: '',
    category: 'Greetings',
    pronunciation: 'GOO-ten MOR-gen',
    exampleSentenceDe: 'Guten Morgen allerseits!',
    translations: {
      en: 'Good morning',
      te: 'శుభోదయం',
      hi: 'शुभ प्रभात',
      es: 'Buenos días',
      fr: 'Bonjour (le matin)',
      ta: 'காலை வணக்கம்'
    },
    exampleTranslation: {
      en: 'Good morning everyone!',
      te: 'అందరికీ శుభోదయం!',
      hi: 'सभी को शुभ प्रभात!',
      es: '¡Buenos días a todos!',
      fr: 'Bonjour à tous !',
      ta: 'அனைவருக்கும் காலை வணக்கம்!'
    }
  },
  {
    german: 'Guten Tag',
    article: '',
    category: 'Greetings',
    pronunciation: 'GOO-ten TAHK',
    exampleSentenceDe: 'Guten Tag, Herr Müller!',
    translations: {
      en: 'Good day / Hello (formal)',
      te: 'శుభ దినం / నమస్కారం (మర్యాదగా)',
      hi: 'शुभ दिन / नमस्ते (औपचारिक)',
      es: 'Buenas tardes / Buen día',
      fr: 'Bonjour (formel)',
      ta: 'இனிய நாள் / வணக்கம்'
    },
    exampleTranslation: {
      en: 'Good day, Mr. Müller!',
      te: 'నమస్కారం, మిస్టర్ ముల్లర్!',
      hi: 'नमस्ते, मिस्टर मुलर!',
      es: '¡Buen día, señor Müller!',
      fr: 'Bonjour, Monsieur Müller !',
      ta: 'வணக்கம், திரு முல்லர்!'
    }
  },
  {
    german: 'Guten Abend',
    article: '',
    category: 'Greetings',
    pronunciation: 'GOO-ten AH-bent',
    exampleSentenceDe: 'Guten Abend, herzlich willkommen!',
    translations: {
      en: 'Good evening',
      te: 'శుభ సాయంత్రం',
      hi: 'शुभ संध्या',
      es: 'Buenas noches (tarde-noche)',
      fr: 'Bonsoir',
      ta: 'மாலை வணக்கம்'
    },
    exampleTranslation: {
      en: 'Good evening, welcome!',
      te: 'శుభ సాయంత్రం, స్వాగతం!',
      hi: 'शुभ संध्या, आपका स्वागत है!',
      es: '¡Buenas noches, bienvenidos!',
      fr: 'Bonsoir, bienvenue !',
      ta: 'மாலை வணக்கம், நல்வரவு!'
    }
  },
  {
    german: 'Gute Nacht',
    article: '',
    category: 'Greetings',
    pronunciation: 'GOO-teh NAHKT',
    exampleSentenceDe: 'Gute Nacht und schlaf gut!',
    translations: {
      en: 'Good night',
      te: 'శుభరాత్రి',
      hi: 'शुभ रात्रि',
      es: 'Buenas noches (dormir)',
      fr: 'Bonne nuit',
      ta: 'இரவு வணக்கம்'
    },
    exampleTranslation: {
      en: 'Good night and sleep well!',
      te: 'శుభరాత్రి, హాయిగా నిద్రపోండి!',
      hi: 'शुभ रात्रि, अच्छी नींद आए!',
      es: '¡Buenas noches y que duermas bien!',
      fr: 'Bonne nuit et dors bien !',
      ta: 'இரவு வணக்கம், நன்றாக உறங்குங்கள்!'
    }
  },
  {
    german: 'Auf Wiedersehen',
    article: '',
    category: 'Greetings',
    pronunciation: 'owf VEE-der-zay-en',
    exampleSentenceDe: 'Auf Wiedersehen, bis morgen!',
    translations: {
      en: 'Goodbye (formal)',
      te: 'మళ్ళీ కలుద్దాం / వీడ్కోలు (మర్యాదగా)',
      hi: 'अलविदा / फिर मिलेंगे (औपचारिक)',
      es: 'Hasta la vista / Adiós',
      fr: 'Au revoir',
      ta: 'மீண்டும் சந்திப்போம்'
    },
    exampleTranslation: {
      en: 'Goodbye, see you tomorrow!',
      te: 'వీడ్కోలు, రేపు కలుద్దాం!',
      hi: 'अलविदा, कल मिलते हैं!',
      es: '¡Adiós, hasta mañana!',
      fr: 'Au revoir, à demain !',
      ta: 'மீண்டும் சந்திப்போம், நாளை பார்க்கலாம்!'
    }
  },
  {
    german: 'Tschüss',
    article: '',
    category: 'Greetings',
    pronunciation: 'CHOOSS',
    exampleSentenceDe: 'Tschüss, mach’s gut!',
    translations: {
      en: 'Bye / See ya (informal)',
      te: 'బాయ్ (స్నేహపూర్వకంగా)',
      hi: 'बाय (अनौपचारिक)',
      es: '¡Chao! / ¡Adiós!',
      fr: 'Salut / Tchao',
      ta: 'போய் வருகிறேன்'
    },
    exampleTranslation: {
      en: 'Bye, take care!',
      te: 'బాయ్, జాగ్రత్త!',
      hi: 'बाय, अपना ख़्याल रखना!',
      es: '¡Chao, cuídate!',
      fr: 'Salut, prends soin de toi !',
      ta: 'போய் வருகிறேன், பார்த்துக் கொள்ளுங்கள்!'
    }
  },
  {
    german: 'Danke',
    article: '',
    category: 'Common Phrases',
    pronunciation: 'DAHN-keh',
    exampleSentenceDe: 'Vielen Dank für Ihre Hilfe.',
    translations: {
      en: 'Thank you / Thanks',
      te: 'ధన్యవాదాలు',
      hi: 'धन्यवाद / शुक्रिया',
      es: 'Gracias',
      fr: 'Merci',
      ta: 'நன்றி'
    },
    exampleTranslation: {
      en: 'Thank you very much for your help.',
      te: 'మీ సహాయానికి చాలా ధన్యవాదాలు.',
      hi: 'आपकी मदद के लिए बहुत-बहुत धन्यवाद।',
      es: 'Muchas gracias por su ayuda.',
      fr: 'Merci beaucoup pour votre aide.',
      ta: 'உங்கள் உதவிக்கு மிக்க நன்றி.'
    }
  },
  {
    german: 'Bitte',
    article: '',
    category: 'Common Phrases',
    pronunciation: 'BIT-teh',
    exampleSentenceDe: 'Ein Wasser, bitte.',
    translations: {
      en: 'Please / You’re welcome',
      te: 'దయచేసి / పర్వాలేదు',
      hi: 'कृपया / आपका स्वागत है (वेलकम)',
      es: 'Por favor / De nada',
      fr: "S'il vous plaît / De rien",
      ta: 'தயவுசெய்து / பரவாயில்லை'
    },
    exampleTranslation: {
      en: 'One water, please.',
      te: 'ఒక నీళ్ల సీసా, దయచేసి.',
      hi: 'एक पानी की बोतल, कृपया।',
      es: 'Un agua, por favor.',
      fr: "Une eau, s'il vous plaît.",
      ta: 'ஒரு தண்ணீர், தயவுசெய்து.'
    }
  },
  {
    german: 'Entschuldigung',
    article: 'die',
    plural: 'Entschuldigungen',
    category: 'Common Phrases',
    pronunciation: 'ent-SHOOL-dee-goong',
    exampleSentenceDe: 'Entschuldigung, wo ist der Bahnhof?',
    translations: {
      en: 'Excuse me / Sorry',
      te: 'నన్ను క్షమించండి',
      hi: 'माफ़ कीजिये / सुनिए',
      es: 'Disculpe / Perdón',
      fr: 'Excusez-moi / Pardon',
      ta: 'மன்னிக்கவும்'
    },
    exampleTranslation: {
      en: 'Excuse me, where is the train station?',
      te: 'నన్ను క్షమించండి, రైల్వే స్టేషన్ ఎక్కడ ఉంది?',
      hi: 'माफ़ कीजिये, रेलवे स्टेशन कहाँ है?',
      es: 'Disculpe, ¿dónde está la estación?',
      fr: "Excusez-moi, où est la gare ?",
      ta: 'மன்னிக்கவும், ரயில் நிலையம் எங்கே இருக்கிறது?'
    }
  },
  {
    german: 'Apfel',
    article: 'der',
    plural: 'Äpfel',
    category: 'Food & Drink',
    pronunciation: 'AHP-fel',
    exampleSentenceDe: 'Ich esse jeden Tag einen Apfel.',
    translations: {
      en: 'Apple',
      te: 'ఆపిల్ పండు',
      hi: 'सेब',
      es: 'Manzana',
      fr: 'Pomme',
      ta: 'ஆப்பிள்'
    },
    exampleTranslation: {
      en: 'I eat an apple every day.',
      te: 'నేను ప్రతిరోజూ ఒక ఆపిల్ పండు తింటాను.',
      hi: 'मैं रोज़ाना एक सेब खाता हूँ।',
      es: 'Como una manzana todos los días.',
      fr: 'Je mange une pomme chaque jour.',
      ta: 'நான் தினமும் ஒரு ஆப்பிள் சாப்பிடுகிறேன்.'
    }
  },
  {
    german: 'Brot',
    article: 'das',
    plural: 'Brote',
    category: 'Food & Drink',
    pronunciation: 'broht',
    exampleSentenceDe: 'Frisches Brot schmeckt lecker.',
    translations: {
      en: 'Bread',
      te: 'రొట్టె / బ్రెడ్',
      hi: 'रोटी / ब्रेड',
      es: 'Pan',
      fr: 'Pain',
      ta: 'ரொட்டி'
    },
    exampleTranslation: {
      en: 'Fresh bread tastes delicious.',
      te: 'తాజా రొట్టె చాలా రుచిగా ఉంటుంది.',
      hi: 'ताज़ा ब्रेड बहुत स्वादिष्ट लगता है।',
      es: 'El pan fresco es delicioso.',
      fr: 'Le pain frais est délicieux.',
      ta: 'புதிய ரொட்டி சுவையாக உள்ளது.'
    }
  },
  {
    german: 'Wasser',
    article: 'das',
    plural: 'Wässer',
    category: 'Food & Drink',
    pronunciation: 'VAHS-ser',
    exampleSentenceDe: 'Ich trinke viel Wasser.',
    translations: {
      en: 'Water',
      te: 'నీరు / మంచి నీళ్లు',
      hi: 'पानी / जल',
      es: 'Agua',
      fr: 'Eau',
      ta: 'தண்ணீர்'
    },
    exampleTranslation: {
      en: 'I drink a lot of water.',
      te: 'నేను చాలా నీళ్లు తాగుతాను.',
      hi: 'मैं बहुत पानी पीता हूँ।',
      es: 'Bebo mucha agua.',
      fr: "Je bois beaucoup d'eau.",
      ta: 'நான் நிறைய தண்ணீர் குடிக்கிறேன்.'
    }
  },
  {
    german: 'Kaffee',
    article: 'der',
    plural: 'Kaffees',
    category: 'Food & Drink',
    pronunciation: 'KAH-fay',
    exampleSentenceDe: 'Möchten Sie einen Kaffee?',
    translations: {
      en: 'Coffee',
      te: 'కాఫీ',
      hi: 'कॉफ़ी',
      es: 'Café',
      fr: 'Café',
      ta: 'காபி'
    },
    exampleTranslation: {
      en: 'Would you like a coffee?',
      te: 'మీకు కాఫీ కావాలా?',
      hi: 'क्या आप कॉफ़ी लेना पसंद करेंगे?',
      es: '¿Le gustaría un café?',
      fr: 'Aimeriez-vous un café ?',
      ta: 'காபி அருந்துகிறீர்களா?'
    }
  },
  {
    german: 'Haus',
    article: 'das',
    plural: 'Häuser',
    category: 'Everyday Objects',
    pronunciation: 'hows',
    exampleSentenceDe: 'Das Haus hat einen schönen Garten.',
    translations: {
      en: 'House',
      te: 'ఇల్లు / భవనం',
      hi: 'घर / मकान',
      es: 'Casa',
      fr: 'Maison',
      ta: 'வீடு'
    },
    exampleTranslation: {
      en: 'The house has a beautiful garden.',
      te: 'ఆ ఇంటికి ఒక అందమైన తోట ఉంది.',
      hi: 'इस घर में एक सुंदर बगीचा है।',
      es: 'La casa tiene un jardín hermoso.',
      fr: 'La maison a un beau jardin.',
      ta: 'அந்த வீட்டில் ஒரு அழகான தோட்டம் உள்ளது.'
    }
  },
  {
    german: 'Buch',
    article: 'das',
    plural: 'Bücher',
    category: 'Everyday Objects',
    pronunciation: 'bookh',
    exampleSentenceDe: 'Dieses Buch ist sehr interessant.',
    translations: {
      en: 'Book',
      te: 'పుస్తకం',
      hi: 'किताब / पुस्तक',
      es: 'Libro',
      fr: 'Livre',
      ta: 'புத்தகம்'
    },
    exampleTranslation: {
      en: 'This book is very interesting.',
      te: 'ఈ పుస్తకం చాలా ఆసక్తికరంగా ఉంది.',
      hi: 'यह किताब बहुत दिलचस्प है।',
      es: 'Este libro es muy interesante.',
      fr: 'Ce livre est très intéressant.',
      ta: 'இந்த புத்தகம் மிகவும் சுவாரஸ்யமானது.'
    }
  },
  {
    german: 'Schule',
    article: 'die',
    plural: 'Schulen',
    category: 'Places & Education',
    pronunciation: 'SHOO-leh',
    exampleSentenceDe: 'Die Kinder gehen in die Schule.',
    translations: {
      en: 'School',
      te: 'పాఠశాల / బడి',
      hi: 'स्कूल / विद्यालय',
      es: 'Escuela / Colegio',
      fr: 'École',
      ta: 'பள்ளி'
    },
    exampleTranslation: {
      en: 'The children are going to school.',
      te: 'పిల్లలు పాఠశాలకు వెళ్తున్నారు.',
      hi: 'बच्चे स्कूल जा रहे हैं।',
      es: 'Los niños van a la escuela.',
      fr: "Les enfants vont à l'école.",
      ta: 'குழந்தைகள் பள்ளிக்குச் செல்கிறார்கள்.'
    }
  },
  {
    german: 'Universität',
    article: 'die',
    plural: 'Universitäten',
    category: 'Places & Education',
    pronunciation: 'oo-nee-ver-zee-TAYT',
    exampleSentenceDe: 'Ich studiere an der Universität.',
    translations: {
      en: 'University',
      te: 'విశ్వవిద్యాలయం / యూనివర్సిటీ',
      hi: 'विश्वविद्यालय / यूनिवर्सिटी',
      es: 'Universidad',
      fr: 'Université',
      ta: 'பல்கலைக்கழகம்'
    },
    exampleTranslation: {
      en: 'I study at the university.',
      te: 'నేను యూనివర్సిటీలో చదువుకుంటున్నాను.',
      hi: 'मैं विश्वविद्यालय में पढ़ाई करता हूँ।',
      es: 'Estudio en la universidad.',
      fr: "J'étudie à l'université.",
      ta: 'நான் பல்கலைக்கழகத்தில் படிக்கிறேன்.'
    }
  },
  {
    german: 'Arbeit',
    article: 'die',
    plural: 'Arbeiten',
    category: 'Work & Daily Life',
    pronunciation: 'AR-byt',
    exampleSentenceDe: 'Ich gehe um acht Uhr zur Arbeit.',
    translations: {
      en: 'Work / Job',
      te: 'పని / ఉద్యోగం',
      hi: 'काम / नौकरी',
      es: 'Trabajo / Empleo',
      fr: 'Travail / Boulot',
      ta: 'வேலை'
    },
    exampleTranslation: {
      en: 'I go to work at eight o’clock.',
      te: 'నేను ఎనిమిది గంటలకు పనికి వెళ్తాను.',
      hi: 'मैं आठ बजे काम पर जाता हूँ।',
      es: 'Voy al trabajo a las ocho.',
      fr: 'Je vais au travail à huit heures.',
      ta: 'நான் எட்டு மணிக்கு வேலைக்குச் செல்கிறேன்.'
    }
  },
  {
    german: 'Freund',
    article: 'der',
    plural: 'Freunde',
    category: 'People & Family',
    pronunciation: 'froynt',
    exampleSentenceDe: 'Mein Freund wohnt in Berlin.',
    translations: {
      en: 'Friend (male) / Boyfriend',
      te: 'స్నేహితుడు',
      hi: 'दोस्त / मित्र',
      es: 'Amigo / Novio',
      fr: 'Ami / Copain',
      ta: 'நண்பன்'
    },
    exampleTranslation: {
      en: 'My friend lives in Berlin.',
      te: 'నా స్నేహితుడు బెర్లిన్‌లో నివసిస్తున్నాడు.',
      hi: 'मेरा दोस्त बर्लिन में रहता है।',
      es: 'Mi amigo vive en Berlín.',
      fr: 'Mon ami habite à Berlin.',
      ta: 'என் நண்பன் பெர்லினில் வசிக்கிறான்.'
    }
  },
  {
    german: 'Freundin',
    article: 'die',
    plural: 'Freundinnen',
    category: 'People & Family',
    pronunciation: 'FROYN-din',
    exampleSentenceDe: 'Meine Freundin spricht Deutsch.',
    translations: {
      en: 'Friend (female) / Girlfriend',
      te: 'స్నేహితురాలు',
      hi: 'सहेली / मित्र (महिला)',
      es: 'Amiga / Novia',
      fr: 'Amie / Copine',
      ta: 'தோழி'
    },
    exampleTranslation: {
      en: 'My friend speaks German.',
      te: 'నా స్నేహితురాలు జర్మన్ మాట్లాడుతుంది.',
      hi: 'मेरी सहेली जर्मन बोलती है।',
      es: 'Mi amiga habla alemán.',
      fr: 'Mon amie parle allemand.',
      ta: 'என் தோழி ஜெர்மன் பேசுகிறாள்.'
    }
  },
  {
    german: 'Familie',
    article: 'die',
    plural: 'Familien',
    category: 'People & Family',
    pronunciation: 'fah-MEE-lyeh',
    exampleSentenceDe: 'Meine Familie ist mir sehr wichtig.',
    translations: {
      en: 'Family',
      te: 'కుటుంబం',
      hi: 'परिवार / कुटुंब',
      es: 'Familia',
      fr: 'Famille',
      ta: 'குடும்பம்'
    },
    exampleTranslation: {
      en: 'My family is very important to me.',
      te: 'నా కుటుంబం నాకు చాలా ముఖ్యం.',
      hi: 'मेरा परिवार मेरे लिए बहुत महत्वपूर्ण है।',
      es: 'Mi familia es muy importante para mí.',
      fr: 'Ma famille est très importante pour moi.',
      ta: 'என் குடும்பம் எனக்கு மிகவும் முக்கியம்.'
    }
  },
  {
    german: 'Stadt',
    article: 'die',
    plural: 'Städte',
    category: 'Places & Travel',
    pronunciation: 'shtaht',
    exampleSentenceDe: 'München ist eine schöne Stadt.',
    translations: {
      en: 'City / Town',
      te: 'నగరం / పట్టణం',
      hi: 'शहर / नगर',
      es: 'Ciudad',
      fr: 'Ville',
      ta: 'நகரம்'
    },
    exampleTranslation: {
      en: 'Munich is a beautiful city.',
      te: 'మ్యూనిచ్ ఒక అందమైన నగరం.',
      hi: 'म्यूनिख एक खूबसूरत शहर है।',
      es: 'Múnich es una hermosa ciudad.',
      fr: 'Munich est une belle ville.',
      ta: 'மியூனிக் ஒரு அழகான நகரம்.'
    }
  },
  {
    german: 'Deutschland',
    article: 'das',
    plural: '',
    category: 'Places & Travel',
    pronunciation: 'DOYTSH-lahnt',
    exampleSentenceDe: 'Deutschland liegt in Mitteleuropa.',
    translations: {
      en: 'Germany',
      te: 'జర్మనీ దేశం',
      hi: 'जर्मनी देश',
      es: 'Alemania',
      fr: 'Allemagne',
      ta: 'ஜெர்மனி'
    },
    exampleTranslation: {
      en: 'Germany is located in Central Europe.',
      te: 'జర్మనీ మధ్య ఐరోపాలో ఉంది.',
      hi: 'जर्मनी मध्य यूरोप में स्थित है।',
      es: 'Alemania está situada en Europa Central.',
      fr: "L'Allemagne est située en Europe centrale.",
      ta: 'ஜெர்மனி மத்திய ஐரோப்பாவில் அமைந்துள்ளது.'
    }
  },
  {
    german: 'Sprechen',
    article: '',
    category: 'Important Verbs',
    pronunciation: 'SHPREH-khen',
    exampleSentenceDe: 'Sprechen Sie Deutsch oder Englisch?',
    translations: {
      en: 'To speak',
      te: 'మాట్లాడటం',
      hi: 'बोलना',
      es: 'Hablar',
      fr: 'Parler',
      ta: 'பேசுதல்'
    },
    exampleTranslation: {
      en: 'Do you speak German or English?',
      te: 'మీరు జర్మన్ లేదా ఇంగ్లీష్ మాట్లాడతారా?',
      hi: 'क्या आप जर्मन या अंग्रेज़ी बोलते हैं?',
      es: '¿Habla usted alemán o inglés?',
      fr: 'Parlez-vous allemand ou anglais ?',
      ta: 'நீங்கள் ஜெர்மன் அல்லது ஆங்கிலம் பேசுகிறீர்களா?'
    }
  },
  {
    german: 'Lernen',
    article: '',
    category: 'Important Verbs',
    pronunciation: 'LAIR-nen',
    exampleSentenceDe: 'Wir lernen jeden Tag neue Wörter.',
    translations: {
      en: 'To learn / study',
      te: 'నేర్చుకోవడం / చదువుకోవడం',
      hi: 'सीखना / अध्ययन करना',
      es: 'Aprender / Estudiar',
      fr: 'Apprendre',
      ta: 'கற்றல்'
    },
    exampleTranslation: {
      en: 'We learn new words every day.',
      te: 'మేము ప్రతిరోజూ కొత్త పదాలను నేర్చుకుంటాము.',
      hi: 'हम रोज़ नए शब्द सीखते हैं।',
      es: 'Aprendemos palabras nuevas cada día.',
      fr: 'Nous apprenons de nouveaux mots chaque jour.',
      ta: 'நாம் தினமும் புதிய சொற்களைக் கற்கிறோம்.'
    }
  },
  {
    german: 'Verstehen',
    article: '',
    category: 'Important Verbs',
    pronunciation: 'fair-SHTAY-en',
    exampleSentenceDe: 'Ich verstehe das nicht ganz.',
    translations: {
      en: 'To understand',
      te: 'అర్థం చేసుకోవడం',
      hi: 'समझना',
      es: 'Entender / Comprender',
      fr: 'Comprendre',
      ta: 'புரிந்துகொள்ளுதல்'
    },
    exampleTranslation: {
      en: "I don't quite understand that.",
      te: 'నాకు అది పూర్తిగా అర్థం కాలేదు.',
      hi: 'मुझे यह पूरी तरह समझ नहीं आया।',
      es: 'No entiendo eso del todo.',
      fr: 'Je ne comprends pas tout à fait.',
      ta: 'எனக்கு அது சரியாகப் புரியவில்லை.'
    }
  }
];

export const uiTranslations: Record<TargetLanguage, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    learningPath: 'Learning Path',
    settings: 'Settings',
    searchPlaceholder: 'Search lessons, grammar, topics...',
    welcomeTitle: 'Master German from Scratch',
    welcomeSubtitle: 'Learn German step by step with interactive lessons, native audio, Telugu/Hindi translations, and dict.cc precision.',
    continueLearning: 'Continue Learning',
    totalLessons: 'Total Lessons',
    completedLessons: 'Completed Lessons',
    courseProgress: 'Course Progress',
    disclaimerBannerTitle: 'Important Study Disclaimer',
    disclaimerBannerShort: 'DeutschStart is a guided interactive path, but not enough alone to pass Goethe A1. Always supplement with recommended YouTube videos and textbooks.',
    viewStudyGuide: 'View Study Guide',
    dictCcTitle: 'dict.cc Verified Dictionary',
    dictCcDesc: 'For 100% accurate translation, grammatical gender (der/die/das), and plural forms, look up any word on dict.cc.',
    dictCcButton: 'Open dict.cc ↗',
    upcomingLevelsTitle: 'Upcoming German Levels',
    upcomingLevelsSub: 'German A2 and B1 curricula are in active preparation.',
    exploreA2B1: 'Explore Roadmap',
    selectLanguage: 'Translation Language',
    login: 'Log In',
    signup: 'Sign Up',
    logout: 'Log Out',
    profile: 'Profile',
    theme: 'Theme',
    guestUser: 'Guest Learner',
    startA1Free: 'Start A1 for Free',
    exploreCurriculum: 'Explore Curriculum'
  },
  te: {
    dashboard: 'డాష్‌బోర్డ్',
    learningPath: 'లెర్నింగ్ పాత్',
    settings: 'సెట్టింగ్‌లు',
    searchPlaceholder: 'పాఠాలు, వ్యాకరణం, పదాలను వెతకండి...',
    welcomeTitle: 'జర్మన్ మొదటి నుండి నేర్చుకోండి',
    welcomeSubtitle: 'ఇంటరాక్టివ్ పాఠాలు, ఆడియో ఉచ్చారణ, తెలుగు అనువాదాలు మరియు dict.cc ఖచ్చితత్వంతో జర్మన్ సులభంగా నేర్చుకోండి.',
    continueLearning: 'నేర్చుకోవడం కొనసాగించండి',
    totalLessons: 'మొత్తం పాఠాలు',
    completedLessons: 'పూర్తయిన పాఠాలు',
    courseProgress: 'కోర్సు పురోగతి',
    disclaimerBannerTitle: 'ముఖ్యమైన అధ్యయన గమనిక (Disclaimer)',
    disclaimerBannerShort: 'డ్యుయిష్‌స్టార్ట్ మీకు మంచి మార్గదర్శకత్వాన్ని అందిస్తుంది, కానీ గోథే A1 పరీక్ష పాస్ అవ్వడానికి ఈ వెబ్‌సైట్ మాత్రమే సరిపోదు. ఖచ్చితంగా యూట్యూబ్ వీడియోలు మరియు పుస్తకాలు కూడా చదవాలి.',
    viewStudyGuide: 'స్టడీ గైడ్ చూడండి',
    dictCcTitle: 'dict.cc ఖచ్చితమైన డిక్షనరీ',
    dictCcDesc: 'ఏ జర్మన్ పదానికైనా సరైన లింగం (der/die/das), బహువచనం మరియు ఖచ్చితమైన అర్థం కోసం dict.cc ఉపయోగించండి.',
    dictCcButton: 'dict.cc ఓపెన్ చేయండి ↗',
    upcomingLevelsTitle: 'త్వరలో రాబోయే జర్మన్ స్థాయిలు',
    upcomingLevelsSub: 'జర్మన్ A2 మరియు B1 కోర్సులు త్వరలోనే విడుదల కానున్నాయి.',
    exploreA2B1: 'రోడ్‌మ్యాప్ చూడండి',
    selectLanguage: 'అనువాద భాష',
    login: 'లాగిన్',
    signup: 'సైన్ ఇన్ / రిజిస్టర్',
    logout: 'లాగౌట్',
    profile: 'ప్రొఫైల్',
    theme: 'థీమ్',
    guestUser: 'గెస్ట్ యూజర్',
    startA1Free: 'ఉచితంగా A1 ప్రారంభించండి',
    exploreCurriculum: 'సిలబస్ చూడండి'
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    learningPath: 'लर्निंग पाथ',
    settings: 'सेटिंग्स',
    searchPlaceholder: 'पाठ, व्याकरण, शब्द खोजें...',
    welcomeTitle: 'शुरुआत से जर्मन सीखें',
    welcomeSubtitle: 'इंटरैक्टिव पाठों, ऑडियो उच्चारण, हिंदी अनुवाद और dict.cc की सटीकता के साथ जर्मन भाषा में महारत हासिल करें।',
    continueLearning: 'सीखना जारी रखें',
    totalLessons: 'कुल पाठ',
    completedLessons: 'पूरे किए गए पाठ',
    courseProgress: 'कोर्स प्रगति',
    disclaimerBannerTitle: 'महत्वपूर्ण अध्ययन अस्वीकरण (Disclaimer)',
    disclaimerBannerShort: 'DeutschStart केवल अभ्यास का मार्गदर्शन करता है, लेकिन Goethe A1 पास करने के लिए सिर्फ यह काफी नहीं है। यूट्यूब वीडियो और पाठ्यपुस्तकों का संदर्भ ज़रूर लें।',
    viewStudyGuide: 'स्टडी गाइड देखें',
    dictCcTitle: 'dict.cc सटीक जर्मन डिक्शनरी',
    dictCcDesc: 'प्रत्येक शब्द के सही लिंग (der/die/das), बहुवचन और सटीक अर्थ के लिए dict.cc का उपयोग करें।',
    dictCcButton: 'dict.cc खोलें ↗',
    upcomingLevelsTitle: 'आगामी जर्मन स्तर (A2 & B1)',
    upcomingLevelsSub: 'जर्मन A2 और B1 पाठ्यक्रम जल्द ही उपलब्ध होंगे।',
    exploreA2B1: 'रोडमैप देखें',
    selectLanguage: 'अनुवाद की भाषा',
    login: 'लॉग इन',
    signup: 'साइन अप / रजिस्टर',
    logout: 'लॉग आउट',
    profile: 'प्रोफ़ाइल',
    theme: 'थीम',
    guestUser: 'अतिथि शिक्षार्थी',
    startA1Free: 'मुफ़्त में A1 शुरू करें',
    exploreCurriculum: 'पाठ्यक्रम देखें'
  },
  es: {
    dashboard: 'Panel principal',
    learningPath: 'Ruta de aprendizaje',
    settings: 'Configuración',
    searchPlaceholder: 'Buscar lecciones, gramática...',
    welcomeTitle: 'Domina el alemán desde cero',
    welcomeSubtitle: 'Aprende alemán paso a paso con lecciones interactivas, audio nativo y precisión dict.cc.',
    continueLearning: 'Continuar aprendiendo',
    totalLessons: 'Lecciones totales',
    completedLessons: 'Lecciones completadas',
    courseProgress: 'Progreso del curso',
    disclaimerBannerTitle: 'Aviso importante de estudio',
    disclaimerBannerShort: 'DeutschStart es una guía interactiva, pero no basta por sí sola para aprobar A1. Consulta vídeos de YouTube y libros recomendados.',
    viewStudyGuide: 'Ver guía de estudio',
    dictCcTitle: 'Diccionario verificado dict.cc',
    dictCcDesc: 'Para género gramatical (der/die/das) y plurales exactos de cualquier palabra, consulta dict.cc.',
    dictCcButton: 'Abrir dict.cc ↗',
    upcomingLevelsTitle: 'Próximos niveles (A2 y B1)',
    upcomingLevelsSub: 'Los cursos de alemán A2 y B1 estarán disponibles próximamente.',
    exploreA2B1: 'Ver hoja de ruta',
    selectLanguage: 'Idioma de traducción',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    logout: 'Cerrar sesión',
    profile: 'Perfil',
    theme: 'Tema',
    guestUser: 'Usuario invitado',
    startA1Free: 'Empezar A1 gratis',
    exploreCurriculum: 'Ver programa'
  },
  fr: {
    dashboard: 'Tableau de bord',
    learningPath: "Parcours d'apprentissage",
    settings: 'Paramètres',
    searchPlaceholder: 'Rechercher des leçons, grammaire...',
    welcomeTitle: "Maîtrisez l'allemand depuis le début",
    welcomeSubtitle: 'Apprenez pas à pas avec des leçons interactives, audio natif et la précision de dict.cc.',
    continueLearning: 'Continuer',
    totalLessons: 'Leçons totales',
    completedLessons: 'Leçons terminées',
    courseProgress: 'Progression',
    disclaimerBannerTitle: "Avertissement d'étude important",
    disclaimerBannerShort: "DeutschStart est une base solide, mais insuffisante seule pour valider l'A1. Utilisez les vidéos YouTube et manuels recommandés.",
    viewStudyGuide: "Voir le guide d'étude",
    dictCcTitle: 'Dictionnaire vérifié dict.cc',
    dictCcDesc: 'Pour le genre exact (der/die/das) et les pluriels, utilisez dict.cc.',
    dictCcButton: 'Ouvrir dict.cc ↗',
    upcomingLevelsTitle: 'Niveaux à venir (A2 & B1)',
    upcomingLevelsSub: 'Les cours A2 et B1 sont en cours de préparation.',
    exploreA2B1: 'Voir la feuille de route',
    selectLanguage: 'Langue de traduction',
    login: 'Connexion',
    signup: "S'inscrire",
    logout: 'Déconnexion',
    profile: 'Profil',
    theme: 'Thème',
    guestUser: 'Apprenant invité',
    startA1Free: 'Démarrer A1 gratuitement',
    exploreCurriculum: 'Découvrir le programme'
  },
  ta: {
    dashboard: 'முகப்பு பலகை',
    learningPath: 'கற்றல் பாதை',
    settings: 'அமைப்புகள்',
    searchPlaceholder: 'பாடங்கள், இலக்கணம் தேடுங்கள்...',
    welcomeTitle: 'ஜெர்மன் மொழியை புதிதாக கற்கவும்',
    welcomeSubtitle: 'ஊடாடும் பாடங்கள், ஆடியோ, தமிழ் மொழிபெயர்ப்புகள் மற்றும் dict.cc துல்லியத்துடன் ஜெர்மன் கற்றுக்கொள்ளுங்கள்.',
    continueLearning: 'தொடர்ந்து கற்கவும்',
    totalLessons: 'மொத்த பாடங்கள்',
    completedLessons: 'முடிக்கப்பட்ட பாடங்கள்',
    courseProgress: 'பாடநெறி முன்னேற்றம்',
    disclaimerBannerTitle: 'முக்கிய அறிவிப்பு (Disclaimer)',
    disclaimerBannerShort: 'DeutschStart ஒரு சிறந்த வழிகாட்டி, ஆனால் Goethe A1 தேர்ச்சி பெற இது மட்டுமே போதாது. பரிந்துரைக்கப்பட்ட யூடியூப் வீடியோக்கள் மற்றும் புத்தகங்களையும் படிக்கவும்.',
    viewStudyGuide: 'வழிகாட்டியைப் பார்க்கவும்',
    dictCcTitle: 'dict.cc துல்லியமான அகராதி',
    dictCcDesc: 'சொற்களின் பாலினம் (der/die/das) மற்றும் பன்மையை அறிய dict.cc பயன்படுத்துங்கள்.',
    dictCcButton: 'dict.cc திற ↗',
    upcomingLevelsTitle: 'வரவிருக்கும் நிலைகள் (A2 & B1)',
    upcomingLevelsSub: 'ஜெர்மன் A2 மற்றும் B1 பாடங்கள் விரைவில் வருகின்றன.',
    exploreA2B1: 'திட்டத்தைப் பார்க்கவும்',
    selectLanguage: 'மொழிபெயர்ப்பு மொழி',
    login: 'உள்நுழைவு',
    signup: 'பதிவு செய்க',
    logout: 'வெளியேறு',
    profile: 'சுயவிவரம்',
    theme: 'தீம்',
    guestUser: 'விருந்தினர்',
    startA1Free: 'இலவசமாக A1 தொடங்கவும்',
    exploreCurriculum: 'பாடத்திட்டத்தைப் பார்க்கவும்'
  }
};
