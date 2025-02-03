import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, SafeAreaView, Text } from 'react-native';

export default function Modal() {
  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text>Modal</Text>
      </SafeAreaView>
    </>
  );
}
