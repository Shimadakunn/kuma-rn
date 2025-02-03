import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Button } from '~/components/ui/button';

export default function ActionPage() {
  return (
    <View className="flex w-full flex-row items-center justify-center gap-4 py-6">
      <Button
        onPress={() => {
          router.push('/homepage');
        }}
        noShadow
        isWhite
        className="w-[40vw]">
        <Text className="font-sans-extrabold text-lg ">Login</Text>
        <ChevronRight size={24} color="black" />
      </Button>
      <Button
        onPress={() => {
          router.push('/homepage');
        }}
        className="w-[40vw]">
        <Text className="font-sans-extrabold text-lg text-white">Sign Up</Text>
        <ChevronRight size={24} color="white" />
      </Button>
    </View>
  );
}
