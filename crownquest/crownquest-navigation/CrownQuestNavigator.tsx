import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useApp } from '../crownquest-context/CrownQuestContext';


import OnboardingScreen from '../crownquest-screens/CrownQuestOnboardingScreen';
import SurveyScreen from '../crownquest-screens/CrownQuestSurveyScreen';
import MainMenuScreen from '../crownquest-screens/CrownQuestMainMenuScreen';
import StoriesScreen from '../crownquest-screens/CrownQuestStoriesScreen';
import StoryDetailScreen from '../crownquest-screens/CrownQuestStoryDetailScreen';
import QuizScreen from '../crownquest-screens/CrownQuestQuizScreen';
import SettingsScreen from '../crownquest-screens/CrownQuestSettingsScreen';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#2C1810' }
          }}
        >
          {!state.hasCompletedSurvey ? (
            <>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Survey" component={SurveyScreen} />
            </>
          ) : (
            <Stack.Screen name="Main" component={MainMenuScreen} />
          )}
          
          
          <Stack.Screen name="Stories" component={StoriesScreen} />
          <Stack.Screen name="StoryDetail" component={StoryDetailScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;
