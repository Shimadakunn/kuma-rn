import { router } from 'expo-router';
import { CircleUserRound } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

import { Button } from '~/src/components/ui/button';

export default function Header() {
  return (
    <View className="flex w-full flex-row items-center justify-between p-4">
      <Text className="font-sans-extrabold text-3xl">Account</Text>
      <Button
        onPress={() => {
          router.push('/settings');
        }}
        noShadow
        className="bg-black/90 p-2">
        <CircleUserRound size={20} color="white" strokeWidth={2.5} />
      </Button>
    </View>
  );
}
