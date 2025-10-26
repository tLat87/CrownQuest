/**
 * CrownQ - Crown Academy Quest
 * Educational app about history, art, and power
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { AppProvider } from './crownquest/crownquest-context/CrownQuestContext';
import AppNavigator from './crownquest/crownquest-navigation/CrownQuestNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProvider>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor="#2C1810"
      />
      <AppNavigator />
    </AppProvider>
  );
}

export default App;
