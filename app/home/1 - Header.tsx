import { router } from 'expo-router';
import { CircleUserRound } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function Header() {
  return (
    <View className="flex w-full flex-row items-center justify-between p-4">
      <Text className="font-sans-extrabold text-3xl">Account</Text>
      <Pressable
        onPress={() => {
          router.push('/settings');
        }}
        className="rounded-2xl bg-white p-2">
        <CircleUserRound size={20} color="black" strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}
