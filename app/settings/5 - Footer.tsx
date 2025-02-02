import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
export default function Footer() {
  return (
    <View className="flex h-24 w-full items-start justify-start rounded-t-3xl bg-white px-4 pt-4">
      <Pressable
        onPress={() => {
          router.back();
        }}
        className="flex w-full flex-row items-center justify-center gap-1 rounded-2xl border-2 border-black p-2">
        <ArrowLeft size={20} color="black" strokeWidth={2.5} />
        <Text className="font-sans-extrabold text-2xl">Back</Text>
      </Pressable>
    </View>
  );
}
