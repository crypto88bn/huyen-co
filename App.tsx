import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabNavigator from './src/navigation/TabNavigator';
import { COLORS } from './src/constants/theme';

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.bg,
    card: COLORS.surface,
    text: COLORS.text,
    border: COLORS.border,
    primary: COLORS.goldL,
    notification: COLORS.purple,
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer theme={DarkTheme}>
          <StatusBar style="light" backgroundColor={COLORS.bg} />
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
