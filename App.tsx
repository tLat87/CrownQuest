/**
 * Crown Academy Quest
 * A journey through the hidden history of power, art, and belief.
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { AppProvider } from './crownquest/crownquest-context/CrownQuestContext';
import AppNavigator from './crownquest/crownquest-navigation/CrownQuestNavigator';

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor="#2C1810" />
      <AppNavigator />
    </AppProvider>
  );
}

export default App;
