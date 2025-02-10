import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';

import { Action, Description, Header, Video } from '~/src/pages/login';

export default function Login() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login', headerShown: false }} />

      <SafeAreaView className="flex-1 items-center justify-end bg-white">
        <Header />
        <Video />
        <Description />
        <Action />
      </SafeAreaView>
    </>
  );
}
