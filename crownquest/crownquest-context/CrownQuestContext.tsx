import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserStats, Settings, Story } from '../crownquest-types/crownquest-types';

interface AppState {
  userStats: UserStats;
  settings: Settings;
  savedStories: string[];
  selectedEra: string | null;
  hasCompletedSurvey: boolean;
}

type AppAction =
  | { type: 'UPDATE_STATS'; payload: Partial<UserStats> }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'SAVE_STORY'; payload: string }
  | { type: 'UNSAVE_STORY'; payload: string }
  | { type: 'SET_SELECTED_ERA'; payload: string }
  | { type: 'SET_SURVEY_COMPLETED'; payload: boolean }
  | { type: 'LOAD_DATA'; payload: AppState };

const initialState: AppState = {
  userStats: {
    timeSpentReading: 0,
    timeSpentQuizzes: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    storiesRead: 0,
    quizzesCompleted: 0
  },
  settings: {
    musicEnabled: false,
    vibrationEnabled: true
  },
  savedStories: [],
  selectedEra: null,
  hasCompletedSurvey: false
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'UPDATE_STATS':
      return {
        ...state,
        userStats: { ...state.userStats, ...action.payload }
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    case 'SAVE_STORY':
      return {
        ...state,
        savedStories: [...state.savedStories, action.payload]
      };
    case 'UNSAVE_STORY':
      return {
        ...state,
        savedStories: state.savedStories.filter(id => id !== action.payload)
      };
    case 'SET_SELECTED_ERA':
      return {
        ...state,
        selectedEra: action.payload
      };
    case 'SET_SURVEY_COMPLETED':
      return {
        ...state,
        hasCompletedSurvey: action.payload
      };
    case 'LOAD_DATA':
      return action.payload;
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [state]);

  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('crownQuestData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('crownQuestData', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
