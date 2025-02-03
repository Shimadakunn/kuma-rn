import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import Header from '~/app/settings/1 - Header';
import Settings from '~/app/settings/2 - Settings';
import Footer from '~/app/settings/5 - Footer';

export default function SettingsPage() {
  return (
    <>
      <Stack.Screen options={{ title: 'Settings', headerShown: false }} />

      <SafeAreaView className="flex-1 bg-white">
        <Header />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="mb-2 w-full flex-1 flex-col items-center justify-start gap-6">
            <Settings />
          </View>
        </ScrollView>
        <Footer />
      </SafeAreaView>
    </>
  );
}
