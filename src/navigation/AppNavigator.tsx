import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useApp } from '../context/AppContext';

// Screens
import OnboardingScreen from '../screens/OnboardingScreen';
import SurveyScreen from '../screens/SurveyScreen';
import MainMenuScreen from '../screens/MainMenuScreen';
import StoriesScreen from '../screens/StoriesScreen';
import StoryDetailScreen from '../screens/StoryDetailScreen';
import QuizScreen from '../screens/QuizScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Survey: undefined;
  Main: undefined;
  Stories: undefined;
  StoryDetail: { story: any };
  Quiz: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { state } = useApp();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#2C1810' }
        }}
      >
        {/* {!state.hasCompletedSurvey ? ( */}
  
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Survey" component={SurveyScreen} />

        
          <Stack.Screen name="Main" component={MainMenuScreen} />
        
        
        <Stack.Screen name="Stories" component={StoriesScreen} />
        <Stack.Screen name="StoryDetail" component={StoryDetailScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
