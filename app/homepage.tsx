import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import Header from '~/app/home/1 - Header';
import Balance from '~/app/home/2 - Balance';
import { Chart } from '~/app/home/3 - Chart';
import Stats from '~/app/home/4 - Stats';
import Action from '~/app/home/5 - Action';
export default function Homepage() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />

      <SafeAreaView className="flex-1  bg-[#F2F2F2]">
        <Header />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="mb-2 flex w-full flex-1 flex-col items-center justify-start gap-4">
            <Balance />
            <Chart />
            <Stats />
            <Action />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
