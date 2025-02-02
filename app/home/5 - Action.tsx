import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '~/components/ui/button';

export default function ActionPage() {
  return (
    <View className="flex flex-row items-center justify-center gap-4 rounded-3xl bg-white p-4">
      <Button
        onPress={() => {
          router.push('/homepage');
        }}
        className="flex-1">
        <Text className="font-sans-extrabold text-2xl">Withdraw</Text>
      </Button>
      <Button
        onPress={() => {
          router.push('/homepage');
        }}
        className="flex-1 bg-black">
        <Text className="font-sans-extrabold text-2xl text-white">Deposit</Text>
      </Button>
    </View>
  );
}
