import { router } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '~/src/components/ui/button';
import { useAlchemyAuthSession } from '~/src/context/AlchemyAuthSessionProvider';
export default function Actions() {
  const insets = useSafeAreaInsets();
  const { signOutUser } = useAlchemyAuthSession();

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
        noShadow
        className="aspect-square h-14">
        <ChevronLeft size={24} color="white" />
      </Button>
      <Button
        onPress={async () => {
          await signOutUser();
          router.replace('/login');
        }}
        className="h-16 w-[35vw] bg-red-500/90 pl-1">
        <Text className="font-sans-extrabold text-lg text-white">Log Out</Text>
        <ChevronRight size={24} color="white" />
      </Button>
    </View>
  );
}
