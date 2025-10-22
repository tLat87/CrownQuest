import { Quiz } from '../crownquest-types/crownquest-types';

export const quizzes: Quiz[] = [
  {
    id: 'ancient-egypt-quiz',
    title: 'Ancient Egyptian Crowns',
    era: 'ancient',
    questions: [
      {
        id: 'double-crown-question',
        question: 'Who was the first ruler to wear the Double Crown of Egypt?',
        options: ['Tutankhamun', 'Narmer', 'Ramses II', 'Akhenaten'],
        correctAnswer: 1,
        explanation: 'Narmer, also known as Menes, was the first pharaoh to unite Upper and Lower Egypt and wear the Double Crown, symbolizing the unification of the Two Lands.'
      },
      {
        id: 'crown-materials-question',
        question: 'What materials were commonly used in ancient Egyptian crowns?',
        options: ['Gold and silver', 'Bronze and copper', 'Iron and steel', 'Wood and leather'],
        correctAnswer: 0,
        explanation: 'Ancient Egyptian crowns were primarily made from gold and silver, often decorated with precious stones and colored glass, symbolizing the divine nature of the pharaoh.'
      },
      {
        id: 'crown-symbolism-question',
        question: 'What did the Double Crown symbolize in ancient Egypt?',
        options: ['Military power', 'Religious authority', 'Unification of Upper and Lower Egypt', 'Wealth and prosperity'],
        correctAnswer: 2,
        explanation: 'The Double Crown, combining the White Crown of Upper Egypt and the Red Crown of Lower Egypt, symbolized the unification of the Two Lands under a single ruler.'
      }
    ]
  },
  {
    id: 'medieval-crowns-quiz',
    title: 'Medieval European Crowns',
    era: 'medieval',
    questions: [
      {
        id: 'charlemagne-crown-question',
        question: 'Who crowned Charlemagne as Holy Roman Emperor?',
        options: ['Pope Gregory I', 'Pope Leo III', 'Pope Innocent III', 'Pope Urban II'],
        correctAnswer: 1,
        explanation: 'Pope Leo III crowned Charlemagne as Holy Roman Emperor on Christmas Day in 800 AD, reviving the imperial title in Western Europe.'
      },
      {
        id: 'crown-authority-question',
        question: 'What did medieval crowns primarily symbolize?',
        options: ['Military conquest', 'Divine right to rule', 'Economic power', 'Cultural achievement'],
        correctAnswer: 1,
        explanation: 'Medieval crowns symbolized the divine right to rule, representing the belief that monarchs received their authority directly from God.'
      }
    ]
  },
  {
    id: 'renaissance-crowns-quiz',
    title: 'Renaissance and Imperial Crowns',
    era: 'renaissance',
    questions: [
      {
        id: 'tudor-rose-question',
        question: 'What did the Tudor Rose Crown symbolize?',
        options: ['Military victory', 'Unification of Lancaster and York', 'Religious reform', 'Economic prosperity'],
        correctAnswer: 1,
        explanation: 'The Tudor Rose Crown, with its red and white roses, symbolized the end of the Wars of the Roses and the unification of the houses of Lancaster and York.'
      }
    ]
  }
];
