import { router } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '~/components/ui/button';

export default function Footer() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: insets.bottom,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
      className="flex w-full flex-row items-center justify-between gap-8 px-8 pb-4">
      <Button
        onPress={() => {
          router.back();
        }}
        className="aspect-square h-12">
        <ChevronLeft size={24} color="white" />
      </Button>
      <Button
        onPress={() => {
          router.push('/login');
        }}
        className="h-12 w-[35vw] pl-2">
        <Text className="font-sans-extrabold text-lg text-white">Log Out</Text>
        <ChevronRight size={24} color="white" />
      </Button>
    </View>
  );
}
