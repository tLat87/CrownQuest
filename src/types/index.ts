export interface Era {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Story {
  id: string;
  title: string;
  era: string;
  content: string;
  image?: string;
  isSaved?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  era?: string;
}

export interface UserStats {
  timeSpentReading: number; // in minutes
  timeSpentQuizzes: number; // in minutes
  correctAnswers: number;
  wrongAnswers: number;
  storiesRead: number;
  quizzesCompleted: number;
}

export interface Settings {
  musicEnabled: boolean;
  vibrationEnabled: boolean;
}
