import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import Header from '~/src/pages/home/1 - Header';
import Balance from '~/src/pages/home/2 - Balance';
import Chart from '~/src/pages/home/3 - Chart';
import Stats from '~/src/pages/home/4 - Stats';
import Action from '~/src/pages/home/5 - Action';
export default function Homepage() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />

      <SafeAreaView className="flex-1 bg-white">
        <Header />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="mb-2 w-full flex-1 flex-col items-center justify-start">
            <Balance />
            <View className="my-2 h-px w-full" />
            <Chart />
            <Stats />
          </View>
        </ScrollView>
        <Action />
      </SafeAreaView>
    </>
  );
}
