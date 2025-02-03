import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';

import Header from '~/app/login/1 - Header';
import Video from '~/app/login/2 - Video';
import Description from '~/app/login/3 - Description';
import Action from '~/app/login/4 - Action';

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
