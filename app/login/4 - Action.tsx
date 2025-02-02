import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '~/components/ui/button';

export default function ActionPage() {
  return (
    <View className="flex w-full items-center justify-center py-4">
      <Button
        onPress={() => {
          router.push('/homepage');
        }}
        className="h-14 w-[80vw]">
        <Text className="font-sans-extrabold text-2xl">Enter App</Text>
      </Button>
    </View>
  );
}
