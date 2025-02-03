import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '~/components/ui/button';

export default function ActionPage() {
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
      className="flex w-full flex-row items-center justify-center gap-8 pb-4">
      <Button
        onPress={() => {
          router.push('/settings');
        }}
        className="h-12 w-[35vw] pl-1">
        <Text className="font-sans-extrabold text-lg text-white">Deposit</Text>
        <ChevronRight size={24} color="white" />
      </Button>
      <Button
        onPress={() => {
          router.push('/settings');
        }}
        className="h-12 w-[35vw] pl-1">
        <Text className="font-sans-extrabold text-lg text-white">Withdraw</Text>
        <ChevronRight size={24} color="white" />
      </Button>
    </View>
  );
}
