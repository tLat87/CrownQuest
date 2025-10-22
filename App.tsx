/**
 * Crown Academy Quest
 * A journey through the hidden history of power, art, and belief.
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor="#2C1810" />
      <AppNavigator />
    </AppProvider>
  );
}

export default App;
