import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'node-libs-react-native/globals.js';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import 'react-native-get-random-values';
import { AlchemyAuthSessionProvider } from '~/src/context/AlchemyAuthSessionProvider';
import '../global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'login',
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AlchemyAuthSessionProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'white' },
          }}>
          <Stack.Screen name="index" redirect />
          <Stack.Screen name="login" />
          <Stack.Screen name="home" />
          <Stack.Screen name="settings" />
        </Stack>
      </GestureHandlerRootView>
    </AlchemyAuthSessionProvider>
  );
}
