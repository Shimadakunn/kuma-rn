import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import LoginDrawer from '~/src/components/LoginDrawer';
import { Button } from '~/src/components/ui/button';

export default function ActionPage() {
  const [isLoginDrawerVisible, setIsLoginDrawerVisible] = useState(false);
  return (
    <>
      <View className="w-full flex-row items-center justify-around px-4 py-6">
        <Button
          onPress={() => {
            router.replace('/home');
          }}
          noShadow
          isWhite
          className="h-16 w-[40vw]">
          <Text className="font-sans-extrabold text-lg ">Login</Text>
          <ChevronRight size={24} color="black" />
        </Button>
        <Button
          onPress={() => {
            setIsLoginDrawerVisible(true);
          }}
          className="h-16 w-[40vw]">
          <Text className="font-sans-extrabold text-lg text-white">Sign Up</Text>
          <ChevronRight size={24} color="white" />
        </Button>
      </View>
      <LoginDrawer
        isVisible={isLoginDrawerVisible}
        onClose={() => setIsLoginDrawerVisible(false)}
      />
    </>
  );
}
